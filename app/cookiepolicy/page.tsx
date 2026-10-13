import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Cookiepolicy',
  description: 'Så använder Kalaseriet cookies: nödvändiga cookies, analyscookies via Google Analytics och hur du själv kontrollerar dem i din webbläsare.',
  alternates: { canonical: '/cookiepolicy' },
}

const h2Style: React.CSSProperties = {
  fontFamily: 'caraque-melted, sans-serif',
  fontSize: '1.6rem',
  fontWeight: 800,
  color: '#5910b6',
  marginBottom: '1rem',
}
const h3Style: React.CSSProperties = {
  fontFamily: 'caraque-melted, sans-serif',
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#272729',
  marginBottom: '0.5rem',
}
const pStyle: React.CSSProperties = {
  fontFamily: 'caraque-melted, sans-serif',
  fontSize: '1.05rem',
  color: '#4e4e4e',
  lineHeight: '160%',
}
const ulStyle: React.CSSProperties = { ...pStyle, marginLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <div style={{ backgroundColor: '#faf1ef', padding: '5rem 1.5rem 3rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, color: '#4e4e4e', marginBottom: '0.75rem' }}>
            Cookiepolicy
          </h1>
          <p style={{ fontFamily: 'caraque-melted, sans-serif', color: '#7c7c7c' }}>Senast uppdaterad: maj 2026</p>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
          <section>
            <h2 style={h2Style}>Vad är cookies?</h2>
            <p style={pStyle}>
              Cookies är små textfiler som sparas på din dator eller mobila enhet när du besöker vår webbplats.
              De hjälper oss att förbättra din användarupplevelse och analysera hur du använder vår webbplats.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>Vilka cookies använder vi?</h2>

            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={h3Style}>Nödvändiga cookies</h3>
              <p style={pStyle}>Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt:</p>
              <ul style={ulStyle}>
                <li>Sessionsidentifiering</li>
                <li>Säkerhet och bedrägeribekämpning</li>
                <li>Varukorg och beställning</li>
              </ul>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={h3Style}>Analyscookies</h3>
              <p style={pStyle}>Vi använder Google Analytics för att förstå hur besökare använder vår webbplats:</p>
              <ul style={ulStyle}>
                <li>Besökarantal och sessioner</li>
                <li>Vilka sidor som är mest populära</li>
                <li>Teknisk information om din enhet</li>
              </ul>
            </div>

            <div>
              <h3 style={h3Style}>Marknadsföringscookies</h3>
              <p style={pStyle}>Vi kan använda cookies för att visa relevant reklam och förbättra vår marknadsföring.</p>
            </div>
          </section>

          <section>
            <h2 style={h2Style}>Hur kan du kontrollera cookies?</h2>
            <p style={pStyle}>Du kan kontrollera och ta bort cookies genom dina webbläsarinställningar:</p>
            <ul style={ulStyle}>
              <li><strong>Chrome:</strong> Inställningar → Sekretess och säkerhet → Cookies</li>
              <li><strong>Firefox:</strong> Inställningar → Sekretess → Cookies och webbplatsdata</li>
              <li><strong>Safari:</strong> Inställningar → Sekretess → Cookies</li>
              <li><strong>Edge:</strong> Inställningar → Sekretess → Cookies</li>
            </ul>
            <p style={{ ...pStyle, marginTop: '1rem' }}>Observera att om du blockerar nödvändiga cookies kan webbplatsen inte fungera korrekt.</p>
          </section>

          <section>
            <h2 style={h2Style}>Tredje parters cookies</h2>
            <p style={pStyle}>Följande tjänsteleverantörer kan använda cookies:</p>
            <ul style={ulStyle}>
              <li><strong>Google Analytics</strong> – webbplatsanalys</li>
              <li><strong>Stripe</strong> – betalningshantering</li>
            </ul>
          </section>

          <section>
            <h2 style={h2Style}>Uppdateringar av denna policy</h2>
            <p style={pStyle}>
              Vi kan uppdatera denna cookiepolicy när som helst. Din fortsatta användning av webbplatsen
              efter ändringar betyder att du accepterar de nya villkoren.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>Kontakt</h2>
            <p style={pStyle}>Om du har frågor om denna cookiepolicy, kontakta oss på:</p>
            <p style={{ ...pStyle, marginTop: '0.75rem' }}><strong>E-post:</strong> hej@kalaseriet.se</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
