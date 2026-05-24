'use client'

import { useRef, useState, useEffect } from 'react'

// Matches kalaseriet.se product carousel:
// - Rounded image cards in horizontal scroll
// - Left/right arrows in purple circular buttons
// - "Teasing" peek of next/previous image so users see scrollability
// - Badges (POPULÄR, -X%) absolutely positioned

type Props = {
  images: string[]
  alt: string
  badges?: { popular?: boolean; discountPercent?: number | null }
}

export default function ImageCarousel({ images, alt, badges }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateButtons = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateButtons()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', updateButtons)
    return () => {
      el.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [images.length])

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    // Scroll by image width minus a peek so the next image lands aligned
    const card = el.querySelector<HTMLElement>('[data-carousel-card]')
    const w = card?.offsetWidth ?? 320
    el.scrollBy({ left: dir * (w + 16), behavior: 'smooth' })
  }

  const onlyOne = images.length <= 1

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Scrollable images */}
      <div
        ref={scrollerRef}
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          // Hide scrollbar visually but keep functional
          scrollbarWidth: 'none' as never,
          msOverflowStyle: 'none' as never,
          // Padding-right so the last image still has some peek room
          paddingRight: onlyOne ? 0 : '15%',
          WebkitOverflowScrolling: 'touch',
        }}
        className="carousel-scroller"
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            data-carousel-card
            style={{
              flex: onlyOne ? '0 0 100%' : '0 0 85%',
              scrollSnapAlign: 'start',
              position: 'relative',
              borderRadius: '2.5rem',
              overflow: 'hidden',
              backgroundColor: '#faf1ef',
              aspectRatio: '4 / 3.2',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} – bild ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Badges only on first image */}
            {i === 0 && badges?.popular && (
              <span style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                backgroundColor: '#FCD34D',
                color: '#272729',
                padding: '0.4rem 1rem',
                borderRadius: '500px',
                fontFamily: 'caraque-solid, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                zIndex: 2,
              }}>POPULÄR</span>
            )}
            {i === 0 && badges?.discountPercent && (
              <span style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                backgroundColor: '#ffa6a6',
                color: '#272729',
                padding: '0.4rem 1rem',
                borderRadius: '500px',
                fontFamily: 'caraque-solid, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 800,
                zIndex: 2,
              }}>-{badges.discountPercent}%</span>
            )}
          </div>
        ))}
      </div>

      {/* Arrows — circular purple buttons (only when more than 1 image) */}
      {!onlyOne && (
        <>
          <button
            type="button"
            aria-label="Föregående bild"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            style={{
              position: 'absolute',
              left: '-22px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#5910b6',
              color: '#faf1ef',
              border: '4px solid #faf1ef',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              cursor: canPrev ? 'pointer' : 'not-allowed',
              opacity: canPrev ? 1 : 0.35,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              zIndex: 3,
              transition: 'opacity 0.15s, transform 0.15s',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Nästa bild"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            style={{
              position: 'absolute',
              right: '-22px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#5910b6',
              color: '#faf1ef',
              border: '4px solid #faf1ef',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              cursor: canNext ? 'pointer' : 'not-allowed',
              opacity: canNext ? 1 : 0.35,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              zIndex: 3,
              transition: 'opacity 0.15s, transform 0.15s',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      <style>{`
        .carousel-scroller::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
