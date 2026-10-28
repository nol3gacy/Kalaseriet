'use client'

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'

// Chevron traced from Webflow's own lightbox arrow SVG (webflow.css .w-lightbox-left/-right).
// Base path points right, so the left arrow is the flipped one.
function ArrowIcon({ flip }: { flip?: boolean }) {
  return (
    <svg width="20" height="34" viewBox="-4 0 24 40" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <g transform="rotate(45)">
        <path d="m0-0h28v28h-5v-23h-23z" opacity=".4" />
        <path d="m1 1h26v26h-3v-23h-23z" fill="#fff" />
      </g>
    </svg>
  )
}

// Screen-reader text for the slide kinds a product page passes (cover, invitation, checklist, contents).
function describe(src: string) {
  if (src.includes('/covers/')) return 'inspirationsbild från kalaset'
  if (src.includes('/inbjudan/')) return 'inbjudan som ingår'
  if (src.includes('checklist')) return 'checklista som ingår'
  if (src.includes('Innehaller')) return 'allt som ingår i nedladdningen'
  return 'produktbild'
}

// Reproduces the Webflow product slider markup/classes as a real horizontal
// scroll-snap carousel with infinite looping (clone-based), Webflow's own
// lightbox chevron for arrows, a mobile "peek" layout (94vw + next slide
// edge visible), and a one-time bounce hint after load. First real slide
// shows "(Inspirationsbild)".
export default function WfSlider({ images, alt }: { images: string[]; alt: string }) {
  const cleaned = images.filter(Boolean)
  const slides = cleaned.length ? cleaned : ['/wf/images/mockup.jpg']
  const total = slides.length
  const loop = total > 1
  // The leading clone is added only after hydration: server-rendered, the
  // track starts at scrollLeft 0, so a leading clone would be what paints first
  // (the last slide, lazy-loaded) instead of the cover, and it was the LCP.
  const [headClone, setHeadClone] = useState(false)
  const extended = loop
    ? [...(headClone ? [{ src: slides[total - 1], key: 'head' }] : []),
       ...slides.map((src, i) => ({ src, key: `s${i}` })),
       { src: slides[0], key: 'tail' }]
    : slides.map((src, i) => ({ src, key: `s${i}` }))
  const lastExt = extended.length - 1

  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const suppress = useRef(false)

  const scrollToExt = useCallback((extIdx: number, smooth: boolean) => {
    const track = trackRef.current
    const child = track?.children[extIdx] as HTMLElement | undefined
    if (!track || !child) return
    suppress.current = true
    track.scrollTo({ left: child.offsetLeft, behavior: smooth ? 'smooth' : 'auto' })
    window.setTimeout(() => { suppress.current = false }, smooth ? 450 : 60)
  }, [])

  // Insert the leading clone and jump past it before the browser paints, so
  // the cover stays in place.
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must re-render before first paint
    if (loop) setHeadClone(true)
  }, [loop])
  useLayoutEffect(() => {
    if (headClone) scrollToExt(1, false)
  }, [headClone, scrollToExt])

  // Subtle "look, it scrolls" bounce hint, twice, shortly after load.
  useEffect(() => {
    const hint = window.setTimeout(() => {
      const track = trackRef.current
      if (!track) return
      const base = track.scrollLeft
      const nudge = (n: number) => {
        if (n >= 2) return
        track.scrollTo({ left: base + 26, behavior: 'smooth' })
        window.setTimeout(() => {
          track.scrollTo({ left: base, behavior: 'smooth' })
          window.setTimeout(() => nudge(n + 1), 280)
        }, 220)
      }
      nudge(0)
    }, 1000)
    return () => window.clearTimeout(hint)
  }, [])

  const go = useCallback((dir: 1 | -1) => {
    if (!loop) return
    const next = ((index + dir) % total + total) % total
    setIndex(next)
    scrollToExt(next + 1, true)
  }, [index, loop, scrollToExt, total])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [go])

  const onScroll = useCallback(() => {
    if (!loop || suppress.current) return
    const track = trackRef.current
    if (!track) return
    let nearest = 0, minDist = Infinity
    Array.from(track.children).forEach((c, i) => {
      const dist = Math.abs((c as HTMLElement).offsetLeft - track.scrollLeft)
      if (dist < minDist) { minDist = dist; nearest = i }
    })
    if (nearest === 0) {
      requestAnimationFrame(() => { scrollToExt(total, false); setIndex(total - 1) })
    } else if (nearest === lastExt) {
      requestAnimationFrame(() => { scrollToExt(1, false); setIndex(0) })
    } else {
      setIndex(nearest - 1)
    }
  }, [lastExt, loop, scrollToExt, total])

  return (
    <div className="slider w-slider wf-slider-v2">
      <div className="mask w-slider-mask wf-slider-track" ref={trackRef} onScroll={onScroll}>
        {extended.map(({ src, key }) => {
          const isCover = key === 's0'
          return (
            <div className="slide w-slide wf-slide" key={key}>
              <div className="slide-inner-wrapper">
                {isCover && <div className="disclaimer-product-image">(Inspirationsbild)</div>}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${alt} – ${describe(src)}`}
                  loading={isCover ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={isCover ? 'high' : 'auto'}
                  src={src.startsWith('/wf/images/covers/') ? src.replace(/\.jpg$/, '.webp') : src}
                  className="product-image wf-slide-image"
                />
              </div>
            </div>
          )
        })}
      </div>

      {loop && (
        <>
          <button type="button" className="left-arrow w-slider-arrow-left wf-arrow is--left" onClick={() => go(-1)} aria-label="Föregående bild">
            <ArrowIcon flip />
          </button>
          <button type="button" className="right-arrow w-slider-arrow-right wf-arrow is--right" onClick={() => go(1)} aria-label="Nästa bild">
            <ArrowIcon />
          </button>

          {/* Visual position only: the labelled arrow buttons do the same for keyboard and screen readers. */}
          <div className="slide-nav w-slider-nav w-round" aria-hidden="true">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-slider-dot${idx === index ? ' w-active' : ''}`}
                onClick={() => { setIndex(idx); scrollToExt(idx + 1, true) }}
              />
            ))}
          </div>
        </>
      )}

      <style>{`
        .wf-slider-v2 { position: relative; border-radius: inherit; overflow: hidden; }
        /* The track is its own scroll container, and a scrolling descendant
           isn't reliably clipped by an ancestor's border-radius — the bottom
           corners leaked square. Round + clip the track itself as well. */
        .wf-slider-track {
          display: flex;
          border-radius: inherit;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .wf-slider-track::-webkit-scrollbar { display: none; }
        .wf-slide {
          flex: 0 0 100%;
          scroll-snap-align: start;
          box-sizing: border-box;
          position: relative;
        }
        /* Slides carry different aspect ratios (photo 5:4, checklist and the
           contents graphic taller). A flex track sizes to the tallest, so
           shorter slides left a gap at the bottom where the container's
           square edge showed through. Pin every slide to one ratio and let
           the image cover it — consistent height, no gap, corners stay round. */
        .wf-slide-image {
          aspect-ratio: 5 / 4;
          height: 100%;
          width: 100%;
          object-fit: cover;
          display: block;
          border-radius: inherit;
        }
        .wf-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          z-index: 3;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wf-arrow.is--left { left: 0.5rem; }
        .wf-arrow.is--right { right: 0.5rem; }

        @media (max-width: 767px) {
          .wf-slide {
            flex: 0 0 94vw;
            margin-right: 2vw;
          }
          .wf-slide-image { object-fit: contain; background: var(--color--spökmjölk, #faf1ef); }
          .disclaimer-product-image { font-size: 0.95rem; opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}
