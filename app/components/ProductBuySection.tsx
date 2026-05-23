'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../lib/cart-context'
import MobileStickyCTA from './MobileStickyCTA'
import type { Product } from '../page'

export default function ProductBuySection({ product }: { product: Product }) {
  const router = useRouter()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleBuyNow = async () => {
    addItem(product)
    router.push('/varukorg')
  }

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      <button onClick={handleBuyNow} className="btn-primary w-full mb-4">
        Köp nu ›
      </button>
      <button onClick={handleAddToCart} className="btn-secondary w-full mb-6">
        {added ? '✓ Lagd i varukorg' : 'Lägg i varukorg'}
      </button>
      <MobileStickyCTA
        productName={product.name}
        price={product.price}
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
        isAdded={added}
      />
    </div>
  )
}
