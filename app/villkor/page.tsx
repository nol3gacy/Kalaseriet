import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Köpvillkor, integritetspolicy & cookies',
  description: 'Kalaseriets köpvillkor, nöjdhetsgaranti, integritetspolicy och cookiepolicy. Leverans sker direkt efter betalning och nedladdningslänken gäller i 30 dagar.',
  alternates: { canonical: '/villkor' },
}

const h2Style: React.CSSProperties = {
  fontFamily: 'caraque-melted, sans-serif',
  fontSize: '2rem',
  fontWeight: 800,
  color: '#5910b6',
  marginBottom: '1.5rem',
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

export default function VillkorPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <div style={{ backgroundColor: '#faf1ef', padding: '5rem 1.5rem 3rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, color: '#4e4e4e' }}>
            Villkor
          </h1>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

          {/* Köpvillkor */}
          <section id="kopvillkor">
            <h2 style={h2Style}>Köpvillkor</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={h3Style}>Leverans</h3>
                <p style={pStyle}>Leverans sker omedelbart efter genomförd betalning. Du får en nedladdningslänk per e-post och direkt på bekräftelsesidan. Nedladdningslänken är giltig i 30 dagar.</p>
              </div>
              <div id="nojdhetsgaranti">
                <h3 style={h3Style}>Nöjdhetsgaranti och återköpsrätt</h3>
                <p style={pStyle}>Vi erbjuder 100% nöjdhetsgaranti. Om du har genomfört kalaset och inte är nöjd med produkten kan du begära återbetalning via vårt feedbackformulär. Vi behandlar alla ärenden inom 1–3 arbetsdagar, eller så snart vi kan.</p>
              </div>
              <div>
                <h3 style={h3Style}>Upphovsrätt och licens</h3>
                <p style={pStyle}>Alla digitala produkter är skyddade av upphovsrätt och licensieras för personligt bruk. Det är inte tillåtet att distribuera, vidareförsälja, dela eller kopiera materialet till andra. Varje köp ger rätt att använda paketet för ett enskilt barnkalas i det egna hemmet.</p>
              </div>
            </div>
          </section>

          {/* Integritetspolicy */}
          <section id="integritetspolicy">
            <h2 style={h2Style}>Integritetspolicy</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={h3Style}>Vilka uppgifter samlar vi in?</h3>
                <p style={pStyle}>Vi samlar in namn, kontaktuppgifter och betalningsdata som du frivilligt lämnar vid köp eller via kontaktformuläret. Vi sparar inga kortuppgifter – betalning hanteras av Stripe.</p>
              </div>
              <div>
                <h3 style={h3Style}>Hur används uppgifterna?</h3>
                <p style={pStyle}>Uppgifterna används för att leverera din beställning, hantera kundtjänstärenden och i förbättringssyfte. Vi delar inte dina personuppgifter med tredje part utan ditt samtycke, med undantag för vad lagen kräver.</p>
              </div>
              <div>
                <h3 style={h3Style}>Dina rättigheter</h3>
                <p style={pStyle}>Du har rätt att begära utdrag, rättelse eller radering av dina uppgifter. Kontakta oss via <a href="/kontakt" style={{ color: '#6e42ff', textDecoration: 'underline' }}>kontaktformuläret</a>.</p>
              </div>
            </div>
          </section>

          {/* Cookiepolicy */}
          <section id="cookies">
            <h2 style={h2Style}>Cookiepolicy</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={h3Style}>Vad är cookies?</h3>
                <p style={pStyle}>Cookies är små textfiler som lagras på din enhet när du besöker vår webbplats. De används för att webbplatsen ska fungera korrekt och för att förbättra din upplevelse.</p>
              </div>
              <div>
                <h3 style={h3Style}>Vilka cookies använder vi?</h3>
                <ul style={{ ...pStyle, marginLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong style={{ color: '#272729' }}>Nödvändiga cookies:</strong> Krävs för att webbplatsen ska fungera (session, kundvagn).</li>
                  <li><strong style={{ color: '#272729' }}>Analytiska cookies:</strong> Google Analytics – anonym statistik om besök.</li>
                </ul>
              </div>
              <div>
                <h3 style={h3Style}>Hantera cookies</h3>
                <p style={pStyle}>Du kan när som helst rensa cookies i din webbläsares inställningar eller välja bort icke-nödvändiga cookies via cookiebannern.</p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
