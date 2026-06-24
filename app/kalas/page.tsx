import { client } from '../../sanity/lib/client'
import { allProductsQuery } from '../../sanity/lib/queries'
import { fallbackProducts, type Product } from '../page'
import ProductGrid from '../components/ProductGrid'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DiscountMarquee from '../components/DiscountMarquee'

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
      <ProductGrid products={products} heading="Kalasen" />
      <DiscountMarquee />
      <Footer />
    </>
  )
}
