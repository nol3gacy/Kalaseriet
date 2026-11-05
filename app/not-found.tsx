import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AgeCTAs from './components/AgeCTAs'
import ThemeLinks from './components/ThemeLinks'

export const metadata = {
  title: 'Sidan hittades inte',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '60vh', textAlign: 'center', padding: '5rem 1.5rem 0' }}>
        <h1 style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', fontWeight: 800, color: '#5910b6', lineHeight: '92%', marginBottom: '1rem' }}>
          Hoppsan, den här sidan hittades inte
        </h1>
        <p style={{ fontFamily: 'caraque-melted, caraque-fallback, sans-serif', fontSize: '1.3rem', color: '#5910b6', marginBottom: '2rem' }}>
          Sidan kan ha flyttat. Hitta kalaspaketet du letar efter här istället.
        </p>
        <a href="/kalas" className="btn-primary">Se alla kalaspaket ›</a>
        <AgeCTAs />
        <div style={{ paddingBottom: '3rem' }}>
          <ThemeLinks />
        </div>
      </main>
      <Footer />
    </>
  )
}
