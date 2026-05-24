'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const POSTS = [
  {
    slug: 'diy-kalaspase',
    title: 'DIY-kalaspåse: Billiga och roliga gåvor barnen kommer älska',
    excerpt: 'En bra kalaspåse behöver inte kosta skjortan. Här är våra bästa tips för kreativa kalaspåsar som barnen älskar – utan att tömma plånboken.',
    category: 'Tips',
    date: 'November 2024',
    imageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/673a13b4f0694f8a0b8fc662_photo-1586738730873-bdd59a596a2d.avif',
  },
  {
    slug: 'checklista-barnkalas',
    title: 'Checklista: Allt du behöver för ett lyckat barnkalas',
    excerpt: 'En komplett checklista för barnkalaset – från inbjudningar och mat till lekar och kalaspåsar. Missa ingenting.',
    category: 'Tips',
    date: 'November 2024',
    imageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/673a1343d2d3bd0a468873c1_photo-1509163245925-f4255dea7727.avif',
  },
  {
    slug: 'skattjakt-tips',
    title: 'Så skapar du en magisk skattjakt till barnkalaset',
    excerpt: 'En skattjakt är alltid en hit på barnkalaset! Vi guidar dig steg för steg genom hur du skapar en spännande skattjakt hemma.',
    category: 'Tips',
    date: 'November 2024',
    imageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/673a12849b5a83352927779d_photo-1469406396016-013bfae5d83e.avif',
  },
  {
    slug: 'populara-lekar',
    title: 'Enkla och roliga lekar för kalaset – inomhus och utomhus',
    excerpt: 'Vilka lekar funkar bäst på barnkalas? Vi har listat de populäraste lekarna som passar alla åldrar.',
    category: 'Tips',
    date: 'November 2024',
    imageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/673a121220d7a9f8ed03e1dd_photo-1627764940620-90393d0e8c34.avif',
  },
  {
    slug: '10-tips-barnkalas',
    title: '10 tips för att planera ett barnkalas som alla kommer minnas',
    excerpt: 'Vad skiljer ett bra kalas från ett minnesvärt kalas? Våra 10 bästa tips som gör kalaset oförglömligt för barnen.',
    category: 'Tips',
    date: 'November 2024',
    imageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/673105975ce61d45f994aec1_10%20tips%20fo%CC%88r%20att%20planera%20ett%20barnkalas%20som%20alla%20kommer%20minnas.avif',
  },
]

export default function KalasbloggenPage() {
  const [featured, ...rest] = POSTS

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
              color: '#272729',
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

        {/* Posts grid */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
        }}>

          {/* Featured post — large */}
          <a
            href={`/kalasbloggen/${featured.slug}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0',
              backgroundColor: '#faf1ef',
              borderRadius: '3rem',
              overflow: 'hidden',
              textDecoration: 'none',
              marginBottom: '2rem',
              minHeight: '420px',
            }}
          >
            <img
              src={featured.imageUrl}
              alt={featured.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  backgroundColor: '#6e42ff',
                  color: '#faf1ef',
                  fontFamily: 'caraque-melted, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.9rem',
                  borderRadius: '500px',
                }}>{featured.category}</span>
                <span style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1rem', color: '#7c7c7c' }}>
                  {featured.date}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 800,
                color: '#272729',
                lineHeight: '95%',
                margin: 0,
              }}>
                {featured.title}
              </h2>
              <p style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.2rem',
                color: '#5910b6',
                lineHeight: '140%',
              }}>
                {featured.excerpt}
              </p>
              <span style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#5910b6',
                marginTop: '0.5rem',
              }}>
                Läs mer ›
              </span>
            </div>
          </a>

          {/* Rest of posts — 2-column grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {rest.map(post => (
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
                  src={post.imageUrl}
                  alt={post.title}
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
                    color: '#272729',
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
        </div>

        <style>{`
          @media (max-width: 640px) {
            a[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  )
}
