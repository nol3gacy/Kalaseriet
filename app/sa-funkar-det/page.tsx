import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Så funkar det – Kalaseriet',
  description: 'Absolut inget facit, men här är vår idé om ett oförglömligt kalas. Inför kalaset, under kalaset och hur du planerar.',
}

const BEFORE = [
  {
    n: '1',
    title: 'Välj ett tema som passar barnets ålder & intressen',
    body: 'Låt gärna barnet vara med och välja från våra kompletta kalaskoncept.',
    cta: { label: 'Välj tema här ›', href: '/kalas' },
  },
  {
    n: '2',
    title: 'Välj vilka av de 20 lekar & aktiviteter ni vill göra',
    body: 'Ofta används ca 5-7 lekar för ett kalas på 2 timmar. Våra lekar är anpassade för både inne- och utemiljöer samt gjorda för att alla ska vinna. Varje kalaslek kommer med instruktioner och tips på rekvisita som behövs.',
  },
  {
    n: '3',
    title: 'Använd mallen för inbjudan och bjud in barnen',
    body: 'Bara skriva ut och fylla i detaljer — busenkelt och snyggt! Gärna 2-3 veckor innan kalaset.',
  },
  {
    n: '4',
    title: 'Välj vilka recept ni ska göra',
    body: 'Vi har testat typ allt och kommit fram till att dessa 20 recept passar bäst på barnkalas. Alternativ för allergier och kost finns!',
  },
]

const DURING = [
  {
    n: '5',
    title: 'Ta emot gästerna',
    body: 'Ofta kommer barnen med föräldrar — se till att koka kaffe och gör lite extra godsaker för de vuxna.',
  },
  {
    n: '6',
    title: 'Ha kul med lekarna!',
    body: 'Håll er till schemat med vårt körschema och checklistor. Använd musiken vi tipsar om och ha gärna plåster till hands om olyckan är framme.',
  },
  {
    n: '7',
    title: 'Avsluta med fiskdam!',
    body: 'Här får barnen fiska upp en godispåse — tänk på att packa in en frukt och lagom med godis.',
  },
]

const AGE_CTAS = [
  { label: '4 år', href: '/kalas/4-aringar' },
  { label: '5 år', href: '/kalas/5-aringar' },
  { label: '6 år', href: '/kalas/6-aringar' },
  { label: '7 eller 8 år', href: '/kalas/7-8-aringar' },
]

function Step({ n, title, body, cta }: { n: string; title: string; body: string; cta?: { label: string; href: string } }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '1.5rem',
      alignItems: 'start',
    }}>
      {/* Big number */}
      <div style={{
        fontFamily: 'caraque-solid, sans-serif',
        fontSize: 'clamp(4rem, 8vw, 7rem)',
        fontWeight: 800,
        color: '#5910b6',
        lineHeight: '85%',
        minWidth: '4rem',
      }}>{n}</div>

      <div>
        <h3 style={{
          fontFamily: 'caraque-solid, sans-serif',
          fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)',
          fontWeight: 800,
          color: '#272729',
          lineHeight: '100%',
          marginBottom: '0.75rem',
        }}>{title}</h3>
        <p style={{
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 500,
          color: '#4e4e4e',
          lineHeight: '150%',
          marginBottom: cta ? '1rem' : 0,
        }}>{body}</p>
        {cta && (
          <a href={cta.href} className="btn-primary" style={{ fontSize: '1.3rem', padding: '1.1rem 2rem' }}>
            {cta.label}
          </a>
        )}
      </div>
    </div>
  )
}

export default function SaFunkarDet() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>

        {/* Header */}
        <section style={{
          textAlign: 'center',
          padding: '5rem 1.5rem 4rem',
          backgroundColor: '#faf1ef',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'caraque-solid, sans-serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 800,
              color: '#5910b6',
              lineHeight: '88%',
              marginBottom: '1.25rem',
            }}>Så funkar det</h1>
            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
              color: '#272729',
              fontWeight: 500,
              lineHeight: '140%',
            }}>Absolut inget facit, men här är vår idé om ett oförglömligt kalas.</p>
          </div>
        </section>

        {/* Inför kalaset */}
        <section style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'caraque-solid, sans-serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              color: '#272729',
              marginBottom: '3rem',
              lineHeight: '95%',
              textAlign: 'center',
            }}>Inför kalaset</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {BEFORE.map(s => <Step key={s.n} {...s} />)}
            </div>
          </div>
        </section>

        {/* Under kalaset */}
        <section style={{ padding: '5rem 1.5rem', backgroundColor: '#faf1ef' }}>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'caraque-solid, sans-serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              color: '#272729',
              marginBottom: '3rem',
              lineHeight: '95%',
              textAlign: 'center',
            }}>Under kalaset</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {DURING.map(s => <Step key={s.n} {...s} />)}
            </div>
          </div>
        </section>

        {/* Vad fyller barnet */}
        <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'caraque-solid, sans-serif',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
            fontWeight: 800,
            color: '#5910b6',
            marginBottom: '2.5rem',
            lineHeight: '95%',
          }}>Vad fyller barnet?</h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            maxWidth: '720px',
            margin: '0 auto',
          }}>
            {AGE_CTAS.map(c => (
              <a key={c.label} href={c.href} className="btn-primary" style={{
                fontSize: '1.5rem',
                padding: '1.3rem 2.6rem',
                flex: '0 0 auto',
              }}>
                {c.label}
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
