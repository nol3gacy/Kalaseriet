import type { MetadataRoute } from 'next'
import { fallbackProducts } from './page'
import { blogPosts } from '../lib/data/blog-posts'
import { categories } from '../lib/data/categories'

const BASE_URL = 'https://kalaseriet.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/kalas`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/kalasbloggen`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/sa-funkar-det`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/om-kalaseriet`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE_URL}/kontakt`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE_URL}/feedback`,        lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/villkor`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${BASE_URL}/kalas/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const productRoutes: MetadataRoute.Sitemap = fallbackProducts.map(p => ({
    url: `${BASE_URL}/kalas/${p.slug.current}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(b => ({
    url: `${BASE_URL}/kalasbloggen/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes]
}
