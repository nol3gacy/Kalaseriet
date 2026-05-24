'use client'

import { useState } from 'react'
import { faqs } from '../../lib/data/faq'

// Matches kalaseriet.se FAQ design per screenshot:
// - Black/obsidian question text (bold sans)
// - Plain + icon (no circle background), rotates to × on open
// - Cream/pink subtle hover/active background
// - Thin separator lines between items
// - Open item: shows answer below in dark gray body text

export default function FAQ({
  heading = 'Vanliga frågor',
  subheading,
}: { heading?: string; subheading?: string } = {}) {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section style={{ padding: '4rem 1.5rem', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            fontWeight: 800,
            color: '#5910b6',
            lineHeight: '95%',
            marginBottom: '0.75rem',
          }}>{heading}</h2>
          {subheading && (
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              fontSize: '1.05rem',
              color: '#4e4e4e',
              lineHeight: '140%',
            }}>{subheading}</p>
          )}
        </div>

        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => {
            const open = expanded === i
            return (
              <div
                key={i}
                className="faq-item"
                style={{
                  borderTop: i === 0 ? '1px solid rgba(89,16,182,0.12)' : 'none',
                  borderBottom: '1px solid rgba(89,16,182,0.12)',
                  backgroundColor: open ? '#faf1ef' : 'transparent',
                  transition: 'background-color 0.15s',
                  borderRadius: open ? '1rem' : 0,
                }}
              >
                <button
                  onClick={() => setExpanded(open ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#272729',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span style={{ flex: 1 }}>{faq.question}</span>
                  {/* + icon, rotates to × when open — no circle */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#272729"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      flexShrink: 0,
                      transition: 'transform 0.2s',
                      transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                {open && (
                  <div
                    style={{
                      padding: '0 1rem 1.5rem',
                      fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                      fontSize: '1.05rem',
                      color: '#272729',
                      lineHeight: '160%',
                      fontWeight: 500,
                    }}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .faq-item:hover:not(:has(button[aria-expanded="true"])) {
          background-color: rgba(250, 241, 239, 0.5);
        }
      `}</style>
    </section>
  )
}
