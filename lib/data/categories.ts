// Kategorier från kalaseriet.se CMS
export type Category = {
  slug: string  // matches /kalas/[slug]
  name: string
  description: string
  heroImage: string
  passar: string
  passarBojd: string
  ageGroup: '4' | '5' | '6' | '7-8'
}

export const categories: Category[] = [
  {
    slug: '4-aringar',
    name: 'Kalas för 4-åringar',
    description: 'Roliga kalas designade för 4-åringar! Vilken blir er favorit?',
    heroImage: 'https://uploads-ssl.webflow.com/656cc33f15901291e8334d1e/66a510d7ac633bfd0ffe39f9_Kalaslekar-for-4-aringar.jpg',
    passar: '4-åringar',
    passarBojd: '4 år',
    ageGroup: '4',
  },
  {
    slug: '5-aringar',
    name: 'Kalas för 5-åringar',
    description: 'De bästa kalaslekarna för 5-åringar. Vilket tema väljer ni?',
    heroImage: 'https://uploads-ssl.webflow.com/656cc33f15901291e8334d1e/66a510e8a5a25e35ecd450da_Kalaslekar-for-5-aringar.jpg',
    passar: '5-åringar',
    passarBojd: '5 år',
    ageGroup: '5',
  },
  {
    slug: '6-aringar',
    name: 'Kalas för 6-åringar',
    description: 'Roliga kalaslekar speciellt för 6-åringar. Vilket tema kommer bli succé?',
    heroImage: 'https://uploads-ssl.webflow.com/656cc33f15901291e8334d1e/66a5111be2a0a5ecf1eaead9_Kalaslekar-for-6-aringar.jpg',
    passar: '6-åringar',
    passarBojd: '6 år',
    ageGroup: '6',
  },
  {
    slug: '7-8-aringar',
    name: 'Kalas för 7 & 8-åringar',
    description: 'Roliga lekar som passar din 8-åring! Låt festen börja!',
    heroImage: 'https://uploads-ssl.webflow.com/656cc33f15901291e8334d1e/66a5110bac633bfd0ffe6808_Kalaslekar-for-7-8-aringar.jpg',
    passar: '7 & 8-åringar',
    passarBojd: '7 eller 8 år',
    ageGroup: '7-8',
  },
]
