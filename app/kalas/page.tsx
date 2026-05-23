import { client } from '../../sanity/lib/client'
import { allProductsQuery } from '../../sanity/lib/queries'
import { fallbackProducts, type Product } from '../page'
import ProductGrid from '../components/ProductGrid'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Alla kalas – Kalaseriet',
  description: 'Hitta rätt kalaspaket för ditt barn bland 33 teman för 4–8-åringar.',
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="bg-violet-50 border-b border-violet-100 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900">Alla kalas</h1>
            <p className="text-gray-500 mt-2 text-lg">
              {products.length} kalaspaket · Välj tema och åldersgrupp
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <ProductGrid products={products} showFilter />
        </div>
      </main>
      <Footer />
    </>
  )
}
