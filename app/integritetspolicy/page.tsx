import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

export const metadata = {
  title: 'Integritetspolicy – Kalaseriet',
  description: 'Läs vår integritetspolicy för att förstå hur vi hanterar dina personuppgifter.',
}

export default function IntegritetspolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="pt-6 mb-8">
            <Breadcrumbs items={[
              { label: 'Integritetspolicy', href: '/integritetspolicy' }
            ]} />
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Integritetspolicy</h1>
            <p className="text-gray-500">Senast uppdaterad: maj 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8 pb-20">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduktion</h2>
              <p className="text-gray-600 leading-relaxed">
                Kalaseriet (vi/oss) respekterar din integritet. Denna integritetspolicy förklarar hur vi samlar in,
                använder, lagrar och skyddar dina personuppgifter när du använder vår webbplats och köper från oss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vilka personuppgifter samlar vi in?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vi samlar in följande personuppgifter:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• Namn och kontaktuppgifter (e-postadress, telefonnummer)</li>
                <li>• Fakturerings- och leveransadress</li>
                <li>• Betalningsinformation (via Stripe)</li>
                <li>• Beställningshistorik</li>
                <li>• IP-adress och webbläsarinformation (via Google Analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hur använder vi dina uppgifter?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vi använder dina personuppgifter för:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• Att behandla din order och skicka dig filerna du köpt</li>
                <li>• Att skicka orderbekräftelse och leveransinformation</li>
                <li>• Att svara på dina frågor och ge kundservice</li>
                <li>• Att förbättra vår webbplats och tjänster</li>
                <li>• Att följa lagar och regler</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tredje parter</h2>
              <p className="text-gray-600 leading-relaxed">
                Vi delar dina personuppgifter med följande tjänsteleverantörer:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6 mt-4">
                <li>• <strong>Stripe</strong> – för betalningshantering</li>
                <li>• <strong>Google Analytics</strong> – för webbplatsanalys</li>
                <li>• <strong>E-postleverantörer</strong> – för att skicka orderbekräftelser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dina rättigheter</h2>
              <p className="text-gray-600 leading-relaxed">
                Du har rätt att:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6 mt-4">
                <li>• Få tillgång till dina personuppgifter</li>
                <li>• Korrigera felaktiga uppgifter</li>
                <li>• Radera dina uppgifter (rätten att bli glömd)</li>
                <li>• Invända mot viss databehandling</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Kontakta oss på <strong>kontakt@kalaseriet.se</strong> om du vill utöva någon av dessa rättigheter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Datasäkerhet</h2>
              <p className="text-gray-600 leading-relaxed">
                Vi skyddar dina personuppgifter med lämpliga tekniska och organisatoriska åtgärder.
                Betalningsinformation hanteras säkert genom Stripe och överförings aldrig direkt till oss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
              <p className="text-gray-600 leading-relaxed">
                Om du har frågor om denna integritetspolicy, kontakta oss på:
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
