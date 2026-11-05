import type { MetadataRoute } from 'next'
import { fallbackProducts } from './page'
import { blogPosts, isoDate } from '../lib/data/blog-posts'
import { categories } from '../lib/data/categories'
import { themePages } from '../lib/data/themes'
import { BASE_URL } from '../lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {

  // Only indexable pages belong here. /varukorg and /tack are excluded on
  // purpose — they're noindex + robots-disallowed (transient, no search value).
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                  changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/kalas`,             changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/populara-kalas`,    changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/kalasbloggen`,      changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/sa-funkar-det`,     changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq`,               changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/om-kalaseriet`,     changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE_URL}/kontakt`,           changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE_URL}/feedback`,          changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/villkor`,           changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE_URL}/integritetspolicy`, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE_URL}/cookiepolicy`,      changeFrequency: 'yearly',  priority: 0.2 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${BASE_URL}/kalas/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const themeRoutes: MetadataRoute.Sitemap = themePages.map(t => ({
    url: `${BASE_URL}/kalas/tema/${t.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = fallbackProducts.map(p => ({
    url: `${BASE_URL}/kalas/${p.slug.current}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Only blog posts have a date we know; a lastModified of "build time" on every page
  // tells search engines everything changed on each deploy, so the rest go without.
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(b => ({
    url: `${BASE_URL}/kalasbloggen/${b.slug}`,
    ...(isoDate(b.date) ? { lastModified: isoDate(b.date) } : {}),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...themeRoutes, ...productRoutes, ...blogRoutes]
}
