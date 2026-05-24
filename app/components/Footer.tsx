'use client'

import { useEffect, useState } from 'react'

// Matches kalaseriet.se footer exactly:
// - .footer-spacer above (white space)
// - .legal rotated text (copyright, absolute positioned)
// - .footer-wrapper: rounded card (#faf1ef), 3rem padding, grid layout
// - Columns: Kalasteman, Sidor, Det finstilta, Följ oss, Newsletter cell
// - .footer-logo Lottie at bottom-left
// - .footer-spacer.is--double at bottom

export default function Footer() {
  const [lottieLoaded, setLottieLoaded] = useState(false)

  useEffect(() => {
    if (!customElements.get('lottie-player')) {
      import('@lottiefiles/lottie-player').then(() => setLottieLoaded(true))
    } else {
      setLottieLoaded(true)
    }
  }, [])

  const year = new Date().getFullYear()

  const footerLinkStyle = {
    color: '#5910b6',
    whiteSpace: 'nowrap' as const,
    fontFamily: 'caraque-melted, sans-serif',
    fontSize: '2rem',
    fontWeight: 500,
    lineHeight: '110%',
    textDecoration: 'none',
    display: 'block',
  }

  const labelStyle = {
    fontFamily: 'caraque-solid, sans-serif',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#272729',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    marginBottom: '0.75rem',
  }

  const cellStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  }

  return (
    <footer style={{ position: 'relative', backgroundColor: 'white' }}>
      {/* Spacer */}
      <div style={{ height: '3rem' }} />

      {/* Legal — rotated text, absolute positioned */}
      <div style={{
        transformOrigin: '100%',
        color: '#5910b6',
        fontSize: '1.1rem',
        lineHeight: '120%',
        position: 'absolute',
        right: '4.4rem',
        bottom: '0.8rem',
        transform: 'translate(0, -10rem) rotate(-90deg)',
        whiteSpace: 'nowrap',
        fontFamily: 'caraque-melted, sans-serif',
      }}>
        © Kalaseriet {year}
      </div>

      {/* Footer wrapper — rounded card */}
      <div style={{
        marginRight: '1.5rem',
        marginLeft: '1.5rem',
        padding: '3rem',
        borderRadius: '3rem',
        backgroundColor: '#faf1ef',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1.5rem',
      }}>
        {/* Kalasteman */}
        <div style={cellStyle}>
          <div style={labelStyle}>Kalasteman</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Kalas för 4-åringar', href: '/category/kalas-for-4-aringar' },
              { label: 'Kalas för 5-åringar', href: '/category/kalas-for-5-aringar' },
              { label: 'Kalas för 6-åringar', href: '/category/kalas-for-6-aringar' },
              { label: 'Kalas för 7 & 8-åringar', href: '/category/kalas-for-7-8-aringar' },
              { label: 'Populära kalas', href: '/populara-teman' },
              { label: 'Alla kalas', href: '/kalasen' },
            ].map(link => (
              <FooterLink key={link.label} href={link.href} style={footerLinkStyle}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Sidor */}
        <div style={cellStyle}>
          <div style={labelStyle}>Sidor</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Så funkar det', href: '/sa-funkar-det' },
              { label: 'Om Kalaseriet', href: '/om-kalaseriet' },
              { label: 'Kontakta oss', href: '/kontakta-oss' },
              { label: 'Ge feedback', href: '/lamna-feedback' },
            ].map(link => (
              <FooterLink key={link.label} href={link.href} style={footerLinkStyle}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Det finstilta */}
        <div style={cellStyle}>
          <div style={labelStyle}>Det finstilta</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Nöjdhetsgaranti', href: '/villkor#nojdhetsgaranti' },
              { label: 'Köpvillkor', href: '/villkor#kopvillkor' },
              { label: 'Din integritet', href: '/villkor#integritetspolicy' },
              { label: 'Cookies', href: '/villkor#cookies' },
            ].map(link => (
              <FooterLink key={link.label} href={link.href} style={footerLinkStyle}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Följ oss */}
        <div style={cellStyle}>
          <div style={labelStyle}>Följ oss</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/kalaseriet.se/' },
              { label: 'Facebook', href: 'https://www.facebook.com/kalaseriet' },
            ].map(link => (
              <FooterLink key={link.label} href={link.href} style={footerLinkStyle} target="_blank">
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Newsletter cell */}
        <div style={{ ...cellStyle, gridColumn: 'span 1' }}>
          <img
            src="https://cdn.prod.website-files.com/656cc3301afe859e486de65d/66a743fbd7d2db21c44c5e95_tips.svg"
            loading="lazy"
            alt=""
            style={{ width: '80px', height: 'auto' }}
          />
          <form
            onSubmit={e => e.preventDefault()}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}
          >
            <input
              type="email"
              placeholder="Din e-mail"
              required
              style={{
                flex: 1,
                minWidth: 0,
                padding: '0.75rem 1.25rem',
                borderRadius: '500px',
                border: '1.5px solid #5910b640',
                backgroundColor: 'white',
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.4rem',
                color: '#272729',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                height: '5rem',
                padding: '0 3rem',
                backgroundColor: '#5910b6',
                color: '#faf1ef',
                borderRadius: '500px',
                border: '4px solid #3a1f92',
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Få direkt ›
            </button>
          </form>
          <p style={{
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: '1.2rem',
            color: '#4e4e4e',
            lineHeight: '130%',
            marginTop: '0.5rem',
          }}>
            Få tips & erbjudanden direkt till din E-mail! När du signar upp på nyhetsbrevet godkänner du{' '}
            <a href="/villkor" style={{ color: '#5910b6' }}>villkoren</a>,
            vi lovar att inte skicka tråkigheter.
          </p>
        </div>

        {/* Footer logo — bottom row spans full width */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1.5rem' }}>
          <a href="/" style={{ width: '60%', maxWidth: '260px', color: '#5910b6', textDecoration: 'none' }}>
            {lottieLoaded ? (
              /* @ts-ignore */
              <lottie-player
                src="https://cdn.prod.website-files.com/656cc3301afe859e486de65d/65ee06c1474caed9e5eba695_logo-anim.json"
                background="transparent"
                speed="1"
                style={{ width: '100%', height: '80px' }}
                loop
                autoplay
              />
            ) : (
              <span style={{
                fontFamily: 'caraque-solid, sans-serif',
                fontSize: '3rem',
                fontWeight: 800,
                color: '#5910b6',
              }}>
                Kalaseriet
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Footer spacer double at bottom */}
      <div style={{ height: '6rem' }} />
    </footer>
  )
}

function FooterLink({
  href,
  style,
  children,
  target,
}: {
  href: string
  style: React.CSSProperties
  children: React.ReactNode
  target?: string
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      style={style}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#3e755a')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#5910b6')}
    >
      {children}
    </a>
  )
}
