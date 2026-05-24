'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  const [lottieReady, setLottieReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!customElements.get('lottie-player')) {
      import('@lottiefiles/lottie-player').then(() => setLottieReady(true))
    } else setLottieReady(true)
  }, [])

  const footerLinkStyle: React.CSSProperties = {
    color: '#5910b6',
    fontFamily: 'caraque-melted, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 500,
    lineHeight: '120%',
    textDecoration: 'none',
    display: 'block',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-manrope), system-ui, sans-serif',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#272729',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  }

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  }

  return (
    <footer style={{ position: 'relative', backgroundColor: 'white' }}>
      <div style={{ height: '3rem' }} />

      {/* Rotated © legal */}
      <div style={{
        transformOrigin: '100%',
        color: '#5910b6',
        fontSize: '0.95rem',
        position: 'absolute',
        right: '4rem',
        bottom: '2rem',
        transform: 'translate(0, -10rem) rotate(-90deg)',
        whiteSpace: 'nowrap',
        fontFamily: 'caraque-melted, sans-serif',
      }}>© Kalaseriet {year}</div>

      <div style={{
        marginRight: '1.5rem',
        marginLeft: '1.5rem',
        padding: '3rem 3rem 2rem',
        borderRadius: '3rem',
        backgroundColor: '#faf1ef',
      }}>
        {/* Top row: 3 link columns + newsletter on the right */}
        <div className="footer-top" style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Kalasteman */}
          <div style={cellStyle}>
            <div style={labelStyle}>Kalasteman</div>
            {[
              { label: 'Kalas för 4-åringar', href: '/kalas/4-aringar' },
              { label: 'Kalas för 5-åringar', href: '/kalas/5-aringar' },
              { label: 'Kalas för 6-åringar', href: '/kalas/6-aringar' },
              { label: 'Kalas 7 & 8-år', href: '/kalas/7-8-aringar' },
              { label: 'Populära kalas', href: '/#populara' },
              { label: 'Alla kalas', href: '/kalas' },
            ].map(link => (
              <FooterLink key={link.label} href={link.href} style={footerLinkStyle}>{link.label}</FooterLink>
            ))}
          </div>

          {/* Sidor */}
          <div style={cellStyle}>
            <div style={labelStyle}>Sidor</div>
            {[
              { label: 'Så funkar det', href: '/sa-funkar-det' },
              { label: 'Om Kalaseriet', href: '/om-kalaseriet' },
              { label: 'Kontakta oss', href: '/kontakt' },
              { label: 'Ge feedback', href: '/feedback' },
            ].map(link => (
              <FooterLink key={link.label} href={link.href} style={footerLinkStyle}>{link.label}</FooterLink>
            ))}
          </div>

          {/* Det finstilta */}
          <div style={cellStyle}>
            <div style={labelStyle}>Det finstilta</div>
            {[
              { label: 'Nöjdhetsgaranti', href: '/villkor#nojdhetsgaranti' },
              { label: 'Köpvillkor',      href: '/villkor#kopvillkor' },
              { label: 'Din integritet',  href: '/villkor#integritetspolicy' },
              { label: 'Cookies',         href: '/villkor#cookies' },
            ].map(link => (
              <FooterLink key={link.label} href={link.href} style={footerLinkStyle}>{link.label}</FooterLink>
            ))}
          </div>

          {/* Newsletter — right side, takes remaining space */}
          <div style={{ ...cellStyle, position: 'relative', alignSelf: 'start', maxWidth: '520px', marginLeft: 'auto', width: '100%' }}>
            <img
              src="/stickers/tips.svg"
              loading="lazy"
              alt=""
              style={{
                width: '108px',
                height: 'auto',
                position: 'absolute',
                top: '-30px',
                left: '-12px',
                transform: 'rotate(-12deg)',
                zIndex: 1,
              }}
            />
            <NewsletterForm />
            <p style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1.05rem',
              color: '#5910b6',
              lineHeight: '140%',
              fontWeight: 500,
              marginTop: '0.75rem',
            }}>
              Få tips &amp; erbjudanden direkt till din E-mail! När du signar upp på nyhetsbrevet godkänner du{' '}
              <a href="/villkor" style={{ color: '#5910b6', textDecoration: 'underline' }}>villkoren</a>,
              vi lovar att inte skicka tråkigheter, för vem gillar egentligen överraskningar ;-)
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(89,16,182,0.12)', margin: '3rem 0 1rem' }} />

        {/* Huge Lottie logo — fills the container width */}
        <a href="/" aria-label="Kalaseriet" style={{ display: 'block', width: '100%', textDecoration: 'none', lineHeight: 0 }}>
          {lottieReady ? (
            /* @ts-ignore */
            <lottie-player
              class="footer-logo-anim"
              src="https://cdn.prod.website-files.com/656cc3301afe859e486de65d/65ee06c1474caed9e5eba695_logo-anim.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: 'clamp(140px, 22vw, 380px)' }}
              loop
              autoplay
            />
          ) : (
            <div style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: 'clamp(4rem, 18vw, 18rem)',
              fontWeight: 800,
              color: '#5910b6',
              lineHeight: 1,
              textAlign: 'center',
              letterSpacing: '-0.015em',
            }}>Kalaseriet</div>
          )}
        </a>
      </div>

      <div style={{ height: '4rem' }} />

      <style>{`
        /* Force Lottie footer logo to brand indigo, full opacity */
        .footer-logo-anim svg path,
        .footer-logo-anim svg g[fill],
        .footer-logo-anim svg [fill] {
          fill: #5910b6 !important;
          opacity: 1 !important;
        }
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .footer-top > div:last-child { grid-column: 1 / -1 !important; margin-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .footer-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        fontFamily: 'caraque-melted, sans-serif',
        fontSize: '1.4rem',
        color: '#3e755a',
        padding: '0.9rem 1.25rem',
        backgroundColor: 'white',
        borderRadius: '500px',
        textAlign: 'center',
      }}>
        ✓ Tack! Vi hör av oss snart.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '500px',
        padding: '0.5rem 0.5rem 0.5rem 1.5rem',
        width: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {email === '' && (
        <span aria-hidden="true" className="blink-cursor" style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.6rem',
          color: '#5910b6',
          fontWeight: 300,
          pointerEvents: 'none',
          lineHeight: 1,
        }}>|</span>
      )}
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="    Tips & trix till kalaset?"
        required
        style={{
          flex: 1,
          minWidth: 0,
          padding: '1.1rem 0.5rem',
          borderRadius: '500px',
          border: 'none',
          backgroundColor: 'transparent',
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: '#5910b6',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        className="btn-primary"
        style={{
          padding: '1.1rem 2rem',
          fontSize: '1.4rem',
          whiteSpace: 'nowrap',
        }}
      >
        Få direkt ›
      </button>
    </form>
  )
}

function FooterLink({
  href, style, children, target,
}: {
  href: string; style: React.CSSProperties; children: React.ReactNode; target?: string
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
