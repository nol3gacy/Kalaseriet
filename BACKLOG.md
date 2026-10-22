# Kalaseriet backlog

Top item next. Keep 5–15 items, ordered by what brings paying customers closer.
Live site with real customers: work on a branch, never deploy, propose to Joel.

1. (Blocked: needs real review data from Joel) Real per-product reviews, no fabricated ratings.
2. Newsletter/lead capture backend (form exists without backend); needs Joel's OK for any email service.
3. Performance, remaining (product page 79 / LCP 5.5 s / 2.1 MB): render-blocking CSS ~0.9 s (trim kalaseriet.webflow.css, 100 KB), cover JPGs to WebP while keeping a JPG og:image. gtag is async in <head> on purpose (Search Console check); leave it.
4. Product page: add a short "så funkar det" strip (köp, ladda ner, skriv ut) under the buy button to cut hesitation.
5. Deploy the Worker + site with the new /contact endpoint, then send one test message through /kontakt and /feedback (Joel decides: live change). Consider rate limiting /contact (Cloudflare rule) if spam shows up.
