# Kalaseriet status

- Live Next.js shop (Vercel, Worker + R2 for downloads, Stripe checkout). Never deploy from work branches.
- Branch `work/backlog-buy-feedback`: backlog written; "Köp nu" now has loading state, double-click guard and a visible error (not yet merged, awaiting Joel).
- /varukorg checkout: Swedish error message for any failure, tolerant of `url`/`checkoutUrl` (same branch).
- Product page: one-line summary of what is included right under the buy button.
- Order email now links to /tack?session_id=… (fresh download tokens after the 7-day ones expire); /tack has a "didn't get it?" hint. Needs a Worker redeploy to take effect.
- Product structured data no longer claims a 30-day return-by-mail policy (contradicted /villkor).
- Blog posts end with a package box linking to the matching theme/age page (offerForPost in lib/data/blog-posts.ts).
- Perf (measured with Lighthouse via npx, serving out/): first 4 grid images eager on /kalas, /kalas 68 to 83, LCP 13.1 s to 4.3 s. Product page 73 (LCP 11.3 s) next.
- Next: BACKLOG.md item 3 (Lighthouse + WebP). Items 1-2 wait on Joel.
- Known: pre-existing lint errors in ProductBuySection (Price component defined in render).
- 2026-10-21 21:40: Backloggen var tom: skrev 9 prioriterade punkter. Gjorde punkt 1 på grenen work/backlog-buy-feedback (ej deployad, ej mergad): Köp nu-knappen visar nu 'Öppnar kassan…', kan inte dubbelklickas och visar ett tydligt fel istället för att tyst skicka kunden till varukorgen. Bygget går igenom.
- 2026-10-21 22:25: Punkt 1 klar på grenen work/backlog-buy-feedback (ej deployad): kassaknappen i /varukorg hade redan laddningsläge, men visade engelska/råa felmeddelanden. Nu visas alltid ett svenskt, begripligt fel om kassan inte öppnas, och koden klarar både url och checkoutUrl från Worker. Bygget går igenom.
- 2026-10-21 23:10: Punkt 1 klar på grenen work/backlog-buy-feedback (ej deployad): produktsidan visar nu en rad direkt under Köp nu-knappen med vad som ingår (20 lekar, 20 recept, inbjudan, diplom, checklista, körschema), så det syns utan att scrolla förbi långa beskrivningen. Bygget går igenom.
- 2026-10-21 23:56: Punkt 1 klar på grenen work/backlog-buy-feedback (ej deployad). Fynd: nedladdningslänkarna i orderbekräftelsen dör efter 7 dagar utan väg tillbaka. Nu innehåller mejlet en länk till /tack?session_id=… som skapar nya länkar, och /tack får en 'kom inte mejlet?'-hjälptext. Joel: kräver att Worker och sajt deployas (och ändrar kundmejlet) innan det gäller, så ta beslut när det ska live.
- 2026-10-22 00:41: Punkt 1 klar på grenen work/backlog-buy-feedback (ej deployad): produktsidornas strukturerade data påstod 30 dagars retur per post, vilket inte stämmer med /villkor (nöjdhetsgaranti, inget fönster). Påståendet är borttaget. Joel kan titta på: /villkor säger att nedladdningslänken gäller 30 dagar men koden och mejlet säger 7. Jag har inte ändrat villkorstexten.
- 2026-10-22 01:27: Gjorde blogglänkarna (punkt 1 och 2 väntar på Joel: riktiga omdömen resp. e-posttjänst). På grenen work/backlog-buy-feedback, ej deployat: varje blogginlägg slutar nu med en ruta 'Vill du slippa planera själv?' som länkar till matchande paket (pirat, 4-/6-åringar) eller alla kalas. Bygget går igenom.
- 2026-10-22 02:12: Prestandapass 1 på grenen work/backlog-buy-feedback, ej deployat: produktkorten laddar bilder lazy (33 kort i rutnätet) och muffinsbakgrunden är krympt från 913 KB. Lighthouse finns inte på minin, så inga mätvärden än; nästa runda är mätning och WebP. Bygget går igenom.
