'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../lib/cart-context'
import { API_BASE } from '../../lib/api-base'
import { trackCart } from '../../lib/gtag'

// Matches kalaseriet.se mini cart popover:
// - White rounded card overlay
// - Empty state: "Här var det tomt! Kolla in kalasen!"
// - Filled state: image, title, price, "Ta bort", "Till kassan" button

export default function MiniCart() {
  const router = useRouter()
  const { items, removeItem, miniCartOpen, closeMiniCart, total } = useCart()
  const panelRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  // ESC closes
  useEffect(() => {
    if (!miniCartOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMiniCart()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [miniCartOpen, closeMiniCart])

  // Modal focus: move into the panel on open, keep Tab inside it, and hand
  // focus back to whatever opened it (the cart button) on close.
  useEffect(() => {
    if (!miniCartOpen) return
    const opener = document.activeElement as HTMLElement | null
    const focusables = () => panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
    focusables()[0]?.focus()
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const first = f[0], last = f[f.length - 1], active = document.activeElement
      if (!panelRef.current?.contains(active)) { e.preventDefault(); first.focus() }
      else if (e.shiftKey && active === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', trap)
    return () => { window.removeEventListener('keydown', trap); opener?.focus() }
  }, [miniCartOpen])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = miniCartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [miniCartOpen])

  const handleCheckout = async () => {
    if (busy) return  // a double click would otherwise open two Stripe sessions
    setBusy(true)
    const lineItems = items.map(({ product, quantity }) => ({
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity,
    }))
    trackCart('begin_checkout', lineItems)
    try {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems }),
      })
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        // Fallback to /varukorg if checkout API not available
        router.push('/varukorg')
        closeMiniCart()
      }
    } catch {
      router.push('/varukorg')
      closeMiniCart()
    }
    setBusy(false)
  }

  if (!miniCartOpen) return null

  return (
    <>
      {/* Dim backdrop */}
      <div
        onClick={closeMiniCart}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(39,39,41,0.35)',
          zIndex: 800,
          animation: 'mc-fade 0.2s ease-out',
        }}
      />

      {/* Popover card — anchored top-right, full-width on mobile */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Varukorg"
        className="mini-cart-panel"
        style={{
          position: 'fixed',
          top: 'calc(1.5rem + 56px + 1.5rem)',  // sits below the navbar
          right: '1.5rem',
          width: '420px',
          maxWidth: 'calc(100vw - 3rem)',
          maxHeight: 'calc(100vh - 8rem)',
          backgroundColor: 'white',
          borderRadius: '2rem',
          boxShadow: '0 24px 64px rgba(89,16,182,0.22), 0 4px 12px rgba(0,0,0,0.08)',
          zIndex: 801,
          display: 'flex',
          flexDirection: 'column',
          animation: 'mc-slide 0.25s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(89,16,182,0.1)',
        }}>
          <h2 style={{
            fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#5910b6',
            margin: 0,
          }}>Dina varor</h2>
          <button
            onClick={closeMiniCart}
            aria-label="Stäng varukorg"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#5910b6',
              padding: '0.25rem',
              display: 'flex',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: items.length === 0 ? '4rem 1.5rem' : '1rem 1.5rem',
        }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#4e4e4e',
                lineHeight: 1.4,
                margin: 0,
              }}>
                Här var det tomt!<br />
                Kolla in <a
                  href="/kalas"
                  onClick={closeMiniCart}
                  style={{ color: '#6e42ff', textDecoration: 'none' }}
                >kalasen</a>!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map(({ product, quantity }) => (
                <div key={product._id} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid rgba(89,16,182,0.08)',
                }}>
                  {product.externalImageUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={product.externalImageUrl}
                      alt={product.name}
                      style={{
                        width: '100%',
                        aspectRatio: '16 / 10',
                        objectFit: 'cover',
                        borderRadius: '1.25rem',
                        display: 'block',
                      }}
                    />
                  )}
                  <h3 style={{
                    fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#5910b6',
                    lineHeight: '92%',
                    margin: 0,
                  }}>{product.name}</h3>
                  {product.ageGroup && (
                    <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: '0.95rem', color: '#4e4e4e', margin: '-0.25rem 0 0' }}>
                      för {product.ageGroup === '7-8' ? '7 & 8' : product.ageGroup}-åringar
                    </p>
                  )}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}>
                    <span style={{
                      fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: '#5910b6',
                    }}>
                      {product.price * quantity} kr
                    </span>
                    <button
                      onClick={() => removeItem(product._id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#5910b6',
                        textDecoration: 'underline',
                        padding: 0,
                      }}
                    >Ta bort</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / CTA */}
        {items.length > 0 && (
          <div style={{
            padding: '1rem 1.5rem 1.5rem',
            borderTop: '1px solid rgba(89,16,182,0.1)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '1rem',
            }}>
              <span style={{
                fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 500,
                color: '#4e4e4e',
              }}>Totalt</span>
              <span style={{
                fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
                fontSize: '2rem',
                fontWeight: 800,
                color: '#5910b6',
                lineHeight: 1,
              }}>{total} kr</span>
            </div>
            <button
              onClick={handleCheckout}
              aria-disabled={busy}
              aria-busy={busy}
              className="btn-primary"
              style={{
                cursor: busy ? 'progress' : undefined,
                width: '100%',
                fontSize: '1.5rem',
                padding: '1.3rem 2rem',
                justifyContent: 'center',
              }}
            >
              {busy ? 'Öppnar kassan…' : 'Till kassan'}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes mc-fade {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes mc-slide {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 560px) {
          .mini-cart-panel {
            left: 1rem !important;
            right: 1rem !important;
            width: auto !important;
            max-width: none !important;
          }
        }
      `}</style>
    </>
  )
}
