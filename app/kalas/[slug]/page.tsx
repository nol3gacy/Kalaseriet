import { client } from '../../../sanity/lib/client'
import { fallbackProducts, type Product } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductBuySection from '../../components/ProductBuySection'
import ImageCarousel from '../../components/ImageCarousel'
import Testimonials from '../../components/Testimonials'
import FAQ from '../../components/FAQ'
import DiscountMarquee from '../../components/DiscountMarquee'
import { getProductExtra } from '../../../lib/data/products-extra'
import { includedItems } from '../../../lib/data/included-items'
import { randomTestimonials } from '../../../lib/data/testimonials'
import { blogPosts } from '../../../lib/data/blog-posts'
import { notFound } from 'next/navigation'

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const data = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch {}
  return fallbackProducts.find(p => p.slug.current === slug) ?? null
}

async function getRelated(currentId: string, ageGroup: string): Promise<Product[]> {
  // "Alla kalas för X-åringar" — same age group, exclude current
  return fallbackProducts
    .filter(p => p.ageGroup === ageGroup && p._id !== currentId)
    .slice(0, 4)
}

export async function generateStaticParams() {
  return fallbackProducts.map(p => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  return {
    title: `${product.name} – Kalaseriet`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const extra = getProductExtra(slug)
  const carouselImages = extra?.images ?? (product.externalImageUrl ? [product.externalImageUrl] : [])
  const longDescription = extra?.longDescription ?? product.description

  const ageLabelShort = product.ageGroup === '7-8' ? '7 & 8' : product.ageGroup
  const ageLabel = product.ageGroup === '7-8' ? '7 & 8-åringar' : `${product.ageGroup}-åringar`
  const categorySlug = product.ageGroup === '7-8' ? '7-8-aringar' : `${product.ageGroup}-aringar`
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const tProds = randomTestimonials(slug, 3)
  const related = await getRelated(product._id, product.ageGroup)
  // Pick 2 random blog posts
  const recentPosts = blogPosts.slice(0, 2)

  // ─── SEO: structured data ────────────────────────────────
  const BASE_URL = 'https://kalaseriet.vercel.app'
  const productUrl = `${BASE_URL}/kalas/${slug}`
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: longDescription,
    image: carouselImages,
    sku: slug,
    brand: { '@type': 'Brand', name: 'Kalaseriet' },
    category: `Barnkalas tema för ${ageLabel}`,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'SEK',
      price: String(product.price),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '12',
      bestRating: '5',
      worstRating: '1',
    },
  }
  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem',           item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Kalas',         item: `${BASE_URL}/kalas` },
      { '@type': 'ListItem', position: 3, name: `För ${ageLabel}`, item: `${BASE_URL}/kalas/${categorySlug}` },
      { '@type': 'ListItem', position: 4, name: product.name,    item: productUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>

        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1.5rem 0' }}>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: '1.2rem',
            color: '#7c7c7c',
            flexWrap: 'wrap',
          }}>
            <a href="/" style={{ color: '#7c7c7c', textDecoration: 'none' }}>Hem</a>
            <span>/</span>
            <a href="/kalas" style={{ color: '#7c7c7c', textDecoration: 'none' }}>Kalas</a>
            <span>/</span>
            <a href={`/kalas/${categorySlug}`} style={{ color: '#7c7c7c', textDecoration: 'none' }}>För {ageLabel}</a>
            <span>/</span>
            <span style={{ color: '#272729', fontWeight: 700 }}>{product.name}</span>
          </nav>
        </div>

        {/* Hero — Carousel + Buy panel */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '2rem 1.5rem 4rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'start',
        }} className="product-hero-grid">

          {/* Carousel — sticky on desktop */}
          <div className="product-image-sticky" style={{ alignSelf: 'start' }}>
            <ImageCarousel
              images={carouselImages.length > 0 ? carouselImages : [product.externalImageUrl ?? '']}
              alt={product.name}
              badges={{ popular: product.isPopular, isNew: product.isNew }}
            />
          </div>

          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{
              alignSelf: 'flex-start',
              backgroundColor: 'transparent',
              color: '#272729',
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              padding: '0.4rem 1.1rem',
              borderRadius: '500px',
              border: '1.5px solid rgba(39,39,41,0.18)',
            }}>
              Kalas för {ageLabel}
            </span>

            <h1 style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
              fontWeight: 800,
              color: '#5910b6',
              lineHeight: '88%',
              margin: 0,
              letterSpacing: '-0.005em',
            }}>{product.name}</h1>

            <ProductBuySection product={product} />

            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.2rem',
              fontWeight: 500,
              color: '#272729',
              lineHeight: '155%',
              margin: '1rem 0 0',
            }}>{longDescription}</p>
          </div>
        </div>

        {/* Vad ingår? */}
        <section style={{ backgroundColor: '#faf1ef', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 800,
                color: '#5910b6',
                lineHeight: '95%',
                marginBottom: '0.5rem',
              }}>Vad ingår i kalaset?</h2>
              <p style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.3rem',
                color: '#4e4e4e',
              }}>Allt du behöver för ett perfekt {ageLabelShort}-årskalas — laddas ner direkt</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}>
              {includedItems.map(item => (
                <div key={item.slug} style={{
                  backgroundColor: 'white',
                  borderRadius: '1.5rem',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}>
                  <span style={{ color: '#3e755a', fontSize: '1.3rem', flexShrink: 0, fontWeight: 700 }}>✓</span>
                  <div>
                    <p style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#272729',
                      margin: 0,
                      lineHeight: '120%',
                    }}>{item.name}</p>
                    <p style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1rem',
                      color: '#7c7c7c',
                      margin: '0.25rem 0 0',
                      lineHeight: '130%',
                    }}>{item.tooltip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Randomized testimonials */}
        <Testimonials
          items={tProds}
          heading="Vad andra föräldrar säger"
          subheading="Verkliga omdömen från familjer som använt våra paket."
        />

        {/* Kalasbloggen teasers */}
        <section style={{ padding: '5rem 1.5rem', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 800,
                color: '#5910b6',
                lineHeight: '95%',
                marginBottom: '0.5rem',
              }}>Tips från Kalasbloggen</h2>
              <p style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.3rem',
                color: '#4e4e4e',
              }}>Inspiration för att göra kalaset oförglömligt.</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {recentPosts.map(post => (
                <a
                  key={post.slug}
                  href={`/kalasbloggen/${post.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#faf1ef',
                    borderRadius: '2.5rem',
                    overflow: 'hidden',
                    textDecoration: 'none',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <span style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#6e42ff',
                      color: '#faf1ef',
                      padding: '0.2rem 0.75rem',
                      borderRadius: '500px',
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>{post.category}</span>
                    <h3 style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#272729',
                      lineHeight: '95%',
                      margin: 0,
                    }}>{post.title}</h3>
                    <span style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#5910b6',
                      marginTop: '0.25rem',
                    }}>Läs mer →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ
          heading="Vanliga frågor om kalasen"
          subheading="Är något oklart? Här svarar vi på det vi får frågor om mest."
        />

        {/* Marquee with discount code — same as homepage */}
        <DiscountMarquee />

        {/* Related — "Alla kalas för X-åringar" */}
        {related.length > 0 && (
          <section style={{ padding: '5rem 1.5rem', backgroundColor: '#faf1ef' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'caraque-solid, sans-serif',  // chubby per kalaseriet "Alla kalas för" listing heading
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 800,
                color: '#5910b6',
                marginBottom: '2.5rem',
                textAlign: 'center',
                lineHeight: '92%',
              }}>Alla kalas för {ageLabel}</h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.5rem',
              }} className="related-grid">
                {related.map(p => {
                  const pAge = p.ageGroup === '7-8' ? '7 & 8-åringar' : `${p.ageGroup}-åringar`
                  return (
                    <a
                      key={p._id}
                      href={`/kalas/${p.slug.current}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        textDecoration: 'none',
                      }}
                    >
                      <div style={{ borderRadius: '1.75rem', overflow: 'hidden', aspectRatio: '4 / 3', backgroundColor: 'white' }}>
                        {p.externalImageUrl && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={p.externalImageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{
                          fontFamily: 'caraque-melted, sans-serif',
                          fontSize: '1.6rem',
                          fontWeight: 700,
                          color: '#5910b6',
                          margin: 0,
                          lineHeight: '95%',
                        }}>{p.name}</h3>
                        <p style={{
                          fontFamily: 'caraque-melted, sans-serif',
                          fontSize: '1rem',
                          color: '#7c7c7c',
                          marginTop: '0.25rem',
                        }}>för {pAge}</p>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Big CTA — "Se kalas för alla åldrar >" */}
              <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                <a href="/kalas" className="btn-primary" style={{ fontSize: '1.6rem', padding: '1.4rem 2.8rem' }}>
                  Se kalas för alla åldrar ›
                </a>
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />

      <style>{`
        .product-image-sticky {
          position: sticky;
          top: calc(1.5rem + 56px + 1.5rem + 0.5rem);
        }
        @media (max-width: 1100px) {
          .related-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 880px) {
          .product-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .product-image-sticky {
            position: relative;
            top: 0;
          }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  )
}
