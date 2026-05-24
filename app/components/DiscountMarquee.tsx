'use client'

import { useState } from 'react'

// Matches kalaseriet.se marquee section exactly:
// - White background, 3rem padding top/bottom
// - "20% rabatt på första köpet" text (purple, 1.5rem, caraque-melted) scrolling
// - Purple pill button "Kopiera rabatt-koden: KALAS20"

const rabattText = '20% rabatt på första köpet'
// Repeat enough times for seamless scroll — doubled in render for infinite loop
const items = Array(10).fill(rabattText)

export default function DiscountMarquee() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('KALAS20')
    } catch {
      const el = document.createElement('textarea')
      el.value = 'KALAS20'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section style={{
      width: '100%',
      marginTop: '0.75rem',
      marginBottom: '0.75rem',
      paddingTop: '3rem',
      paddingBottom: '3rem',
      display: 'flex',
      alignItems: 'center',
      gap: '3rem',
      overflow: 'hidden',
      backgroundColor: 'white',
    }}>
      {/* Scrolling marquee — animate-marquee class sets display:flex + width:max-content */}
      <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
        <div className="animate-marquee" style={{ gap: '2em' }}>
          {/* Original set + duplicate for seamless loop */}
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1em',
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.5rem',
                color: '#6e42ff',
                flexShrink: 0,
              }}
            >
              {item}
              <span style={{ color: '#6e42ff', opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        style={{
          flexShrink: 0,
          marginRight: '3rem',
          padding: '0.75rem 2rem',
          backgroundColor: copied ? '#5910b6' : '#6e42ff',
          color: '#fff',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          borderRadius: '500px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 400,
          transition: 'background-color 0.15s',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {copied ? '✓ Kopierad! Lägg till i kassan sen' : 'Kopiera rabatt-koden: KALAS20'}
      </button>
    </section>
  )
}
