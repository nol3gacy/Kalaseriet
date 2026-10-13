import { fallbackProducts } from '../page'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import DiscountMarquee from '../components/DiscountMarquee'
import SeoText from '../components/SeoText'
import AgeCTAs from '../components/AgeCTAs'
import { breadcrumbSchema, canonical, itemListSchema, jsonLd, ORG_ID } from '../../lib/seo'

export const metadata = {
  title: 'Populära kalas – våra mest bokade kalasteman',
  description: 'Våra mest populära kalaspaket för barnkalas 4–8 år — teman som fungerar för de flesta barngrupper. 20 kalaslekar, recept, inbjudan & körschema för 99 kr.',
  alternates: { canonical: '/populara-kalas' },
  openGraph: {
    title: 'Populära kalas – våra mest bokade kalasteman',
    description: 'Våra mest populära kalaspaket för barnkalas 4–8 år. Ladda ner direkt för 99 kr.',
    type: 'website' as const,
    locale: 'sv_SE',
    url: canonical('/populara-kalas'),
    siteName: 'Kalaseriet',
  },
}

export default function PopularaKalasPage() {
  const products = fallbackProducts.filter(p => p.isPopular)

  const schema = jsonLd(
    {
      '@type': 'CollectionPage',
      '@id': `${canonical('/populara-kalas')}#collection`,
      url: canonical('/populara-kalas'),
      name: 'Populära kalas',
      description: 'Våra mest populära kalaspaket för barnkalas 4–8 år.',
      inLanguage: 'sv-SE',
      isPartOf: { '@id': `${canonical('/')}#website` },
      publisher: { '@id': ORG_ID },
    },
    breadcrumbSchema([
      { name: 'Hem', path: '/' },
      { name: 'Populära kalas', path: '/populara-kalas' },
    ]),
    itemListSchema('Populära kalaspaket', products.map(p => ({ name: p.name, path: `/kalas/${p.slug.current}` }))),
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <Navbar />
      <main>
      <ProductGrid products={products} heading="Populära kalas" showFilter={false} />
      <DiscountMarquee />
      <SeoText
        heading="Våra mest älskade kalasteman"
        paragraphs={[
          'Det här är kalaspaketen som flest föräldrar väljer om och om igen. Teman som Piratkalaset, Superhjältekalaset och Rymdkalaset toppar listan år efter år eftersom de funkar för de flesta barngrupper — lagom mycket spänning, lekar som passar både pojkar och flickor, och tydliga instruktioner som gör planeringen enkel.',
          'Varje populärt kalaspaket innehåller samma kompletta innehåll som alla våra teman: 20 testade kalaslekar, inbjudningsmall, checklista och körschema, dekorationstips, spellista och recept — allt samlat i en digital nedladdning för 99 kr.',
          'Hittar du inte rätt tema här? Bläddra bland alla kalas eller filtrera på ålder för att se fler alternativ.',
        ]}
      />
      <AgeCTAs />
      </main>
      <Footer />
    </>
  )
}
