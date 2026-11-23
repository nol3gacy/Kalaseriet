// Structured data on every sitemap page of the static build (out/): JSON-LD parses, each page kind has its types,
// FAQ entries are complete and visible on the page (Google ignores FAQ data that is not shown), breadcrumbs are
// numbered with absolute URLs, and products carry an offer whose price is the one shown on the page.
// Adapted from Begraveriet's check-schema.mjs. Build first, then: node scripts/check-schema.mjs [outdir]   (exit 1 on problems)
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const OUT = process.argv[2] || new URL('../out/', import.meta.url).pathname

// Required @types per path; pages not listed only need valid JSON-LD.
const KINDS = [
  [/^\/$/, ['Organization', 'WebSite']],
  [/^\/kalas\/[a-z0-9-]+-for-[0-9-]+-aringar$/, ['Product', 'BreadcrumbList']],
  [/^\/kalasbloggen\/[^/]+$/, ['BlogPosting', 'BreadcrumbList']],
  [/^\/faq$/, ['FAQPage']],
]

const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;| /g, ' ')
const visibleText = html => decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ')
const norm = s => decode(s).replace(/\s+/g, ' ').trim()
const fileFor = p => [join(OUT, p === '/' ? 'index.html' : p + '.html'), join(OUT, p, 'index.html')].find(existsSync)

export function checkPage(path, html) {
  const problems = [], items = []
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1])
      for (const d of Array.isArray(data) ? data : [data]) {
        if (d['@context'] !== 'https://schema.org') problems.push(`${path}: JSON-LD block has @context ${d['@context']}`)
        items.push(...(d['@graph'] ?? [d]))
      }
    } catch (e) { problems.push(`${path}: JSON-LD does not parse (${e.message})`) }
  }
  const types = new Set(items.map(i => i['@type']))
  for (const t of KINDS.find(([re]) => re.test(path))?.[1] ?? []) if (!types.has(t)) problems.push(`${path}: missing ${t}`)
  const text = visibleText(html)
  for (const item of items) {
    if (item['@type'] === 'FAQPage') {
      const qs = item.mainEntity ?? []
      if (!qs.length) problems.push(`${path}: FAQPage without questions`)
      for (const q of qs) {
        if (q['@type'] !== 'Question' || !q.name || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer.text)
          problems.push(`${path}: incomplete FAQ entry ${JSON.stringify(q).slice(0, 80)}`)
        else if (!text.includes(norm(q.name))) problems.push(`${path}: FAQ question not shown on the page: ${q.name}`)
      }
    }
    if (item['@type'] === 'BreadcrumbList') {
      const els = item.itemListElement ?? []
      if (!els.length) problems.push(`${path}: empty breadcrumb`)
      els.forEach((e, i) => {
        if (e.position !== i + 1 || !e.name || (e.item && !/^https:\/\//.test(e.item))) problems.push(`${path}: breadcrumb ${i + 1} is incomplete`)
      })
    }
    if (item['@type'] === 'Product') {
      const offers = [item.offers].flat().filter(Boolean)
      if (!item.name || !item.image) problems.push(`${path}: Product without name or image`)
      if (!offers.length) problems.push(`${path}: Product without an offer`)
      for (const o of offers) {
        if (o.priceCurrency !== 'SEK' || !(Number(o.price) > 0) || !o.availability) problems.push(`${path}: offer incomplete (price ${o.price} ${o.priceCurrency}, availability ${o.availability})`)
        else if (!new RegExp(`\\b${Number(o.price)}\\s?kr`).test(text)) problems.push(`${path}: offer price ${o.price} kr is not shown on the page`)
      }
    }
  }
  return { problems, blocks: items.length }
}

// Self-check: a page with a hidden FAQ question and a wrong price must fail.
{
  const bad = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Dold?","acceptedAnswer":{"@type":"Answer","text":"x"}}]},{"@type":"Product","name":"P","image":"i","offers":{"@type":"Offer","price":"99","priceCurrency":"SEK","availability":"https://schema.org/InStock"}}]}</script><p>129 kr</p>`
  if (checkPage('/x', bad).problems.length !== 2) throw new Error('check-schema self-check failed')
}

const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8')
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname.replace(/\/$/, '') || '/')
const problems = []
let blocks = 0
for (const path of paths) {
  const f = fileFor(path)
  if (!f) { problems.push(`${path}: in the sitemap but not in ${OUT}`); continue }
  const r = checkPage(path, readFileSync(f, 'utf8'))
  problems.push(...r.problems); blocks += r.blocks
}
if (problems.length) {
  console.error(`${problems.length} problems in structured data:\n${problems.slice(0, 40).join('\n')}`)
  process.exit(1)
}
console.log(`OK: ${paths.length} pages, ${blocks} JSON-LD items; types, FAQ entries, breadcrumbs and offers complete.`)
