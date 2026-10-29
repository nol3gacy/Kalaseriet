// Theme landing pages (/kalas/tema/<slug>) for searches like "piratkalas".
// Each page lists every age of a theme; the copy is unique per theme.
export type ThemePage = {
  slug: string
  /** Product.theme values gathered on the page. */
  themes: string[]
  /** Visible heading and link text — the search term. */
  heading: string
  description: string
  seoHeading: string
  paragraphs: string[]
  /** Blog theme guide slug (/kalasbloggen/<guide>), if one exists. */
  guide?: string
}

export const themePages: ThemePage[] = [
  {
    slug: 'piratkalas',
    themes: ['pirat'],
    guide: 'tema-piratkalas',
    heading: 'Piratkalas',
    description: 'Piratkalas för barn: kompletta kalaspaket med skattjakt-känsla, lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett piratkalas',
    paragraphs: [
      'Ett piratkalas har allt barn i förskoleåldern älskar: skatter att leta efter, en kapten att lyda och en rejäl portion bus. Temat fungerar lika bra inomhus i vardagsrummet som ute i trädgården, och det kräver inga dyra rekvisita. En sjal runt huvudet, en ritad ögonlapp och en kartong som skattkista räcker långt.',
      'Låt kalaset följa en enkel berättelse: gästerna mönstrar på som besättning, klarar några prov för att visa att de är riktiga pirater och belönas till sist med en skatt att dela på. Då håller barnen ihop och förstår vad som händer härnäst, vilket är extra viktigt för fyra- och femåringar.',
      'Våra piratpaket finns för 4- och 5-åringar. Varje paket innehåller 20 färdiga lekar och aktiviteter, 20 recept, en inbjudan att skriva ut och fylla i, diplom till alla barn, länk till spellistor, tips på dekorationer samt checklista och körschema. Välj åldern som passar barnet, så är lekarna anpassade efter vad den åldern orkar och tycker är roligt.',
    ],
  },
  {
    slug: 'superhjaltekalas',
    themes: ['superhjälte'],
    guide: 'tema-superhjaltekalas',
    heading: 'Superhjältekalas',
    description: 'Superhjältekalas för 4-, 5- och 6-åringar: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett superhjältekalas',
    paragraphs: [
      'På ett superhjältekalas får varje barn vara hjälte för en dag. Temat passar gäster som gillar att springa, klättra och tävla, och det är lätt att klä ut sig: en mantel av en gammal handduk eller ett tygstycke och en egen hjältelogga gör susen. Många barn kommer gärna utklädda om du skriver det i inbjudan.',
      'Bygg kalaset kring uppdrag. Hjältarna behöver träna snabbhet, styrka och samarbete innan de är redo att rädda dagen, och varje klarat uppdrag ger en ny ledtråd. Det ger fart åt kalaset och gör det lätt att avsluta med tårta när världen är räddad.',
      'Superhjältekalaset finns för 4-, 5- och 6-åringar, så lekarna växer med barnet. Varje paket innehåller 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, länk till spellistor, dekorationstips samt checklista och körschema att skriva ut.',
    ],
  },
  {
    slug: 'dinosauriekalas',
    themes: ['dinosaurie'],
    guide: 'tema-dinosauriekalas',
    heading: 'Dinosauriekalas',
    description: 'Dinosauriekalas för 4- och 5-åringar: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett dinosauriekalas',
    paragraphs: [
      'Dinosaurier fascinerar barn som kan alla namnen utantill, men också de som bara gillar att låta som en T-rex. Ett dinosauriekalas ger plats för både vilda lekar och lugnare stunder, som att gräva fram fossiler i en sandlåda eller en balja med ris.',
      'Tänk på kalaset som en expedition: gästerna är forskare som letar efter spår, ägg och ben, och kalasets höjdpunkt blir det stora fyndet. Gröna tallrikar, papperslöv på väggarna och några plastdinosaurier på bordet räcker för att skapa urtidskänsla.',
      'Dinosauriekalaset finns för 4- och 5-åringar. I varje paket ingår 20 färdiga lekar och aktiviteter, 20 recept, inbjudan att skriva ut och fylla i, diplom, länk till spellistor, tips på dekorationer och en checklista med körschema så att dagen flyter på.',
    ],
  },
  {
    slug: 'rymdkalas',
    themes: ['rymd', 'astronaut'],
    guide: 'tema-rymdkalas',
    heading: 'Rymdkalas',
    description: 'Rymdkalas för 4 till 8 år: Rymdkalaset och Astronautkalaset med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett rymdkalas',
    paragraphs: [
      'Ett rymdkalas tar gästerna bort från jorden för en eftermiddag. Släck ner, häng upp några stjärnor och låt barnen bli besättning på en raket, så är stämningen satt. Temat passar både barn som drömmer om planeter och barn som mest vill räkna ner till uppskjutning.',
      'För de yngre fungerar Rymdkalaset, med enkla lekar om planeter, stjärnor och rymdvarelser. Äldre barn som vill ha mer utmaning passar bättre för Astronautkalaset, där uppdragen kräver samarbete och lite klurighet, ungefär som en riktig astronaututbildning.',
      'Rymdkalaset finns för 4- och 5-åringar och Astronautkalaset för 6- och 7–8-åringar. Varje paket innehåller 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, länk till spellistor, dekorationstips samt checklista och körschema.',
    ],
  },
  {
    slug: 'safarikalas',
    themes: ['safari'],
    guide: 'tema-safarikalas',
    heading: 'Safarikalas',
    description: 'Safarikalas för 4- och 5-åringar: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett safarikalas',
    paragraphs: [
      'Ett safarikalas passar barn som kan härma alla djurläten och gärna kryper runt på golvet som lejon. Temat är tacksamt eftersom det går att göra med det du redan har hemma: gosedjur blir vilda djur att spana efter, en kikare av två toarullar räcker som utrustning och en filt blir savann.',
      'Gör kalaset till en upptäcktsfärd. Gästerna är safariguider som ska hitta, känna igen och ta hand om djuren, och varje fynd tar dem ett steg närmare målet. Gröna och bruna färger, leopardmönster och lite djungelljud i högtalaren gör resten av stämningen.',
      'Safarikalaset finns för 4- och 5-åringar. Varje paket innehåller 20 färdiga lekar och aktiviteter, 20 recept, inbjudan att skriva ut och fylla i, diplom, länk till spellistor, dekorationstips samt checklista och körschema.',
    ],
  },
  {
    slug: 'cirkuskalas',
    themes: ['cirkus'],
    guide: 'tema-cirkuskalas',
    heading: 'Cirkuskalas',
    description: 'Cirkuskalas för 6, 7 och 8 år: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett cirkuskalas',
    paragraphs: [
      'På ett cirkuskalas är alla gäster artister. Sex- till åttaåringar gillar att visa vad de kan, och cirkustemat ger dem en scen: balansera, jonglera med sjalar, göra konster eller vara clown. Ingen behöver vara bäst, publiken applåderar ändå.',
      'Låt kalaset sluta med en föreställning. Under kalaset övar barnen in sina nummer i lekarna, och i slutet får de uppträda för varandra eller för föräldrarna vid hämtningen. Randiga dukar, ballonger och en hemmagjord manege av ett rep på golvet räcker långt.',
      'Cirkuskalaset finns för 6-åringar och för 7- och 8-åringar. I varje paket ingår 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, länk till spellistor, tips på dekorationer och en checklista med körschema.',
    ],
  },
  {
    slug: 'robotkalas',
    themes: ['robot'],
    guide: 'tema-robotkalas',
    heading: 'Robotkalas',
    description: 'Robotkalas för 4- och 5-åringar: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett robotkalas',
    paragraphs: [
      'Små barn älskar att röra sig som robotar, med stela armar, pipande ljud och knappar som startar och stoppar. Därför fungerar ett robotkalas så bra för fyra- och femåringar: lekarna bygger på att lyssna på kommandon, vilket är både roligt och lätt att förstå.',
      'Spara kartonger, toarullar och aluminiumfolie veckan före kalaset, så kan gästerna bygga varsin robothjälm eller robotkompis att ta med hem. Silver, blinkande lampor och ett par pipande ljud från spellistan räcker för att göra vardagsrummet till en robotfabrik.',
      'Robotkalaset finns för 4- och 5-åringar. Varje paket innehåller 20 färdiga lekar och aktiviteter, 20 recept, inbjudan att skriva ut, diplom, länk till spellistor, dekorationstips samt checklista och körschema.',
    ],
  },
  {
    slug: 'sportkalas',
    themes: ['sport'],
    guide: 'tema-sportkalas',
    heading: 'Sportkalas',
    description: 'Sportkalas för 6, 7 och 8 år: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett sportkalas',
    paragraphs: [
      'Ett sportkalas är rätt val för barn som har svårt att sitta still. Sex- till åttaåringar älskar stationer, tidtagning och lag, och ett sportkalas ger utlopp för all energi innan det är dags för tårta. Det fungerar bäst utomhus, men många grenar går att göra inne med lite plats.',
      'Dela in gästerna i lag och låt dem samla poäng genom olika grenar, gärna en blandning av snabbhet, precision och samarbete så att alla får chansen att lyckas. Avsluta med prisutdelning där alla får diplom, så slutar kalaset i glädje i stället för i besvikelse.',
      'Sportkalaset finns för 6-åringar och för 7- och 8-åringar. I varje paket ingår 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, länk till spellistor, tips på dekorationer och en checklista med körschema.',
    ],
  },
  {
    slug: 'vetenskapskalas',
    themes: ['vetenskap'],
    heading: 'Vetenskapskalas',
    description: 'Vetenskapskalas för 6, 7 och 8 år: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett vetenskapskalas',
    paragraphs: [
      'Ett vetenskapskalas passar nyfikna barn som alltid frågar varför. I sex- till åttaårsåldern tycker många att det är magiskt när något bubblar, byter färg eller flyger, och det mesta går att göra med bikarbonat, ättika, ballonger och vatten från köket.',
      'Klä gästerna i förkläden eller gamla vita skjortor som labbrockar, och låt dem bli forskare för en dag. Barnen gissar först vad som kommer att hända och testar sedan, så blir varje experiment en liten tävling. Lägg en plastduk på bordet, det kan bli kladdigt.',
      'Vetenskapskalaset finns för 6-åringar och för 7- och 8-åringar. Varje paket innehåller 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, länk till spellistor, dekorationstips samt checklista och körschema.',
    ],
  },
  {
    slug: 'aventyrskalas',
    themes: ['äventyr'],
    heading: 'Äventyrskalas',
    description: 'Äventyrskalas för 4- och 5-åringar: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 129 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett äventyrskalas',
    paragraphs: [
      'Ett äventyrskalas är för barn som vill ut och upptäcka. Temat är friare än pirater eller dinosaurier, så det passar en blandad barngrupp där alla inte gillar samma sak. Det går lika bra att genomföra i en park eller skogsdunge som hemma i lägenheten.',
      'Rita en enkel karta över kalasplatsen och låt gästerna följa den från station till station. Små gåtor, gömda föremål och en hemlig slutpunkt ger fyra- och femåringar precis lagom mycket spänning. Ryggsäckar, ficklampor och kompassen från förrådet gör dem till riktiga upptäcktsresande.',
      'Äventyrskalaset finns för 4- och 5-åringar. I varje paket ingår 20 färdiga lekar och aktiviteter, 20 recept, inbjudan att skriva ut och fylla i, diplom, länk till spellistor, tips på dekorationer och en checklista med körschema.',
    ],
  },
]

export function themePageFor(productTheme: string) {
  return themePages.find(t => t.themes.includes(productTheme))
}

/** By product name ("Astronautkalaset" -> rymdkalas), for pages that only get names (/tack). */
export function themePageForName(productName: string) {
  const name = productName.toLowerCase()
  return themePages.find(t => t.themes.some(theme => name.startsWith(theme)))
}
