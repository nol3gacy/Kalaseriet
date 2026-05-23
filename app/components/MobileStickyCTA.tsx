'use client'

import { useEffect, useState } from 'react'

interface MobileStickyCTAProps {
  productName: string
  price: number
  onAddToCart: () => void
  onBuyNow: () => void
  isAdded?: boolean
}

export default function MobileStickyCTA({
  productName,
  price,
  onAddToCart,
  onBuyNow,
  isAdded = false
}: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling down 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 md:hidden">
      <div className="px-4 py-3 flex gap-2">
        <button
          onClick={onAddToCart}
          className="btn-secondary flex-1"
        >
          {isAdded ? '✓ I varukorg' : 'Lägg i varukorg'}
        </button>
        <button
          onClick={onBuyNow}
          className="btn-primary flex-1"
        >
          Köp nu
        </button>
      </div>
    </div>
  )
}
