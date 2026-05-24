'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/cart-context'

// Matches kalaseriet.se navbar exactly:
// - Desktop: Logo (Lottie) pill (left) + nav links pill (center) + cart pill (right)
// - Mobile: Logo (Lottie) standalone left + cart+hamburger in one white pill (right)
// - Logo scroll behavior: hides on scroll-down, slides back in on scroll-up (smooth easing)

const NAV_LINKS = [
  { label: 'Populära kalas', href: '/#populara' },
  { label: 'Alla kalas', href: '/kalas' },
  { label: 'Så funkar det', href: '/sa-funkar-det' },
  { label: 'Kalasbloggen', href: '/kalasbloggen' },
]

// Cart icon — same one kalaseriet.se uses
const CART_ICON_URL = 'https://cdn.prod.website-files.com/656cc3301afe859e486de65d/664a08f31d8b938e3847d092_cart-icon.svg'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lottieReady, setLottieReady] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  // Load Lottie web component
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!customElements.get('lottie-player')) {
      import('@lottiefiles/lottie-player').then(() => setLottieReady(true))
    } else {
      setLottieReady(true)
    }
  }, [])

  // Scroll-hide: hide on scroll-down, show on scroll-up (smooth easing)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastY.current
      // Always show near top
      if (y < 80) setHidden(false)
      else if (goingDown && y - lastY.current > 4) setHidden(true)
      else if (!goingDown && lastY.current - y > 4) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const { items, openMiniCart } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Logo: Lottie animation with CSS color override on .logo-anim
  const Logo = (
    <Link
      href="/"
      onClick={() => setMenuOpen(false)}
      style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', lineHeight: 0 }}
      aria-label="Kalaseriet — hem"
    >
      {lottieReady ? (
        /* @ts-ignore */
        <lottie-player
          class="logo-anim"
          src="https://cdn.prod.website-files.com/656cc3301afe859e486de65d/65ee06c1474caed9e5eba695_logo-anim.json"
          background="transparent"
          speed="1"
          style={{ width: '160px', height: '56px' }}
          loop
          autoplay
        />
      ) : (
        <span style={{
          fontFamily: 'caraque-solid, sans-serif',
          fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
          fontWeight: 800,
          color: '#5910b6',
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}>Kalaseriet</span>
      )}
    </Link>
  )

  const CartButton = (
    <button
      type="button"
      onClick={() => openMiniCart()}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.5rem 0.85rem',
        borderRadius: '500px',
        textDecoration: 'none',
        fontFamily: 'caraque-melted, sans-serif',
        fontSize: '1.3rem',
        fontWeight: 500,
        color: '#5910b6',
        position: 'relative',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      aria-label="Öppna varukorg"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CART_ICON_URL} alt="" width={22} height={22} style={{ display: 'block' }} />
      <span style={{ minWidth: '1ch' }}>{cartCount}</span>
    </button>
  )

  return (
    <>
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
          pointerEvents: 'none',
          transform: hidden ? 'translateY(calc(-100% - 2rem))' : 'translateY(0)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* LEFT: Logo — pill on desktop, standalone on mobile */}
        <div className="navbar-logo-wrap" style={{
          pointerEvents: 'auto',
          backgroundColor: '#fffc',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '500px',
          padding: '0.65rem 1.5rem',
        }}>
          {Logo}
        </div>

        {/* CENTER: Desktop nav links pill */}
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

        {/* RIGHT: Cart + Hamburger combined in ONE white pill */}
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
            padding: 'calc(1.5rem + 56px + 1.5rem) 1.5rem 2rem',
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
                fontFamily: 'caraque-solid, sans-serif',
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
      <div style={{ height: 'calc(1.5rem + 56px + 1.5rem)' }} />

      <style>{`
        /* Force Lottie logo color to brand indigo — Webflow's Lottie has #6e42ff which looks washed */
        .logo-anim svg path[fill],
        .logo-anim svg g[fill],
        .logo-anim svg path,
        .logo-anim svg g {
          fill: #5910b6 !important;
        }
        @media (max-width: 880px) {
          .navbar-links { display: none !important; }
          .navbar-menu-btn { display: inline-flex !important; align-items: center; }
          /* Mobile: logo pill stays white (cart+menu also in white pill) */
          .navbar-logo-wrap { padding: 0.5rem 1rem !important; }
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
