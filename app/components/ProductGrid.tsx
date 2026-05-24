'use client'

import { useState } from 'react'
import type { Product } from '../page'
import ProductCard from './ProductCard'

const AGE_FILTERS = [
  { label: 'Alla', value: 'all' },
  { label: '4-åringar', value: '4' },
  { label: '5-åringar', value: '5' },
  { label: '6-åringar', value: '6' },
  { label: '7 & 8-åringar', value: '7-8' },
]

export default function ProductGrid({
  products,
  showFilter = false,
}: {
  products: Product[]
  showFilter?: boolean
}) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filtered =
    activeFilter === 'all'
      ? products
      : products.filter(p => p.ageGroup === activeFilter)

  return (
    <div>
      {showFilter && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
          marginBottom: '2.5rem',
          justifyContent: 'center',
        }}>
          {AGE_FILTERS.map(f => {
            const active = activeFilter === f.value
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '500px',
                  fontFamily: 'caraque-melted, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: active ? 'none' : '2px solid rgba(89,16,182,0.25)',
                  backgroundColor: active ? '#5910b6' : 'transparent',
                  color: active ? '#faf1ef' : '#5910b6',
                  transition: 'all 0.15s',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        {filtered.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
