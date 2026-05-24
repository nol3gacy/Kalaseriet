'use client'

import { useState } from 'react'
import { faqs } from '../../lib/data/faq'

export default function FAQ({
  heading = 'Vanliga frågor',
  subheading,
}: { heading?: string; subheading?: string } = {}) {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'caraque-solid, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            fontWeight: 800,
            color: '#5910b6',
            lineHeight: '95%',
            marginBottom: '1rem',
          }}>{heading}</h2>
          {subheading && (
            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.3rem',
              color: '#4e4e4e',
              lineHeight: '130%',
            }}>{subheading}</p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => {
            const open = expanded === i
            return (
              <div
                key={i}
                style={{
                  backgroundColor: '#faf1ef',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setExpanded(open ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'caraque-melted, sans-serif',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#272729',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span style={{ flex: 1 }}>{faq.question}</span>
                  <span style={{
                    flexShrink: 0,
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#5910b6',
                    color: '#faf1ef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: open ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                    fontSize: '1.4rem',
                    lineHeight: 1,
                  }}>+</span>
                </button>
                {open && (
                  <div
                    style={{
                      padding: '0 2rem 1.75rem',
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.15rem',
                      color: '#4e4e4e',
                      lineHeight: '150%',
                    }}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
