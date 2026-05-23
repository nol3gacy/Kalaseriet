import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Så funkar det – Kalaseriet',
  description: 'Lär dig hur du snabbt planerar ett perfekt barnkalas med Kalaseriet.',
}

const STEPS = [
  {
    num: '1',
    phase: 'Välj kalas',
    title: 'Hitta rätt tema och åldersgrupp',
    desc: 'Välj bland 33 kalasteman för 4–8-åringar. Filtrera på ålder och tema så hittar du snabbt rätt paket.',
    emoji: '🎯',
    details: [
      'Pirat, safari, superhjälte, ninja och mycket mer',
      '4 åldersgrupper: 4, 5, 6 och 7–8-åringar',
      'Alla lekar och recept är anpassade för rätt ålder',
    ],
  },
  {
    num: '2',
    phase: 'Betala',
    title: 'Säker betalning på 30 sekunder',
    desc: 'Betala tryggt med kort, Swish eller Klarna. Du betalar bara 99 kr – och slipper priset för tryckeriet.',
    emoji: '💳',
    details: [
      'Tryggt med Stripe-betalning',
      '100% nöjdhetsgaranti – eller pengarna tillbaka',
      'Ordinarie pris 269 kr – du sparar 170 kr',
    ],
  },
  {
    num: '3',
    phase: 'Ladda ner',
    title: 'Direkt tillgång till alla filer',
    desc: 'Direkt efter betalning får du ett e-postmeddelande med nedladdningslänk. Inga väntetider.',
    emoji: '⚡',
    details: [
      '20 kalaslekar som PDF',
      '20 festrecept med allergialternativ',
      'Inbjudningskort, diplom, dekorationer, körschema och checklista',
    ],
  },
  {
    num: '4',
    phase: 'Fira!',
    title: 'Skriv ut och njut',
    desc: 'Skriv ut hemma eller på ett kopieringscenter. Följ körschema och checklista – du kan inte missa något.',
    emoji: '🎉',
    details: [
      'Körschema timme-för-timme',
      'Checklista för inköp och förberedelser',
      'Diplom till varje gäst som avslutning',
    ],
  },
]

const FAQ = [
  {
    q: 'Vad är ett digitalt kalaspaket?',
    a: 'Det är en ZIP-fil med PDF-dokument du laddar ner och skriver ut hemma. Paketet innehåller allt du behöver: lekar, recept, inbjudningskort, dekorationer och körschema.',
  },
  {
    q: 'Behöver jag skriva ut allt?',
    a: 'Nej! Du väljer själv vad du vill ha. Körschema och checklista kan du ha på telefonen. Inbjudningar kan du skicka digitalt.',
  },
  {
    q: 'Vad händer om jag inte är nöjd?',
    a: 'Vi erbjuder 100% nöjdhetsgaranti. Om du genomfört kalaset och inte är nöjd fyller du i feedbackformuläret så återbetalar vi hela summan.',
  },
  {
    q: 'Hur länge är nedladdningslänken giltig?',
    a: 'Nedladdningslänken är giltig i 30 dagar. Behöver du ladda ner igen efter det – kontakta oss så löser vi det.',
  },
  {
    q: 'Kan jag använda paketet till flera barn?',
    a: 'Paketet är licensierat för personligt bruk. Du kan använda det för dina egna barn, men det får inte delas vidare, säljas eller kopieras.',
  },
]

export default function SaFunkarDetPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-violet-50 border-b border-violet-100 py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-sm font-semibold text-[#7C3AED] uppercase tracking-wider mb-3">Steg för steg</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Så funkar det</h1>
            <p className="text-xl text-gray-500">
              Från betalning till färdigt kalas på under 5 minuter. Inga planeringsheadaches.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <div key={step.num} className={`flex gap-10 items-start ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 w-56 h-56 rounded-3xl flex items-center justify-center text-8xl"
                  style={{ background: i % 2 === 0 ? 'linear-gradient(135deg,#ede9fe,#ddd6fe)' : 'linear-gradient(135deg,#fce7f3,#fbcfe8)' }}>
                  {step.emoji}
                </div>
                <div className="flex-1 pt-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] mb-2">
                    <span className="w-7 h-7 bg-[#7C3AED] text-white rounded-full flex items-center justify-center text-xs font-bold">{step.num}</span>
                    {step.phase}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{step.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-5">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.details.map(d => (
                      <li key={d} className="flex items-start gap-2 text-gray-700">
                        <span className="text-[#7C3AED] font-bold mt-0.5">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo */}
        <div className="bg-[#7C3AED] text-white py-12 text-center">
          <p className="text-2xl font-bold mb-2">Prova med koden KALAS20</p>
          <p className="text-violet-200 mb-6">20% rabatt på ditt första köp</p>
          <a href="/kalas" className="inline-block bg-[#FCD34D] text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors">
            Se alla kalas →
          </a>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Vanliga frågor</h2>
          <div className="space-y-4">
            {FAQ.map(item => (
              <details key={item.q} className="group border border-gray-200 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                  {item.q}
                  <span className="text-[#7C3AED] text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
