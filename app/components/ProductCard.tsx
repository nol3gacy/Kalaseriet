'use client'

import type { Product } from '../page'
import Sticker from './Sticker'

// Matches kalaseriet.se product card:
// - Cream rounded image
// - POPPIS sticker (purple blob SVG) top-left, rotated
// - NYHET sticker (salmon blob SVG) top-right
// - Title in caraque-melted bold (NOT caraque-melted — that's reserved for bento)
// - Age-pill outline style "Kalas för X-åringar"
// - Body text in regular weight (lighter than before)

export default function ProductCard({ product }: { product: Product }) {
  const ageLabel = product.ageGroup === '7-8' ? '7 & 8-åringar' : `${product.ageGroup}-åringar`
  const imageUrl = product.externalImageUrl

  return (
    <a
      href={`/kalas/${product.slug.current}`}
      className="product-card-link"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        textDecoration: 'none',
        padding: '0.5rem',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Image with rounded corners + stickers */}
      <div className="product-card-image-wrap" style={{
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
          transition: 'transform 0.25s ease',
        }} className="product-card-image">
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

        {/* POPPIS sticker (top-left, slight rotation) */}
        {product.isPopular && (
          <div style={{
            position: 'absolute',
            top: '-18px',
            left: '-14px',
            zIndex: 2,
            transform: 'rotate(-8deg)',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
          }}>
            <Sticker kind="poppis" width={88} />
          </div>
        )}
        {/* NYHET sticker (top-right, opposite rotation) */}
        {product.isNew && (
          <div style={{
            position: 'absolute',
            top: '-14px',
            right: '-10px',
            zIndex: 2,
            transform: 'rotate(8deg)',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
          }}>
            <Sticker kind="nyhet" width={92} />
          </div>
        )}
      </div>

      {/* Title + age + description */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
        {/* Title: caraque-melted BOLD (not caraque-melted) — matches .heading on kalaseriet */}
        <h3 className="card-title" style={{
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '2rem',
          fontWeight: 700,
          color: '#5910b6',
          lineHeight: '95%',
          margin: 0,
          textAlign: 'center',
          transition: 'color 0.15s ease',
        }}>
          {product.name}
        </h3>

        {/* Age pill — outline cream/pink */}
        <span style={{
          display: 'inline-block',
          backgroundColor: '#fce8e0',
          color: '#5910b6',
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 500,
          padding: '0.3rem 1rem',
          borderRadius: '500px',
          lineHeight: 1.1,
        }}>
          för {ageLabel}
        </span>

        {/* Body text — regular weight, lighter color */}
        <p style={{
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 400,
          color: '#4e4e4e',
          lineHeight: '140%',
          margin: '0.25rem 0 0',
          maxWidth: '32ch',
        }}>
          {product.description}
        </p>
      </div>

      <style>{`
        .product-card-link:hover .product-card-image {
          transform: scale(1.03);
        }
        .product-card-link:hover .card-title {
          color: #3e755a;
        }
      `}</style>
    </a>
  )
}
