# Kalaseriet backlog

Top item next. Keep 5–15 items, ordered by what brings paying customers closer.
Live site with real customers: work on a branch, never deploy, propose to Joel.

1. (Blocked: needs real review data from Joel) Real per-product reviews, no fabricated ratings.
2. Newsletter: sign-ups from the footer now arrive in the shop inbox (subject "Kontakt från Nyhetsbrev") once the site is deployed. A real list and sending need an email service; Joel's OK.
3. Sweep the Tailwind-built pages (/tack, /varukorg, /kontakt, /feedback, 404, testkop) for utility classes that Webflow's unlayered CSS cancels (colours, backgrounds, underline, font sizes on a/button/h*): compare computed styles with the classes in Chrome and fix with inline styles where it matters. It hid the purple download button on /tack.
4. Deploy the Worker + site with the new /contact endpoint and the age-labelled product names (after the site deploy, check curl -sI https://kalaseriet.se/wf/images/leaf.png shows max-age=604800), then send one test message through /kontakt and /feedback (Joel decides: live change). Consider rate limiting /contact (Cloudflare rule) if spam shows up.
5. Connect Analytics (funnel view_item, add_to_cart, begin_checkout, purchase to GA4 and Meta now on the branch)/Search Console/Stripe to the control room (Joel: `node company-data.mjs auth` in No legacy OS/mini, then KALASERIET_GA4_PROPERTY / _GSC_SITE / _STRIPE_KEY in ~/.nolegacy.env). Merge the gtag fix first or GA4 shows no purchases.
6. Meta pixel is not on the live site (NEXT_PUBLIC_META_PIXEL_ID empty). Joel: add the pixel id in Vercel env if Meta ads are planned; the funnel events are already wired.
7. Idea for Joel (product change on a live shop): personalised invitation, the customer types the child's name/date/place on the product page or /tack and gets the invitation PDF filled in (in the browser, no server). Could lift conversion and justify a higher price. The shared Personalhandboken build.mjs does not fit (macOS-only build tool).
8. Joel: enable Preview for NEXT_PUBLIC_SANITY_* (and API_BASE) in Vercel env so PR previews build (PR #6 preview fails only on this). Then review/merge PR #6 (GA4 purchase + consent fix).
9. Joel: once this branch is live nothing loads from the Webflow CDN, so a still-paid Webflow plan for kalaseriet can be cancelled (check first that kalaseriet.se DNS no longer points at Webflow).
10. Joel (design): colour contrast fails WCAG AA on the strikethrough price (199 kr), the pink bento texts and decorative bento headings (Lighthouse accessibility, product page and home). Fixing means darker shades of the approved palette, so it needs your OK.
