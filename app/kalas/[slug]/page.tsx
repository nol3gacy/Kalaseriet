import { client } from '../../../sanity/lib/client'
import { fallbackProducts, type Product } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BentoBox from '../../components/BentoBox'
import DiscountMarquee from '../../components/DiscountMarquee'
import ProductBuySection from '../../components/ProductBuySection'
import WfSlider from '../../components/wf/WfSlider'
import Accordion from '../../components/wf/Accordion'
import { getProductExtra } from '../../../lib/data/products-extra'
import { includedItems } from '../../../lib/data/included-items'
import { randomTestimonials } from '../../../lib/data/testimonials'
import { faqs } from '../../../lib/data/faq'
import { notFound } from 'next/navigation'

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
  return { title: `${product.name} – Kalaseriet`, description: product.description }
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

  const BASE_URL = 'https://kalaseriet.vercel.app'
  const productJsonLd = {
    '@context': 'https://schema.org', '@type': 'Product', name: product.name, description, image: images, sku: slug,
    brand: { '@type': 'Brand', name: 'Kalaseriet' },
    offers: { '@type': 'Offer', url: `${BASE_URL}/kalas/${slug}`, priceCurrency: 'SEK', price: String(product.price), availability: 'https://schema.org/InStock', priceValidUntil: `${new Date().getFullYear() + 1}-12-31` },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '12' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
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
        <h1 className="heading is--xl">Vanliga frågor om kalasen</h1>
        <Accordion items={faqs.map(f => ({ q: f.question, a: f.answer }))} />
      </section>

      <DiscountMarquee />
      <BentoBox />
      <Footer />
    </>
  )
}
