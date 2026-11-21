// The buy path in a real browser, one screenshot per step: home -> /kalas -> product -> Köp nu -> checkout,
// then /varukorg -> Gå till betalning -> checkout, and a failing checkout shows the Swedish error.
// The Worker /checkout call is intercepted: no Stripe session is created and nothing is paid.
// Build first (npm run build), then: node scripts/buy-flow.test.mjs [outdir]   (exit 1 if a step stops or a page throws)
import puppeteer from 'puppeteer-core'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { mkdirSync } from 'node:fs'
import { join, extname } from 'node:path'
import { tmpdir } from 'node:os'

const OUT = new URL('../out/', import.meta.url).pathname
const shots = process.argv[2] || join(tmpdir(), 'kalaseriet-buy-flow')
mkdirSync(shots, { recursive: true })
const STRIPE = 'https://checkout.stripe.com/c/pay/flowtest'
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.txt': 'text/plain' }

// Static export server: /kalas -> out/kalas.html, like Vercel serves it.
const isFile = async p => (await stat(p).catch(() => null))?.isFile()
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  for (const f of [join(OUT, path), join(OUT, path + '.html'), join(OUT, path, 'index.html')]) {
    if (await isFile(f)) { res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' }); return res.end(await readFile(f)) }
  }
  res.writeHead(404, { 'content-type': 'text/html' }); res.end(await readFile(join(OUT, '404.html')))
})
await new Promise(r => server.listen(0, '127.0.0.1', r))
const BASE = `http://127.0.0.1:${server.address().port}`

const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const p = await (await b.createBrowserContext()).newPage()
await p.setViewport({ width: 390, height: 844, isMobile: true })
const errs = [], checkouts = []
let checkoutFails = false
p.on('pageerror', e => errs.push(p.url().replace(BASE, '') + ' ' + e.message))
await p.setRequestInterception(true)
p.on('request', r => {
  const url = r.url()
  if (r.method() === 'POST' && url.endsWith('/checkout')) {
    checkouts.push(JSON.parse(r.postData() || '{}'))
    return checkoutFails
      ? r.respond({ status: 500, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{"error":"flowtest"}' })
      : r.respond({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ url: STRIPE }) })
  }
  if (r.method() === 'OPTIONS' && url.endsWith('/checkout')) return r.respond({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'POST' } })
  if (url.startsWith(STRIPE)) return r.respond({ status: 200, contentType: 'text/html', body: '<h1>Stripe (flowtest)</h1>' })
  if (url.startsWith(BASE) || url.startsWith('data:') || url.startsWith('blob:')) return r.continue()
  return r.abort() // analytics, fonts and anything else outside: keep the test offline
})

const wait = ms => new Promise(r => setTimeout(r, ms))
let n = 0, stopped = false
const shot = async name => { await wait(600); await p.screenshot({ path: `${shots}/${String(++n).padStart(2, '0')}-${name}.png` }); console.log(n, name, p.url().replace(BASE, '')) }
const must = (ok, msg) => { if (!ok) throw new Error(msg) }
// Click by text in page context: the cookie banner or sticky bar can sit over the button.
const clickText = (sel, text) => p.evaluate((sel, text) => {
  const el = [...document.querySelectorAll(sel)].find(e => e.textContent.includes(text) && e.offsetParent !== null)
  if (!el) return false; el.click(); return true
}, sel, text)
const onStripe = () => p.waitForFunction(s => location.href.startsWith(s), { timeout: 8000 }, STRIPE)

try {
  await p.goto(BASE + '/', { waitUntil: 'networkidle2' }); await shot('home')
  await p.goto(BASE + '/kalas', { waitUntil: 'networkidle2' }); await shot('kalas')
  const href = await p.$eval('a[href^="/kalas/"][href*="-for-"]', a => a.getAttribute('href'))
  await p.goto(BASE + href, { waitUntil: 'networkidle2' }); await shot('product')
  const id = href.split('/').pop()

  must(await clickText('button', 'Köp nu'), 'no Köp nu button on ' + href)
  await onStripe(); await shot('checkout-from-product')
  const first = checkouts.at(-1)?.items?.[0]
  must(first && first.quantity === 1 && first.price === 129 && first.productId && first.productName, 'checkout body wrong: ' + JSON.stringify(checkouts.at(-1)))
  console.log('   checkout item:', first.productName, first.price, 'kr')

  await p.goto(BASE + '/varukorg', { waitUntil: 'networkidle2' }); await shot('cart')
  must(await p.evaluate(() => document.body.innerText.includes('129 kr')), 'cart does not show 129 kr')
  must(await clickText('button', 'Gå till betalning'), 'no Gå till betalning button')
  await onStripe(); await shot('checkout-from-cart')
  must(checkouts.length === 2 && checkouts[1].items.length === 1, 'cart checkout body wrong: ' + JSON.stringify(checkouts[1]))

  checkoutFails = true
  await p.goto(BASE + '/kalas/' + id, { waitUntil: 'networkidle2' })
  must(await clickText('button', 'Köp nu'), 'no Köp nu button (error step)')
  await p.waitForSelector('[role=alert]', { timeout: 8000 })
  const alert = await p.$eval('[role=alert]', e => e.innerText)
  must(alert.includes('Det gick inte att öppna kassan'), 'unexpected error text: ' + alert)
  await shot('checkout-error')
  // Köp nu three times on the same package now: still one copy (a download), still 129 kr.
  const cart = await p.evaluate(() => JSON.parse(localStorage.getItem('cart') || '[]'))
  must(cart.length === 1 && cart[0].quantity === 1, 'same package added twice: ' + JSON.stringify(cart.map(i => [i.product._id, i.quantity])))
} catch (e) { console.log('STOPPED:', e.message); stopped = true; await shot('stopped').catch(() => {}) }

console.log(errs.length ? 'PAGE ERRORS: ' + errs.join(' | ') : 'no page errors')
console.log('screenshots in', shots)
await b.close(); server.close()
if (stopped || errs.length) process.exit(1)
console.log('buy flow ok')
