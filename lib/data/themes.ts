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
}

export const themePages: ThemePage[] = [
  {
    slug: 'piratkalas',
    themes: ['pirat'],
    heading: 'Piratkalas',
    description: 'Piratkalas för barn: kompletta kalaspaket med skattjakt-känsla, lekar, recept, inbjudan och diplom. Ladda ner direkt för 99 kr och skriv ut hemma.',
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
    heading: 'Superhjältekalas',
    description: 'Superhjältekalas för 4-, 5- och 6-åringar: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 99 kr och skriv ut hemma.',
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
    heading: 'Dinosauriekalas',
    description: 'Dinosauriekalas för 4- och 5-åringar: kalaspaket med lekar, recept, inbjudan och diplom. Ladda ner direkt för 99 kr och skriv ut hemma.',
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
    heading: 'Rymdkalas',
    description: 'Rymdkalas för 4 till 8 år: Rymdkalaset och Astronautkalaset med lekar, recept, inbjudan och diplom. Ladda ner direkt för 99 kr och skriv ut hemma.',
    seoHeading: 'Så ordnar du ett rymdkalas',
    paragraphs: [
      'Ett rymdkalas tar gästerna bort från jorden för en eftermiddag. Släck ner, häng upp några stjärnor och låt barnen bli besättning på en raket, så är stämningen satt. Temat passar både barn som drömmer om planeter och barn som mest vill räkna ner till uppskjutning.',
      'För de yngre fungerar Rymdkalaset, med enkla lekar om planeter, stjärnor och rymdvarelser. Äldre barn som vill ha mer utmaning passar bättre för Astronautkalaset, där uppdragen kräver samarbete och lite klurighet, ungefär som en riktig astronaututbildning.',
      'Rymdkalaset finns för 4- och 5-åringar och Astronautkalaset för 6- och 7–8-åringar. Varje paket innehåller 20 färdiga lekar och aktiviteter, 20 recept, inbjudan, diplom, länk till spellistor, dekorationstips samt checklista och körschema.',
    ],
  },
]

export function themePageFor(productTheme: string) {
  return themePages.find(t => t.themes.includes(productTheme))
}
