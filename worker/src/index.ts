import Stripe from 'stripe'
import { getZipFilename, getZipUrl } from '../../lib/downloads'
import { signDownloadToken, verifyDownloadToken } from '../../lib/download-token'
import { getProductName, getProductPrice, isKnownProduct } from '../../lib/product-catalog'
import { sendOrderConfirmationEmail, type OrderEmailItem } from '../../lib/email'

export interface Env {
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  RESEND_API_KEY: string
  DOWNLOAD_SECRET: string
  ALLOWED_ORIGINS: string
  WORKER_BASE_URL: string
  EMAIL_FROM: string
  EMAIL_REPLY_TO: string
  // Product ZIPs (private R2 bucket kalaseriet-downloads). Optional so a missing binding falls back to the old host.
  ZIPS?: R2Bucket
}

type CartMetaItem = { id: string; q: number }

interface CheckoutRequest {
  items: Array<{ productId: string; productName: string; price: number; quantity: number }>
}

function corsHeaders(origin: string | null, allowed: string[]): HeadersInit {
  const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0]
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
    'Access-Control-Max-Age': '86400',
  }
}

function json(data: unknown, status: number, cors: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  })
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Reflect Worker secrets onto process.env — lib/download-token.ts and
    // lib/email.ts read process.env.* directly (shared, already-tested code
    // with the Vercel deployment); this guarantees they see the right values
    // regardless of nodejs_compat's own process.env population behavior.
    process.env.DOWNLOAD_SECRET = env.DOWNLOAD_SECRET
    process.env.RESEND_API_KEY = env.RESEND_API_KEY
    // Verified sender; without this lib/email.ts silently falls back to
    // Resend's sandbox address, which only delivers to the account owner.
    if (env.EMAIL_FROM) process.env.EMAIL_FROM = env.EMAIL_FROM
    if (env.EMAIL_REPLY_TO) process.env.EMAIL_REPLY_TO = env.EMAIL_REPLY_TO

    const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    const origin = request.headers.get('Origin')
    const cors = corsHeaders(origin, allowedOrigins)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    const url = new URL(request.url)
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      httpClient: Stripe.createFetchHttpClient(),
    })

    try {
      if (url.pathname === '/checkout' && request.method === 'POST') {
        return await handleCheckout(request, stripe, cors, allowedOrigins[0])
      }
      if (url.pathname === '/webhooks/stripe' && request.method === 'POST') {
        return await handleWebhook(request, stripe, env, cors)
      }
      if (url.pathname === '/download' && request.method === 'GET') {
        return await handleDownload(url, env, cors)
      }
      if (url.pathname === '/session-status' && request.method === 'GET') {
        return await handleSessionStatus(url, stripe, env, cors)
      }
      return json({ error: 'Not found' }, 404, cors)
    } catch (error) {
      console.error('Unhandled worker error:', error)
      return json({ error: 'Internal error' }, 500, cors)
    }
  },
}

async function handleCheckout(request: Request, stripe: Stripe, cors: HeadersInit, siteOrigin: string): Promise<Response> {
  try {
    const { items } = await request.json() as CheckoutRequest

    if (!items || items.length === 0) {
      return json({ error: 'No items in cart' }, 400, cors)
    }

    // Reject anything we don't sell, then price and name it from the
    // server-side catalog. The request body only chooses *what* and *how
    // many* — never what it costs. Trusting item.price would let anyone
    // buy a 99 kr package for 1 kr by editing the request.
    const unknown = items.filter(i => !isKnownProduct(i.productId))
    if (unknown.length) {
      return json({ error: 'Unknown product' }, 400, cors)
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'sek',
        product_data: { name: getProductName(item.productId) },
        unit_amount: Math.round(getProductPrice(item.productId) * 100), // öre
      },
      quantity: Math.max(1, Math.min(20, Math.floor(item.quantity) || 1)),
    }))

    // Carry productId + quantity through to the webhook/thank-you page as
    // metadata — never trust product names from the request body for the
    // actual fulfillment (download links, email), only the id.
    const itemsMeta = JSON.stringify(items.map(i => ({ id: i.productId, q: i.quantity })))

    const session = await stripe.checkout.sessions.create({
      // No payment_method_types: Stripe then offers whatever is activated in
      // the Dashboard for this account/mode. Hardcoding them breaks checkout
      // outright if one isn't enabled (live mode had no PayPal), and would
      // need a redeploy to add e.g. Swish later.
      line_items: lineItems,
      mode: 'payment',
      success_url: `${siteOrigin}/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteOrigin}/varukorg`,
      locale: 'sv',
      billing_address_collection: 'auto',
      metadata: { items: itemsMeta },
    })

    if (!session.url) {
      throw new Error('No checkout URL returned from Stripe')
    }

    // `url` is read by ProductBuySection/MiniCart, `checkoutUrl` by /varukorg —
    // return both so every call site works regardless of which key it expects.
    return json({ url: session.url, checkoutUrl: session.url }, 200, cors)
  } catch (error) {
    console.error('Checkout error:', error)
    return json({ error: 'Failed to create checkout session' }, 500, cors)
  }
}

async function handleWebhook(request: Request, stripe: Stripe, env: Env, cors: HeadersInit): Promise<Response> {
  const signature = request.headers.get('stripe-signature')
  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    if (!signature) throw new Error('Missing stripe-signature header')
    // Async variant uses Web Crypto (SubtleCrypto) — required in the Workers runtime.
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return json({ error: 'Invalid signature' }, 400, cors)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await fulfillOrder(session, env.WORKER_BASE_URL)
  }

  return json({ received: true }, 200, cors)
}

async function fulfillOrder(session: Stripe.Checkout.Session, workerBaseUrl: string) {
  const email = session.customer_details?.email
  if (!email) {
    console.error('Stripe webhook: no customer email on session', session.id)
    return
  }

  let cartItems: CartMetaItem[] = []
  try {
    cartItems = JSON.parse(session.metadata?.items ?? '[]')
  } catch (err) {
    console.error('Stripe webhook: failed to parse items metadata for session', session.id, err)
    return
  }

  if (cartItems.length === 0) {
    console.error('Stripe webhook: no items in metadata for session', session.id)
    return
  }

  const emailItems: OrderEmailItem[] = cartItems.map(({ id }) => {
    const token = signDownloadToken(id)
    return {
      productId: id,
      name: getProductName(id),
      downloadUrl: buildDownloadUrl(workerBaseUrl, id, token),
    }
  })

  try {
    await sendOrderConfirmationEmail(email, emailItems)
  } catch (err) {
    console.error('Stripe webhook: failed to send confirmation email for session', session.id, err)
  }
}

async function handleDownload(url: URL, env: Env, cors: HeadersInit): Promise<Response> {
  const productId = url.searchParams.get('productId')
  const token = url.searchParams.get('token')

  if (!productId || !token) {
    return json({ error: 'Missing parameters' }, 400, cors)
  }

  if (!verifyDownloadToken(productId, token)) {
    return json({ error: 'Invalid or expired link' }, 403, cors)
  }

  const filename = getZipFilename(productId)
  if (!filename) {
    return json({ error: 'Product not found' }, 404, cors)
  }

  // The file is streamed from the private R2 bucket, so it never has a public address. The customer gets it
  // named after the party pack. If the object is missing, fall back to the old host rather than failing.
  const obj = env.ZIPS ? await env.ZIPS.get(filename) : null
  if (obj) {
    const name = `${getProductName(productId) || 'Kalaseriet'}.zip`
    const ascii = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w .&-]/g, '')
    return new Response(obj.body, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Length': String(obj.size),
        'Content-Disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`,
        'Cache-Control': 'private, no-store',
        ETag: obj.httpEtag,
        ...cors,
      },
    })
  }

  console.warn('download: not in R2, falling back to the old host:', filename)
  return Response.redirect(getZipUrl(productId)!, 307)
}

async function handleSessionStatus(url: URL, stripe: Stripe, env: Env, cors: HeadersInit): Promise<Response> {
  const sessionId = url.searchParams.get('session_id')
  if (!sessionId) {
    return json({ items: [] }, 200, cors)
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return json({ items: [] }, 200, cors)
    }

    const cartItems: CartMetaItem[] = JSON.parse(session.metadata?.items ?? '[]')
    const items = cartItems.map(({ id, q }) => ({
      productId: id,
      name: getProductName(id),
      price: getProductPrice(id),
      quantity: q,
      downloadUrl: buildDownloadUrl(env.WORKER_BASE_URL, id, signDownloadToken(id)),
    }))
    // orderId + the amount Stripe actually charged (amount_total is in ore)
    // feed the GA4 and Meta purchase events on /tack, so ad platforms
    // optimise against real revenue rather than a hardcoded guess.
    return json({
      items,
      orderId: session.id,
      value: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? 'sek').toUpperCase(),
    }, 200, cors)
  } catch (err) {
    console.error('Failed to retrieve checkout session for /session-status:', err)
    return json({ items: [] }, 200, cors)
  }
}

function buildDownloadUrl(workerBaseUrl: string, productId: string, token: string): string {
  return `${workerBaseUrl}/download?productId=${encodeURIComponent(productId)}&token=${encodeURIComponent(token)}`
}
