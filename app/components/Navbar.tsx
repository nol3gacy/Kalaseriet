'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/cart-context'
import Lottie from './wf/Lottie'

const NAV_LINKS = [
  { label: 'Populära kalas', href: '/#populara' },
  { label: 'Alla kalas', href: '/kalas' },
  { label: 'Så funkar det', href: '/sa-funkar-det' },
  { label: 'Kalasbloggen', href: '/kalasbloggen' },
]

export default function Navbar() {
  const { items, openMiniCart } = useCart()
  const cartCount = items.reduce((s, i) => s + i.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  // Scroll-hide (down hides, up shows) — smooth via CSS transition
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const down = y > lastY.current
      if (y < 80) setHidden(false)
      else if (down && y - lastY.current > 4) setHidden(true)
      else if (!down && lastY.current - y > 4) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <div
        className="navbar w-nav"
        role="banner"
        style={{ transform: hidden ? 'translateY(calc(-100% - 3rem))' : 'translateY(0)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="nav-container">
          <Link href="/" className="brand w-nav-brand" onClick={() => setMenuOpen(false)}>
            <Lottie className="logo-anim" src="/wf/documents/logo-anim.json" />
          </Link>
          <nav role="navigation" className="nav-menu-wrapper w-nav-menu">
            <div className="nav-menu">
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} className="nav-link w-inline-block">
                  <div className="nav-text">{l.label}</div>
                </a>
              ))}
            </div>
          </nav>
          <div
            id="menu-button"
            className={`menu-button w-nav-button${menuOpen ? ' w--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            role="button"
            aria-label="Meny"
          >
            <div className="menu-color-plate" />
            <div className="wf-burger" aria-hidden="true">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>

      {/* Cart wrapper — separate fixed pill (opens MiniCart) */}
      <div className="cart-wrapper">
        <div className="w-commerce-commercecartwrapper cart">
          <button
            className="w-commerce-commercecartopenlink cart-button w-inline-block"
            aria-label="Öppna varukorg"
            onClick={() => openMiniCart()}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wf/images/cart-icon.svg" loading="lazy" alt="" className="cart-icon" />
            <div className="w-commerce-commercecartopenlinkcount cart-quantity">{cartCount}</div>
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="wf-mobile-menu">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        .wf-burger { display: flex; flex-direction: column; justify-content: center; gap: 6px; width: 28px; height: 28px; position: relative; z-index: 2; }
        .wf-burger span { display: block; height: 3px; border-radius: 3px; background: var(--color--indigo, #5910b6); transition: transform .25s, opacity .2s; }
        .menu-button.w--open .wf-burger span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
        .menu-button.w--open .wf-burger span:nth-child(2) { opacity: 0; }
        .menu-button.w--open .wf-burger span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
        .wf-mobile-menu { position: fixed; inset: 0; z-index: 663; background: #fff; display: flex; flex-direction: column; gap: .5rem; padding: calc(3rem + 6rem) 1.5rem 2rem; overflow-y: auto; }
        .wf-mobile-menu a { font-family: caraque-solid, sans-serif; font-size: clamp(3rem, 9vw, 4rem); font-weight: 800; color: var(--color--purple, #6e42ff); text-decoration: none; line-height: 95%; }
        /* Hide the desktop nav-menu and show the burger on small screens */
        @media (min-width: 992px) { #menu-button { display: none !important; } }
        @media (max-width: 991px) {
          .nav-menu-wrapper { display: none !important; }
          .navbar { width: calc(100% - 3rem) !important; margin-left: 1.5rem !important; margin-right: 1.5rem !important; }
        }
      `}</style>
    </>
  )
}
