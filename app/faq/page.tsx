import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import Breadcrumbs from '../components/Breadcrumbs'

export const metadata = {
  title: 'FAQ – Ofta ställda frågor | Kalaseriet',
  description: 'Svar på de vanligaste frågorna om Kalaseriet kalaspaket, betalning, filformat och mer.',
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="pt-6 mb-8">
            <Breadcrumbs items={[
              { label: 'FAQ', href: '/faq' }
            ]} />
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Ofta ställda frågor
            </h1>
            <p className="text-xl text-gray-600">
              Svar på allt du behöver veta om Kalaseriet kalaspaket.
            </p>
          </div>

          {/* FAQ Component */}
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  )
}
