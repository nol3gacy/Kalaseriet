// From kalaseriet.se CMS export
export type BlogPost = {
  slug: string
  title: string
  summary: string
  body: string  // HTML
  category: string
  date: string
  imageUrl: string
}

const SV_MONTHS: Record<string, string> = {
  januari: '01', februari: '02', mars: '03', april: '04', maj: '05', juni: '06',
  juli: '07', augusti: '08', september: '09', oktober: '10', november: '11', december: '12',
}

/**
 * Converts the human date string ("25 juni 2026") to ISO 8601 for Article
 * structured data. Schema dates must match what's visible on the page —
 * a mismatch is an inconsistency signal to Google.
 */
export function isoDate(date: string): string {
  const m = date.trim().match(/^(\d{1,2})\s+(\p{L}+)\s+(\d{4})$/u)
  if (!m) return ''
  const [, day, month, year] = m
  const mm = SV_MONTHS[month.toLowerCase()]
  return mm ? `${year}-${mm}-${day.padStart(2, '0')}` : ''
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'tema-sportkalas',
    title: 'Sportkalas: Guide till grenar, lag och meny',
    summary: 'Så gör du ett sportkalas för barn 6 till 8 år, med lag, grenar och prisutdelning där alla får vara med och vinna.',
    body: `<h2>Sportkalas är rätt val för barn som har svårt att sitta still. Här är vår guide till ett kalas med lag, grenar och en prisutdelning där alla får diplom.</h2>
<h3>Stämningen</h3><p>Ett sportkalas behöver mest plats. Trädgården, en park eller en gympasal fungerar bäst, men många grenar går att göra inomhus med lite möbelflytt. Koner av muggar, startlinjer av maskeringstejp och en visselpipa till "domaren" sätter stämningen direkt.</p>
<h3>Inbjudningar</h3><p>Skriv inbjudan som en kallelse till en tävling: "Du är uttagen till kalasets mästerskap". Skriv tydligt om det blir utomhus, så att gästerna kommer i kläder och skor som tål att springa i.</p>
<h3>Utklädnad</h3><p>Sportkläder räcker långt. Gör gärna egna lagtröjor med nummer av tejp, eller dela ut pannband i två lagfärger när gästerna kommer.</p>
<h3>Grenar i prioritetsordning</h3>
<ul>
<li><strong>Hinderbanan</strong>: hoppa över kuddar, krypa under en filt och slalom mellan koner, på tid eller som stafett.</li>
<li><strong>Precisionsgrenen</strong>: kasta ärtpåsar eller bollar i hinkar på olika avstånd, där hinkarna längst bort ger flest poäng.</li>
<li><strong>Lagstafett</strong>: lagen springer med en ägg-och-sked eller en ballong mellan knäna. Samarbete väger lika tungt som fart.</li>
<li><strong>Prisutdelningen</strong>: alla får diplom och en egen kategori, som "bästa lagkamrat" eller "snabbaste fötterna", så att ingen går hem som förlorare.</li>
</ul>
<h3>Maten</h3><p>Mycket vatten och saft, fruktbitar i "energiboxar", pastasallad eller korv med bröd som "matchmat" och en tårta formad som en fotboll eller en medalj.</p>
<h3>Kalaspåsen</h3><p>En medalj av papp eller choklad, ett pannband i lagfärgen och ett diplom.</p>
<p><a href="/kalas/tema/sportkalas">Sportkalaset finns för 6-åringar och för 7- och 8-åringar</a> med 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, spellistor, dekorationstips och körschema.</p>`,
    category: 'Tema-guide',
    date: '29 oktober 2026',
    imageUrl: '/wf/images/covers/sportkalaset-for-6-aringar.jpg',
  },
  {
    slug: 'tema-robotkalas',
    title: 'Robotkalas: Guide till dekoration, lekar och meny',
    summary: 'Så gör du ett robotkalas för 4- och 5-åringar, från robotdans och kartongrobotar till robotmat och kalaspåse.',
    body: `<h2>Robotkalas är perfekt för små teknikfantaster, och det mesta går att bygga av sådant som annars hamnar i återvinningen. Här är vår guide till ett kalas i robotfabriken.</h2>
<h3>Stämningen</h3><p>Silver, blått och lite neonfärger. Klä några kartonger i aluminiumfolie och ställ dem som "maskiner" i rummet, häng upp ljusslingor och spela elektronisk musik med pip och surr när gästerna kommer.</p>
<h3>Inbjudningar</h3><p>Skriv inbjudan som ett meddelande från robotfabriken: "Ny robot sökes för uppdrag den 12 maj". En ritad robot med kalasdetaljerna på displayen gör den rolig att läsa högt för barnet.</p>
<h3>Utklädnad</h3><p>En kartong med armhål blir robotkropp, och en mindre kartong eller en papperspåse blir huvud. Kapsyler, knappar och folie som limmas på ger panel och lampor. Bygg gärna dräkterna tillsammans som första aktivitet.</p>
<h3>Lekar i prioritetsordning</h3>
<ul>
<li><strong>Robotdansen</strong>: barnen dansar som robotar med stela armar och fryser i en robotpose när musiken tystnar.</li>
<li><strong>Robotkommandon</strong>: en vuxen är robotchef och ger kommandon som "gå tre steg framåt" eller "snurra ett varv". Den som gör fel blir hjälprobot.</li>
<li><strong>Bygg en robot</strong>: lag bygger en robotkompis av kartonger, toarullar och tejp på tio minuter.</li>
<li><strong>Batteriladdning</strong>: en lugn stund där robotarna "laddar" med en saga eller ett pussel innan tårtan.</li>
</ul>
<h3>Maten</h3><p>"Muttrar och skruvar" av ostbågar och kringlor, smörgåsar utstansade som kugghjul, grönsaker med dipp som "kablar" och en tårta med en robot av godis på toppen.</p>
<h3>Kalaspåsen</h3><p>Robotklistermärken, ett litet pyssel att bygga hemma och ett diplom som "Certifierad robotingenjör".</p>
<p><a href="/kalas/tema/robotkalas">Robotkalaset finns för 4- och 5-åringar</a> med 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, spellistor, dekorationstips och körschema.</p>`,
    category: 'Tema-guide',
    date: '29 oktober 2026',
    imageUrl: '/wf/images/covers/robotkalaset-for-5-aringar.jpg',
  },
  {
    slug: 'tema-cirkuskalas',
    title: 'Cirkuskalas: Guide till dekoration, lekar och meny',
    summary: 'Så gör du ett cirkuskalas för barn 6 till 8 år, där varje gäst blir artist, från manege och jonglering till popcorn och föreställning.',
    body: `<h2>Cirkuskalas passar barn som gillar att visa vad de kan. Här är vår guide till ett kalas där alla gäster är artister och kvällen slutar med en föreställning.</h2>
<h3>Stämningen</h3><p>Rött, gult och vitt i ränder. Häng upp ballonger och vimplar i taket, lägg ett rep i en cirkel på golvet som manege och ställ stolarna runt den som publikplatser. Klassisk cirkusmusik med trumvirvel gör resten.</p>
<h3>Inbjudningar</h3><p>Skriv inbjudan som en biljett till "Den stora föreställningen", med tid, plats och en rad för gästens artistnamn. Be gärna gästerna fundera på vilket nummer de vill göra.</p>
<h3>Utklädnad</h3><p>En randig tröja, hängslen och en röd näsa räcker för en clown. Den som hellre vill vara akrobat, trollkarl eller cirkusdirektör kan komma i hatt och kavaj. Ansiktsmålning på plats är ett bra sätt att starta kalaset.</p>
<h3>Lekar i prioritetsordning</h3>
<ul>
<li><strong>Artistskolan</strong>: stationer där barnen tränar på att jonglera med sjalar, balansera en bok på huvudet och gå på ett rep som ligger på golvet.</li>
<li><strong>Clownstafetten</strong>: lag som springer med stora skor eller en ballong mellan knäna och lämnar över en clownnäsa.</li>
<li><strong>Trollkarlens låda</strong>: gissa vad som döljs i en låda bara genom att känna, en lugnare lek mitt i kalaset.</li>
<li><strong>Föreställningen</strong>: avsluta med att varje barn visar sitt nummer i manegen, gärna för föräldrarna vid hämtningen.</li>
</ul>
<h3>Maten</h3><p>Popcorn i strutar, "clownsmörgåsar" med ansikten av grönsaker, fruktspett i cirkusfärger och en randig tårta. Saft serverad i små plastglas med sugrör som i en kiosk.</p>
<h3>Kalaspåsen</h3><p>En röd clownnäsa, några ballonger och ett diplom som "Kvällens stjärnartist".</p>
<p><a href="/kalas/tema/cirkuskalas">Cirkuskalaset finns för 6-åringar och för 7- och 8-åringar</a> med 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, spellistor, dekorationstips och körschema.</p>`,
    category: 'Tema-guide',
    date: '29 oktober 2026',
    imageUrl: '/wf/images/covers/cirkuskalaset-for-6-aringar.jpg',
  },
  {
    slug: 'tema-rymdkalas',
    title: 'Rymdkalas: Guide till dekoration, lekar och meny',
    summary: 'Så gör du ett rymdkalas för barn 4 till 8 år, från mörklagd raket och planetjakt till rymdmat och kalaspåse.',
    body: `<h2>Rymdkalas passar lika bra för fyraåringar som drömmer om stjärnor som för åttaåringar som vill bli astronauter. Här är vår guide till ett kalas i omloppsbana.</h2>
<h3>Stämningen</h3><p>Mörkblått, svart och silver. Dra för gardinerna, häng upp stjärnor av folie i taket och använd en ficklampa eller en stjärnprojektor om du har en. En stor kartong med fönster blir en raket som barnen kan krypa in i.</p>
<h3>Inbjudningar</h3><p>Skriv inbjudan som en biljett till en rymdresa, med avgångstid, "uppskjutningsplats" (er adress) och en ruta för passagerarens namn. Barnen tycker om att visa upp sin biljett när de kommer.</p>
<h3>Utklädnad</h3><p>Ett par tomma petflaskor som spraymålas silver och fästs med band blir syrgastuber. En vit overall eller pyjamas fungerar som rymddräkt, och en hjälm går att göra av en papperskasse med ett utklippt visir.</p>
<h3>Lekar i prioritetsordning</h3>
<ul>
<li><strong>Planetjakten</strong>: ballonger i olika färger är planeter som är gömda i huset. Laget som hittar alla först har "kartlagt solsystemet".</li>
<li><strong>Uppskjutningen</strong>: alla räknar ner från tio och hoppar så högt de kan på noll. Upprepa mellan lekarna, det blir kalasets signal för att byta aktivitet.</li>
<li><strong>Månpromenaden</strong>: barnen ska ta sig över golvet i "låg gravitation", i slow motion, utan att röra vid "kratrarna" (kuddar).</li>
<li><strong>Rymdvarelsen</strong>: en variant av kurragömma där den som letar är en rymdvarelse och de andra är astronauter som gömmer sig i mörkret med ficklampa.</li>
</ul>
<h3>Maten</h3><p>"Asteroider" (popcorn eller chokladbollar), "planeter" av melonbollar, "rymdmat" i form av smoothie i flaska med sugrör och en mörkblå tårta med strössel som stjärnor.</p>
<h3>Kalaspåsen</h3><p>Självlysande stjärnor till taket, ett klistermärke med en raket och ett astronautdiplom.</p>
<p><a href="/kalas/tema/rymdkalas">Rymdkalaset finns för 4- och 5-åringar och Astronautkalaset för 6–8 år</a>, båda med 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, spellistor, dekorationstips och körschema.</p>`,
    category: 'Tema-guide',
    date: '29 oktober 2026',
    imageUrl: '/wf/images/covers/rymdkalaset-for-5-aringar.jpg',
  },
  {
    slug: 'tema-safarikalas',
    title: 'Safarikalas: Guide till dekoration, lekar och meny',
    summary: 'Allt du behöver för ett safarikalas för 4- och 5-åringar, från djurspårning och kikare till savannmat och kalaspåse.',
    body: `<h2>Safarikalas är perfekt för barn som älskar djur, och det går att ordna med det mesta du redan har hemma. Här är vår guide till en dag på savannen.</h2>
<h3>Stämningen</h3><p>Grönt, beige och djurmönster. Häng gröna pappersremsor som lianer i dörröppningen, ställ ut gosedjur som vilda djur runt om i rummet och spela djurläten eller trummusik när gästerna kommer.</p>
<h3>Inbjudningar</h3><p>Skriv inbjudan som en kallelse till en safariexpedition: "Guider sökes för att hitta savannens djur". Ett tryckt tassavtryck i hörnet gör den direkt igenkännbar.</p>
<h3>Utklädnad</h3><p>Keps eller solhatt, en beige skjorta och en ryggsäck räcker för en safariguide. Den som hellre vill vara djur kan få en mask av papptallrik med öron, eller ansiktsmålning med morrhår.</p>
<h3>Lekar i prioritetsordning</h3>
<ul>
<li><strong>Djurspaningen</strong>: gosedjur eller bilder av djur är gömda i huset. Barnen letar med kikare gjorda av två toarullar och bockar av djuren på en lista med bilder.</li>
<li><strong>Härma djuret</strong>: en vuxen visar en bild av ett djur och barnen rör sig och låter som det, från smygande lejon till trampande elefanter.</li>
<li><strong>Vattenhålet</strong>: en stoldans där stolarna är "vattenhål" och djuren måste hitta ett när musiken tystnar.</li>
<li><strong>Spåra djuren</strong>: följ fotspår av papper genom huset till en låda med en överraskning.</li>
</ul>
<h3>Maten</h3><p>"Apbröd" (bananer eller bananbröd), fruktspett som "papegojor", ostbågar som "lejonsvansar" och en tårta med djur i marsipan eller plast.</p>
<h3>Kalaspåsen</h3><p>Ett litet plastdjur, en kikare av toarullar som barnen gjort själva och ett diplom som safariguide.</p>
<p><a href="/kalas/tema/safarikalas">Safarikalaset finns för 4- och 5-åringar</a> med 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, spellistor, dekorationstips och körschema.</p>`,
    category: 'Tema-guide',
    date: '29 oktober 2026',
    imageUrl: '/wf/images/covers/safarikalaset-for-5-aringar.jpg',
  },
  {
    slug: 'tema-superhjaltekalas',
    title: 'Superhjältekalas: Guide till lekar, utklädnad och mat',
    summary: 'Så gör du ett superhjältekalas där varje barn får vara hjälte för en dag, från mantlar och uppdrag till hjältemat och kalaspåse.',
    body: `<h2>Superhjältekalas fungerar för barn från fyra år och uppåt, och det kräver nästan ingen rekvisita. Här är vår guide till hur du lägger upp kalaset.</h2>
<h3>Stämningen</h3><p>Starka färger: rött, blått och gult. Rita stora "POW!" och "BAM!"-bubblor på papper och tejpa upp på väggarna, och gör en stadssiluett av svarta sopsäckar eller kartong längs en vägg. Spela filmmusik med mycket trummor när gästerna kommer.</p>
<h3>Inbjudningar</h3><p>Skriv inbjudan som ett hemligt uppdrag: "Staden behöver din hjälp, inställ dig klockan 14.00." Be gästerna komma utklädda eller lova att de får göra sin egen dräkt på plats.</p>
<h3>Utklädnad</h3><p>En mantel av en gammal handduk, ett tygstycke eller en uppklippt t-shirt räcker. Masker i papp med ett gummiband, och en hjältelogga som barnen ritar själva och tejpar på bröstet. Låt varje barn hitta på sitt hjältenamn när de kommer, det blir en bra start.</p>
<h3>Lekar i prioritetsordning</h3>
<ul>
<li><strong>Hjälteträningen</strong>: en hinderbana med kuddar att hoppa över, en tunnel av stolar och en "laserkorridor" av snören att kliva mellan.</li>
<li><strong>Rädda gosedjuren</strong>: gosedjur är gömda runt om i rummet och ska räddas tillbaka till "sjukhuset" innan tiden är slut.</li>
<li><strong>Frys-hjälten</strong>: dansstopp där alla fryser i sin bästa hjältepose när musiken tystnar.</li>
<li><strong>Superstyrka</strong>: lag som bär ballonger mellan sig utan att använda händerna.</li>
</ul>
<h3>Maten</h3><p>"Kryptonitgelé" (grön gelé), hjältesmörgåsar utstansade som blixtar, fruktspett i röda och blå färger och en tårta med barnets hjältelogga.</p>
<h3>Kalaspåsen</h3><p>En mask, ett klistermärke med en blixt och ett diplom för "Årets hjälte". Mer behövs inte.</p>
<p><a href="/kalas/tema/superhjaltekalas">Superhjältekalaset finns för 4-, 5- och 6-åringar</a> med 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, spellistor, dekorationstips och körschema.</p>`,
    category: 'Tema-guide',
    date: '29 oktober 2026',
    imageUrl: '/wf/images/covers/superhjaltekalaset-for-5-aringar.jpg',
  },
  {
    slug: 'tema-dinosauriekalas',
    title: 'Dinosauriekalas: Guide till dekoration, lekar och meny',
    summary: 'Allt du behöver för ett dinosauriekalas för 4- och 5-åringar, från fossiljakt och dinoägg till urtidsmat och kalaspåse.',
    body: `<h2>Dinosauriekalas passar både barn som kan alla dinosauriernas namn och barn som mest vill vråla som en T-rex. Här är vår guide till ett kalas från urtiden.</h2>
<h3>Stämningen</h3><p>Grönt och brunt. Klipp stora blad av grönt papper och tejpa upp i hörnen, ställ ut krukväxter och några plastdinosaurier på bordet. Fotspår av papper från dörren och in till kalasrummet visar gästerna vägen.</p>
<h3>Inbjudningar</h3><p>Skriv inbjudan som en expedition: "Forskare sökes till en utgrävning". Inbjudan kan gärna se ut som ett gammalt fynd, med ett fotavtryck av en dinosaurie i hörnet.</p>
<h3>Utklädnad</h3><p>En ryggkam av filt eller kartong som fästs på en tröja räcker långt. Den som vill kan komma som forskare med keps, kikare och ryggsäck i stället.</p>
<h3>Lekar i prioritetsordning</h3>
<ul>
<li><strong>Fossiljakten</strong>: göm plastdinosaurier eller "ben" av pasta i en sandlåda eller en balja med ris, och låt barnen gräva fram dem med penslar och skedar.</li>
<li><strong>Dinoäggen</strong>: frys in små plastdinosaurier i ballonger med vatten. Barnen får "kläcka" äggen med varmt vatten och skedar.</li>
<li><strong>Vulkanen</strong>: en vuxen visar ett utbrott med bikarbonat och ättika i en kopp gömd i en sandhög. Enkelt och alltid lika populärt.</li>
<li><strong>T-rex-tafatt</strong>: tafatt där den som har den ska gå med korta T-rex-armar.</li>
</ul>
<h3>Maten</h3><p>"Dinoägg" (kokta ägg eller vindruvor), grönsaksstavar som "träd", korv i bröd som "dinosauriefötter" och en grön tårta med dinosaurier i plast på toppen.</p>
<h3>Kalaspåsen</h3><p>En liten plastdinosaurie, ett "fossil" av saltdeg och ett diplom som utbildad dinosaurieforskare.</p>
<p><a href="/kalas/tema/dinosauriekalas">Dinosauriekalaset finns för 4- och 5-åringar</a> med 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, spellistor, dekorationstips och körschema.</p>`,
    category: 'Tema-guide',
    date: '29 oktober 2026',
    imageUrl: '/wf/images/covers/dinosauriekalaset-for-4-aringar.jpg',
  },
  {
    slug: 'diy-kalaspase',
    title: 'DIY-kalaspåse: Billiga och roliga gåvor barnen kommer älska',
    summary: 'Här är våra bästa tips på hur du skapar enkla, prisvärda och uppskattade kalaspåsar.',
    body: `<p>En kalaspåse är det perfekta sättet att avsluta ett kalas och ge barnen något att ta med hem. Här är våra bästa tips på hur du skapar enkla, prisvärda och uppskattade kalaspåsar.</p>
<h3>Små presenter</h3>
<p>Fyll påsarna med små leksaker, klistermärken eller pysselmaterial. Välj gärna saker som knyter an till kalastemat, så hänger påsen ihop med resten av kalaset.</p>
<h3>Godis och snacks</h3>
<p>Inget slår en påse fylld med godis eller popcorn! Använd våra färdiga kalaspåsar med roliga mönster och färger för att ge dem en extra festlig känsla. Kombinera gärna med ett klistermärke eller en liten hälsning för att göra dem ännu mer personliga.</p>
<h3>Tema för kalaspåsen</h3>
<p>Om kalaset har ett tema, varför inte matcha kalaspåsen med det? För ett prinsesstema kan du lägga till små kronor eller glitterprodukter, medan ett djungeltema kan innehålla djurklistermärken eller små figurer. Våra temaprodukter gör det enkelt att skapa en genomtänkt look.</p>
<h3>Gör det personligt</h3>
<p>Lägg till barnens namn på påsarna för en personlig touch. Våra dekorationskit inkluderar etiketter och klistermärken som gör detta både enkelt och snyggt.</p>
<p>Kalaspåsar är en liten gest som gör stort intryck. För fler tips och produkter som gör det enkelt att skapa en minnesvärd kalasfinal, kolla in <a href="/kalas">kalasen</a>!</p>`,
    category: 'Tips',
    date: '25 juni 2026',
    imageUrl: '/wf/images/blogg/photo-1586738730873.jpg',
  },
  {
    slug: 'checklista-allt-du-behover-for-ett-lyckat-barnkalas',
    title: 'Checklista: Allt du behöver för ett lyckat barnkalas',
    summary: 'Checklista för barnkalaset: allt från gästlista, inbjudan och tema till mat, lekar, kalaspåsar och dagen efter, punkt för punkt.',
    body: `<h2>Att hålla koll på allt inför ett barnkalas kan kännas överväldigande, men med en praktisk checklista blir det både enkelt och roligt att planera. Här är de viktigaste punkterna att tänka på.</h2>
<h3>Dekorationer</h3>
<p>Välj ett tema som barnet älskar och dekorera därefter. Tematiska tallrikar, muggar och ballonger kan förvandla vilket rum som helst till en festlig plats. Våra färdiga temapaket gör det enkelt att skapa en röd tråd genom hela kalaset.</p>
<h3>Mat och dryck</h3>
<p>Satsa på barnvänliga alternativ som små mackor, fruktspett och muffins. Glöm inte att inkludera något för de vuxna gästerna också! Med våra engångsartiklar blir det enkelt att servera och städa efteråt.</p>
<h3>Aktiviteter</h3>
<p>Förbered några roliga aktiviteter eller lekar som passar åldersgruppen. Klassiska alternativ som fiskdamm eller skattjakt är alltid populära, och våra aktivitetskit gör det enkelt att komma igång.</p>
<h3>Kalaspåsar</h3>
<p>Avsluta kalaset med att ge varje barn en påse fylld med små överraskningar. Håll det enkelt: några små saker som passar temat räcker långt.</p>
<h3>Glöm inte detaljerna</h3>
<p>Tänk på att fixa inbjudningar i god tid och dubbelkolla att du har allt hemma dagen innan kalaset. Våra checklistor och kalaspaket hjälper dig att inte missa något viktigt.</p>
<p>Med denna checklista har du allt du behöver för att skapa ett lyckat och stressfritt barnkalas. För ännu fler tips och produkter, <a href="/kalas">bläddra bland kalasen</a>!</p>`,
    category: 'Tips',
    date: '25 maj 2026',
    imageUrl: '/wf/images/blogg/photo-1509163245925.jpg',
  },
  {
    slug: 'sa-skapar-du-en-magisk-skattjakt-till-barnkalaset',
    title: 'Så skapar du en magisk skattjakt till barnkalaset',
    summary: 'Skattjakter är en spännande aktivitet som barn älskar och som kan lyfta vilket kalas som helst! Här är en guide för att skapa en oförglömlig skattjakt.',
    body: `<h2>Skattjakter är en spännande aktivitet som barn älskar och som kan lyfta vilket kalas som helst! Här är en guide för att skapa en oförglömlig skattjakt.</h2>
<h3>Planera kartan</h3>
<p>Börja med att rita en karta som visar de platser där ledtrådar finns gömda. Använd enkla symboler och färger så att barnen lätt kan följa den. Våra skattjaktskit inkluderar färdiga kartor och ledtrådar för enkel planering.</p>
<h3>Göm ledtrådarna</h3>
<p>Göm ledtrådarna på platser som är både roliga och utmanande att hitta. Varje ledtråd kan leda till nästa tills skatten avslöjas – till exempel en påse fylld med godis eller små leksaker.</p>
<h3>Avslöja skatten</h3>
<p>Skattjakten når sin höjdpunkt när barnen hittar den gömda skatten. Våra dekorerade kalaspåsar och små presenter är perfekta för att skapa en minnesvärd final.</p>
<h3>Mer inspiration</h3>
<p>På <a href="/kalas">kalaseriet.se</a> hittar du allt du behöver för att skapa en skattjakt som blir dagens höjdpunkt! Skattjakter passar extra bra på ett <a href="/kalas/tema/piratkalas">piratkalas</a> eller ett <a href="/kalas/tema/aventyrskalas">äventyrskalas</a>.</p>`,
    category: 'Tips',
    date: '25 april 2026',
    imageUrl: '/wf/images/blogg/photo-1469406396016.jpg',
  },
  {
    slug: 'enkla-och-roliga-lekar-for-kalaset',
    title: 'Enkla och roliga lekar för kalaset – både inomhus och utomhus',
    summary: 'Att planera roliga lekar är nyckeln till ett lyckat kalas! Här är två favoriter som garanterat skapar glädje och energi.',
    body: `<h2>Att planera roliga lekar är nyckeln till ett lyckat kalas! Här är två favoriter som garanterat skapar glädje och energi.</h2>
<h3>Dansstopp</h3>
<p>Sätt på musik och låt barnen dansa så vilt de vill – men när musiken stannar gäller det att frysa på stället! En lek som alltid lockar till skratt. Vill du lägga till lite extra kul? Ha några små priser redo, och dela gärna ut diplom till alla, de ingår i <a href="/kalas">våra kalaspaket</a>.</p>
<h3>Fiskdamm</h3>
<p>Fiskdammen är en riktig klassiker! Dela ut små överraskningar i färgglada påsar som barnen kan fiska upp. Våra praktiska och snygga kalaspåsar är perfekta för ändamålet.</p>
<p>Vill du ha fler tips på lekar och aktiviteter som passar just ert kalas? Bläddra bland kalasen för massor av inspiration och produkter som gör planeringen enkel och roligt!</p>`,
    category: 'Tips',
    date: '25 mars 2026',
    imageUrl: '/wf/images/blogg/photo-1627764940620.jpg',
  },
  // ─── SEO-optimerade nya inlägg (riktade mot organisk Google-trafik) ───
  {
    slug: 'lekar-for-6-aringar',
    title: 'Lekar för 6-åringar: 12 favoriter som funkar på varje kalas',
    summary: 'Här är våra 12 mest populära kalaslekar för 6-åringar — bevisade i skarpt läge och alla med tydliga instruktioner.',
    body: `<h2>Söker du roliga lekar till sex-årskalaset? Här är vår testade samling — alla anpassade efter vad sex-åringar älskar, klarar och blir engagerade av.</h2>
<h3>1. Klassisk fiskdamm</h3><p>Ett laken eller en filt över en stol, en fiskespö med klädnypa, och små godispåsar att fiska upp. Funkar varje gång.</p>
<h3>2. Skattjakt med karta</h3><p>Rita en enkel karta över hemmet. 5-6 ledtrådar leder till en gömd skatt. I <a href="/kalas/6-aringar">våra kalaspaket</a> finns 20 färdiga lekar och aktiviteter med instruktioner.</p>
<h3>3. Stoppdans</h3><p>Pop på en spellista, dansa loss — när musiken stannar måste alla frysa. Den som rör sig är ute.</p>
<h3>4. Pinjata</h3><p>Slå sönder en pinjata fylld med godis. Sex-åringar älskar fysiken i det.</p>
<h3>5. Charader för barn</h3><p>Skriv ut djur, yrken eller saker på lappar. Barnen drar och agerar utan ord.</p>
<h3>6. Limbo</h3><p>En kvast eller käpp + reggae-musik = vinnande kombination.</p>
<h3>7. Hetast på stolarna</h3><p>En stol mindre än antal barn. När musiken stannar — kämpa om en stol.</p>
<h3>8. Pussel-tävling</h3><p>Två lag, två pussel. Vinnaren får pris.</p>
<h3>9. Ballong-volleyboll</h3><p>Ett rep mellan två stolar, ballong istället för boll. Inomhus-vänligt och säkert.</p>
<h3>10. Mjölkkartong-bowling</h3><p>Töm 6 mjölkkartonger, ställ upp som kägglor, rulla en boll.</p>
<h3>11. Memory IRL</h3><p>Vänd lock från små burkar uppochner. Barnen letar par.</p>
<h3>12. Diplom-ceremoni</h3><p>Avsluta med att alla får ett diplom. <a href="/kalas/6-aringar">Våra kalaspaket inkluderar tryckfärdiga diplom</a>.</p>
<p>Vill du ha allt klart? Våra <a href="/kalas/6-aringar">kalaspaket för 6-åringar</a> innehåller 20 färdiga lekar med instruktioner och tips på rekvisita, plus länk till en spellista för kalaset.</p>`,
    category: 'Tips',
    date: '25 februari 2026',
    imageUrl: '/wf/images/blogg/photo-1627764940620.jpg',
  },
  {
    slug: 'budget-barnkalas-tips',
    title: 'Budget-barnkalas: Så fixar du minnesvärt kalas under 1000 kr',
    summary: 'Komplett guide till att hålla ett barnkalas under 1000 kronor — utan att tumma på upplevelsen för barnen.',
    body: `<h2>Ett bra kalas behöver inte kosta tusentals kronor. Vi visar exakt vad du kan göra för att hålla budgeten utan att kalaset känns billigt.</h2>
<h3>Inbjudningar: 0 kr</h3><p>Skriv ut hemma istället för att beställa. <a href="/kalas">Våra kalaspaket inkluderar tema-matchade inbjudningsmallar</a> — bara att fylla i namn och datum.</p>
<h3>Dekorationer: max 150 kr</h3><p>Ballonger från IKEA (29 kr för 50 st), wimpel i pappersremsor du klipper själv, blommor från trädgården. Färdiga PDF-dekorationer från oss att skriva ut hemma.</p>
<h3>Mat: 200-300 kr</h3><p>Tre val: muffins (40 kr för 12 st), popcorn (15 kr), fruktspett (50 kr). Skippa cateringen — barnen vill ha snacks de känner igen.</p>
<h3>Kalaspåsar: 250 kr för 10 barn</h3><p>Köp i bulk på Clas Ohlson eller Åhléns. Klistermärken, små klossar, lite godis. Sätter sammans till ca 25 kr per påse. Vår <a href="/kalasbloggen/diy-kalaspase">DIY-kalaspåse-guide</a> har fler tips.</p>
<h3>Aktiviteter & lekar: 0 kr</h3><p>Här ligger värdet — välj rätt lekar och det räcker. <a href="/kalas">Våra kalaspaket</a> kostar 129 kr och innehåller 20 testade lekar.</p>
<h3>Total: ca 700-1000 kr</h3><p>Jämför med Buster eller liknande lekland som börjar på 2 500 kr för 8 barn.</p>
<p><strong>Pro-tipset:</strong> Investera de pengar du sparar på dekorationer/cateringen i en kvalitativ huvudaktivitet — t.ex. ett tema som ger struktur till hela dagen.</p>`,
    category: 'Tips',
    date: '25 januari 2026',
    imageUrl: '/wf/images/blogg/photo-1586738730873.jpg',
  },
  {
    slug: 'tema-piratkalas',
    title: 'Piratkalas: Komplett guide för dekoration, lekar och meny',
    summary: 'Allt du behöver för att fixa ett piratkalas barnen kommer prata om i månader — från inbjudan till skattjakten.',
    body: `<h2>Piratkalas är en av de mest älskade temana för barn 4-8 år. Här är hela vår guide till hur du sätter ihop ett oförglömligt piratkalas.</h2>
<h3>Stämningen</h3><p>Mörkrött, svart och guld. Pirat-flaggor (kan skrivas ut), guldmynt utspridda, sjökort på väggen. Spotify har bra "Pirate Music"-spellistor.</p>
<h3>Inbjudningar</h3><p>Skriv på papper du bränt kanterna på (med vuxen-hjälp) eller skriv ut piratteman direkt från <a href="/kalas/piratkalaset-for-4-aringar">vårt piratkalaspaket</a>.</p>
<h3>Klädsel</h3><p>Be alla barn komma utklädda. Pirathattar i kartong, ögonlapp i svart papper, randiga T-shirts — enkelt och hemmagjort funkar bäst.</p>
<h3>Lekar i prioritetsordning</h3>
<ul>
<li><strong>Skattjakten</strong> — höjdpunkten. 6-8 ledtrådar runt huset, skatten är en kista med godis och små leksaker.</li>
<li><strong>Walk the plank</strong> — en planka på golvet, barnen ska balansera utan att "falla i havet"</li>
<li><strong>Pirat-tatueringar</strong> — tillfälliga tatueringar (köp på Åhléns) som de får sätta på själva</li>
<li><strong>Mjölkkartong-skepp</strong> — bygg pappskepp och kapprodda i baljor med vatten</li>
</ul>
<h3>Maten</h3><p>"Skeppsskorpor" (kex), "havsvatten" (blå festis), fruktspett som "skattens juveler", piratkaka med flaggor.</p>
<h3>Kalaspåsen</h3><p>Sjörövarpåse med guldmynt (godis), en ögonlapp, en pirat-klistermärke. Räcker långt.</p>
<p><a href="/kalas/tema/piratkalas">Våra piratkalaspaket för 4- och 5-åringar</a> innehåller 20 lekar och aktiviteter, inbjudan, diplom, 20 recept och checklista — du slipper Pinterest-spiraler.</p>`,
    category: 'Tema-guide',
    date: '25 december 2025',
    imageUrl: '/wf/images/blogg/piratkalaset-4-aringar.jpg',
  },
  {
    slug: 'barnkalas-mat-recept',
    title: 'Barnkalas-mat: 15 enkla recept som barnen verkligen äter',
    summary: 'Inga halvätna tallrikar. Här är de 15 enklaste och mest uppskattade kalasrätterna — testade på riktiga 4-8-åringar.',
    body: `<h2>Föräldrar lägger ofta för mycket tid och pengar på kalasmat som barn ändå inte rör. Vi har testat oss igenom mängder och listat de 15 som funkar varje gång.</h2>
<h3>Snacks (under en timme)</h3>
<ul><li>Fruktspett (jordgubbar, druvor, ananas)</li><li>Popcorn — låt barnen krydda själva med strösocker</li><li>Mini-korv på pinne</li><li>Morots-stickor med ranchdipp</li><li>Cheez-doodles i skålar</li></ul>
<h3>Huvudrätter</h3>
<ul><li>Pizzabullar (köp deg, fyll med tomatsås + ost)</li><li>Hotdog-muffins (varmkorv i muffins-batter)</li><li>Mini-hamburgare</li><li>Pannkakor med sylt</li><li>Mac and cheese i muggar</li></ul>
<h3>Söta saker</h3>
<ul><li>Muffins — alltid en hit</li><li>Marshmallows på pinne, doppade i smält choklad</li><li>Rocky road (chokladkaka med marshmallows)</li><li>Glasstårta (köp och dekorera)</li><li>Vitchokladtryffel rullade i strössel</li></ul>
<p>Alla med tydliga recept och allergi-anpassningar finns i <a href="/kalas">våra kalaspaket</a>. Inkluderar både vanliga och vegan/glutenfria varianter.</p>
<p><strong>Tips:</strong> Gör det mesta dagen innan. Stressa inte med matlagning samma dag — barnen bryr sig mer om aktiviteterna.</p>`,
    category: 'Tips',
    date: '25 november 2025',
    imageUrl: '/wf/images/blogg/muffins.jpg',
  },
  {
    slug: 'kalas-tema-4-aringar',
    title: 'Kalas-tema för 4-åringar: 8 mest populära (och hur du fixar dem)',
    summary: 'De 8 mest älskade kalastemana för 4-åringar — vad de innehåller, hur de funkar och vilket som passar ditt barn.',
    body: `<h2>4-åringar har just lärt sig vad fantasi är. Rätt tema förvandlar ett kalas från "bara mat och tårta" till ett äventyr de minns för alltid.</h2>
<h3>1. Piratkalas</h3><p>Klassiker som funkar för både killar och tjejer. Skattjakt + dekoration = kalasets höjdpunkt. <a href="/kalas/piratkalaset-for-4-aringar">Se vårt piratkalaspaket</a>.</p>
<h3>2. Safari/Djungel</h3><p>Djurmasker, snigelspel, "spåra apor" som lek. Lugn men spännande för försiktiga 4-åringar. <a href="/kalas/safarikalaset-for-4-aringar">Safarikalaset</a>.</p>
<h3>3. Prins & Prinsessa</h3><p>Kronor, slott, magi. Pyssel-tungt — perfekt för en barngrupp som gillar lugnare aktiviteter. <a href="/kalas/prins-prinsesskalaset-for-4-aringar">Prinsesskalaset</a>.</p>
<h3>4. Dinosaurier</h3><p>"Gräv ut ben" (godis i sand), dinosaurie-jakt. Fysiskt och fängslande. <a href="/kalas/dinosauriekalaset-for-4-aringar">Dinosauriekalaset</a>.</p>
<h3>5. Rymd</h3><p>Stjärnor i taket, raket-pyssel, "astronaut-träning". Bra för fantasifulla barn. <a href="/kalas/rymdkalaset-for-4-aringar">Rymdkalaset</a>.</p>
<h3>6. Robot</h3><p>Bygg robotar av tomma förpackningar, robot-dans. Roligt för kreativa barn. <a href="/kalas/robotkalaset-for-4-aringar">Robotkalaset</a>.</p>
<h3>7. Superhjälte</h3><p>Hemmagjorda kappor, "rädda staden"-uppdrag. Energi-utlopp för aktiva 4-åringar. <a href="/kalas/superhjaltekalaset-for-4-aringar">Superhjältekalaset</a>.</p>
<h3>8. Äventyr</h3><p>Hinderbana, "expedition", mysterielösning. Flexibelt tema som funkar i alla väder. <a href="/kalas/aventyrskalaset-for-4-aringar">Äventyrskalaset</a>.</p>
<p>Alla våra teman kommer med inbjudningar, lekar, recept, dekorationstips, körschema och checklista — färdigt att skriva ut hemma.</p>
<p><strong>Vilket ska du välja?</strong> Lyssna på barnet. 4-åringar VET vad de gillar. Fråga "vill du ha pirater, djur eller dinosaurier på ditt kalas?" och kör på svaret.</p>`,
    category: 'Tema-guide',
    date: '25 oktober 2025',
    imageUrl: '/wf/images/blogg/safarikalaset-4-aringar.jpg',
  },
  {
    slug: '10-tips-for-att-planera-ett-barnkalas',
    title: '10 tips för att planera ett barnkalas som alla kommer minnas',
    summary: 'Här är våra bästa tips för att sätta ihop ett kalas som kommer få barnens ögon att lysa och göra planeringen rolig och enkel för dig.',
    body: `<h2>Att fixa ett barnkalas som blir magiskt för både barn och vuxna kan kännas som en utmaning – men med lite planering och inspiration går det att skapa en dag fylld av glädje, bus och minnen för livet. Här är våra bästa tips för att sätta ihop ett kalas som kommer få barnens ögon att lysa och göra planeringen rolig och enkel för dig.</h2>
<h3>1. Börja med ett tema som barnet älskar</h3>
<p>Temat ger både dig och barnet en chans att sätta prägel på kalaset och gör det lättare att planera allt från dekorationer till lekar. Vad sägs om ett enhörningstema för den lilla drömmaren eller ett djungeltema för de små äventyrarna? Andra populära teman är <a href="/kalas/tema/piratkalas">piratkalas</a>, <a href="/kalas/tema/superhjaltekalas">superhjältekalas</a> och <a href="/kalas/tema/rymdkalas">rymdkalas</a>. På <a href="/kalas">Kalaseriet</a> har vi samlat allt du kan behöva för att enkelt fixa temat.</p>
<h3>2. Skicka inbjudningar som sätter stämningen</h3>
<p>Skapa en känsla av förväntan redan från start! Oavsett om du väljer digitala eller fysiska inbjudningar, kan du matcha dem med temat. Vill du spara tid? Kika på våra färdig-designade inbjudningar som både är enkla och supersnygga. Varje nedladdning har en egen design.</p>
<h3>3. Planera en skattjakt</h3>
<p>En klassisk skattjakt kan aldrig gå fel! Skapa ledtrådar som leder barnen runt i hemmet eller trädgården, och låt sista ledtråden leda till en skatt – kanske en godispåse eller en liten present?</p>
<h3>4. Fixa roliga aktiviteter och lekar</h3>
<p>Kalaset blir alltid extra lyckat med aktiviteter som får barnen att röra på sig och skratta. Klassiker som "Fiskdamm" och "Dansstopp" är alltid populära, och vi har både färdiga aktivitetsguider och inspiration för <a href="/kalas">kalaslekar</a> som får upp stämningen.</p>
<h3>5. Skapa ett matbord som ser festligt ut</h3>
<p>Mat är en stor del av kalasupplevelsen! Tänk enkelt men färgstarkt – fruktspett, små mackor och goda muffins brukar alltid gå hem. Lägg till våra färgglada engångstallrikar och bestick för en enkel men festlig dukning.</p>
<h3>6. Dekorera för stämningen</h3>
<p>Inget kalas är komplett utan dekorationer. Tänk på att dekorera både barnens och vuxnas områden – kanske ballonger, serpentiner och något som lyser upp till kvällen?</p>
<h3>7. Glöm inte musiken</h3>
<p>Musiken kan skapa en härlig atmosfär. Skapa en spellista med barnets favoritlåtar och låt musiken spela i bakgrunden. Behöver du idéer? Vi har färdiga spellistor – bara att trycka på play och höja volymen!</p>
<h3>8. Låt barnen pyssla</h3>
<p>Pysselbordet kan vara en räddare i nöden när energin börjar dala. Med lite glitter, papper och klistermärken kan barnen skapa sina egna små konstverk att ta med hem.</p>
<h3>9. Sätt upp en liten fotostation</h3>
<p>Skapa ett hörn för selfies och roliga bilder! En backdrop och några roliga rekvisita gör det enkelt att få fina bilder från dagen.</p>
<h3>10. Avsluta med en magisk final</h3>
<p>Ett kalas blir ännu mer minnesvärt med ett avslut som känns speciellt. Kanske en liten ceremoni där alla barn får en medalj eller present? Eller en överraskningsakt med såpbubblor?</p>
<p>Med dessa tips har du en bra grund för att skapa ett magiskt barnkalas som alla kommer prata om länge.</p>`,
    category: 'Tips',
    date: '25 september 2025',
    imageUrl: '/wf/images/blogg/10-tips-barnkalas.jpg',
  },
]


// Where a reader of each post should go next: the package page that matches
// the post's topic (a theme or age group), so the article leads to a purchase.
export type PostOffer = { label: string; href: string }

const POST_OFFERS: Record<string, PostOffer> = {
  'tema-piratkalas': { label: 'Alla piratkalas', href: '/kalas/tema/piratkalas' },
  'tema-superhjaltekalas': { label: 'Alla superhjältekalas', href: '/kalas/tema/superhjaltekalas' },
  'tema-dinosauriekalas': { label: 'Alla dinosauriekalas', href: '/kalas/tema/dinosauriekalas' },
  'tema-rymdkalas': { label: 'Alla rymdkalas', href: '/kalas/tema/rymdkalas' },
  'tema-cirkuskalas': { label: 'Alla cirkuskalas', href: '/kalas/tema/cirkuskalas' },
  'tema-robotkalas': { label: 'Alla robotkalas', href: '/kalas/tema/robotkalas' },
  'tema-sportkalas': { label: 'Alla sportkalas', href: '/kalas/tema/sportkalas' },
  'tema-safarikalas': { label: 'Alla safarikalas', href: '/kalas/tema/safarikalas' },
  'sa-skapar-du-en-magisk-skattjakt-till-barnkalaset': { label: 'Piratkalas med skattjakt-känsla', href: '/kalas/tema/piratkalas' },
  'lekar-for-6-aringar': { label: 'Kalas för 6-åringar', href: '/kalas/6-aringar' },
  'kalas-tema-4-aringar': { label: 'Kalas för 4-åringar', href: '/kalas/4-aringar' },
}

export function offerForPost(slug: string): PostOffer {
  return POST_OFFERS[slug] ?? { label: 'Alla kalaspaket', href: '/kalas' }
}
