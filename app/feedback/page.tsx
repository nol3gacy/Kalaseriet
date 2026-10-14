'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const INDIGO = '#5910b6'
const PURPLE = '#6e42ff'
const CREAM = '#faf1ef'

export default function FeedbackPage() {
  const [sent, setSent] = useState(false)
  const [rating, setRating] = useState(0)
  const [form, setForm] = useState({ product: '', message: '', wantRefund: false })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: connect form backend
    setSent(true)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <div style={{ backgroundColor: CREAM, padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 800,
              color: '#4e4e4e',
              lineHeight: '90%',
              marginBottom: '1.5rem',
            }}>Lämna feedback</h1>
            <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.4rem', color: INDIGO, lineHeight: '130%' }}>
              Hur gick kalaset? Din feedback hjälper oss att bli bättre.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>🌟</div>
              <h2 style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: INDIGO, marginBottom: '0.75rem' }}>
                Tack för din feedback!
              </h2>
              <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.2rem', color: '#7c7c7c' }}>
                {form.wantRefund
                  ? 'Vi behandlar din återbetalningsförfrågan inom 1–3 arbetsdagar, eller så snart vi kan.'
                  : 'Din feedback är ovärderlig för oss. Vi hoppas att kalaset var en succé!'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontFamily: 'caraque-melted, sans-serif' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, color: INDIGO, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Vilket kalaspaket köpte du? *
                </label>
                <input
                  type="text"
                  required
                  value={form.product}
                  onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
                  placeholder="T.ex. Piratkalaset för 5-åringar"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, color: INDIGO, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                  Hur nöjd är du? *
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      style={{
                        fontSize: '2rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        opacity: rating >= n ? 1 : 0.3,
                        transition: 'transform 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, color: INDIGO, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Berätta mer *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Vad var bäst? Vad kan vi förbättra? Hur reagerade barnen?"
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                cursor: 'pointer',
                padding: '1.25rem',
                borderRadius: '1.5rem',
                backgroundColor: CREAM,
              }}>
                <input
                  type="checkbox"
                  checked={form.wantRefund}
                  onChange={e => setForm(f => ({ ...f, wantRefund: e.target.checked }))}
                  style={{ marginTop: '0.2rem', accentColor: PURPLE }}
                />
                <div>
                  <p style={{ fontWeight: 700, color: '#4e4e4e', fontSize: '1rem', margin: 0 }}>Jag vill ha återbetalning</p>
                  <p style={{ fontSize: '0.9rem', color: '#7c7c7c', margin: '0.25rem 0 0' }}>
                    Enligt vår nöjdhetsgaranti återbetalar vi om du genomfört kalaset och inte är nöjd.
                  </p>
                </div>
              </label>

              <button
                type="submit"
                disabled={!rating}
                style={{
                  width: '100%',
                  backgroundColor: rating ? PURPLE : '#d9d3ea',
                  color: '#faf1ef',
                  fontWeight: 700,
                  fontFamily: 'caraque-melted, sans-serif',
                  padding: '1.2rem',
                  borderRadius: '500px',
                  fontSize: '1.3rem',
                  border: 'none',
                  cursor: rating ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s',
                }}
              >
                Skicka feedback
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '2px solid #f0ebee',
  borderRadius: '1.25rem',
  padding: '0.9rem 1.2rem',
  color: '#4e4e4e',
  fontFamily: 'caraque-melted, sans-serif',
  fontSize: '1.05rem',
  outline: 'none',
}
