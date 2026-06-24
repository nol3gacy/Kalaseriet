'use client'

import { useState } from 'react'

const TEXT = '20% rabatt på första köpet'

export default function DiscountMarquee() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try { await navigator.clipboard.writeText('KALAS20') }
    catch {
      const el = document.createElement('textarea')
      el.value = 'KALAS20'; document.body.appendChild(el); el.select()
      document.execCommand('copy'); document.body.removeChild(el)
    }
    setCopied(true); setTimeout(() => setCopied(false), 2500)
  }

  // One repeat unit (rabatt + button), duplicated for a seamless loop
  const unit = (key: string) => (
    <span className="wf-marquee-unit" key={key}>
      <div className="rabatt">{TEXT}</div>
      <button type="button" onClick={copy} className="fs-copyclip_button w-button" style={{ border: 'none', cursor: 'pointer' }}>
        {copied ? 'Kopierad! Lägg till i kassan sen' : 'Kopiera rabatt-koden: KALAS20'}
      </button>
    </span>
  )

  return (
    <section className="marquee">
      <div className="marquee-scroll wf-marquee-anim">
        {Array.from({ length: 4 }).map((_, i) => unit(`a${i}`))}
        {Array.from({ length: 4 }).map((_, i) => unit(`b${i}`))}
      </div>
      <style>{`
        .marquee { overflow: hidden; }
        .wf-marquee-anim { width: max-content; flex-wrap: nowrap !important; animation: wf-marquee 32s linear infinite; }
        .wf-marquee-unit { display: inline-flex; align-items: center; gap: 1em; flex-shrink: 0; }
        @keyframes wf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  )
}
