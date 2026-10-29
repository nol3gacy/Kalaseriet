'use client'

import { useEffect, useState } from 'react'
import { gtag } from '../../lib/gtag'

const STORAGE_KEY = 'kalaseriet_cookie_consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
  }
}

function grantConsent(granted: boolean) {
  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: granted ? 'granted' : 'denied',
  })
  // The pixel starts revoked (see layout.tsx) and holds its events until
  // this grant, so nothing reaches Meta without consent.
  window.fbq?.('consent', granted ? 'grant' : 'revoke')
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let existing: string | null = null
    try { existing = localStorage.getItem(STORAGE_KEY) } catch { /* unavailable */ }

    if (existing === 'accepted') {
      grantConsent(true)
      return
    }

    setMounted(true)
    const t = window.setTimeout(() => setVisible(true), 1000)
    return () => window.clearTimeout(t)
  }, [])

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, 'accepted') } catch { /* ignore */ }
    grantConsent(true)
    setLeaving(true)
    window.setTimeout(() => setMounted(false), 500)
  }

  if (!mounted) return null

  return (
    <div className={`cookie-banner${visible && !leaving ? ' is--in' : ''}`} role="dialog" aria-label="Cookies">
      <p className="cookie-text">
        Vi använder cookies för att förbättra din upplevelse.{' '}
        <a href="/villkor#cookies">Läs mer om cookies</a>
      </p>
      <button type="button" className="cookie-ok" onClick={accept}>OK</button>

      <style>{`
        .cookie-banner {
          position: fixed;
          left: 50%;
          bottom: 1.5rem;
          z-index: 900;
          transform: translate(-50%, calc(100% + 2rem));
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          gap: 1.25rem;
          max-width: calc(100vw - 2rem);
          padding: 0.9rem 1rem 0.9rem 1.75rem;
          border-radius: 500px;
          background-color: var(--translucent, #fffc);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }
        .cookie-banner.is--in {
          transform: translate(-50%, 0);
        }
        .cookie-text {
          font-family: caraque-melted, sans-serif;
          font-size: 1rem;
          color: var(--color--indigo, #5910b6);
          white-space: nowrap;
          margin: 0;
        }
        .cookie-text a {
          color: var(--color--purple, #6e42ff);
          text-decoration: underline;
        }
        .cookie-ok {
          flex: 0 0 auto;
          font-family: caraque-melted, sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #faf1ef;
          background: radial-gradient(circle at 30% 25%, #8a5cf5 0%, #5910b6 55%, #3a1f92 100%);
          border: none;
          border-radius: 500px;
          padding: 0.75rem 2rem;
          cursor: pointer;
          transition: transform 0.15s;
        }
        .cookie-ok:hover { transform: scale(1.05); }
        .cookie-ok:active { transform: scale(1); }

        @media (max-width: 640px) {
          .cookie-banner {
            flex-wrap: wrap;
            justify-content: center;
            padding: 1.1rem 1.25rem;
            text-align: center;
            gap: 0.75rem;
          }
          .cookie-text { white-space: normal; }
          .cookie-ok { width: 100%; }
        }
      `}</style>
    </div>
  )
}
