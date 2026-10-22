# Kalaseriet backlog

Top item next. Keep 5–15 items, ordered by what brings paying customers closer.
Live site with real customers: work on a branch, never deploy, propose to Joel.

1. (Blocked: needs real review data from Joel) Real per-product reviews, no fabricated ratings.
2. Newsletter/lead capture backend (form exists without backend); needs Joel's OK for any email service.
- [ ] Överväg: **Generated share images with next/og** från Begraveriet (se ~/nolegacy/shared/LIBRARY.md). Bygg in det bara om det hjälper Kalaseriet; annars stryk raden.
3. Performance round 3 (Lighthouse mobile, local build: /kalas 83 / LCP 4.3 s; product page 73 / LCP 11.3 s): product page is the weak spot (render-blocking CSS ~0.9 s, ~3.4 MB total); consider WebP for covers, trimming kalaseriet.webflow.css (100 KB), deferring gtag.

Överväg (Joel): /villkor says download links last 30 days but the code and email say 7; align the text or the TTL in lib/download-token.ts (/tack now renews links anyway).
