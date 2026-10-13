'use client'

import { useState } from 'react'
import { API_BASE } from '../../lib/api-base'

// Buy button for the hidden 3 kr test product. Price is set server-side from
// the catalog — what's sent here is only the product id.
export default function TestBuyButton() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const buy = async () => {
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId: 'ptest', productName: 'TESTPRODUKT', price: 3, quantity: 1 }],
        }),
      })
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
        return
      }
      setError(data?.error ?? 'Kunde inte skapa betalning')
    } catch {
      setError('Kunde inte nå betaltjänsten')
    }
    setBusy(false)
  }

  return (
    <>
      <button type="button" onClick={buy} disabled={busy} className="btn-primary" style={{ fontSize: '1.4rem', opacity: busy ? 0.6 : 1 }}>
        {busy ? 'Öppnar kassan…' : 'Köp testprodukt – 3 kr ›'}
      </button>
      {error && (
        <p style={{ fontFamily: 'caraque-melted, sans-serif', color: '#c0392b', marginTop: '1rem' }}>{error}</p>
      )}
    </>
  )
}
