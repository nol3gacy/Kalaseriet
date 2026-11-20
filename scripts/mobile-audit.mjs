// Mobile audit in Safari's engine (Playwright WebKit) at iPhone sizes, plus Chrome for layout-shift sources
// (WebKit has no layout-shift entries). Read-only unless CHECKOUT=1, which clicks through to Stripe's page
// (creates an unpaid Checkout session, pays nothing).
//   node scripts/mobile-audit.mjs [base=https://kalaseriet.se] [outdir]
// Writes screenshots and report.json to outdir; prints one line per finding.
import { webkit, chromium, devices } from 'playwright-core'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const BASE = (process.argv[2] || 'https://kalaseriet.se').replace(/\/$/, '')
const OUT = process.argv[3] || join(tmpdir(), 'kalaseriet-mobile-audit')
mkdirSync(OUT, { recursive: true })
const PAGES = ['/', '/kalas', '/kalas/piratkalaset-for-5-aringar', '/kalas/tema/piratkalas', '/kalas/5-aringar',
  '/kalasbloggen', '/kalasbloggen/barnkalas-mat-recept', '/faq', '/kontakt', '/varukorg', '/tack']
const PHONES = { '390': devices['iPhone 13'], '375': devices['iPhone SE (3rd gen)'], '320': devices['iPhone SE'] }
const findings = []
const report = (phone, page, kind, detail) => { findings.push({ phone, page, kind, detail }); console.log(`${phone} ${page} [${kind}] ${detail}`) }
const slug = p => p === '/' ? 'home' : p.slice(1).replace(/\//g, '_')
const wait = ms => new Promise(r => setTimeout(r, ms))

// Runs in the page: overflow, small tap targets, inputs that make iOS zoom, fonts, fixed bars at the bottom.
const PROBE = () => {
  const W = innerWidth, out = { overflow: [], small: [], zoomInputs: [], fonts: [], fixedBottom: [] }
  const vis = el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity !== 0 }
  const name = el => (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + ' "' + (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30) + '"')
  out.scrollWidth = document.documentElement.scrollWidth
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el)) continue
    const r = el.getBoundingClientRect()
    if (r.right > W + 1 || r.left < -1) {
      // only the outermost overflowing element, and only if no ancestor clips it
      let p = el.parentElement, clipped = false, parentOver = false
      while (p && p !== document.body) {
        const s = getComputedStyle(p), pr = p.getBoundingClientRect()
        if (/(hidden|clip|auto|scroll)/.test(s.overflowX)) { clipped = true; break }
        if (pr.right > W + 1 || pr.left < -1) parentOver = true
        p = p.parentElement
      }
      if (!clipped && !parentOver) out.overflow.push(name(el) + ` [${Math.round(r.left)}..${Math.round(r.right)}]`)
    }
  }
  for (const el of document.querySelectorAll('a[href], button, input, select, textarea, [role=button], summary, label[for]')) {
    if (!vis(el)) continue
    const r = el.getBoundingClientRect()
    const inText = el.tagName === 'A' && /^(P|LI|SPAN|TD)$/.test(el.parentElement?.tagName) && el.parentElement.textContent.trim().length > el.textContent.trim().length + 20
    if (!inText && (r.width < 32 || r.height < 32)) out.small.push(name(el) + ` ${Math.round(r.width)}x${Math.round(r.height)}`)
  }
  for (const el of document.querySelectorAll('input:not([type=checkbox]):not([type=radio]):not([type=hidden]), select, textarea')) {
    const fs = parseFloat(getComputedStyle(el).fontSize)
    if (fs < 16) out.zoomInputs.push(name(el) + ` font ${fs}px`)
  }
  for (const f of document.fonts) out.fonts.push(`${f.family} ${f.weight} ${f.status}`)
  out.h1Font = document.querySelector('h1') ? getComputedStyle(document.querySelector('h1')).fontFamily : null
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el)
    if ((s.position === 'fixed' || s.position === 'sticky') && vis(el)) {
      const r = el.getBoundingClientRect()
      if (r.bottom >= innerHeight - 2 && r.top > innerHeight / 2) out.fixedBottom.push(name(el) + ` h=${Math.round(r.height)}`)
    }
  }
  return out
}

async function webkitPass(phoneKey) {
  const b = await webkit.launch()
  const ctx = await b.newContext({ ...PHONES[phoneKey] })
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', e => errs.push(e.message))
  page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 160)) })
  for (const path of PAGES) {
    errs.length = 0
    const t0 = Date.now()
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 45000 }).catch(e => report(phoneKey, path, 'load', e.message))
    const loadMs = Date.now() - t0
    await page.screenshot({ path: `${OUT}/${phoneKey}-${slug(path)}-0first.png` })
    await wait(2500)
    const r = await page.evaluate(PROBE)
    await page.screenshot({ path: `${OUT}/${phoneKey}-${slug(path)}-1top.png` })
    await page.screenshot({ path: `${OUT}/${phoneKey}-${slug(path)}-2full.png`, fullPage: true })
    if (r.scrollWidth > PHONES[phoneKey].viewport.width) report(phoneKey, path, 'horizontal-scroll', `page is ${r.scrollWidth}px wide`)
    for (const o of r.overflow) report(phoneKey, path, 'off-screen', o)
    if (r.small.length) report(phoneKey, path, 'small-tap', r.small.slice(0, 8).join(' | ') + (r.small.length > 8 ? ` (+${r.small.length - 8})` : ''))
    for (const z of r.zoomInputs) report(phoneKey, path, 'ios-zoom-input', z)
    if (r.fixedBottom.length > 1) report(phoneKey, path, 'stacked-bottom-bars', r.fixedBottom.join(' | '))
    const badFonts = r.fonts.filter(f => !f.endsWith('loaded') && !f.endsWith('unloaded'))
    if (badFonts.length) report(phoneKey, path, 'font', badFonts.join(', '))
    for (const e of errs) report(phoneKey, path, 'js-error', e)
    findings.push({ phone: phoneKey, page: path, kind: 'info', detail: { loadMs, h1Font: r.h1Font, fonts: r.fonts, fixedBottom: r.fixedBottom } })
  }
  await interactions(page, phoneKey)
  await b.close()
}

// Menu, Köp nu, cart page, checkout.
async function interactions(page, phoneKey) {
  const shot = n => page.screenshot({ path: `${OUT}/${phoneKey}-flow-${n}.png` })
  await page.goto(BASE + '/', { waitUntil: 'load' }); await wait(1500)
  const menu = page.locator('button[aria-label*="eny" i], button[aria-label*="menu" i], .w-nav-button, [class*="hamburger" i]').first()
  if (await menu.count()) {
    await menu.tap().catch(e => report(phoneKey, '/', 'menu', 'tap failed: ' + e.message.split('\n')[0]))
    await wait(700); await shot('1-menu-open')
    const r = await page.evaluate(PROBE)
    if (r.scrollWidth > PHONES[phoneKey].viewport.width) report(phoneKey, '/', 'menu', 'open menu makes the page scroll sideways')
  } else report(phoneKey, '/', 'menu', 'no menu button found')
  // Product: "Köp nu" puts the package in the cart and opens Stripe (only followed with CHECKOUT=1).
  await page.goto(BASE + '/kalas/piratkalaset-for-5-aringar', { waitUntil: 'load' }); await wait(1500)
  await shot('2-product')
  const buy = page.getByRole('button', { name: /köp nu/i }).first()
  if (!(await buy.count())) report(phoneKey, 'product', 'buy', 'no "Köp nu" button')
  else if (process.env.CHECKOUT === '1') {
    await buy.tap()
    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 20000 }).catch(() => report(phoneKey, 'product', 'buy', 'Köp nu did not reach Stripe: ' + page.url()))
    await wait(3000); await shot('3-stripe-from-product')
    // Cart page with the package in it, then its own checkout button.
    await page.goto(BASE + '/varukorg', { waitUntil: 'load' }); await wait(1500)
    await shot('4-cart'); await page.screenshot({ path: `${OUT}/${phoneKey}-flow-4-cart-full.png`, fullPage: true })
    const pay = page.getByRole('button', { name: /gå till betalning/i }).first()
    if (await pay.count()) {
      await pay.tap()
      await page.waitForURL(/checkout\.stripe\.com/, { timeout: 20000 }).catch(() => report(phoneKey, 'varukorg', 'checkout', 'did not reach Stripe: ' + page.url()))
      await wait(3000); await shot('5-stripe-from-cart')
    } else report(phoneKey, 'varukorg', 'checkout', 'no "Gå till betalning" button')
  }
}

// Chrome: layout shifts with their source elements, while the page loads and fonts swap.
async function chromePass() {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
  const ctx = await b.newContext({ ...devices['iPhone 13'], defaultBrowserType: undefined })
  const page = await ctx.newPage()
  await page.addInitScript(() => {
    window.__shifts = []
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__shifts.push({ v: e.value, t: Math.round(e.startTime), src: (e.sources || []).map(s => s.node ? (s.node.nodeName + (s.node.className && typeof s.node.className === 'string' ? '.' + s.node.className.split(' ').slice(0, 2).join('.') : '')) : '?').slice(0, 3) }) }).observe({ type: 'layout-shift', buffered: true })
  })
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 45000 }).catch(() => {})
    await wait(3000)
    await page.mouse.wheel(0, 1500); await wait(1500)
    const shifts = await page.evaluate(() => window.__shifts)
    const cls = shifts.reduce((a, s) => a + s.v, 0)
    if (cls > 0.05) report('chrome390', path, 'layout-shift', `CLS ${cls.toFixed(3)}: ` + shifts.filter(s => s.v > 0.005).map(s => `${s.v.toFixed(3)}@${s.t}ms ${s.src.join(',')}`).join(' ; '))
  }
  await b.close()
}

if (process.env.FLOW_ONLY === '1') PAGES.length = 0
await webkitPass('390')
await webkitPass('375')
await webkitPass('320')
if (process.env.FLOW_ONLY !== '1') await chromePass()
writeFileSync(join(OUT, 'report.json'), JSON.stringify(findings, null, 1))
console.log(`\n${findings.filter(f => f.kind !== 'info').length} findings, screenshots in ${OUT}`)
