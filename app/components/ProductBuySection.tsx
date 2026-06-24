'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../lib/cart-context'
import type { Product } from '../page'

const FEATURES = ['Leveras direkt till din e-post', '100% Nöjdhetsgaranti', 'Säker betalning']

function Check() {
  return (
    <div className="icon is--feature w-embed" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  )
}

export default function ProductBuySection({ product }: { product: Product }) {
  const router = useRouter()
  const { addItem, items } = useCart()
  const [showSticky, setShowSticky] = useState(false)

  const buyNow = async () => {
    addItem(product)
    const lineItems = [
      { productId: product._id, productName: product.name, price: product.price, quantity: 1 },
      ...items.filter(i => i.product._id !== product._id).map(({ product: p, quantity }) => ({
        productId: p._id, productName: p.name, price: p.price, quantity,
      })),
    ]
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems }),
      })
      const data = await res.json()
      if (data?.url) { window.location.href = data.url; return }
    } catch { /* fall through */ }
    router.push('/varukorg')
  }

  // Reveal the fixed buy bar once the inline buy button scrolls out of view
  useEffect(() => {
    const target = document.querySelector('[data-buy-anchor]')
    if (!target) return
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { rootMargin: '0px 0px -80px 0px' })
    obs.observe(target)
    return () => obs.disconnect()
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
              <button onClick={buyNow} className="w-commerce-commercebuynowbutton button is--special" type="button">Köp nu ›</button>
            </form>
          </div>
        </div>
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
              <button onClick={buyNow} className="w-commerce-commercebuynowbutton button is--special" type="button">Köp nu ›</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
