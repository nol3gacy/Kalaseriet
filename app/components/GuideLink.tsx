// "Read our guide" link from a theme or product page to its blog theme guide.
export default function GuideLink({ slug, theme }: { slug: string; theme: string }) {
  return (
    <p style={{ margin: '1rem 0 0' }}>
      <a href={`/kalasbloggen/${slug}`} style={{ color: '#5910b6', fontSize: '1.05rem', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        Läs vår guide till {theme.toLowerCase()} ›
      </a>
    </p>
  )
}
