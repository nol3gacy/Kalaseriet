'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Sticker from './Sticker'

// Kalaseriet.se product carousel:
// - 4 images per product on a salmon/pink rounded backdrop
// - Faded "Inspirationsbild" watermark on cover (first) image
// - Left/right arrows (white chevrons on transparent)
// - Bullet nav at bottom
// - Infinite loop (next from last → first)

type Props = {
  images: string[]
  alt: string
  badges?: { popular?: boolean; isNew?: boolean }
}

export default function ImageCarousel({ images, alt, badges }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const total = images.length

  const goTo = useCallback((i: number) => {
    const next = ((i % total) + total) % total
    setIndex(next)
  }, [total])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  return (
    <div className="carousel-stage" style={{
      position: 'relative',
      backgroundColor: '#ffa6a6',
      borderRadius: '2.5rem',
      padding: '2.5rem 1rem 1.5rem',
      overflow: 'hidden',
    }}>
      {/* POPPIS sticker — purple blob SVG */}
      {badges?.popular && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '-8px',
          zIndex: 5,
          transform: 'rotate(-10deg)',
          filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))',
        }}>
          <Sticker kind="poppis" width={108} />
        </div>
      )}
      {/* NYHET sticker — pink blob in top-right when product is new */}
      {badges?.isNew && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '-6px',
          zIndex: 5,
          transform: 'rotate(10deg)',
          filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))',
        }}>
          <Sticker kind="nyhet" width={104} />
        </div>
      )}

      {/* Image stage */}
      <div
        ref={trackRef}
        style={{
          position: 'relative',
          aspectRatio: '4 / 3.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {images.map((src, i) => {
          const active = i === index
          return (
            <div
              key={`${src}-${i}`}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: active ? 1 : 0,
                transform: active ? 'rotate(-1.5deg) scale(1)' : 'rotate(-1.5deg) scale(0.96)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                pointerEvents: active ? 'auto' : 'none',
              }}
            >
              <div style={{
                position: 'relative',
                width: '85%',
                height: '90%',
                borderRadius: '1rem',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${alt} – bild ${i + 1} av ${total}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                {/* Inspirationsbild watermark on first image only */}
                {i === 0 && (
                  <span style={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    right: '0.75rem',
                    fontFamily: 'caraque-melted, sans-serif',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.85)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    pointerEvents: 'none',
                  }}>Inspirationsbild</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Föregående bild"
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'transparent',
              border: 'none',
              color: '#faf1ef',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 4,
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Nästa bild"
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'transparent',
              border: 'none',
              color: '#faf1ef',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 4,
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Bullet nav */}
      {total > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Visa bild ${i + 1}`}
              style={{
                width: i === index ? '10px' : '8px',
                height: i === index ? '10px' : '8px',
                borderRadius: '50%',
                backgroundColor: i === index ? '#5910b6' : 'rgba(89,16,182,0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        /* Mobile: no pink backdrop, image goes edge-to-edge */
        @media (max-width: 700px) {
          .carousel-stage {
            background-color: transparent !important;
            padding: 1.25rem 0 1.25rem !important;
          }
        }
      `}</style>
    </div>
  )
}
