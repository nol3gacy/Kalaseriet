'use client'

import { useEffect, useState } from 'react'

// Matches kalaseriet.se bento grid exactly:
// .heading.is--bento: caraque-solid, 3.4rem, color: #6e42ff
// .heading.is--bento.is--larger: 5rem
// .text.is--bold: caraque-melted, bold

interface BentoItem {
  id: string
  label?: string
  title: string
  subtitle?: string
  color: string
  textColor?: string
  imageUrl?: string
  animationUrl?: string
  span?: 'full' | 'half' | 'normal'
}

interface BentoBoxProps {
  items: BentoItem[]
}

function BentoCard({ item }: { item: BentoItem }) {
  const [lottieReady, setLottieReady] = useState(false)

  useEffect(() => {
    if (item.animationUrl) {
      if (!customElements.get('lottie-player')) {
        import('@lottiefiles/lottie-player').then(() => setLottieReady(true))
      } else {
        setLottieReady(true)
      }
    }
  }, [item.animationUrl])

  const isHalf = item.span === 'half'
  const isLarger = isHalf // half-span items use is--larger heading style

  // Determine text color based on background
  const textColor = item.textColor ?? '#272729'

  // Heading color: match original - purple for most, inherit for image cards
  const headingColor = item.imageUrl
    ? '#faf1ef'
    : item.color === '#ffa6a6'
      ? '#faf1ef'
      : item.color === '#3e755a'
        ? '#faf1ef'
        : item.color === '#6e42ff'
          ? '#faf1ef'
          : item.color === '#5910b6'
            ? '#ffa6a6'  // melon on indigo
            : '#6e42ff'  // purple by default

  const labelColor = item.imageUrl
    ? '#faf1ef'
    : item.color === '#ffa6a6' ? '#faf1ef'
    : item.color === '#3e755a' ? '#faf1ef'
    : item.color === '#6e42ff' ? '#faf1ef'
    : item.color === '#5910b6' ? '#faf1ef'
    : '#272729'

  const subtitleColor = labelColor

  return (
    <div
      style={{
        backgroundColor: item.color,
        backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '3rem',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: isHalf ? '20rem' : '16rem',
        padding: '1.5rem',
        gridColumn: isHalf ? 'span 2' : 'span 1',
      }}
    >
      {/* Dark overlay for image cards */}
      {item.imageUrl && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: '3rem',
        }} />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', justifyContent: 'space-between' }}>
        <div>
          {item.label && (
            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: labelColor,
              lineHeight: 1.2,
              marginBottom: '0.25rem',
            }}>
              {item.label}
            </p>
          )}
          <h2 style={{
            fontFamily: 'caraque-solid, sans-serif',
            fontSize: isLarger ? '5rem' : '3.4rem',
            fontWeight: 700,
            color: headingColor,
            lineHeight: '90%',
            margin: 0,
          }}>
            {item.title}
          </h2>
        </div>

        {item.subtitle && (
          <p style={{
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: subtitleColor,
            lineHeight: 1.3,
          }}>
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Lottie animation */}
      {item.animationUrl && lottieReady && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 0,
          width: '55%',
          pointerEvents: 'none',
          opacity: 0.9,
        }}>
          {/* @ts-ignore */}
          <lottie-player
            src={item.animationUrl}
            background="transparent"
            speed="1"
            style={{ width: '100%', height: 'auto' }}
            loop
            autoplay
          />
        </div>
      )}
    </div>
  )
}

export default function BentoBox({ items }: BentoBoxProps) {
  return (
    <section style={{
      backgroundColor: 'white',
      padding: '1.5rem',
    }}>
      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        {items.map(item => (
          <BentoCard key={item.id} item={item} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-grid > div[style*="grid-column: span 2"],
          .bento-grid > div[style*="gridColumn"] {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 560px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .bento-grid > div {
            grid-column: span 1 !important;
            min-height: 14rem !important;
          }
          .bento-grid h2 {
            font-size: 2.6rem !important;
          }
        }
      `}</style>
    </section>
  )
}
