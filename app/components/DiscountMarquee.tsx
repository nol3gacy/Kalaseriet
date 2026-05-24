'use client'

import { useState } from 'react'

const items = [
  '20% rabatt på första köpet',
  '20% rabatt på första köpet',
  '20% rabatt på första köpet',
  '20% rabatt på första köpet',
  '20% rabatt på första köpet',
]

export default function DiscountMarquee() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('KALAS20')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = 'KALAS20'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div
      className="w-full overflow-hidden flex items-center gap-6 py-5"
      style={{ backgroundColor: '#faf1ef' }}
    >
      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden min-w-0">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 mx-4"
              style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.5rem',
                color: '#6e42ff',
              }}
            >
              {item}
              <span style={{ color: '#6e42ff', opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Copy button — always visible */}
      <button
        onClick={handleCopy}
        className="flex-shrink-0 mr-6 px-6 py-3 rounded-[2rem] font-medium transition-all"
        style={{
          backgroundColor: '#6e42ff',
          color: '#faf1ef',
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.3rem',
          whiteSpace: 'nowrap',
          transform: copied ? 'scale(0.96)' : 'scale(1)',
        }}
      >
        {copied ? '✓ Kopierad!' : 'Kopiera rabatt-koden: KALAS20'}
      </button>
    </div>
  )
}
