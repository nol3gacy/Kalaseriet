// Read-only smoke test of the live site, for right after a deploy. GET requests only.
//   node scripts/smoke-live.mjs                      (https://kalaseriet.se)
//   BASE=http://localhost:3000 node scripts/smoke-live.mjs   (a local build; Worker check skipped)
const BASE = process.env.BASE ?? 'https://kalaseriet.se'
const WORKER = process.env.WORKER ?? (BASE.includes('kalaseriet.se') ? 'https://kalaseriet-api.kalaseriet.workers.dev' : '')
const PRICE = process.env.PRICE ?? '129'
const PRODUCT = '/kalas/piratkalaset-for-4-aringar'

const failures = []
const check = (ok, what) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`); if (!ok) failures.push(what) }
// A network error counts as a failed check (status 0), not a crash.
const get = async path => {
  try {
    const res = await fetch(BASE + path, { redirect: 'follow', headers: { 'User-Agent': 'kalaseriet-smoke' } })
    return { status: res.status, headers: res.headers, text: await res.text() }
  } catch (e) {
    return { status: 0, headers: new Headers(), text: '' }
  }
}

for (const path of ['/', '/kalas', '/kalas/4-aringar', '/kalas/tema/piratkalas', PRODUCT, '/kalasbloggen', '/kalasbloggen/tema-piratkalas', '/faq', '/varukorg', '/tack', '/kontakt', '/sitemap.xml', '/robots.txt']) {
  const r = await get(path)
  check(r.status === 200, `${path} answers 200 (got ${r.status})`)
}
check((await get('/finns-inte-smoke-test')).status === 404, 'an unknown page answers 404')

const product = await get(PRODUCT)
// React may put <!-- --> between the number and "kr" in server HTML.
check(new RegExp(`class="price">${PRICE}(<!-- -->)? ?kr`).test(product.text), `product page shows ${PRICE} kr`)
check(!product.text.includes('class="price was'), 'product page has no struck-through price')
check(/"price":"?\d/.test(product.text) && product.text.includes(`"price":"${PRICE}"`), `Product structured data says ${PRICE}`)

const home = await get('/')
check(!/website-files\.com|uploads-ssl\.webflow/.test(home.text), 'home loads nothing from the Webflow CDN')

const sitemap = await get('/sitemap.xml')
check((sitemap.text.match(/<loc>/g) ?? []).length >= 70, `sitemap lists ${(sitemap.text.match(/<loc>/g) ?? []).length} URLs (expect 70+)`)

const cache = (await get('/wf/images/leaf.png')).headers.get('cache-control') ?? ''
check(!BASE.includes('kalaseriet.se') || cache.includes('max-age=604800'), `/wf assets cached a week (cache-control: ${cache || 'none'})`)

if (WORKER) {
  const w = await fetch(WORKER + '/smoke-test-unknown-route').catch(() => ({ status: 0 }))
  check(w.status === 404, `Worker answers (unknown route gives ${w.status}, expect 404)`)
}

console.log(failures.length ? `\n${failures.length} check(s) failed` : '\nAll smoke checks passed')
process.exit(failures.length ? 1 : 0)
