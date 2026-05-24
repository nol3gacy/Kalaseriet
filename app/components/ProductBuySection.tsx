'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../lib/cart-context'
import type { Product } from '../page'

export default function ProductBuySection({ product }: { product: Product }) {
  const router = useRouter()
  const { addItem, items } = useCart()
  const [showSticky, setShowSticky] = useState(false)

  const handleBuyNow = async () => {
    // Add to cart (persists in localStorage so it's still there if user backs from checkout)
    addItem(product)
    // Build line items: the just-added product + everything already in cart
    const allItems = [
      { productId: product._id, productName: product.name, price: product.price, quantity: 1 },
      ...items
        .filter(i => i.product._id !== product._id)
        .map(({ product: p, quantity }) => ({
          productId: p._id,
          productName: p.name,
          price: p.price,
          quantity,
        })),
    ]
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: allItems }),
      })
      const data = await res.json()
      if (data?.url) {
        // Redirect to Stripe-hosted checkout
        window.location.href = data.url
        return
      }
    } catch {
      // Network/Stripe error — fall through
    }
    // Fallback: go to local cart page
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
        {/* Price block: 269 kr rotated -8deg and offset up-left, like the design */}
        <div style={{ position: 'relative', display: 'inline-block', paddingTop: '0.5rem' }}>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              left: '-12px',
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: '1.5rem',
              color: '#ff4d6d',
              textDecoration: 'line-through',
              textDecorationColor: '#ff4d6d',
              textDecorationThickness: '2.5px',
              fontWeight: 700,
              transform: 'rotate(-10deg)',
              transformOrigin: 'left bottom',
              whiteSpace: 'nowrap',
            }}>{product.originalPrice} kr</span>
          )}
          <span style={{
            fontFamily: 'caraque-melted, sans-serif',
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

      {/* Trust signals: bold sans (not caraque), proper green checkmark SVG */}
      <div style={{
        display: 'flex',
        gap: '1.25rem',
        flexWrap: 'wrap',
        marginTop: '0.75rem',
        fontFamily: 'var(--font-manrope), system-ui, sans-serif',
        fontSize: '0.95rem',
        color: '#272729',
        fontWeight: 700,
      }}>
        {['Leveras direkt till din e-post', '100% Nöjdhetsgaranti', 'Säker betalning'].map(label => (
          <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3e755a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {label}
          </span>
        ))}
      </div>

      {/* Floating sticky Köp nu — bottom right, appears after scroll past inline button */}
      {showSticky && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 100,
          animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backgroundColor: 'white',
          padding: '0.5rem 0.5rem 0.5rem 1.5rem',
          borderRadius: '500px',
          boxShadow: '0 12px 40px rgba(89,16,182,0.25), 0 2px 8px rgba(0,0,0,0.08)',
          maxWidth: 'calc(100vw - 3rem)',
        }}>
          {/* Price block — strikethrough rotated above current price */}
          <div style={{ position: 'relative', paddingTop: '0.35rem' }}>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                left: '-8px',
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: '0.95rem',
                color: '#ff4d6d',
                textDecoration: 'line-through',
                textDecorationColor: '#ff4d6d',
                textDecorationThickness: '2px',
                fontWeight: 700,
                transform: 'rotate(-10deg)',
                transformOrigin: 'left bottom',
                whiteSpace: 'nowrap',
              }}>{product.originalPrice} kr</span>
            )}
            <span style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#5910b6',
              lineHeight: 1,
            }}>{product.price} kr</span>
          </div>

          <button onClick={handleBuyNow} className="btn-primary" style={{
            fontSize: '1.3rem',
            padding: '1rem 1.75rem',
          }}>
            Köp nu ›
          </button>

          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
