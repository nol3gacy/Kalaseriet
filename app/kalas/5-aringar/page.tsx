import { fallbackProducts } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductGrid from '../../components/ProductGrid'
import Breadcrumbs from '../../components/Breadcrumbs'

export const metadata = {
  title: 'Barnkalas för 5-åringar – 33 tema | Kalaseriet',
  description: 'Kompletta kalaspaket för 5-åringar. Pirat, Superhjälte, Safari och många fler tema. Ladda ner direkt.',
}

export default function KalasFem() {
  const products = fallbackProducts.filter(p => p.ageGroup === '5')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="pt-6 mb-8">
            <Breadcrumbs items={[
              { label: 'Kalas', href: '/kalas' },
              { label: 'För 5-åringar', href: '/kalas/5-aringar' }
            ]} />
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
              Barnkalas för 5-åringar
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Hitta det perfekta kalastemat för din 5-åring. {products.length} olika teman till 99 kr styck.
            </p>
            <p className="text-gray-500">
              Med 20 lekar, 20 recept, inbjudningar, dekorationer och allt mer – allt anpassat för 5-åringar.
            </p>
          </div>

          {/* Products */}
          <div className="pb-20">
            <ProductGrid products={products} showFilter={false} />
          </div>

          {/* CTA Section */}
          <div className="py-16 border-t border-gray-100">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                Redo för ett oförglömligt kalas?
              </h2>
              <p className="text-gray-600 mb-8">
                Väl i varukorg och ladda ner direkt efter betalning. Inga dagar att vänta.
              </p>
              <a href="#alla-kalas" className="btn-primary">
                Se alla 33 kalas ›
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
