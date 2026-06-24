'use client'

import { useState } from 'react'
import type { Product } from '../page'

const AGES = [
  { key: '4', label: '4-åringar' },
  { key: '5', label: '5-åringar' },
  { key: '6', label: '6-åringar' },
  { key: '7-8', label: '7 & 8-åringar' },
]

function ageText(g: string) {
  return g === '7-8' ? '7 & 8-åringar' : `${g}-åringar`
}

export default function ProductGrid({
  products,
  heading = 'Kalasen',
  showFilter = true,
}: {
  products: Product[]
  heading?: string
  showFilter?: boolean
}) {
  // All ages active by default
  const [active, setActive] = useState<Set<string>>(new Set(AGES.map(a => a.key)))

  const toggle = (key: string) =>
    setActive(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      // never allow empty → behaves like "all"
      return next.size === 0 ? new Set(AGES.map(a => a.key)) : next
    })

  const filtered = products.filter(p => active.has(p.ageGroup))

  return (
    <section className="kalasen" id="populara">
      {heading && <h1 className="heading is--xl">{heading}</h1>}

      {showFilter && (
        <div className="w-form">
          <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="checkbox-label">Passar:</div>
            <div className="filter-btn-wrapper">
              {AGES.map(a => {
                const on = active.has(a.key)
                return (
                  <label key={a.key} className="w-checkbox filter-btn" onClick={e => { e.preventDefault(); toggle(a.key) }}>
                    <div className={`w-checkbox-input w-checkbox-input--inputType-custom checkbox${on ? ' w--redirected-checked' : ''}`} />
                    <span className="checkbox-label w-form-label">{a.label}</span>
                  </label>
                )
              })}
            </div>
            <div className="div-block-17">
              <div className="checkbox-label count">(</div>
              <div className="checkbox-label count">{filtered.length}</div>
              <div className="checkbox-label count">)</div>
              <div className="checkbox-label count st">st</div>
            </div>
          </form>
        </div>
      )}

      <div className="kalaslekarna-clw w-dyn-list">
        <div role="list" className="kalaslekarna-list w-dyn-items">
          {filtered.map(p => (
            <div role="listitem" className="kalaslekarna-item w-dyn-item" key={p._id}>
              <a href={`/kalas/${p.slug.current}`} className="kalaslekarna-link-block w-inline-block">
                {p.isNew && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src="/wf/images/nyhet.svg" loading="lazy" alt="Nyhet" className="nyhetspuff" />
                )}
                {p.isPopular && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src="/wf/images/poppis.svg" loading="lazy" alt="Populär" className="poppispuff" />
                )}
                <div className="listing-image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={p.name} loading="lazy" src={p.externalImageUrl || '/wf/images/mockup.jpg'} className="listing-image" />
                </div>
                <div className="listing-text-content">
                  <div className="listing-header-wrapper">
                    <h2 className="heading is--listing">{p.name}</h2>
                    <div className="for-age">
                      <div className="text is-for">för</div>
                      <div className="text is-for">{ageText(p.ageGroup)}</div>
                    </div>
                    <div className="text is--listing">{p.description}</div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
