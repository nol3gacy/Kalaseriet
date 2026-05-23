import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

export const metadata = {
  title: 'Cookiepolicy – Kalaseriet',
  description: 'Läs vår cookiepolicy för att förstå hur vi använder cookies på vår webbplats.',
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="pt-6 mb-8">
            <Breadcrumbs items={[
              { label: 'Cookiepolicy', href: '/cookiepolicy' }
            ]} />
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Cookiepolicy</h1>
            <p className="text-gray-500">Senast uppdaterad: maj 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8 pb-20">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vad är cookies?</h2>
              <p className="text-gray-600 leading-relaxed">
                Cookies är små textfiler som sparas på din dator eller mobila enhet när du besöker vår webbplats.
                De hjälper oss att förbättra din användarupplevelse och analysera hur du använder vår webbplats.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vilka cookies använder vi?</h2>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Nödvändiga cookies</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt:
                </p>
                <ul className="space-y-2 text-gray-600 ml-6 mt-3">
                  <li>• Sessionsidentifiering</li>
                  <li>• Säkerhet och bedrägeribekämpning</li>
                  <li>• Varukorg och beställning</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Analyscookies</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vi använder Google Analytics för att förstå hur besökare använder vår webbplats:
                </p>
                <ul className="space-y-2 text-gray-600 ml-6 mt-3">
                  <li>• Besökarantal och sessioner</li>
                  <li>• Vilka sidor som är mest populära</li>
                  <li>• Teknisk information om din enhet</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Marknadsföringscookies</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vi kan använda cookies för att visa relevant reklam och förbättra vår marknadsföring.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hur kan du kontrollera cookies?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Du kan kontrollera och ta bort cookies genom dina webbläsarinställningar:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• <strong>Chrome:</strong> Inställningar → Sekretess och säkerhet → Cookies</li>
                <li>• <strong>Firefox:</strong> Inställningar → Sekretess → Cookies och webbplatsdata</li>
                <li>• <strong>Safari:</strong> Inställningar → Sekretess → Cookies</li>
                <li>• <strong>Edge:</strong> Inställningar → Sekretess → Cookies</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Observera att om du blockerar nödvändiga cookies kan webbplatsen inte fungera korrekt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tredje parters cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Följande tjänsteleverantörer kan använda cookies:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6 mt-4">
                <li>• <strong>Google Analytics</strong> – webbplatsanalys</li>
                <li>• <strong>Stripe</strong> – betalningshantering</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Uppdateringar av denna policy</h2>
              <p className="text-gray-600 leading-relaxed">
                Vi kan uppdatera denna cookiepolicy när som helst. Din continued användning av webbplatsen
                efter ändringar betyder att du accepterar de nya villkoren.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
              <p className="text-gray-600 leading-relaxed">
                Om du har frågor om denna cookiepolicy, kontakta oss på:
              </p>
              <p className="text-gray-600 mt-4">
                <strong>E-post:</strong> kontakt@kalaseriet.se
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
