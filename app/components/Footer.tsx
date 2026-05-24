'use client'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#5910b6' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <span
              className="block text-3xl mb-4"
              style={{ fontFamily: 'caraque-solid, sans-serif', color: '#faf1ef' }}
            >
              Kalaseriet
            </span>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#e0d4f5' }}>
              Sveriges roligaste digitala kalaspaket för barn 4–8 år.
              Ladda ner, skriv ut och fira!
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://www.instagram.com/kalaseriet', label: 'Instagram', icon: '📸' },
                { href: 'https://www.facebook.com/kalaseriet', label: 'Facebook', icon: '👍' },
                { href: 'https://www.tiktok.com/@kalaseriet', label: 'TikTok', icon: '🎵' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-all hover:scale-110"
                  style={{ backgroundColor: 'rgba(250,241,239,0.15)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Kalasteman */}
          <div>
            <h4
              className="text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: 'caraque-solid, sans-serif', color: '#faf1ef', letterSpacing: '0.1em' }}
            >
              Kalasteman
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Kalas för 4-åringar', href: '/kalas/4-aringar' },
                { label: 'Kalas för 5-åringar', href: '/kalas/5-aringar' },
                { label: 'Kalas för 6-åringar', href: '/kalas/6-aringar' },
                { label: 'Kalas för 7 & 8-åringar', href: '/kalas/7-8-aringar' },
                { label: 'Alla kalas', href: '/kalas' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.4rem',
                      color: '#faf1ef',
                      textDecoration: 'none',
                      lineHeight: 1.1,
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ffa6a6'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#faf1ef'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4
              className="text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: 'caraque-solid, sans-serif', color: '#faf1ef', letterSpacing: '0.1em' }}
            >
              Om Kalaseriet
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Så funkar det', href: '/#sa-funkar-det' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Kalasbloggen', href: '/kalasbloggen' },
                { label: 'Kontakta oss', href: '/kontakt' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'caraque-melted, sans-serif',
                      fontSize: '1.4rem',
                      color: '#faf1ef',
                      textDecoration: 'none',
                      lineHeight: 1.1,
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ffa6a6'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#faf1ef'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Legal */}
          <div>
            <h4
              className="text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: 'caraque-solid, sans-serif', color: '#faf1ef', letterSpacing: '0.1em' }}
            >
              Tips & erbjudanden
            </h4>
            <form className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="din@email.se"
                className="flex-1 min-w-0 px-4 py-3 text-sm rounded-[1.5rem] outline-none"
                style={{
                  backgroundColor: 'rgba(250,241,239,0.15)',
                  border: '1.5px solid rgba(250,241,239,0.3)',
                  color: '#faf1ef',
                }}
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-[1.5rem] font-bold text-sm transition-colors"
                style={{ backgroundColor: '#ffa6a6', color: '#5910b6' }}
              >
                →
              </button>
            </form>

            <ul className="space-y-2">
              {[
                { label: 'Köpvillkor', href: '/villkor' },
                { label: 'Integritetspolicy', href: '/integritetspolicy' },
                { label: 'Cookiepolicy', href: '/cookiepolicy' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs"
                    style={{ color: 'rgba(250,241,239,0.6)', textDecoration: 'none' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="border-t py-5 text-center text-xs"
        style={{ borderColor: 'rgba(250,241,239,0.2)', color: 'rgba(250,241,239,0.5)' }}
      >
        © {new Date().getFullYear()} Kalaseriet · Allt innehåll är skyddat av upphovsrätt
      </div>
    </footer>
  )
}
