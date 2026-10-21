# Kalaseriet status

- Live Next.js shop (Vercel, Worker + R2 for downloads, Stripe checkout). Never deploy from work branches.
- Branch `work/backlog-buy-feedback`: backlog written; "Köp nu" now has loading state, double-click guard and a visible error (not yet merged, awaiting Joel).
- /varukorg checkout: Swedish error message for any failure, tolerant of `url`/`checkoutUrl` (same branch).
- Product page: one-line summary of what is included right under the buy button.
- Next: BACKLOG.md item 1 (/tack download-email flow).
- Known: pre-existing lint errors in ProductBuySection (Price component defined in render).
- 2026-10-21 21:40: Backloggen var tom: skrev 9 prioriterade punkter. Gjorde punkt 1 på grenen work/backlog-buy-feedback (ej deployad, ej mergad): Köp nu-knappen visar nu 'Öppnar kassan…', kan inte dubbelklickas och visar ett tydligt fel istället för att tyst skicka kunden till varukorgen. Bygget går igenom.
- 2026-10-21 22:25: Punkt 1 klar på grenen work/backlog-buy-feedback (ej deployad): kassaknappen i /varukorg hade redan laddningsläge, men visade engelska/råa felmeddelanden. Nu visas alltid ett svenskt, begripligt fel om kassan inte öppnas, och koden klarar både url och checkoutUrl från Worker. Bygget går igenom.
