'use client'

import { useState } from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  const footerLinkStyle: React.CSSProperties = {
    color: '#5910b6',
    whiteSpace: 'nowrap',
    fontFamily: 'caraque-melted, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 500,
    lineHeight: '110%',
    textDecoration: 'none',
    display: 'block',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'caraque-melted, sans-serif',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#272729',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
  }

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }

  return (
    <footer style={{ position: 'relative', backgroundColor: 'white' }}>
      <div style={{ height: '3rem' }} />

      {/* Legal rotated */}
      <div style={{
        transformOrigin: '100%',
        color: '#5910b6',
        fontSize: '1rem',
        position: 'absolute',
        right: '4.4rem',
        bottom: '0.8rem',
        transform: 'translate(0, -10rem) rotate(-90deg)',
        whiteSpace: 'nowrap',
        fontFamily: 'caraque-melted, sans-serif',
      }}>
        © Kalaseriet {year}
      </div>

      {/* Footer card */}
      <div style={{
        marginRight: '1.5rem',
        marginLeft: '1.5rem',
        padding: '3rem',
        borderRadius: '3rem',
        backgroundColor: '#faf1ef',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '2rem',
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
            <FooterLink key={link.label} href={link.href} style={footerLinkStyle}>
              {link.label}
            </FooterLink>
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
            <FooterLink key={link.label} href={link.href} style={footerLinkStyle}>
              {link.label}
            </FooterLink>
          ))}
        </div>

        {/* Det finstilta */}
        <div style={cellStyle}>
          <div style={labelStyle}>Det finstilta</div>
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

        {/* Newsletter — spans 2 columns so the input is genuinely wide */}
        <div style={{ ...cellStyle, gridColumn: 'span 2', minWidth: '280px' }}>
          <img
            src="/stickers/tips.svg"
            loading="lazy"
            alt=""
            style={{ width: '92px', height: 'auto', marginBottom: '0.5rem' }}
          />

          <NewsletterForm />

          <p style={{
            fontFamily: 'caraque-melted, sans-serif',
            fontSize: '1.05rem',
            color: '#4e4e4e',
            lineHeight: '130%',
            marginTop: '0.25rem',
          }}>
            Få tips &amp; erbjudanden direkt till din E-mail! När du signar upp godkänner du{' '}
            <a href="/villkor" style={{ color: '#5910b6' }}>villkoren</a>,
            vi lovar att inte skicka tråkigheter, för vem gillar egentligen överraskningar ;-)
          </p>
        </div>

        {/* Large logo — fills 100% of container width (jättestor) */}
        <div style={{
          gridColumn: '1 / -1',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1.5px solid rgba(89,16,182,0.12)',
          width: '100%',
        }}>
          <a href="/" style={{ display: 'block', textDecoration: 'none', width: '100%' }} aria-label="Kalaseriet — hem">
            {/* Word fills container width — uses viewport-relative + container queries */}
            <div style={{ width: '100%', textAlign: 'center', lineHeight: 0 }}>
              <span style={{
                fontFamily: 'caraque-solid, sans-serif',
                /* 18vw ≈ word fills container at typical aspect ratios; clamped sane */
                fontSize: 'clamp(4rem, 18vw, 18rem)',
                fontWeight: 800,
                color: '#5910b6',
                lineHeight: 1,
                letterSpacing: '-0.015em',
                display: 'inline-block',
              }}>
                Kalaseriet
              </span>
            </div>
          </a>
        </div>
      </div>

      <div style={{ height: '6rem' }} />

      <style>{`
        @media (max-width: 600px) {
          footer [style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 380px) {
          footer [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
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
        padding: '0.4rem 0.4rem 0.4rem 1.4rem',
        width: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Blinking cursor — sits inside the input field BEFORE the placeholder text */}
      {email === '' && (
        <span
          aria-hidden="true"
          className="blink-cursor"
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.6rem',
            color: '#5910b6',
            fontWeight: 300,
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >|</span>
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
          padding: '1rem 0.5rem 1rem 0.5rem',
          borderRadius: '500px',
          border: 'none',
          backgroundColor: 'transparent',
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.35rem',
          color: '#272729',
          outline: 'none',
        }}
      />

      <button
        type="submit"
        style={{
          padding: '1rem 2rem',
          background: 'radial-gradient(circle at 30% 25%, #8a5cf5 0%, #5910b6 55%, #3a1f92 100%)',
          color: '#faf1ef',
          borderRadius: '500px',
          border: 'none',
          fontFamily: 'caraque-melted, sans-serif',
          fontSize: '1.4rem',
          fontWeight: 500,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.3),' +
            'inset 0 -3px 8px rgba(0,0,0,0.2),' +
            '0 4px 12px rgba(89,16,182,0.3)',
        }}
      >
        Få direkt ›
      </button>
    </form>
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
