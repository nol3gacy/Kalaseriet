'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../lib/cart-context'
import { API_BASE } from '../../lib/api-base'
import type { Product } from '../page'

const FEATURES = ['Leveras direkt till din e-post', '100% Nöjdhetsgaranti', 'Säker betalning']

function Check() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/wf/images/check-light.svg" alt="" aria-hidden="true" className="icon is--feature" />
  )
}

export default function ProductBuySection({ product }: { product: Product }) {
  const { addItem, items } = useCart()
  const [showSticky, setShowSticky] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const buyNow = async () => {
    if (busy) return
    setBusy(true)
    setError('')
    addItem(product)
    const lineItems = [
      { productId: product._id, productName: product.name, price: product.price, quantity: 1 },
      ...items.filter(i => i.product._id !== product._id).map(({ product: p, quantity }) => ({
        productId: p._id, productName: p.name, price: p.price, quantity,
      })),
    ]
    try {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems }),
      })
      const data = await res.json()
      if (data?.url) { window.location.href = data.url; return }
    } catch { /* fall through */ }
    // Checkout unavailable: the item is in the cart, tell the customer and let them continue there.
    setBusy(false)
    setError('Det gick inte att öppna kassan just nu. Din vara ligger kvar i varukorgen, försök igen eller gå till varukorgen.')
  }

  // Reveal the fixed buy bar once the inline buy button scrolls out of view.
  // Deferred to the next frame — observing immediately on mount can catch the
  // anchor before layout has settled and report a false "not intersecting".
  useEffect(() => {
    let obs: IntersectionObserver | undefined
    const raf = requestAnimationFrame(() => {
      const target = document.querySelector('[data-buy-anchor]')
      if (!target) return
      obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { rootMargin: '0px 0px -80px 0px' })
      obs.observe(target)
    })
    return () => {
      cancelAnimationFrame(raf)
      obs?.disconnect()
    }
  }, [])

  const Price = ({ fixed = false }: { fixed?: boolean }) => (
    <div className="price-wrapper">
      {product.originalPrice && product.originalPrice > product.price && (
        <div className={`price was${fixed ? ' fixed' : ''}`}>{product.originalPrice} kr</div>
      )}
      <div className="price">{product.price} kr</div>
    </div>
  )

  return (
    <>
      <div className="div-block-3">
        <div className="div-block" data-buy-anchor>
          <Price />
          <div className="add-to-cart">
            <form className="w-commerce-commerceaddtocartform default-state" onSubmit={e => e.preventDefault()}>
              <button onClick={buyNow} disabled={busy} aria-busy={busy} className="w-commerce-commercebuynowbutton button is--special" type="button">{busy ? 'Öppnar kassan…' : 'Köp nu ›'}</button>
            </form>
          </div>
        </div>
        {error && (
          <p role="alert" style={{ color: '#b00020', margin: '0.75rem 0', fontWeight: 600 }}>
            {error} <a href="/varukorg" style={{ textDecoration: 'underline' }}>Till varukorgen</a>
          </p>
        )}
        <div className="div-block-2">
          {FEATURES.map(f => (
            <div className="buy-feature-wrapper" key={f}>
              <Check />
              <div className="buy-feature-text">{f}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed reveal-on-scroll buy bar */}
      <div className="buy-wrapper" style={{ transform: showSticky ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)', transition: 'transform .35s cubic-bezier(0.4,0,0.2,1)' }}>
        <div className="buy-base">
          <Price fixed />
          <div>
            <form className="w-commerce-commerceaddtocartform default-state-3" onSubmit={e => e.preventDefault()}>
              <button onClick={buyNow} disabled={busy} aria-busy={busy} className="w-commerce-commercebuynowbutton button is--special" type="button">{busy ? 'Öppnar kassan…' : 'Köp nu ›'}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
