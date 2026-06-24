'use client'

import { useState, useRef } from 'react'

type Item = { q: string; a: string }

export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="w-dyn-list">
      <div role="list" className="w-dyn-items">
        {items.map((item, idx) => (
          <AccordionRow
            key={idx}
            item={item}
            open={open === idx}
            onToggle={() => setOpen(open === idx ? null : idx)}
          />
        ))}
      </div>
    </div>
  )
}

function AccordionRow({ item, open, onToggle }: { item: Item; open: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const h = open ? bodyRef.current?.scrollHeight ?? 0 : 0
  return (
    <div role="listitem" className="w-dyn-item">
      <div className="accordion-top" onClick={onToggle} role="button" aria-expanded={open}>
        <h3 className="heading s">{item.q}</h3>
        <div className="icon w-embed" style={{ transition: 'transform .2s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>
      <div className="accordion-bottom" style={{ height: h, overflow: 'hidden', transition: 'height .25s ease' }}>
        <div className="accordion-text-wrapper" ref={bodyRef}>
          <div className="text w-richtext" dangerouslySetInnerHTML={{ __html: item.a }} />
        </div>
      </div>
    </div>
  )
}
