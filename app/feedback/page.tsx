'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
      <main className="min-h-screen bg-white">
        <div className="bg-violet-50 border-b border-violet-100 py-14 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Lämna feedback</h1>
            <p className="text-xl text-gray-500">
              Hur gick kalaset? Din feedback hjälper oss att bli bättre.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-14">
          {sent ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-6">🌟</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Tack för din feedback!</h2>
              <p className="text-gray-500">
                {form.wantRefund
                  ? 'Vi behandlar din återbetalningsförfrågan inom 1–2 vardagar.'
                  : 'Din feedback är ovärderlig för oss. Vi hoppas att kalaset var en succé!'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Vilket kalaspaket köpte du? *
                </label>
                <input
                  type="text"
                  required
                  value={form.product}
                  onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-violet-100"
                  placeholder="T.ex. Piratkalaset för 5-åringar"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Hur nöjd är du? *
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`text-3xl transition-transform hover:scale-125 ${rating >= n ? 'opacity-100' : 'opacity-30'}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Berätta mer *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-violet-100 resize-none"
                  placeholder="Vad var bäst? Vad kan vi förbättra? Hur reagerade barnen?"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl border-2 border-gray-100 hover:border-violet-200 transition-colors">
                <input
                  type="checkbox"
                  checked={form.wantRefund}
                  onChange={e => setForm(f => ({ ...f, wantRefund: e.target.checked }))}
                  className="mt-0.5 accent-[#7C3AED]"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Jag vill ha återbetalning</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Enligt vår nöjdhetsgaranti återbetalar vi om du genomfört kalaset och inte är nöjd.
                  </p>
                </div>
              </label>

              <button
                type="submit"
                disabled={!rating}
                className="w-full bg-[#7C3AED] hover:bg-violet-700 disabled:opacity-40 text-white font-bold py-4 rounded-2xl text-lg transition-colors"
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
