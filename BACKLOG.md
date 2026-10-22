# Kalaseriet backlog

Top item next. Keep 5–15 items, ordered by what brings paying customers closer.
Live site with real customers: work on a branch, never deploy, propose to Joel.

1. (Blocked: needs real review data from Joel) Real per-product reviews, no fabricated ratings.
2. Newsletter/lead capture backend (form exists without backend); needs Joel's OK for any email service.
3. Performance, remaining: render-blocking CSS ~0.9 s (trim kalaseriet.webflow.css, 100 KB; risky on a Webflow replica, test visually). Covers now WebP in grid and slider (JPG kept for og:image). gtag is async in <head> on purpose; leave it.
4. Deploy the Worker + site with the new /contact endpoint, then send one test message through /kontakt and /feedback (Joel decides: live change). Consider rate limiting /contact (Cloudflare rule) if spam shows up.
