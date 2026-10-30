import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FAQ from '../../components/FAQ'
import AgeCTAs from '../../components/AgeCTAs'
import { blogPosts, isoDate, offerForPost } from '../../../lib/data/blog-posts'
import { coverSrcSet, toWebp } from '../../../lib/cover'
import { notFound } from 'next/navigation'
import { absoluteUrl, breadcrumbSchema, canonical, jsonLd, LOGO_URL, ORG_ID } from '../../../lib/seo'

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return {}

  const path = `/kalasbloggen/${slug}`
  const published = isoDate(post.date)

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article' as const,
      locale: 'sv_SE',
      url: canonical(path),
      siteName: 'Kalaseriet',
      publishedTime: published || undefined,
      images: [{ url: absoluteUrl(post.imageUrl), alt: post.title }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.summary, images: [absoluteUrl(post.imageUrl)] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const offer = offerForPost(slug)
  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2)

  // Dates are derived from the post's own visible date so the markup can't
  // drift from what the reader sees.
  const path = `/kalasbloggen/${slug}`
  const published = isoDate(post.date)

  const schema = jsonLd(
    {
      '@type': 'BlogPosting',
      '@id': `${canonical(path)}#article`,
      headline: post.title,
      description: post.summary,
      image: [absoluteUrl(post.imageUrl)],
      inLanguage: 'sv-SE',
      ...(published ? { datePublished: published, dateModified: published } : {}),
      author: { '@id': ORG_ID },
      publisher: {
        '@id': ORG_ID,
        '@type': 'Organization',
        name: 'Kalaseriet',
        logo: { '@type': 'ImageObject', url: LOGO_URL },
      },
      isPartOf: { '@id': `${canonical('/')}#website` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical(path) },
    },
    breadcrumbSchema([
      { name: 'Hem', path: '/' },
      { name: 'Kalasbloggen', path: '/kalasbloggen' },
      { name: post.title, path },
    ]),
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>

        {/* Breadcrumbs */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem 1.5rem 0' }}>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: '1.2rem',
            color: '#4e4e4e',
            flexWrap: 'wrap',
          }}>
            <a href="/" style={{ color: '#4e4e4e', textDecoration: 'none' }}>Hem</a>
            <span>/</span>
            <a href="/kalasbloggen" style={{ color: '#4e4e4e', textDecoration: 'none' }}>Kalasbloggen</a>
            <span>/</span>
            <span style={{ color: '#4e4e4e', fontWeight: 700 }}>{post.title}</span>
          </nav>
        </div>

        {/* Header */}
        <article style={{ maxWidth: '780px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{
                backgroundColor: '#6e42ff',
                color: '#faf1ef',
                padding: '0.3rem 0.9rem',
                borderRadius: '500px',
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>{post.category}</span>
              <span style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1rem', color: '#4e4e4e' }}>
                {post.date}
              </span>
            </div>
            <h1 style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#5910b6',
              lineHeight: '92%',
              marginBottom: '1.5rem',
            }}>{post.title}</h1>
            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 500,
              color: '#5910b6',
              lineHeight: '140%',
            }}>{post.summary}</p>
          </div>

          {/* Hero image */}
          <div style={{ borderRadius: '2.5rem', overflow: 'hidden', marginBottom: '3rem', aspectRatio: '16 / 9' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={toWebp(post.imageUrl)} srcSet={coverSrcSet(post.imageUrl)} sizes="(max-width: 767px) 90vw, 740px" alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Body (HTML from CMS) */}
          <div
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <aside style={{
            margin: '2.5rem 0 0',
            padding: '1.5rem 1.75rem',
            backgroundColor: '#faf1ef',
            borderRadius: '2rem',
            fontFamily: 'caraque-melted, sans-serif',
            color: '#5910b6',
          }}>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem', lineHeight: '110%' }}>
              Vill du slippa planera allt själv?
            </p>
            <p style={{ fontSize: '1.15rem', margin: '0 0 1rem' }}>
              Våra kalaspaket har 20 lekar, 20 recept, inbjudan och körschema, färdiga att ladda ner.
            </p>
            <a href={offer.href} className="btn-primary">{offer.label} ›</a>
          </aside>
        </article>

        {/* CTA */}
        <section style={{ padding: '4rem 1.5rem' }}>
          <div style={{
            maxWidth: '780px',
            margin: '0 auto',
            backgroundColor: '#faf1ef',
            borderRadius: '3rem',
            padding: '3rem 2rem',
            textAlign: 'center',
          }}>
            <h3 style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#5910b6',
              lineHeight: '95%',
              marginBottom: '0.75rem',
            }}>Redo för ett oförglömligt kalas?</h3>
            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.3rem',
              color: '#5910b6',
              marginBottom: '2rem',
            }}>Hitta ditt perfekta kalaspaket och börja planera idag.</p>
            <a href="/kalas" style={{
              display: 'inline-block',
              padding: '1.2rem 2.5rem',
              backgroundColor: '#5910b6',
              color: '#faf1ef',
              borderRadius: '500px',
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}>Se alla kalaspaket ›</a>
          </div>
        </section>

        {/* More posts */}
        <section style={{ padding: '4rem 1.5rem', backgroundColor: '#faf1ef' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#5910b6',
              textAlign: 'center',
              marginBottom: '2.5rem',
              lineHeight: '95%',
            }}>Fler tips från bloggen</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}>
              {otherPosts.map(p => (
                <a
                  key={p.slug}
                  href={`/kalasbloggen/${p.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: '2.5rem',
                    overflow: 'hidden',
                    textDecoration: 'none',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={toWebp(p.imageUrl)} srcSet={coverSrcSet(p.imageUrl)} sizes="(max-width: 767px) 90vw, 350px" alt={p.title} loading="lazy" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#4e4e4e',
                      lineHeight: '95%',
                      margin: 0,
                    }}>{p.title}</h3>
                    <span style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#5910b6',
                      display: 'inline-block',
                      marginTop: '0.75rem',
                    }}>Läs mer ›</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <FAQ heading="Vanliga frågor" />
        <AgeCTAs />
      </main>
      <Footer />

      <style>{`
        .blog-body {
          font-family: 'caraque-melted', sans-serif;
          font-size: 1.2rem;
          color: #4e4e4e;
          line-height: 160%;
        }
        .blog-body h2 {
          font-family: 'caraque-melted', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #5910b6;
          line-height: 100%;
          margin: 2.5rem 0 1rem;
        }
        .blog-body h3 {
          font-family: 'caraque-melted', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #4e4e4e;
          line-height: 105%;
          margin: 2rem 0 0.75rem;
        }
        .blog-body p {
          margin: 0 0 1.25rem;
        }
        .blog-body a {
          color: #5910b6;
          text-decoration: underline;
        }
        .blog-body ul {
          padding-left: 1.5rem;
          margin: 0 0 1.25rem;
        }
        .blog-body li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  )
}
