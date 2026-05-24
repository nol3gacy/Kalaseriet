'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/cart-context'

// Matches kalaseriet.se navbar:
// - Desktop: Logo pill (left) + Nav links pill (center) + Cart pill (right) — three separate floating pills
// - Mobile: Logo (free-floating purple text, NO pill) + Cart+Menu pill (single combined right)
// - Mobile menu: full-screen white, BIG purple caraque-melted links

const NAV_LINKS = [
  { label: 'Populära kalas', href: '/#populara' },
  { label: 'Alla kalas', href: '/kalas' },
  { label: 'Så funkar det', href: '/sa-funkar-det' },
  { label: 'Kalasbloggen', href: '/kalasbloggen' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const Logo = (
    <Link
      href="/"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        lineHeight: 0,
      }}
      onClick={() => setMenuOpen(false)}
    >
      <span style={{
        fontFamily: 'caraque-solid, sans-serif',  // chubby brand wordmark
        fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
        fontWeight: 800,
        color: '#5910b6',  // brand indigo, solid
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>
        Kalaseriet
      </span>
    </Link>
  )

  const CartButton = (
    <Link
      href="/varukorg"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.5rem 0.85rem',
        borderRadius: '500px',
        textDecoration: 'none',
        fontFamily: 'caraque-melted, sans-serif',
        fontSize: '1.3rem',
        fontWeight: 500,
        color: '#5910b6',
        position: 'relative',
      }}
      aria-label="Varukorg"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span style={{ minWidth: '1ch' }}>{cartCount}</span>
    </Link>
  )

  return (
    <>
      {/* Desktop & mobile shared header — single fixed top row */}
      <header
        style={{
          zIndex: 664,
          position: 'fixed',
          top: '1.5rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          pointerEvents: 'none', // children re-enable
        }}
      >
        {/* LEFT: Logo — on desktop in a translucent pill, on mobile standalone */}
        <div className="navbar-logo-wrap" style={{
          pointerEvents: 'auto',
          backgroundColor: '#fffc',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '500px',
          padding: '1rem 1.5rem',
        }}>
          {Logo}
        </div>

        {/* CENTER: Desktop nav links pill (hidden on mobile) */}
        <nav className="navbar-links" style={{
          pointerEvents: 'auto',
          backgroundColor: '#fffc',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '500px',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.15rem',
        }}>
          {NAV_LINKS.map(link => (
            <NavLink key={link.label} label={link.label} href={link.href} />
          ))}
        </nav>

        {/* RIGHT: Cart pill (desktop) OR combined Cart+Menu pill (mobile) */}
        <div className="navbar-actions" style={{
          pointerEvents: 'auto',
          backgroundColor: '#fffc',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '500px',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}>
          {CartButton}

          {/* Hamburger — only visible on mobile */}
          <button
            type="button"
            className="navbar-menu-btn"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#5910b6',
              padding: '0.5rem 0.7rem',
              borderRadius: '500px',
            }}
          >
            {menuOpen ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#ffffff',
            zIndex: 663,
            padding: 'calc(1.5rem + 64px + 1.5rem) 1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            overflowY: 'auto',
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'caraque-solid, sans-serif',  // BIG chubby links per screenshot
                fontSize: 'clamp(3rem, 9vw, 4rem)',
                fontWeight: 800,
                color: '#6e42ff',
                textDecoration: 'none',
                lineHeight: '95%',
                letterSpacing: '-0.01em',
                padding: '0.5rem 0',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Spacer so content doesn't go under navbar */}
      <div style={{ height: 'calc(1.5rem + 64px + 1.5rem)' }} />

      <style>{`
        @media (max-width: 880px) {
          .navbar-links { display: none !important; }
          .navbar-menu-btn { display: inline-flex !important; align-items: center; }
          .navbar-logo-wrap {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            padding: 0.5rem 0.25rem !important;
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
        padding: '0.7rem 1.1rem',
        color: '#6e42ff',
        letterSpacing: '0.01em',
        borderRadius: '500px',
        fontFamily: 'caraque-melted, sans-serif',
        fontSize: '1.25rem',
        fontWeight: 500,
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
