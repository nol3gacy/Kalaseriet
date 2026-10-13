import AgeCategoryPage, { categoryMetadata } from '../../components/AgeCategoryPage'

export const metadata = categoryMetadata('6')

export default function CategoryPage() {
  return <AgeCategoryPage age="6" />
}
