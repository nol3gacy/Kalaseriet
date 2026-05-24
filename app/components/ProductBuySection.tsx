'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../lib/cart-context'
import type { Product } from '../page'

export default function ProductBuySection({ product }: { product: Product }) {
  const router = useRouter()
  const { addItem } = useCart()
  const [showSticky, setShowSticky] = useState(false)

  const handleBuyNow = async () => {
    addItem(product)
    router.push('/varukorg')
  }

  // Show floating Köp nu when the inline button scrolls out of view
  useEffect(() => {
    const target = document.querySelector('[data-buy-button-anchor]')
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Price + Buy row */}
      <div
        data-buy-button-anchor
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
          marginTop: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.4rem',
              color: '#b96e6e',
              textDecoration: 'line-through',
              fontWeight: 700,
            }}>{product.originalPrice} kr</span>
          )}
          <span style={{
            fontFamily: 'caraque-solid, sans-serif',
            fontSize: '3.4rem',
            fontWeight: 800,
            color: '#5910b6',
            lineHeight: 1,
          }}>{product.price} kr</span>
        </div>

        <button onClick={handleBuyNow} className="btn-primary" style={{ fontSize: '1.5rem', padding: '1.2rem 2.5rem' }}>
          Köp nu ›
        </button>
      </div>

      {/* Trust signals row */}
      <div style={{
        display: 'flex',
        gap: '1.25rem',
        flexWrap: 'wrap',
        marginTop: '0.5rem',
        fontFamily: 'caraque-melted, sans-serif',
        fontSize: '1.05rem',
        color: '#272729',
        fontWeight: 700,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ color: '#3e755a' }}>✓</span> Leveras direkt till din e-post
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ color: '#3e755a' }}>✓</span> 100% Nöjdhetsgaranti
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ color: '#3e755a' }}>✓</span> Säker betalning
        </span>
      </div>

      {/* Floating sticky Köp nu — bottom right, appears after scroll past inline button */}
      {showSticky && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 100,
          animation: 'slideUp 0.25s ease-out',
        }}>
          <button onClick={handleBuyNow} className="btn-primary" style={{
            fontSize: '1.4rem',
            padding: '1.2rem 2rem',
            boxShadow: '0 12px 40px rgba(89,16,182,0.5)',
          }}>
            Köp {product.price} kr ›
          </button>
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
