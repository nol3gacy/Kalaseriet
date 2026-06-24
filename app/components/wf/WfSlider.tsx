'use client'

import { useState, useCallback, useEffect } from 'react'

// Reproduces the Webflow product slider markup/classes with React-driven
// infinite slides, arrows and round dot nav. First slide shows "(Inspirationsbild)".
export default function WfSlider({ images, alt }: { images: string[]; alt: string }) {
  const cleaned = images.filter(Boolean)
  const slides = cleaned.length ? cleaned : ['/wf/images/mockup.jpg']
  const [i, setI] = useState(0)
  const total = slides.length
  const go = useCallback((n: number) => setI(((n % total) + total) % total), [total])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(i + 1)
      if (e.key === 'ArrowLeft') go(i - 1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [go, i])

  return (
    <div className="slider w-slider">
      <div className="mask w-slider-mask">
        {slides.map((src, idx) => (
          <div
            className="slide w-slide"
            key={idx}
            style={{ display: idx === i ? 'block' : 'none' }}
          >
            <div className="slide-inner-wrapper">
              {idx === 0 && <div className="disclaimer-product-image">(Inspirationsbild)</div>}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={`${alt} – bild ${idx + 1}`} loading={idx === 0 ? 'eager' : 'lazy'} src={src} className="product-image" />
            </div>
          </div>
        ))}
      </div>

      <div className="left-arrow w-slider-arrow-left" onClick={() => go(i - 1)} role="button" aria-label="Föregående">
        <div className="icon-6 w-icon-slider-left" />
      </div>
      <div className="right-arrow w-slider-arrow-right" onClick={() => go(i + 1)} role="button" aria-label="Nästa">
        <div className="icon-5 w-icon-slider-right" />
      </div>

      <div className="slide-nav w-slider-nav w-round">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-slider-dot${idx === i ? ' w-active' : ''}`}
            onClick={() => go(idx)}
            role="button"
            aria-label={`Bild ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
