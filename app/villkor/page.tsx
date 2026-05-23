import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Villkor – Kalaseriet',
}

export default function VillkorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="bg-violet-50 border-b border-violet-100 py-14 text-center">
          <h1 className="text-5xl font-bold text-gray-900">Villkor</h1>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-14 space-y-14">

          {/* Köpvillkor */}
          <section id="kopvillkor">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Köpvillkor</h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Leverans</h3>
                <p>Leverans sker omedelbart efter genomförd betalning. Du får en nedladdningslänk per e-post och direkt på bekräftelsesidan. Nedladdningslänken är giltig i 30 dagar.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Nöjdhetsgaranti och återköpsrätt</h3>
                <p>Vi erbjuder 100% nöjdhetsgaranti. Om du har genomfört kalaset och inte är nöjd med produkten kan du begära återbetalning via vårt feedbackformulär. Vi behandlar alla ärenden inom 1–2 vardagar.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Upphovsrätt och licens</h3>
                <p>Alla digitala produkter är skyddade av upphovsrätt och licensieras för personligt bruk. Det är inte tillåtet att distribuera, vidareförsälja, dela eller kopiera materialet till andra. Varje köp ger rätt att använda paketet för ett enskilt barnkalas i det egna hemmet.</p>
              </div>
            </div>
          </section>

          {/* Integritetspolicy */}
          <section id="integritet">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Integritetspolicy</h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Vilka uppgifter samlar vi in?</h3>
                <p>Vi samlar in namn, kontaktuppgifter och betalningsdata som du frivilligt lämnar vid köp eller via kontaktformuläret. Vi sparar inga kortuppgifter – betalning hanteras av Stripe.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Hur används uppgifterna?</h3>
                <p>Uppgifterna används för att leverera din beställning, hantera kundtjänstärenden och i förbättringssyfte. Vi delar inte dina personuppgifter med tredje part utan ditt samtycke, med undantag för vad lagen kräver.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Dina rättigheter</h3>
                <p>Du har rätt att begära utdrag, rättelse eller radering av dina uppgifter. Kontakta oss via <a href="/kontakt" className="text-[#7C3AED] underline">kontaktformuläret</a>.</p>
              </div>
            </div>
          </section>

          {/* Cookiepolicy */}
          <section id="cookies">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookiepolicy</h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Vad är cookies?</h3>
                <p>Cookies är små textfiler som lagras på din enhet när du besöker vår webbplats. De används för att webbplatsen ska fungera korrekt och för att förbättra din upplevelse.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Vilka cookies använder vi?</h3>
                <ul className="space-y-2">
                  <li><strong className="text-gray-900">Nödvändiga cookies:</strong> Krävs för att webbplatsen ska fungera (session, kundvagn).</li>
                  <li><strong className="text-gray-900">Analytiska cookies:</strong> Google Analytics – anonym statistik om besök.</li>
                  <li><strong className="text-gray-900">Marknadsföringscookies:</strong> Meta Pixel – för att kunna visa relevanta annonser.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Hantera cookies</h3>
                <p>Du kan när som helst rensa cookies i din webbläsares inställningar eller välja bort icke-nödvändiga cookies via cookiebannern.</p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
