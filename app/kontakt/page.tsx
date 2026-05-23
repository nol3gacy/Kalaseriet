'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function KontaktPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', hasPurchased: 'nej', message: '', consent: false })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: connect to form backend (e.g. Resend, Formspree)
    setSent(true)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="bg-violet-50 border-b border-violet-100 py-14 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">E.T. Phone home</h1>
            <p className="text-xl text-gray-500">Hör av dig – vi svarar så snabbt vi kan.</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-14">
          {sent ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-6">📬</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Tack för ditt meddelande!</h2>
              <p className="text-gray-500">Vi återkommer inom 1–2 vardagar.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ditt namn *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-violet-100"
                  placeholder="Anna Andersson"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Har du köpt en produkt?
                </label>
                <div className="flex gap-4">
                  {['ja', 'nej'].map(v => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasPurchased"
                        value={v}
                        checked={form.hasPurchased === v}
                        onChange={() => setForm(f => ({ ...f, hasPurchased: v }))}
                        className="accent-[#7C3AED]"
                      />
                      <span className="text-gray-700 capitalize">{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-post</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-violet-100"
                  placeholder="anna@exempel.se"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meddelande *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-violet-100 resize-none"
                  placeholder="Vad kan vi hjälpa dig med?"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                  className="mt-0.5 accent-[#7C3AED]"
                />
                <span className="text-sm text-gray-600">
                  Jag godkänner att Kalaseriet lagrar mina uppgifter för att kunna svara på mitt meddelande.{' '}
                  <a href="/villkor#integritet" className="text-[#7C3AED] underline">Integritetspolicy</a>
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-[#7C3AED] hover:bg-violet-700 text-white font-bold py-4 rounded-2xl text-lg transition-colors"
              >
                Skicka meddelande
              </button>
            </form>
          )}

          {/* Social */}
          <div className="mt-14 pt-10 border-t border-gray-100 text-center">
            <p className="text-gray-500 mb-4">Eller hitta oss på sociala medier</p>
            <div className="flex justify-center gap-4">
              {[
                { label: 'Instagram', emoji: '📸', href: 'https://www.instagram.com/kalaseriet' },
                { label: 'Facebook', emoji: '👍', href: 'https://www.facebook.com/kalaseriet' },
                { label: 'TikTok', emoji: '🎵', href: 'https://www.tiktok.com/@kalaseriet' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 hover:bg-violet-100 hover:text-[#7C3AED] px-4 py-2.5 rounded-full text-sm font-semibold text-gray-700 transition-colors"
                >
                  {s.emoji} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
