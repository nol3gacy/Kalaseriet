import AgeCategoryPage, { categoryMetadata } from '../../components/AgeCategoryPage'

export const metadata = categoryMetadata('7-8')

export default function CategoryPage() {
  return <AgeCategoryPage age="7-8" />
}
