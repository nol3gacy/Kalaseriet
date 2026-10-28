import { themePages } from '../../lib/data/themes'

// Links to every theme landing page, in the product page's tag-pill style.
export default function ThemeLinks({ heading = 'Kalas efter tema', exclude }: { heading?: string; exclude?: string }) {
  return (
    <section style={{ padding: '4rem 1.5rem 0', textAlign: 'center' }}>
      <h2 style={{
        fontFamily: 'caraque-melted, sans-serif',
        fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
        fontWeight: 800,
        color: '#5910b6',
        marginBottom: '1.5rem',
        lineHeight: '100%',
      }}>{heading}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: '780px', margin: '0 auto' }}>
        {themePages.filter(t => t.slug !== exclude).map(t => (
          <a key={t.slug} href={`/kalas/tema/${t.slug}`} className="link-block w-inline-block">
            <div className="tag-text">{t.heading}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
