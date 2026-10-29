export default function SeoText({ heading, paragraphs, children }: { heading: string; paragraphs: string[]; children?: React.ReactNode }) {
  return (
    <section style={{ padding: '4rem 1.5rem', backgroundColor: '#faf1ef' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800,
          color: '#5910b6',
          lineHeight: '100%',
          marginBottom: '1.5rem',
        }}>{heading}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.1rem',
              color: '#4e4e4e',
              lineHeight: '160%',
              margin: 0,
            }}>{p}</p>
          ))}
        </div>
        {children}
      </div>
    </section>
  )
}
