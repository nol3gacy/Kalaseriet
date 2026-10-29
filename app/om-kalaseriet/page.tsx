import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Om Kalaseriet – digitala kalaspaket för barnkalas',
  description: 'Kalaseriet gör barnkalas enkla att planera. Läs om idén bakom våra 33 digitala kalaspaket med lekar, recept och färdiga checklistor för barn 4–8 år.',
  alternates: { canonical: '/om-kalaseriet' },
}

const STATS = [
  { num: '33', label: 'kalaspaket', emoji: '🎯' },
  { num: '4', label: 'åldersgrupper', emoji: '👶' },
  { num: '129 kr', label: 'per paket', emoji: '💜' },
]

// Matches the product pages' "Nedladdningen innehåller" (lib/data/included-items.ts);
// this list used to promise table decorations, flags and digital invitations.
const INCLUDES = [
  '20 kalaslekar och aktiviteter utvalda för rätt ålder och tema',
  '20 recept, allt från tårtor till milkshakes',
  'Inbjudan att skriva ut och fylla i',
  '5 tips på dekorationer som passar temat',
  'Checklista och körschema',
  'Diplom till varje barn',
  'Länk till spellista med passande musik',
  'Utskrivbara instruktioner för allt',
]

export default function OmKalaserietPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        {/* Hero */}
        <div style={{ backgroundColor: '#faf1ef', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 800,
              color: '#4e4e4e',
              lineHeight: '90%',
              marginBottom: '1.25rem',
            }}>Om Kalaseriet</h1>
            <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.4rem', color: '#5910b6', lineHeight: '130%' }}>
              Allt samlat på ett ställe — så att du kan fokusera på festen.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '5rem' }}>🎉</div>

          <h2 style={{
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 800,
            color: '#5910b6',
            marginBottom: '1.25rem',
          }}>Vår vision</h2>
          <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.1rem', color: '#4e4e4e', lineHeight: '160%', marginBottom: '1.25rem' }}>
            Kalaseriet grundades med en enkel tanke: att planera barnkalas ska vara roligt, inte stressigt.
            Vi ville skapa en plats där allt finns samlat — lekar, recept, inbjudningar och dekorationer —
            anpassat för rätt ålder och tema.
          </p>
          <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.1rem', color: '#4e4e4e', lineHeight: '160%', marginBottom: '2.5rem' }}>
            Resultatet är våra &quot;kalaskoncept&quot; — digitala paket som kombinerar 20 utvalda lekar,
            20 festrecept med allergialternativ, musikspellistor och alla utskrivbara material
            du behöver. Ladda ner, skriv ut och fira!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ backgroundColor: '#faf1ef', borderRadius: '1.75rem', padding: '1.5rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>{s.emoji}</div>
                <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#5910b6', margin: 0 }}>{s.num}</p>
                <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '0.9rem', color: '#4e4e4e', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <h2 style={{
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 800,
            color: '#5910b6',
            marginBottom: '1.25rem',
          }}>Det här ingår alltid</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem', padding: 0, listStyle: 'none' }}>
            {INCLUDES.map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'caraque-melted, sans-serif', fontSize: '1.05rem', color: '#4e4e4e' }}>
                <span style={{ color: '#5910b6', fontWeight: 700, fontSize: '1.1rem', lineHeight: '100%', marginTop: '0.15rem' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div style={{ backgroundColor: '#5910b6', borderRadius: '2rem', padding: '2.5rem 2rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#faf1ef', marginBottom: '0.75rem' }}>
              Redo att köra igång?
            </h3>
            <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.1rem', color: '#d9c9f5', marginBottom: '1.5rem' }}>
              Prova med koden KALAS20 och få 20% på ditt första köp.
            </p>
            <a href="/kalas" className="btn-primary">Se alla kalas ›</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
