import { groq } from 'next-sanity'

export const allProductsQuery = groq`
  *[_type == "product"] | order(order asc, ageGroup asc, name asc) {
    _id,
    name,
    slug,
    theme,
    ageGroup,
    description,
    price,
    originalPrice,
    image,
    isNew,
    isPopular,
    downloadContents,
    order,
  }
`

export const productsByAgeQuery = groq`
  *[_type == "product" && ageGroup == $ageGroup] | order(order asc, name asc) {
    _id,
    name,
    slug,
    theme,
    ageGroup,
    description,
    price,
    originalPrice,
    image,
    isNew,
    isPopular,
  }
`
