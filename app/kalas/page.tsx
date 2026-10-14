import { client } from '../../sanity/lib/client'
import { allProductsQuery } from '../../sanity/lib/queries'
import { fallbackProducts, type Product } from '../page'
import ProductGrid from '../components/ProductGrid'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DiscountMarquee from '../components/DiscountMarquee'
import SeoText from '../components/SeoText'
import AgeCTAs from '../components/AgeCTAs'
import { breadcrumbSchema, canonical, itemListSchema, jsonLd, ORG_ID } from '../../lib/seo'

export const metadata = {
  title: 'Alla kalas – 33 kalaspaket för barnkalas 4–8 år',
  description: 'Bläddra bland alla 33 kalaspaket för barnkalas. Varje tema har 20 kalaslekar, 20 recept, inbjudan, diplom, checklista & körschema. Ladda ner direkt för 99 kr.',
  alternates: { canonical: '/kalas' },
  openGraph: {
    title: 'Alla kalas – 33 kalaspaket för barnkalas 4–8 år',
    description: 'Bläddra bland alla 33 kalaspaket för barnkalas. Ladda ner direkt för 99 kr och skriv ut hemma.',
    type: 'website' as const,
    locale: 'sv_SE',
    url: canonical('/kalas'),
    siteName: 'Kalaseriet',
  },
}

async function getProducts(): Promise<Product[]> {
  try {
    const data = await client.fetch(allProductsQuery, {}, { next: { revalidate: 60 } })
    return data?.length ? data : fallbackProducts
  } catch {
    return fallbackProducts
  }
}

export default async function AllKalasPage() {
  const products = await getProducts()

  const schema = jsonLd(
    {
      '@type': 'CollectionPage',
      '@id': `${canonical('/kalas')}#collection`,
      url: canonical('/kalas'),
      name: 'Alla kalas',
      description: 'Alla 33 kalaspaket för barnkalas 4–8 år.',
      inLanguage: 'sv-SE',
      isPartOf: { '@id': `${canonical('/')}#website` },
      publisher: { '@id': ORG_ID },
    },
    breadcrumbSchema([
      { name: 'Hem', path: '/' },
      { name: 'Alla kalas', path: '/kalas' },
    ]),
    itemListSchema('Alla kalaspaket', products.map(p => ({ name: p.name, path: `/kalas/${p.slug.current}` }))),
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <Navbar />
      <main>
      <ProductGrid products={products} heading="Alla kalas" />
      <DiscountMarquee />
      <SeoText
        heading="Digitala kalaspaket för alla åldrar och teman"
        paragraphs={[
          'Här hittar du alla 33 kalaspaket vi har att erbjuda — från piratäventyr och rymdresor till detektivgåtor och discofester. Varje kalaspaket är en komplett digital nedladdning med allt du behöver för att planera ett minnesvärt barnkalas: 20 st testade kalaslekar, en snygg mall för inbjudan, körschema och checklista, tips på dekorationer, spellista och recept.',
          'Filtrera på ålder ovan för att hitta teman som passar just ditt barn — vi har paket anpassade för 4, 5, 6 samt 7 & 8-åringar. Oavsett om barnet drömmer om att vara pirat, superhjälte, prinsessa eller upptäcktsresande så finns det ett tema som passar. Alla paket kostar 99 kr, levereras direkt till din e-post efter köp och går att skriva ut hemma på vanlig skrivare.',
          'Är du osäker på vilket tema som passar bäst? Kika på våra populäraste kalas eller läs mer om hur det hela går till på sidan så funkar det.',
        ]}
      />
      <AgeCTAs />
      </main>
      <Footer />
    </>
  )
}
