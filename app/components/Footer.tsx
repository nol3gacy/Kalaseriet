'use client'

import { useState } from 'react'
import Lottie from './wf/Lottie'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <section className="footer">
      <div className="footer-spacer" />
      <div className="legal">© Kalaseriet <span className="year">{year}</span></div>

      <div className="footer-wrapper w-layout-layout wf-layout-layout">
        {/* Kalasteman */}
        <div className="w-layout-cell footer-cell">
          <div className="text is--footer-label">Kalasteman</div>
          <div className="footer-link-list">
            <a href="/kalas/4-aringar" className="footer-link">Kalas för 4-åringar</a>
            <a href="/kalas/5-aringar" className="footer-link">Kalas för 5-åringar</a>
            <a href="/kalas/6-aringar" className="footer-link">Kalas för 6-åringar</a>
            <a href="/kalas/7-8-aringar" className="footer-link">Kalas för 7 &amp; 8-åringar</a>
            <a href="/#populara" className="footer-link">Populära kalas</a>
            <a href="/kalas" className="footer-link">Alla kalas</a>
          </div>
        </div>

        {/* Sidor */}
        <div className="w-layout-cell footer-cell">
          <div className="text is--footer-label">Sidor</div>
          <div className="footer-link-list">
            <a href="/sa-funkar-det" className="footer-link">Så funkar det</a>
            <a href="/om-kalaseriet" className="footer-link">Om Kalaseriet</a>
            <a href="/kontakt" className="footer-link">Kontakta oss</a>
            <a href="/feedback" className="footer-link">Ge feedback</a>
          </div>
        </div>

        {/* Det finstilta */}
        <div className="w-layout-cell footer-cell">
          <div className="text is--footer-label">Det finstilta</div>
          <div className="footer-link-list">
            <a href="/villkor#nojdhetsgaranti" className="footer-link">Nöjdhetsgaranti</a>
            <a href="/villkor#kopvillkor" className="footer-link">Köpvillkor</a>
            <a href="/villkor#integritetspolicy" className="footer-link">Din integritet</a>
            <a href="/villkor#cookies" className="footer-link">Cookies</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="w-layout-cell cell is--newsletter">
          <div className="newsletter-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wf/images/tips.svg" loading="lazy" alt="" className="tips" />
            <NewsletterForm />
            <div className="newsletter-disclaimer">
              Få tips &amp; erbjudanden direkt till din E-mail! När du signar upp på nyhetsbrevet godkänner du{' '}
              <a href="/villkor">villkoren</a>, vi lovar att inte skicka tråkigheter, för vem gillar egentligen överraskningar ;-)
            </div>
          </div>
        </div>

        {/* Big Lottie logo */}
        <div className="w-layout-cell footer-cell is--bottom">
          <a href="/" className="footer-logo w-inline-block" aria-label="Kalaseriet">
            <Lottie className="logo-anim" src="/wf/documents/logo-anim.json" />
          </a>
        </div>
      </div>

      <div className="footer-spacer is--double" />
    </section>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="nyhetskorv" style={{ justifyContent: 'center', color: 'var(--color--amazon, #3e755a)', fontWeight: 700 }}>
        ✓ Tack! Vi hör av oss snart.
      </div>
    )
  }

  return (
    <form className="newsletter-form" onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true) }}>
      <div className="nyhetskorv">
        <div className="newsletter-tf-wrapper">
          {email === '' && (
            <div className="newsletter-tf-cover">
              <div className="newsletter-blinker">|</div>
              <div className="newsletter-cover-text">Tips &amp; trix till kalaset?</div>
            </div>
          )}
          <input
            className="newsletter-tf w-input"
            maxLength={256}
            name="email"
            placeholder="Din e-mail"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <input type="submit" className="button is--special w-button" value="Få direkt ›" />
      </div>
    </form>
  )
}
