// Central SEO constants + JSON-LD builders.
// Everything that emits structured data should come through here so the
// organisation identity, URLs and @id references stay consistent sitewide
// (Google merges entities by @id — inconsistent ids fragment the graph).

export const BASE_URL = 'https://kalaseriet.se'
export const SITE_NAME = 'Kalaseriet'

export const ORG_ID = `${BASE_URL}/#organization`
export const SITE_ID = `${BASE_URL}/#website`

export const LOGO_URL = 'https://cdn.prod.website-files.com/656cc3301afe859e486de65d/65da1a384ef1f371942f39e0_webclip.png'

export const SOCIAL_PROFILES = [
  'https://www.instagram.com/kalaseriet',
  'https://www.facebook.com/kalaseriet',
  'https://www.tiktok.com/@kalaseriet',
]

export function canonical(path = '/') {
  return path === '/' ? BASE_URL : `${BASE_URL}${path}`
}

/** Absolute URL for any image path (relative paths become absolute). */
export function absoluteUrl(src: string) {
  if (!src) return LOGO_URL
  return src.startsWith('http') ? src : `${BASE_URL}${src}`
}

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: BASE_URL,
  logo: { '@type': 'ImageObject', url: LOGO_URL },
  image: LOGO_URL,
  description:
    'Kalaseriet säljer kompletta digitala kalaspaket för barnkalas — 20 kalaslekar, recept, inbjudan, checklista och körschema för barn 4–8 år.',
  email: 'hej@kalaseriet.se',
  areaServed: { '@type': 'Country', name: 'Sverige' },
  sameAs: SOCIAL_PROFILES,
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: BASE_URL,
  name: SITE_NAME,
  inLanguage: 'sv-SE',
  publisher: { '@id': ORG_ID },
}

/** BreadcrumbList from [{name, path}] — path relative, e.g. '/kalas'. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonical(c.path),
    })),
  }
}

/** FAQPage from [{question, answer}] — answers may contain plain text only. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/** ItemList for collection/listing pages — helps Google understand the set. */
export function itemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: canonical(it.path),
    })),
  }
}

/** Wraps one or more schema nodes into a single @graph document. */
export function jsonLd(...nodes: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })
}
