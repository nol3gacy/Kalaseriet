'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/cart-context'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🎉</span>
            <span className="font-extrabold text-lg tracking-tight">
              <span className="text-[#5910b6]">Kalas</span><span className="text-[#F472B6]">eriet</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#populara" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#5910b6] rounded-lg hover:bg-violet-50 transition-colors">Populära kalas</a>
            <a href="#alla-kalas" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#5910b6] rounded-lg hover:bg-violet-50 transition-colors">Alla kalas</a>
            <a href="#sa-funkar-det" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#5910b6] rounded-lg hover:bg-violet-50 transition-colors">Så funkar det</a>
            <a href="#kalasbloggen" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#5910b6] rounded-lg hover:bg-violet-50 transition-colors">Kalasbloggen</a>
          </nav>

          {/* Cart + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/varukorg"
              className="btn-primary !py-2 !px-4 !text-[0.95rem] !rounded-[2rem] relative flex items-center gap-1.5"
              aria-label="Varukorg"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline">Varukorg</span>
              {cartCount > 0 && (
                <span className="bg-[#FCD34D] text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none text-[0.7rem]">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Meny"
            >
              {menuOpen
                ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {[
            { label: 'Populära kalas', href: '#populara' },
            { label: 'Alla kalas', href: '#alla-kalas' },
            { label: 'Så funkar det', href: '#sa-funkar-det' },
            { label: 'Kalasbloggen', href: '#kalasbloggen' },
          ].map(link => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#5910b6] hover:bg-violet-50 rounded-lg transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
