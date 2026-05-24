import { client } from '../../../sanity/lib/client'
import { fallbackProducts, type Product } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductBuySection from '../../components/ProductBuySection'
import ImageCarousel from '../../components/ImageCarousel'
import Testimonials from '../../components/Testimonials'
import FAQ from '../../components/FAQ'
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

async function getRelated(currentId: string, theme: string): Promise<Product[]> {
  return fallbackProducts
    .filter(p => p.theme === theme && p._id !== currentId)
    .slice(0, 3)
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
  const related = await getRelated(product._id, product.theme)
  // Pick 2 random blog posts
  const recentPosts = blogPosts.slice(0, 2)

  return (
    <>
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
              badges={{ popular: product.isPopular, discountPercent: discount }}
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

        {/* Related */}
        {related.length > 0 && (
          <section style={{ padding: '5rem 1.5rem', backgroundColor: '#faf1ef' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#5910b6',
                marginBottom: '2.5rem',
                textAlign: 'center',
                lineHeight: '95%',
              }}>Fler kalas du kan gilla</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}>
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
                          fontSize: '1.8rem',
                          fontWeight: 800,
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
            </div>
          </section>
        )}

      </main>
      <Footer />

      <style>{`
        .product-image-sticky {
          position: sticky;
          top: calc(6rem + 3rem + 1rem);  /* navbar height + margin + a bit */
        }
        @media (max-width: 880px) {
          .product-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .product-image-sticky {
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </>
  )
}
