import AgeCategoryPage, { categoryMetadata } from '../../components/AgeCategoryPage'

export const metadata = categoryMetadata('5')

export default function CategoryPage() {
  return <AgeCategoryPage age="5" />
}
