import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FAQ from '../../components/FAQ'
import { blogPosts } from '../../../lib/data/blog-posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  return {
    title: `${post?.title || 'Blog'} – Kalaseriet`,
    description: post?.summary || 'Läs tipsen och inspirationen på Kalasbloggen',
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2)

  return (
    <>
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
            color: '#7c7c7c',
            flexWrap: 'wrap',
          }}>
            <a href="/" style={{ color: '#7c7c7c', textDecoration: 'none' }}>Hem</a>
            <span>/</span>
            <a href="/kalasbloggen" style={{ color: '#7c7c7c', textDecoration: 'none' }}>Kalasbloggen</a>
            <span>/</span>
            <span style={{ color: '#272729', fontWeight: 700 }}>{post.title}</span>
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
              <span style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1rem', color: '#7c7c7c' }}>
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
              color: '#4e4e4e',
              lineHeight: '140%',
            }}>{post.summary}</p>
          </div>

          {/* Hero image */}
          <div style={{ borderRadius: '2.5rem', overflow: 'hidden', marginBottom: '3rem', aspectRatio: '16 / 9' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Body (HTML from CMS) */}
          <div
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
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
              color: '#4e4e4e',
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
                  <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#272729',
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
                    }}>Läs mer →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <FAQ heading="Vanliga frågor" />
      </main>
      <Footer />

      <style>{`
        .blog-body {
          font-family: 'caraque-melted', sans-serif;
          font-size: 1.2rem;
          color: #272729;
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
          color: #272729;
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
