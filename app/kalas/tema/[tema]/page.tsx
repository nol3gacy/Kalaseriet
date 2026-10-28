import { notFound } from 'next/navigation'
import { fallbackProducts } from '../../../page'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProductGrid from '../../../components/ProductGrid'
import DiscountMarquee from '../../../components/DiscountMarquee'
import SeoText from '../../../components/SeoText'
import AgeCTAs from '../../../components/AgeCTAs'
import { themePages } from '../../../../lib/data/themes'
import { breadcrumbSchema, canonical, itemListSchema, jsonLd, ORG_ID, OG_IMAGE } from '../../../../lib/seo'

const AGE_ORDER = ['4', '5', '6', '7-8']

function load(slug: string) {
  const page = themePages.find(t => t.slug === slug)
  if (!page) return null
  const products = fallbackProducts
    .filter(p => page.themes.includes(p.theme))
    .sort((a, b) => AGE_ORDER.indexOf(a.ageGroup) - AGE_ORDER.indexOf(b.ageGroup))
  return { page, products, path: `/kalas/tema/${slug}` }
}

export function generateStaticParams() {
  return themePages.map(t => ({ tema: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }) {
  const data = load((await params).tema)
  if (!data) return {}
  const { page, products, path } = data
  const title = `${page.heading} – ${products.length} kalaspaket med lekar & recept`
  return {
    title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: page.description,
      type: 'website' as const,
      locale: 'sv_SE',
      url: canonical(path),
      siteName: 'Kalaseriet',
      images: [products[0]?.externalImageUrl ?? OG_IMAGE],
    },
  }
}

export default async function ThemePage({ params }: { params: Promise<{ tema: string }> }) {
  const data = load((await params).tema)
  if (!data) notFound()
  const { page, products, path } = data

  const schema = jsonLd(
    {
      '@type': 'CollectionPage',
      '@id': `${canonical(path)}#collection`,
      url: canonical(path),
      name: page.heading,
      description: page.description,
      inLanguage: 'sv-SE',
      isPartOf: { '@id': `${canonical('/')}#website` },
      publisher: { '@id': ORG_ID },
    },
    breadcrumbSchema([
      { name: 'Hem', path: '/' },
      { name: 'Alla kalas', path: '/kalas' },
      { name: page.heading, path },
    ]),
    itemListSchema(
      page.heading,
      products.map(p => ({ name: p.name, path: `/kalas/${p.slug.current}` })),
    ),
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <Navbar />
      <main>
        <ProductGrid products={products} heading={page.heading} showFilter={false} />
        <DiscountMarquee />
        <SeoText heading={page.seoHeading} paragraphs={page.paragraphs} />
        <AgeCTAs />
      </main>
      <Footer />
    </>
  )
}
