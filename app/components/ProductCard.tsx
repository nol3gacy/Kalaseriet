'use client'

import type { Product } from '../page'

// Matches kalaseriet.se product card exactly:
// - Cream background with rounded 2.5rem image
// - POPPIS! sticker (purple, rotated, caraque-solid) top-left
// - NYHET sticker (salmon pink, slightly rotated) top-right
// - Big title in caraque-solid purple
// - Age-pill in pale cream/pink with caraque-melted
// - Description in caraque-melted bold dark gray

type Sticker = {
  text: string
  bg: string
  color: string
  rotate: string
  position: 'left' | 'right'
}

function getStickers(product: Product): Sticker[] {
  const stickers: Sticker[] = []
  if (product.isPopular) {
    stickers.push({
      text: 'POPPIS!',
      bg: '#6e42ff',
      color: '#faf1ef',
      rotate: '-8deg',
      position: 'left',
    })
  }
  if (product.isNew) {
    stickers.push({
      text: 'NYHET',
      bg: '#ffa6a6',
      color: '#272729',
      rotate: '7deg',
      position: 'right',
    })
  }
  return stickers
}

export default function ProductCard({ product }: { product: Product }) {
  const stickers = getStickers(product)
  const ageLabel = product.ageGroup === '7-8' ? '7 & 8-åringar' : `${product.ageGroup}-åringar`
  const imageUrl = product.externalImageUrl

  return (
    <a
      href={`/kalas/${product.slug.current}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        textDecoration: 'none',
        padding: '0.5rem',
      }}
    >
      {/* Image with rounded corners + stickers */}
      <div style={{
        position: 'relative',
        borderRadius: '2rem',
        overflow: 'visible',
        aspectRatio: '4 / 3.2',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '2rem',
          overflow: 'hidden',
          backgroundColor: '#faf1ef',
        }}>
          {imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
              backgroundColor: '#faf1ef',
            }}>🎉</div>
          )}
        </div>

        {/* Stickers — absolute, slightly outside image */}
        {stickers.map(s => (
          <div
            key={s.text}
            style={{
              position: 'absolute',
              top: '-12px',
              [s.position]: '-8px',
              backgroundColor: s.bg,
              color: s.color,
              padding: '0.5rem 1.1rem',
              borderRadius: '500px',
              fontFamily: 'caraque-solid, sans-serif',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              transform: `rotate(${s.rotate})`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              zIndex: 2,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {s.text}
          </div>
        ))}
      </div>

      {/* Title + age + description */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
        <h3 style={{
          fontFamily: 'caraque-solid, sans-serif',
          fontSize: '2.4rem',
          fontWeight: 800,
          color: '#5910b6',
          lineHeight: '92%',
          margin: 0,
          textAlign: 'center',
        }}>
          {product.name}
        </h3>

        {/* Age pill — cream/pink rounded */}
        <span style={{
          display: 'inline-block',
          backgroundColor: '#fce8e0',
          color: '#5910b6',
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          padding: '0.35rem 1.1rem',
          borderRadius: '500px',
          lineHeight: 1.1,
        }}>
          för {ageLabel}
        </span>

        <p style={{
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#272729',
          lineHeight: '130%',
          margin: '0.25rem 0 0',
          maxWidth: '32ch',
        }}>
          {product.description}
        </p>
      </div>
    </a>
  )
}
