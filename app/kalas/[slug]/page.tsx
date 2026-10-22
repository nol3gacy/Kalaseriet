import { client } from '../../../sanity/lib/client'
import { fallbackProducts, type Product } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BentoBox from '../../components/BentoBox'
import DiscountMarquee from '../../components/DiscountMarquee'
import ProductBuySection from '../../components/ProductBuySection'
import ProductGrid from '../../components/ProductGrid'
import WfSlider from '../../components/wf/WfSlider'
import Accordion from '../../components/wf/Accordion'
import { getProductExtra } from '../../../lib/data/products-extra'
import { includedItems } from '../../../lib/data/included-items'
import { randomTestimonials } from '../../../lib/data/testimonials'
import { faqs } from '../../../lib/data/faq'
import { notFound } from 'next/navigation'
import { ORG_ID, absoluteUrl, breadcrumbSchema, canonical, faqSchema, jsonLd } from '../../../lib/seo'

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const data = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug }, { next: { revalidate: 60 } })
    if (data) return data
  } catch {}
  return fallbackProducts.find(p => p.slug.current === slug) ?? null
}

export async function generateStaticParams() {
  return fallbackProducts.map(p => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}

  const ageLabel = product.ageGroup === '7-8' ? '7 & 8-åringar' : `${product.ageGroup}-åringar`
  const extra = getProductExtra(slug)
  const image = absoluteUrl(product.externalImageUrl || extra?.images[0] || '')
  const path = `/kalas/${slug}`

  // Keyword-led title: theme + "kalas för X-åringar" is the actual search
  // phrasing, so lead with it rather than the bare brand product name.
  const title = `${product.name} för ${ageLabel} – lekar, recept & inbjudan`
  const description = `${product.description} Kalaspaketet innehåller 20 kalaslekar, 20 recept, inbjudan, diplom, checklista & körschema. Ladda ner direkt för ${product.price} kr.`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'sv_SE',
      url: canonical(path),
      siteName: 'Kalaseriet',
      images: [{ url: image, alt: `${product.name} för ${ageLabel}` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const extra = getProductExtra(slug)
  // Inspiration (kids cover) photo must always be the first slide
  const scraped = extra?.images ?? []
  const cover = product.externalImageUrl || scraped[0] || ''
  const images = [cover, ...scraped.filter(i => i && i !== cover)].filter(Boolean)
  const description = extra?.longDescription ?? product.description
  const ageLabel = product.ageGroup === '7-8' ? '7 & 8-åringar' : `${product.ageGroup}-åringar`
  const tProds = randomTestimonials(slug, 3)
  const sameAgeProducts = fallbackProducts.filter(p => p.ageGroup === product.ageGroup)

  const path = `/kalas/${slug}`
  const categoryPath = `/kalas/${product.ageGroup === '7-8' ? '7-8-aringar' : product.ageGroup + '-aringar'}`

  // No hasMerchantReturnPolicy: /villkor promises a satisfaction guarantee with no fixed window or
  // return-by-mail, so a 30-day mail-return claim here would contradict the terms.
  // No aggregateRating: we have no verified per-product review data, and
  // fabricated review markup is a Google structured-data policy violation.
  const productSchema = {
    '@type': 'Product',
    '@id': `${canonical(path)}#product`,
    name: `${product.name} för ${ageLabel}`,
    description,
    image: images.map(absoluteUrl),
    sku: slug,
    category: `Kalaspaket för ${ageLabel}`,
    audience: { '@type': 'PeopleAudience', suggestedMinAge: Number(product.ageGroup === '7-8' ? 7 : product.ageGroup) },
    brand: { '@type': 'Brand', name: 'Kalaseriet' },
    isDigital: true,
    offers: {
      '@type': 'Offer',
      url: canonical(path),
      priceCurrency: 'SEK',
      price: String(product.price),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      seller: { '@id': ORG_ID },
    },
  }

  const crumbs = breadcrumbSchema([
    { name: 'Hem', path: '/' },
    { name: 'Alla kalas', path: '/kalas' },
    { name: `Kalas för ${ageLabel}`, path: categoryPath },
    { name: product.name, path },
  ])

  const productFaq = faqSchema(faqs.map(f => ({ question: f.question, answer: f.answer })))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(productSchema, crumbs, productFaq) }}
      />
      <Navbar />

      <section className="section">
        <div className="product-left">
          {product.isNew && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src="/wf/images/nyhet.svg" loading="lazy" alt="Nyhet" className="nyhetspuff is--header" />
          )}
          {product.isPopular && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src="/wf/images/poppis.svg" loading="lazy" alt="Populär" className="poppispuff is--header" />
          )}
          <div className="product-image-wrapper">
            <WfSlider images={images} alt={product.name} />
          </div>
        </div>

        <div className="product-info-wrapper">
          <div className="div-block-4">
            <a href={`/kalas/${product.ageGroup === '7-8' ? '7-8-aringar' : product.ageGroup + '-aringar'}`} className="link-block w-inline-block">
              <div className="tag-text">Kalas för {ageLabel}</div>
            </a>
            <h1 className="heading">{product.name}</h1>

            <ProductBuySection product={product} />

            <p className="text is--bold" style={{ margin: '0 0 1rem' }}>
              Digital nedladdning: 20 kalaslekar, 20 recept, inbjudan, diplom, checklista &amp; körschema.
            </p>

            <ol aria-label="Så funkar det" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.25rem', listStyle: 'none', padding: 0, margin: '0 0 1.25rem', fontWeight: 700, color: 'var(--color--indigo)' }}>
              <li>1. Köp</li>
              <li>2. Ladda ner direkt</li>
              <li>3. Skriv ut &amp; fira</li>
            </ol>

            <div className="text">{description}</div>

            <div className="contains-wrapper">
              <h3 className="heading-4">Nedladdningen innehåller:</h3>
              <div className="w-dyn-list">
                <div role="list" className="collection-list-4 w-dyn-items">
                  {includedItems.map(item => (
                    <div role="listitem" className="w-dyn-item" key={item.slug}>
                      <div className="contains-item-wrapper">
                        <div className="icon is--contain-tooltip w-embed" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <div className="contain-text">{item.name}</div>
                      </div>
                      <div className="tooltip">
                        <div className="div-block-14">
                          <div className="tooltip-text">{item.tooltip}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="buy-social-proof-wrapper">
              {tProds.map((t, i) => (
                <div key={i} role="listitem" className="w-dyn-item">
                  <blockquote className="block-quote">{t.quote}</blockquote>
                  <div className="text is--quote-author" style={{ fontWeight: 700, color: 'var(--color--indigo)' }}>— {t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="kalasen">
        <h2 className="heading is--xl">Vanliga frågor om kalasen</h2>
        <Accordion items={faqs.map(f => ({ q: f.question, a: f.answer }))} />
      </section>

      <ProductGrid products={sameAgeProducts} heading={`Fler kalas för ${ageLabel}`} showFilter={false} headingLevel="h2" />
      <div style={{ textAlign: 'center', padding: '0 1.5rem 4rem' }}>
        <a href="/kalas" className="btn-primary">Kalas för alla åldrar</a>
      </div>

      <DiscountMarquee />
      <BentoBox />
      <Footer />
    </>
  )
}
