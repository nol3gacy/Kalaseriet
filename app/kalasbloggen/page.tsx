'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogPosts } from '../../lib/data/blog-posts'
import { coverSrcSet, toWebp } from '../../lib/cover'

const POSTS = blogPosts.map(p => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.summary,
  category: p.category,
  date: p.date,
  imageUrl: p.imageUrl,
}))

export default function KalasbloggenPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>

        {/* Header */}
        <div style={{
          backgroundColor: '#faf1ef',
          padding: '5rem 1.5rem 4rem',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#5910b6',
              marginBottom: '1rem',
            }}>Kalasbloggen</p>
            <h1 style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 800,
              color: '#4e4e4e',
              lineHeight: '90%',
              marginBottom: '1.5rem',
            }}>
              Tips & inspiration
            </h1>
            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.5rem',
              color: '#5910b6',
              lineHeight: '130%',
            }}>
              Bli inspirerad av andras kalas, mega-smarriga muffins &amp; massa tips :-)
            </p>
          </div>
        </div>

        {/* Posts grid — same card style for every post, including the first */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {POSTS.map((post, i) => (
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
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(89,16,182,0.15)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <img
                src={toWebp(post.imageUrl)}
                srcSet={coverSrcSet(post.imageUrl)}
                sizes="(max-width: 767px) 90vw, 350px"
                alt={post.title}
                loading={i < 3 ? 'eager' : 'lazy'}
                style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                flex: 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    backgroundColor: '#6e42ff',
                    color: '#faf1ef',
                    fontFamily: 'caraque-melted, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.75rem',
                    borderRadius: '500px',
                  }}>{post.category}</span>
                  <span style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '0.95rem', color: '#7c7c7c' }}>
                    {post.date}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: 'caraque-melted, sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#5910b6',
                  lineHeight: '95%',
                  margin: 0,
                }}>
                  {post.title}
                </h2>
                <p style={{
                  fontFamily: 'caraque-melted, sans-serif',
                  fontSize: '1.1rem',
                  color: '#5910b6',
                  lineHeight: '140%',
                  flex: 1,
                }}>
                  {post.excerpt}
                </p>
                <span style={{
                  fontFamily: 'caraque-melted, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#5910b6',
                }}>
                  Läs mer ›
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
