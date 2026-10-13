import AgeCategoryPage, { categoryMetadata } from '../../components/AgeCategoryPage'

export const metadata = categoryMetadata('4')

export default function CategoryPage() {
  return <AgeCategoryPage age="4" />
}
