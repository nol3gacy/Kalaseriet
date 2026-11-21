'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { API_BASE } from '../../lib/api-base'

const INDIGO = '#5910b6'
const PURPLE = '#6e42ff'
const CREAM = '#faf1ef'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '2px solid #f0ebee',
  borderRadius: '1.25rem',
  padding: '0.9rem 1.2rem',
  color: '#4e4e4e',
  fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
  fontSize: '1.05rem',
  outline: 'none',
}

export default function KontaktPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', hasPurchased: 'nej', message: '', consent: false, website: '' })

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'contact', ...form }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Meddelandet gick inte att skicka just nu. Försök igen om en stund.')
    }
    setBusy(false)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <div style={{ backgroundColor: CREAM, padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 800,
              color: '#4e4e4e',
              lineHeight: '90%',
              marginBottom: '1.5rem',
            }}>E.T. Phone home</h1>
            <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: '1.4rem', color: INDIGO, lineHeight: '130%' }}>
              Hör av dig – vi svarar så snabbt vi kan.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>📬</div>
              <h2 style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: INDIGO, marginBottom: '0.75rem' }}>
                Tack för ditt meddelande!
              </h2>
              <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: '1.2rem', color: '#7c7c7c' }}>
                Vi återkommer inom 1–3 arbetsdagar, eller så snart vi kan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontFamily: 'caraque-melted, caraque-fallback, sans-serif' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, color: INDIGO, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ditt namn *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Anna Andersson"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, color: INDIGO, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                  Har du köpt en produkt?
                </label>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {['ja', 'nej'].map(v => (
                    <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1.05rem', color: '#4e4e4e', textTransform: 'capitalize' }}>
                      <input
                        type="radio"
                        name="hasPurchased"
                        value={v}
                        checked={form.hasPurchased === v}
                        onChange={() => setForm(f => ({ ...f, hasPurchased: v }))}
                        style={{ accentColor: PURPLE }}
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, color: INDIGO, fontSize: '1.1rem', marginBottom: '0.5rem' }}>E-post *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="anna@exempel.se"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, color: INDIGO, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Meddelande *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Vad kan vi hjälpa dig med?"
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                  style={{ marginTop: '0.2rem', accentColor: PURPLE }}
                />
                <span style={{ fontSize: '0.95rem', color: '#7c7c7c', fontFamily: 'caraque-melted, caraque-fallback, sans-serif' }}>
                  Jag godkänner att Kalaseriet lagrar mina uppgifter för att kunna svara på mitt meddelande.{' '}
                  <a href="/villkor#integritetspolicy" style={{ color: PURPLE, textDecoration: 'underline' }}>Integritetspolicy</a>
                </span>
              </label>

              {/* Honeypot: hidden from people, bots fill it. */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={form.website}
                onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

              {error && <p role="alert" style={{ color: '#b00020', fontWeight: 600, margin: 0 }}>{error}</p>}

              <button
                type="submit"
                disabled={busy}
                style={{
                  width: '100%',
                  backgroundColor: PURPLE,
                  color: '#faf1ef',
                  fontWeight: 700,
                  fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
                  padding: '1.2rem',
                  borderRadius: '500px',
                  fontSize: '1.3rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {busy ? 'Skickar…' : 'Skicka meddelande'}
              </button>
            </form>
          )}

          {/* Social */}
          <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #f0ebee', textAlign: 'center' }}>
            <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', color: '#7c7c7c', marginBottom: '1rem' }}>Eller hitta oss på sociala medier</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Instagram', emoji: '📸', href: 'https://www.instagram.com/kalaseriet' },
                { label: 'Facebook', emoji: '👍', href: 'https://www.facebook.com/kalaseriet' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: CREAM,
                    padding: '0.65rem 1.25rem',
                    borderRadius: '500px',
                    fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: INDIGO,
                    textDecoration: 'none',
                  }}
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
