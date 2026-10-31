import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Integritetspolicy',
  description: 'Så hanterar Kalaseriet dina personuppgifter: vilka uppgifter vi samlar in, hur de används, vilka tredje parter vi delar med och vilka rättigheter du har.',
  alternates: { canonical: '/integritetspolicy' },
}

const h2Style: React.CSSProperties = {
  fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
  fontSize: '1.6rem',
  fontWeight: 800,
  color: '#5910b6',
  marginBottom: '1rem',
}
const pStyle: React.CSSProperties = {
  fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
  fontSize: '1.05rem',
  color: '#4e4e4e',
  lineHeight: '160%',
}
const ulStyle: React.CSSProperties = { ...pStyle, marginLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }

export default function IntegritetspolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <div style={{ backgroundColor: '#faf1ef', padding: '5rem 1.5rem 3rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, color: '#4e4e4e', marginBottom: '0.75rem' }}>
            Integritetspolicy
          </h1>
          <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', color: '#7c7c7c' }}>Senast uppdaterad: maj 2026</p>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
          <section>
            <h2 style={h2Style}>Introduktion</h2>
            <p style={pStyle}>
              Kalaseriet (vi/oss) respekterar din integritet. Denna integritetspolicy förklarar hur vi samlar in,
              använder, lagrar och skyddar dina personuppgifter när du använder vår webbplats och köper från oss.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>Vilka personuppgifter samlar vi in?</h2>
            <p style={pStyle}>Vi samlar in följande personuppgifter:</p>
            <ul style={ulStyle}>
              <li>Namn och kontaktuppgifter (e-postadress, telefonnummer)</li>
              <li>Fakturerings- och leveransadress</li>
              <li>Betalningsinformation (via Stripe)</li>
              <li>Beställningshistorik</li>
              <li>IP-adress och webbläsarinformation (via Google Analytics)</li>
            </ul>
          </section>

          <section>
            <h2 style={h2Style}>Hur använder vi dina uppgifter?</h2>
            <p style={pStyle}>Vi använder dina personuppgifter för:</p>
            <ul style={ulStyle}>
              <li>Att behandla din order och skicka dig filerna du köpt</li>
              <li>Att skicka orderbekräftelse och leveransinformation</li>
              <li>Att svara på dina frågor och ge kundservice</li>
              <li>Att förbättra vår webbplats och tjänster</li>
              <li>Att följa lagar och regler</li>
            </ul>
          </section>

          <section>
            <h2 style={h2Style}>Tredje parter</h2>
            <p style={pStyle}>Vi delar dina personuppgifter med följande tjänsteleverantörer:</p>
            <ul style={ulStyle}>
              <li><strong>Stripe</strong> – för betalningshantering</li>
              <li><strong>Google Analytics</strong> – för webbplatsanalys</li>
              <li><strong>E-postleverantörer</strong> – för att skicka orderbekräftelser</li>
            </ul>
          </section>

          <section>
            <h2 style={h2Style}>Dina rättigheter</h2>
            <p style={pStyle}>Du har rätt att:</p>
            <ul style={ulStyle}>
              <li>Få tillgång till dina personuppgifter</li>
              <li>Korrigera felaktiga uppgifter</li>
              <li>Radera dina uppgifter (rätten att bli glömd)</li>
              <li>Invända mot viss databehandling</li>
            </ul>
            <p style={{ ...pStyle, marginTop: '1rem' }}>
              Kontakta oss på <strong>hej@kalaseriet.se</strong> om du vill utöva någon av dessa rättigheter.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>Datasäkerhet</h2>
            <p style={pStyle}>
              Vi skyddar dina personuppgifter med lämpliga tekniska och organisatoriska åtgärder.
              Betalningsinformation hanteras säkert genom Stripe och överförs aldrig direkt till oss.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>Kontakt</h2>
            <p style={pStyle}>Om du har frågor om denna integritetspolicy, kontakta oss på:</p>
            <p style={{ ...pStyle, marginTop: '0.75rem' }}><strong>E-post:</strong> hej@kalaseriet.se</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
