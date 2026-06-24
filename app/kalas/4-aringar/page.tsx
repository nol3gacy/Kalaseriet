import { fallbackProducts } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductGrid from '../../components/ProductGrid'
import DiscountMarquee from '../../components/DiscountMarquee'

export const metadata = {
  title: 'Barnkalas för 4-åringar – Kalaseriet',
  description: 'Kompletta kalaspaket för 4-åringar. Ladda ner direkt, skriv ut hemma och fira!',
}

export default function CategoryPage() {
  const products = fallbackProducts.filter(p => p.ageGroup === '4')
  return (
    <>
      <Navbar />
      <ProductGrid products={products} heading="Kalas för 4-åringar" showFilter={false} />
      <DiscountMarquee />
      <Footer />
    </>
  )
}
