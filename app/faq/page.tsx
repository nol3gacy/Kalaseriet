import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import AgeCTAs from '../components/AgeCTAs'
import { faqs } from '../../lib/data/faq'
import { breadcrumbSchema, canonical, faqSchema, jsonLd } from '../../lib/seo'

export const metadata = {
  title: 'Vanliga frågor om kalaspaketen',
  description:
    'Svar på vanliga frågor om Kalaseriets kalaspaket: hur nedladdningen fungerar, utskrift utan skrivare, filformat, allergier, betalning och nöjdhetsgaranti.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Vanliga frågor om kalaspaketen',
    description: 'Svar på vanliga frågor om nedladdning, utskrift, betalning och nöjdhetsgaranti.',
    type: 'website' as const,
    locale: 'sv_SE',
    url: canonical('/faq'),
    siteName: 'Kalaseriet',
  },
}

export default function FAQPage() {
  const schema = jsonLd(
    faqSchema(faqs.map(f => ({ question: f.question, answer: f.answer }))),
    breadcrumbSchema([
      { name: 'Hem', path: '/' },
      { name: 'Vanliga frågor', path: '/faq' },
    ]),
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <FAQ headingLevel="h1" heading="Vanliga frågor om kalaspaketen" subheading="Svar på allt du behöver veta innan du laddar ner ditt kalaspaket." />
        <AgeCTAs />
      </main>
      <Footer />
    </>
  )
}
