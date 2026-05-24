'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../lib/cart-context'

export default function VarukorgPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  async function handleCheckout() {
    setLoading(true)
    setError(undefined)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product._id,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Checkout failed')

      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
        return
      }

      throw new Error('No checkout URL received')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Varukorgen är tom</h1>
            <p className="text-gray-500 mb-8">
              Lägg till ett kalaspaket för att komma igång!
            </p>
            <Link href="/kalas" className="btn-primary">
              Se alla kalas ›
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Varukorgen</h1>

          <div className="space-y-4 mb-10">
            {items.map(item => (
              <div key={item.product._id} className="border border-gray-200 rounded-2xl p-6 flex items-start gap-6">
                {/* Product image */}
                {item.product.externalImageUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.product.externalImageUrl}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                  />
                )}

                {/* Product info */}
                <div className="flex-1">
                  <Link href={`/kalas/${item.product.slug.current}`} className="hover:opacity-70">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{item.product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-4">
                    för {item.product.ageGroup === '7-8' ? '7 & 8' : item.product.ageGroup}-åringar
                  </p>

                </div>

                {/* Price & remove */}
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-extrabold text-gray-900 mb-4">
                    {item.product.price * item.quantity} kr
                  </p>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-semibold text-gray-900">Totalt</p>
              <p className="text-3xl font-extrabold text-gray-900">{total} kr</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full !text-lg disabled:opacity-60"
            >
              {loading ? 'Laddar...' : `Gå till betalning – ${total} kr`}
            </button>

            <Link href="/kalas" className="btn-secondary w-full mt-3">
              Fortsätt handla
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500">
            Betala tryggt med kort, Klarna eller PayPal. Din data är helt säker.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
