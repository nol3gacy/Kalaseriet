// Innehåll från kalaseriet.se CMS — det som ingår i varje kalas
export type IncludedItem = {
  name: string
  slug: string
  tooltip: string
  order: number
}

export const includedItems: IncludedItem[] = [
  { name: '20 st kalaslekar & aktiviteter', slug: '20-kalaslekar', tooltip: '20 olika kalaslekar med olika nivåer (ofta används ca 5-7 stycken)', order: 1 },
  { name: 'Mall för inbjudan', slug: 'mall-for-inbjudan', tooltip: 'Ni skriver enkelt ut PDFen och fyller i namn med penna', order: 2 },
  { name: 'Diplom', slug: 'diplom', tooltip: 'Alla vinner! Snygg mall för diplom, bara att snirkla dit barnets namn', order: 3 },
  { name: '5 tips på dekorationer', slug: 'dekorationer', tooltip: 'Tips på hur ni kan dekorera kalaset', order: 4 },
  { name: 'Länk till spellista', slug: 'lank-till-spellista', tooltip: 'Passande musik till kalaset', order: 5 },
  { name: 'Checklista & körschema', slug: 'checklista-korschema', tooltip: 'Så att kalaset blir välplanerat och inget missas', order: 6 },
  { name: '20 st recept', slug: '20-st-recept', tooltip: '20 st smarriga recept, allt från tårtor till milkshakes', order: 7 },
  { name: 'Instruktioner', slug: 'intruktioner', tooltip: 'Utskrivbara instruktioner för allt', order: 8 },
]
