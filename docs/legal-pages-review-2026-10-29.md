# /villkor, /integritetspolicy, /cookiepolicy against how the shop works

Review of 2026-10-29 (branch work/backlog-buy-feedback). Nothing on these pages was
changed: legal text is Joel's call. This is a list of mismatches between what the pages
say and what the code and services actually do, plus gaps worth checking with someone
who knows Swedish consumer and data-protection law. It is not legal advice.

## Most important

1. **No seller identity anywhere.** No company or person name, organisation number or
   postal address on /villkor, /integritetspolicy, /cookiepolicy or in the footer. A
   web shop selling to consumers normally has to show who the seller is and how to
   reach them (e-handelslagen, distansavtalslagen); the privacy policy has to name the
   controller (GDPR art. 13). Joel: who is the seller today, and what should be shown?
2. **The contact address for data requests bounces.** /integritetspolicy and
   /cookiepolicy point to hej@kalaseriet.se, but kalaseriet.se has no MX record (see
   BACKLOG). /villkor says "kontaktformuläret" instead. One working route, the same on
   all pages.
3. **Cookie banner has only "OK".** /villkor and /cookiepolicy say visitors can opt out
   of non-essential cookies via the banner, but there is no "Nej tack", and no way to
   withdraw consent once given. Tracking does stay off until OK is pressed (consent
   mode defaults to denied, the Meta pixel is revoked), so nothing is set without
   consent; the gap is refusing and withdrawing. A "Nej tack" button (stores the choice,
   hides the banner) and a "Cookieinställningar" link in the footer would close it.
   Small code change, but it changes the banner Joel approved, so his decision.
4. **Right of withdrawal (ångerrätt) for digital content.** /villkor offers a
   satisfaction guarantee but says nothing about ångerrätt. For digital content
   delivered at once, the 14-day withdrawal right only lapses if the buyer expressly
   agrees to immediate delivery and accepts losing it; checkout asks for neither. Stripe
   Checkout can show a terms checkbox and custom text (consent_collection /
   custom_text) if Joel wants that.

## Mismatches with what the code does

| Page says | Reality |
| --- | --- |
| We collect phone number, billing and delivery address (/integritetspolicy) | No phone field anywhere. Stripe collects what it needs for payment (billing_address_collection: auto). There is no delivery address: delivery is a download. |
| Processors: Stripe, Google Analytics, "e-postleverantörer" | Also: Resend (order and form emails), Cloudflare (Worker: checkout, downloads, forms; sees IPs), Vercel (hosting, server logs), Google/Gmail (form messages and newsletter sign-ups land in nolegacy@gmail.com), Meta (pixel wired on the branch, consent-gated, not yet live). |
| "Vi delar inte dina personuppgifter med tredje part utan ditt samtycke" (/villkor) | The processors above receive data to run the shop without separate consent; usual wording is "personuppgiftsbiträden". |
| /villkor cookies: necessary + Google Analytics only | /cookiepolicy also lists marketing cookies, and the Meta pixel exists on the branch. The two pages should say the same thing. |
| Cart in "nödvändiga cookies" | The cart and the consent choice are in localStorage, not cookies (fine to describe as "lagring i webbläsaren"). |
| Newsletter not mentioned | The footer form now sends sign-ups to the inbox; the policy should say what the address is used for and how to unsubscribe. |
| "Din fortsatta användning ... betyder att du accepterar" (/cookiepolicy) | Consent to cookies can't be implied by continued use. |
| Missing in /integritetspolicy | Legal basis per purpose, how long data is kept (orders: bookkeeping rules; form messages; sign-ups), the right to complain to IMY. |
| "Senast uppdaterad: maj 2026" | Should change whenever the above is fixed. |

## Matches (no change needed)

- Delivery: download link by email and on /tack, valid 30 days (code: 30-day tokens).
- Card details never reach the shop (Stripe Checkout).
- Refund route: /feedback form with a refund checkbox, mailed to the shop inbox
  (needs the Worker + site deploy to work live).
