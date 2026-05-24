'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/cart-context'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lottieLoaded, setLottieLoaded] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    // Load lottie-player web component
    if (!customElements.get('lottie-player')) {
      import('@lottiefiles/lottie-player').then(() => setLottieLoaded(true))
    } else {
      setLottieLoaded(true)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4 pb-0">
      <div
        className="max-w-7xl mx-auto rounded-[2rem] px-4 sm:px-6"
        style={{ backgroundColor: '#faf1ef' }}
      >
        <div className="flex items-center justify-between h-20">

          {/* Logo — Lottie animation */}
          <Link href="/" className="flex items-center gap-2 shrink-0 h-full py-2">
            {lottieLoaded ? (
              /* @ts-ignore */
              <lottie-player
                src="https://cdn.prod.website-files.com/656cc3301afe859e486de65d/65ee06c1474caed9e5eba695_logo-anim.json"
                background="transparent"
                speed="1"
                style={{ width: '160px', height: '64px' }}
                loop
                autoplay
              />
            ) : (
              <span
                className="font-extrabold text-2xl tracking-tight"
                style={{ fontFamily: 'caraque-solid, sans-serif', color: '#6e42ff' }}
              >
                Kalaseriet
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Populära kalas', href: '/#populara' },
              { label: 'Alla kalas', href: '/#alla-kalas' },
              { label: 'Så funkar det', href: '/#sa-funkar-det' },
              { label: 'Kalasbloggen', href: '/kalasbloggen' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-[2rem] font-medium transition-colors"
                style={{
                  fontFamily: 'caraque-melted, sans-serif',
                  fontSize: '1.3rem',
                  color: '#6e42ff',
                  lineHeight: 1,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#6e42ff'
                  ;(e.currentTarget as HTMLElement).style.color = '#faf1ef'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = '#6e42ff'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Cart + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/varukorg"
              className="flex items-center gap-2 px-5 py-3 rounded-[2rem] font-medium transition-colors relative"
              style={{
                backgroundColor: '#5910b6',
                color: '#faf1ef',
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.3rem',
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline">Varukorg</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FCD34D] text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-xl transition-colors"
              style={{ color: '#6e42ff' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Meny"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-1 border-t" style={{ borderColor: '#e8ddd8' }}>
            {[
              { label: 'Populära kalas', href: '/#populara' },
              { label: 'Alla kalas', href: '/#alla-kalas' },
              { label: 'Så funkar det', href: '/#sa-funkar-det' },
              { label: 'Kalasbloggen', href: '/kalasbloggen' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-[1.5rem] font-medium transition-colors"
                style={{
                  fontFamily: 'caraque-melted, sans-serif',
                  fontSize: '1.3rem',
                  color: '#6e42ff',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
