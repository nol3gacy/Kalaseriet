import { fallbackProducts } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductGrid from '../../components/ProductGrid'
import DiscountMarquee from '../../components/DiscountMarquee'

export const metadata = {
  title: 'Barnkalas för 7 & 8-åringar – Kalaseriet',
  description: 'Kompletta kalaspaket för 7 & 8-åringar. Ladda ner direkt, skriv ut hemma och fira!',
}

export default function CategoryPage() {
  const products = fallbackProducts.filter(p => p.ageGroup === '7-8')
  return (
    <>
      <Navbar />
      <ProductGrid products={products} heading="Kalas för 7 & 8-åringar" showFilter={false} />
      <DiscountMarquee />
      <Footer />
    </>
  )
}
