import { fallbackProducts } from '../page'
import Navbar from './Navbar'
import Footer from './Footer'
import ProductGrid from './ProductGrid'
import DiscountMarquee from './DiscountMarquee'
import SeoText from './SeoText'
import AgeCTAs from './AgeCTAs'
import ThemeLinks from './ThemeLinks'
import { themePages } from '../../lib/data/themes'
import { breadcrumbSchema, canonical, itemListSchema, jsonLd, ORG_ID, OG_IMAGE } from '../../lib/seo'

export type AgeGroup = '4' | '5' | '6' | '7-8'

type Copy = {
  /** Visible page heading — the primary keyword. */
  heading: string
  /** SEO body section under the grid. */
  seoHeading: string
  paragraphs: string[]
}

export const AGE_COPY: Record<AgeGroup, Copy> = {
  '4': {
    heading: 'Kalas för 4-åringar',
    seoHeading: 'Så planerar du ett barnkalas för 4-åringar',
    paragraphs: [
      'Ett barnkalas för 4-åringar fungerar bäst när det är kort, tydligt och fullt av rörelse. Vid fyra års ålder har barnen precis upptäckt fantasilekar, men orkar sällan mer än ungefär två timmar. Vi rekommenderar 5–7 kalaslekar med tydliga regler, gärna varvat med en lugnare pysselstund i mitten så att energin räcker hela vägen till tårtan.',
      'Alla våra kalaspaket för 4-åringar innehåller 20 kalaslekar anpassade efter vad fyraåringar klarar och tycker är roligt — fiskdamm, skattjakt, stoppdans och pinjata är återkommande favoriter. Du får dessutom 20 recept, en färdig mall för inbjudan, diplom till alla barn, tips på dekorationer, spellista samt checklista och körschema.',
      'Populära teman för den här åldern är Piratkalaset, Safarikalaset, Prins & Prinsesskalaset och Djungelkalaset. Välj tema tillsammans med barnet — fyraåringar vet ofta precis vad de tycker om, och ett tema som barnet själv valt gör hela kalaset roligare att förbereda.',
    ],
  },
  '5': {
    heading: 'Kalas för 5-åringar',
    seoHeading: 'Så planerar du ett barnkalas för 5-åringar',
    paragraphs: [
      'Femåringar klarar längre lekar och mer avancerade regler än fyraåringar, vilket öppnar för tävlingsmoment, lagbaserade lekar och skattjakter med flera ledtrådar. Räkna med att ett barnkalas för 5-åringar kan pågå 2–3 timmar, och planera in en tydlig höjdpunkt ungefär mitt i kalaset.',
      'Våra kalaspaket för 5-åringar innehåller 20 testade kalaslekar med olika svårighetsgrad, så att du kan anpassa efter barngruppen. Utöver lekarna får du 20 recept med allergialternativ, inbjudningsmall att skriva ut, diplom, dekorationstips, Spotify-spellista och ett färdigt körschema.',
      'Bland de mest bokade temana för femåringar hittar du Superhjältekalaset, Piratkalaset, Safarikalaset och Vilda västern-kalaset. Alla paket kostar 129 kr, laddas ner direkt efter köp och skrivs ut hemma på vanlig A4-skrivare.',
    ],
  },
  '6': {
    heading: 'Kalas för 6-åringar',
    seoHeading: 'Så planerar du ett barnkalas för 6-åringar',
    paragraphs: [
      'Vid sex år börjar barn tycka om att lösa problem tillsammans. Det gör mysterier, detektivuppdrag och lagtävlingar till perfekta kalaslekar för 6-åringar. Många i den här åldern har också börjat skolan, vilket ofta betyder fler gäster — planera för lekar som fungerar även med tio barn eller fler.',
      'Varje kalaspaket för 6-åringar innehåller 20 kalaslekar, 20 recept, mall för inbjudan, diplom, dekorationstips, spellista samt checklista och körschema. Instruktionerna är skrivna så att en vuxen kan leda leken direkt utan förberedelse.',
      'Detektivkalaset, Spökkalaset, Ninjakalaset och Vetenskapskalaset är särskilt populära för sexåringar — teman som ger struktur åt hela kalaset och något att prata om långt efteråt.',
    ],
  },
  '7-8': {
    heading: 'Kalas för 7 & 8-åringar',
    seoHeading: 'Så planerar du ett barnkalas för 7- och 8-åringar',
    paragraphs: [
      'Sju- och åttaåringar vill ha utmaning och egen delaktighet. Lekar med poäng, lag och tydliga vinnarmoment fungerar bra, liksom aktiviteter där barnen får skapa något eget att ta med hem. Ett barnkalas för den här åldern klarar 3 timmar utan problem.',
      'Våra kalaspaket för 7- och 8-åringar innehåller 20 kalaslekar anpassade för äldre barn, 20 recept, inbjudningsmall, diplom, dekorationstips, spellista och ett körschema som håller ihop dagen.',
      'Discokalaset, Filmkvällskalaset, Sportkalaset och Konstnärskalaset hör till favoriterna i den här åldersgruppen. Ladda ner direkt för 129 kr och skriv ut hemma — inget att beställa hem och vänta på.',
    ],
  },
}

export function categoryMetadata(age: AgeGroup) {
  const copy = AGE_COPY[age]
  const slug = age === '7-8' ? '7-8-aringar' : `${age}-aringar`
  const path = `/kalas/${slug}`
  const ageLabel = age === '7-8' ? '7 & 8-åringar' : `${age}-åringar`
  const count = fallbackProducts.filter(p => p.ageGroup === age).length

  const title = `Kalas för ${ageLabel} – ${count} kalaspaket med lekar & recept`
  const description = `${count} kalaspaket för barnkalas för ${ageLabel}. Varje paket har 20 kalaslekar, 20 recept, inbjudan, diplom, checklista & körschema. Ladda ner direkt för 129 kr.`

  return {
    // Site name left out, as on product pages: keeps the title within what Google shows.
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: 'website' as const,
      locale: 'sv_SE',
      url: canonical(path),
      siteName: 'Kalaseriet',
      images: [OG_IMAGE],
    },
  }
}

export default function AgeCategoryPage({ age }: { age: AgeGroup }) {
  const copy = AGE_COPY[age]
  const slug = age === '7-8' ? '7-8-aringar' : `${age}-aringar`
  const path = `/kalas/${slug}`
  const ageLabel = age === '7-8' ? '7 & 8-åringar' : `${age}-åringar`
  const products = fallbackProducts.filter(p => p.ageGroup === age)

  const schema = jsonLd(
    {
      '@type': 'CollectionPage',
      '@id': `${canonical(path)}#collection`,
      url: canonical(path),
      name: copy.heading,
      description: `Kompletta kalaspaket för barnkalas för ${ageLabel}.`,
      inLanguage: 'sv-SE',
      isPartOf: { '@id': `${canonical('/')}#website` },
      publisher: { '@id': ORG_ID },
    },
    breadcrumbSchema([
      { name: 'Hem', path: '/' },
      { name: 'Alla kalas', path: '/kalas' },
      { name: copy.heading, path },
    ]),
    itemListSchema(
      copy.heading,
      products.map(p => ({ name: p.name, path: `/kalas/${p.slug.current}` })),
    ),
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <Navbar />
      <main>
        <ProductGrid products={products} heading={copy.heading} showFilter={false} />
        <DiscountMarquee />
        <SeoText heading={copy.seoHeading} paragraphs={copy.paragraphs} />
        <ThemeLinks
          heading={`Teman för ${ageLabel}`}
          only={themePages.filter(t => products.some(p => t.themes.includes(p.theme))).map(t => t.slug)}
        />
        <AgeCTAs />
      </main>
      <Footer />
    </>
  )
}
