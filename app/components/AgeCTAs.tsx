const AGE_CTAS = [
  { label: '4 år', href: '/kalas/4-aringar' },
  { label: '5 år', href: '/kalas/5-aringar' },
  { label: '6 år', href: '/kalas/6-aringar' },
  { label: '7 eller 8 år', href: '/kalas/7-8-aringar' },
]

export default function AgeCTAs() {
  return (
    <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
      <h2 style={{
        fontFamily: 'caraque-melted, sans-serif',
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
  )
}
