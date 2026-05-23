import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Tack för ditt köp! – Kalaseriet',
}

export default async function TackPage({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string; token?: string }>
}) {
  const { productId, token } = await searchParams

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Tack för ditt köp!</h1>
          <p className="text-gray-500 text-lg mb-10">
            Din betalning är bekräftad. Ladda ner ditt kalaspaket nedan — länken är även skickad till din e-post.
          </p>

          {productId && token ? (
            <a
              href={`/api/download?productId=${productId}&token=${token}`}
              className="inline-flex items-center gap-3 bg-[#7C3AED] hover:bg-violet-700 text-white font-bold py-5 px-10 rounded-2xl text-xl transition-colors shadow-xl shadow-violet-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Ladda ner kalaspaketet
            </a>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-gray-500">
              Nedladdningslänken skickas till din e-post inom några minuter.
            </div>
          )}

          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { icon: '📬', label: 'Kolla din e-post', desc: 'Länk skickad dit' },
              { icon: '🖨️', label: 'Skriv ut', desc: 'Eller ha på telefonen' },
              { icon: '🎉', label: 'Fira!', desc: 'Du är redo' },
            ].map(s => (
              <div key={s.label} className="bg-violet-50 rounded-2xl p-4">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="font-semibold text-gray-900 text-sm">{s.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-400">
            Problem?{' '}
            <a href="/kontakt" className="text-[#7C3AED] underline">Kontakta oss</a> så hjälper vi dig direkt.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
