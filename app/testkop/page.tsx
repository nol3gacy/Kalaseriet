import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TestBuyButton from '../components/TestBuyButton'

// Hidden page for verifying the live payment chain with a real but cheap
// charge. noindex + absent from the sitemap and every navigation link, so
// it can't be found by customers or search engines — only by direct URL.
export const metadata = {
  title: 'Testköp',
  robots: { index: false, follow: false },
}

export default function TestkopPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🧪</div>
          <h1 style={{
            fontFamily: 'caraque-melted, caraque-fallback, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            color: '#5910b6',
            lineHeight: '95%',
            marginBottom: '1rem',
          }}>Testköp — 3 kr</h1>

          <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: '1.1rem', color: '#4e4e4e', lineHeight: '160%', marginBottom: '0.75rem' }}>
            Det här är ett <strong>riktigt köp</strong> som drar 3 kr från kortet. Använd det
            för att verifiera hela kedjan: betalning → webhook → mail → nedladdning.
          </p>
          <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: '1rem', color: '#7c7c7c', lineHeight: '160%', marginBottom: '2rem' }}>
            3 kr är Stripes lägsta tillåtna belopp i SEK. Återbetala i Stripe efteråt:
            Payments → välj betalningen → Refund.
          </p>

          <TestBuyButton />

          <div style={{ marginTop: '2.5rem', padding: '1.25rem', backgroundColor: '#faf1ef', borderRadius: '1.5rem' }}>
            <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: '0.95rem', color: '#4e4e4e', margin: 0, lineHeight: '150%' }}>
              <strong>Kontrollera efter köpet:</strong> kom bekräftelsemailet fram? Det är det
              enda som visar att webhooken fungerar i live-läge. Betalningen går igenom
              oavsett — mailet gör det inte.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
