# Kalaseriet backlog

Top item next. Keep 5–15 items, ordered by what brings paying customers closer.
Live site with real customers: work on a branch, never deploy, propose to Joel.

1. (Blocked: needs real review data from Joel) Real per-product reviews, no fabricated ratings.
2. Newsletter: footer sign-ups now reach the shop inbox (live 2026-10-29, subject "Kontakt från Nyhetsbrev"). A real list and sending need an email service; Joel's OK.
3. Joel (urgent): hej@kalaseriet.se cannot receive email: kalaseriet.se has no MX record (checked 2026-10-29 via 1.1.1.1 and 8.8.8.8; DNS at Loopia). The address is published in /integritetspolicy (where GDPR requests go), /cookiepolicy and the Organization structured data. Either add mail for the domain (e.g. forwarding at Loopia) or tell me which address to publish instead; then I update lib/seo.ts and both policy pages.
4. Joel: checkout now has a promotion-code field (live 2026-10-29). Create KALAS20 in Stripe (percentage, first purchase only if that is the offer), or the field rejects the code the site advertises on every page.
5. Joel: do the recipes really have allergy alternatives? /sa-funkar-det ("Alternativ för allergier och kost finns!") and the /om-kalaseriet intro say so, the FAQ says parents should adapt the recipes themselves. Tell me which is true and I align the texts (allergy claims should be exact).
6. Joel: the real Spotify playlists per age (the ones the packages link). /spellistor pointed all four ages at Spotify's "Hot Hits Telugu"; it now opens a Spotify search and is noindex until the real links are in app/spellistor/page.tsx (then remove robots noindex and re-add it to app/sitemap.ts).
7. Joel: decide on the legal-page gaps in docs/legal-pages-review-2026-10-29.md (seller identity, a working contact address, a "Nej tack" on the cookie banner, ångerrätt wording/consent at checkout, the processor list). I can make each change on a branch once you say what you want.
8. /kalas and /populara-kalas on mobile: age filter chips and counts, and the "POPPIS" (isPopular) and "NYHET" (isNew) badges in app/page.tsx: are they backed by sales or launch dates? Badges that aren't true go to Joel.
9. Connect Analytics (funnel view_item, add_to_cart, begin_checkout, purchase to GA4 and Meta, live since 2026-10-29)/Search Console/Stripe to the control room (Joel: `node company-data.mjs auth` in No legacy OS/mini, then KALASERIET_GA4_PROPERTY / _GSC_SITE / _STRIPE_KEY in ~/.nolegacy.env).
10. Meta pixel is not on the live site (NEXT_PUBLIC_META_PIXEL_ID empty). Joel: add the pixel id in Vercel env if Meta ads are planned; the funnel events are already wired.
11. Idea for Joel (product change on a live shop): personalised invitation, the customer types the child's name/date/place on the product page or /tack and gets the invitation PDF filled in (in the browser, no server). Could lift conversion and justify a higher price. The shared Personalhandboken build.mjs does not fit (macOS-only build tool).
12. Joel: enable Preview for NEXT_PUBLIC_SANITY_* (and API_BASE) in Vercel env so PR previews build (every PR preview fails only on this).
13. Joel: the site no longer loads anything from the Webflow CDN (live 2026-10-29, checked), so a still-paid Webflow plan for kalaseriet can be cancelled (check first that the domain's DNS no longer points at Webflow).
14. Joel (design): colour contrast fails WCAG AA on the pink bento texts and decorative bento headings (Lighthouse accessibility, product page and home). Fixing means darker shades of the approved palette, so it needs your OK.
15. Live check after the 2026-10-29 release, Joel decides: send one test message each through /kontakt, /feedback and the footer newsletter form and confirm all three reach the inbox.
