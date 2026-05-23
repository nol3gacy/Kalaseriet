import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Om Kalaseriet',
  description: 'Lär känna Kalaseriet – idén bakom Sveriges roligaste digitala kalaspaket.',
}

export default function OmKalaserietPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-violet-50 border-b border-violet-100 py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Om Kalaseriet</h1>
            <p className="text-xl text-gray-500">Allt samlat på ett ställe – så att du kan fokusera på festen.</p>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <span className="text-8xl">🎉</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Vår vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Kalaseriet grundades med en enkel tanke: att planera barnkalas ska vara roligt, inte stressigt.
              Vi ville skapa en plats där allt finns samlat — lekar, recept, inbjudningar och dekorationer —
              anpassat för rätt ålder och tema.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Resultatet är våra "Kalaskoncept" — digitala paket som kombinerar 20 utvalda lekar,
              20 festrecept med allergialternativ, musikspellistor och alla utskrivbara material
              du behöver. Ladda ner, skriv ut och fira!
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-12">
              {[
                { num: '33', label: 'kalasteman', emoji: '🎯' },
                { num: '4', label: 'åldersgrupper', emoji: '👶' },
                { num: '99 kr', label: 'per paket', emoji: '💜' },
              ].map(s => (
                <div key={s.label} className="bg-violet-50 rounded-3xl p-6 text-center">
                  <div className="text-4xl mb-2">{s.emoji}</div>
                  <p className="text-4xl font-extrabold text-[#7C3AED]">{s.num}</p>
                  <p className="text-gray-600 text-sm font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Det här ingår alltid</h2>
            <ul className="space-y-3 mb-10">
              {[
                '20 kalaslekar utvalda för rätt ålder och tema',
                '20 festrecept – tårtor, muffins och snacks – med allergialternativ',
                'Inbjudningskort att skriva ut eller skicka digitalt',
                'Bordsdekorationer och flaggor',
                'Körschema – timme för timme',
                'Checklista för inköp och förberedelser',
                'Diplom till varje gäst som minne',
                'Musikspellista på Spotify',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="text-[#7C3AED] font-bold text-lg leading-none mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-[#7C3AED] text-white rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Redo att köra igång?</h3>
              <p className="text-violet-200 mb-6">Prova med koden KALAS20 och få 20% på ditt första köp.</p>
              <a href="/kalas" className="inline-block bg-[#FCD34D] text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors">
                Se alla kalas →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
