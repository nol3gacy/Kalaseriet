'use client'

import { testimonials, type Testimonial } from '../../lib/data/testimonials'

interface TestimonialsProps {
  items?: Testimonial[]      // Optional override for product pages
  heading?: string
  subheading?: string
}

export default function Testimonials({
  items = testimonials.slice(0, 4),
  heading = 'Så älskar föräldrar Kalaseriet',
  subheading = 'Läs vad andra föräldrar tycker om våra kalaspaket.',
}: TestimonialsProps) {
  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: '#faf1ef' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '700px', marginInline: 'auto' }}>
          <h2 style={{
            fontFamily: 'caraque-solid, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            fontWeight: 800,
            color: '#5910b6',
            lineHeight: '95%',
            marginBottom: '1rem',
          }}>{heading}</h2>
          <p style={{
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: '1.3rem',
            color: '#4e4e4e',
            lineHeight: '130%',
          }}>{subheading}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {items.map((t, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'white',
                borderRadius: '2.5rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.15rem', fontSize: '1.3rem' }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} style={{ color: idx < t.stars ? '#FCD34D' : '#e5e5e5' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.15rem',
                color: '#272729',
                lineHeight: '145%',
                fontWeight: 500,
                flex: 1,
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <p style={{
                fontFamily: 'caraque-solid, sans-serif',
                fontSize: '1.1rem',
                color: '#5910b6',
                fontWeight: 700,
                margin: 0,
              }}>
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
