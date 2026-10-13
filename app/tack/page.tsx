'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { API_BASE } from '../../lib/api-base'

interface DownloadItem {
  productId: string
  name: string
  price: number
  quantity: number
  downloadUrl: string
}

interface SessionStatus {
  items: DownloadItem[]
  orderId?: string
  value?: number
  currency?: string
}

const TRACKED_ORDERS_KEY = 'kalaseriet_tracked_orders'

// Stripe lands the customer here after paying, but a refresh or a back-button
// return re-runs this page. Without a guard the same sale is reported again,
// which inflates revenue and teaches the ad platforms the wrong thing.
function isNewOrder(orderId: string): boolean {
  try {
    const seen: string[] = JSON.parse(localStorage.getItem(TRACKED_ORDERS_KEY) ?? '[]')
    if (seen.includes(orderId)) return false
    localStorage.setItem(TRACKED_ORDERS_KEY, JSON.stringify([...seen.slice(-19), orderId]))
  } catch {
    // Private mode / storage blocked: report the sale rather than lose it.
  }
  return true
}

function trackPurchase({ items, orderId, value, currency }: SessionStatus) {
  if (!orderId || !value || !isNewOrder(orderId)) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(['event', 'purchase', {
    transaction_id: orderId,
    value,
    currency,
    items: items.map(i => ({
      item_id: i.productId,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  }])

  window.fbq?.('track', 'Purchase', {
    value,
    currency,
    content_type: 'product',
    content_ids: items.map(i => i.productId),
  }, { eventID: orderId })
}

// useSearchParams() requires a Suspense boundary for static export builds.
export default function TackPage() {
  return (
    <Suspense fallback={<TackShell loading items={[]} />}>
      <TackContent />
    </Suspense>
  )
}

function TackContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [items, setItems] = useState<DownloadItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Tack för ditt köp! – Kalaseriet'
  }, [])

  useEffect(() => {
    if (!sessionId) {
      setLoading(false)
      return
    }
    let cancelled = false
    fetch(`${API_BASE}/session-status?session_id=${encodeURIComponent(sessionId)}`)
      .then(res => res.json())
      .then((data: SessionStatus) => {
        if (cancelled) return
        setItems(data.items ?? [])
        trackPurchase(data)
      })
      .catch(err => console.error('Failed to fetch session status:', err))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [sessionId])

  return <TackShell loading={loading} items={items} />
}

function TackShell({ loading, items }: { loading: boolean; items: DownloadItem[] }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Tack för ditt köp!</h1>
          <p className="text-gray-500 text-lg mb-10">
            Din betalning är bekräftad. Ladda ner dina kalaspaket nedan — länkarna är även skickade till din e-post.
          </p>

          {loading ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-gray-400">
              Hämtar dina nedladdningslänkar…
            </div>
          ) : items.length > 0 ? (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <a
                  key={item.productId}
                  href={item.downloadUrl}
                  className="inline-flex items-center justify-center gap-3 bg-[#7C3AED] hover:bg-violet-700 text-white font-bold py-5 px-10 rounded-2xl text-xl transition-colors shadow-xl shadow-violet-200"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Ladda ner {item.name}
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-gray-500">
              Nedladdningslänken skickas till din e-post inom några minuter.
            </div>
          )}

          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { icon: '📬', label: 'Kolla din e-post', desc: 'Länk skickad dit' },
              { icon: '🖨️', label: 'Skriv ut', desc: 'Eller ha på telefonen' },
              { icon: '🎉', label: 'Fira!', desc: 'Du är redo' },
            ].map(s => (
              <div key={s.label} className="bg-violet-50 rounded-2xl p-4">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="font-semibold text-gray-900 text-sm">{s.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-400">
            Problem?{' '}
            <a href="/kontakt" className="text-[#7C3AED] underline">Kontakta oss</a> så hjälper vi dig direkt.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
