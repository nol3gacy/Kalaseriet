'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/cart-context'

// Matches kalaseriet.se navbar exactly:
// - Fixed position, inset: 0% 0% auto (top)
// - width: calc(100% - 14.5rem), margin: 3rem on all sides
// - border-radius: 3rem
// - background: #fffc (translucent), backdrop-filter: blur(8px)
// - height: 6rem
// - Logo: Lottie animation
// - Nav links: caraque-melted, 1.3rem, color: #6e42ff, hover bg: #6e42ff color: #faf1ef, border-radius: 30px
// - Cart: separate fixed pill top-right (cart-wrapper in original)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lottieLoaded, setLottieLoaded] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    if (!customElements.get('lottie-player')) {
      import('@lottiefiles/lottie-player').then(() => setLottieLoaded(true))
    } else {
      setLottieLoaded(true)
    }
  }, [])

  return (
    <>
      {/* Main navbar */}
      <header style={{
        zIndex: 664,
        position: 'fixed',
        inset: '0% 0% auto',
        width: 'calc(100% - 14.5rem)',
        height: '6rem',
        marginTop: '3rem',
        marginRight: '7.25rem',
        marginLeft: '7.25rem',
        borderRadius: '3rem',
        backgroundColor: '#fffc',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        {/* Nav container */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 1.5rem',
        }}>
          {/* Brand / Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
              <span style={{
                fontFamily: 'caraque-solid, sans-serif',
                fontSize: '2rem',
                fontWeight: 800,
                color: '#6e42ff',
              }}>
                Kalaseriet
              </span>
            )}
          </Link>

          {/* Desktop nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0' }} className="hidden-mobile">
            {[
              { label: 'Populära kalas', href: '/#populara' },
              { label: 'Alla kalas', href: '/kalas' },
              { label: 'Så funkar det', href: '/sa-funkar-det' },
              { label: 'Kalasbloggen', href: '/kalasbloggen' },
            ].map(link => (
              <NavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meny"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6e42ff',
              padding: '0.5rem',
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: '#fffc',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '2rem',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}>
            {[
              { label: 'Populära kalas', href: '/#populara' },
              { label: 'Alla kalas', href: '/kalas' },
              { label: 'Så funkar det', href: '/sa-funkar-det' },
              { label: 'Kalasbloggen', href: '/kalasbloggen' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '30px',
                  fontFamily: 'caraque-melted, sans-serif',
                  fontSize: '1.3rem',
                  color: '#6e42ff',
                  textDecoration: 'none',
                  lineHeight: '100%',
                  letterSpacing: '0.02em',
                  display: 'block',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Cart wrapper — fixed top-right, separate from navbar (matches .cart-wrapper) */}
      <div style={{
        zIndex: 666,
        marginTop: '3rem',
        marginRight: '3rem',
        borderRadius: '3rem',
        backgroundColor: '#fffc',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        inset: '0% 0% auto auto',
      }}>
        <Link
          href="/varukorg"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1.2rem 1.5rem',
            borderRadius: '3rem',
            textDecoration: 'none',
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: '1.3rem',
            color: '#5910b6',
            position: 'relative',
          }}
        >
          <img
            src="https://cdn.prod.website-files.com/656cc3301afe859e486de65d/664a08f31d8b938e3847d092_cart-icon.svg"
            alt="Varukorg"
            width={24}
            height={24}
          />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              backgroundColor: '#FCD34D',
              color: '#272729',
              fontSize: '0.75rem',
              fontWeight: 700,
              width: '1.25rem',
              height: '1.25rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Spacer so content doesn't go behind navbar */}
      <div style={{ height: 'calc(6rem + 3rem)' }} />

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          header[style] {
            width: calc(100% - 6rem) !important;
            margin-left: 3rem !important;
            margin-right: 3rem !important;
          }
        }
      `}</style>
    </>
  )
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      style={{
        padding: '0.75rem 1rem',
        color: '#6e42ff',
        letterSpacing: '0.02em',
        borderRadius: '30px',
        fontFamily: 'caraque-melted, sans-serif',
        fontSize: '1.3rem',
        fontWeight: 400,
        lineHeight: '100%',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'background-color 0.15s, color 0.15s',
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
      {label}
    </a>
  )
}
