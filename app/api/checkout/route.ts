import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null as unknown as Stripe

interface CheckoutRequest {
  items: Array<{
    productId: string
    productName: string
    price: number
    quantity: number
  }>
}

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json() as CheckoutRequest

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'sek',
        product_data: {
          name: item.productName,
        },
        unit_amount: Math.round(item.price * 100), // SEK in cents
      },
      quantity: item.quantity,
    }))

    const origin = request.nextUrl.origin

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna', 'paypal'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/varukorg`,
      locale: 'sv',
      billing_address_collection: 'auto',
    })

    if (!session.url) {
      throw new Error('No checkout URL returned from Stripe')
    }

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
