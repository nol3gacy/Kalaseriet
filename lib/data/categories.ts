// Kategorier från kalaseriet.se CMS
export type Category = {
  slug: string  // matches /kalas/[slug]
  name: string
  description: string
  passar: string
  passarBojd: string
  ageGroup: '4' | '5' | '6' | '7-8'
}

export const categories: Category[] = [
  {
    slug: '4-aringar',
    name: 'Kalas för 4-åringar',
    description: 'Roliga kalas designade för 4-åringar! Vilken blir er favorit?',
    passar: '4-åringar',
    passarBojd: '4 år',
    ageGroup: '4',
  },
  {
    slug: '5-aringar',
    name: 'Kalas för 5-åringar',
    description: 'De bästa kalaslekarna för 5-åringar. Vilket tema väljer ni?',
    passar: '5-åringar',
    passarBojd: '5 år',
    ageGroup: '5',
  },
  {
    slug: '6-aringar',
    name: 'Kalas för 6-åringar',
    description: 'Roliga kalaslekar speciellt för 6-åringar. Vilket tema kommer bli succé?',
    passar: '6-åringar',
    passarBojd: '6 år',
    ageGroup: '6',
  },
  {
    slug: '7-8-aringar',
    name: 'Kalas för 7 & 8-åringar',
    description: 'Roliga lekar som passar din 8-åring! Låt festen börja!',
    passar: '7 & 8-åringar',
    passarBojd: '7 eller 8 år',
    ageGroup: '7-8',
  },
]
