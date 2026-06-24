import { fallbackProducts } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductGrid from '../../components/ProductGrid'
import DiscountMarquee from '../../components/DiscountMarquee'

export const metadata = {
  title: 'Barnkalas för 5-åringar – Kalaseriet',
  description: 'Kompletta kalaspaket för 5-åringar. Ladda ner direkt, skriv ut hemma och fira!',
}

export default function CategoryPage() {
  const products = fallbackProducts.filter(p => p.ageGroup === '5')
  return (
    <>
      <Navbar />
      <ProductGrid products={products} heading="Kalas för 5-åringar" showFilter={false} />
      <DiscountMarquee />
      <Footer />
    </>
  )
}
