'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { API_BASE } from '../../lib/api-base'
import { gtag } from '../../lib/gtag'
import { themePageForName } from '../../lib/data/themes'
import { PRODUCT_NAMES } from '../../lib/product-catalog'
import GuideLink from '../components/GuideLink'

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

  gtag('event', 'purchase', {
    transaction_id: orderId,
    value,
    currency,
    items: items.map(i => ({
      item_id: i.productId,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  })

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
  // One guide per bought theme (two ages of the same theme share a guide).
  const guides = [...new Map(items.flatMap(i => {
    const t = themePageForName(i.name)
    return t?.guide ? [[t.guide, t.heading] as const] : []
  })).entries()]
  // Same package for other ages (a sibling, next year's party): from the catalogue names,
  // "Piratkalaset för 4-åringar" -> "5-åringar", linked to the theme page.
  const bought = new Set(items.map(i => i.name))
  const otherAges = [...new Map(items.flatMap(i => {
    const [base] = i.name.split(' för ')
    const theme = themePageForName(i.name)
    const ages = Object.values(PRODUCT_NAMES).filter(n => n.startsWith(`${base} för `) && !bought.has(n)).map(n => n.split(' för ')[1])
    return theme && ages.length ? [[base, { base, ages, slug: theme.slug }] as const] : []
  })).values()]
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-6">🎉</div>
          {/* `!` utilities: Webflow's unlayered h1/p/a rules otherwise beat Tailwind's layered ones. */}
          <h1 className="!text-4xl font-bold text-gray-900 !mb-3">Tack för ditt köp!</h1>
          <p className="text-gray-500 text-lg !mb-10">
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
                  // Webflow's unlayered `a` rules (colour inherit, transparent background) beat Tailwind's layered utilities.
                  style={{ backgroundColor: '#7C3AED', color: '#fff' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Ladda ner {item.name}
                </a>
              ))}
              <p className="text-gray-500 text-sm mt-2">
                Ingen skrivare hemma? Se våra tips i <a href="/faq" style={{ color: '#7C3AED', textDecoration: 'underline' }}>vanliga frågor</a>.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-gray-500">
              Nedladdningslänken skickas till din e-post inom några minuter. Kom den inte? Titta i skräpposten och ladda om den här sidan om en stund. Spara gärna adressen till sidan: där får du alltid nya nedladdningslänkar.
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
                <p className="font-semibold text-gray-900 text-sm !mb-0">{s.label}</p>
                <p className="text-gray-500 text-xs mt-0.5 !mb-0">{s.desc}</p>
              </div>
            ))}
          </div>

          {(guides.length > 0 || otherAges.length > 0) && (
            <div className="mt-10 bg-violet-50 rounded-2xl p-6 text-left">
              <p className="font-semibold text-gray-900">Nästa steg: planera dagen</p>
              {guides.map(([slug, heading]) => <GuideLink key={slug} slug={slug} theme={heading} />)}
              {otherAges.map(o => (
                <p key={o.base} className="text-gray-600 text-sm !mt-3 !mb-0">
                  {o.base} finns även för {o.ages.join(' och ')}.{' '}
                  <a href={`/kalas/tema/${o.slug}`} style={{ color: '#7C3AED', textDecoration: 'underline' }}>Se alla åldrar</a>
                </p>
              ))}
            </div>
          )}

          <p className="mt-10 text-sm text-gray-400">
            Problem?{' '}
            <a href="/kontakt" style={{ color: '#7C3AED', textDecoration: 'underline' }}>Kontakta oss</a> så hjälper vi dig direkt.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
