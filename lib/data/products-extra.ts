// Per-product slider images: [inbjudan (unique), checklista, samlingsbild (both shared)].
// Cover/inspiration photo lives separately on Product.externalImageUrl in app/page.tsx.

export type ProductExtra = { longDescription: string; images: string[] }

const PRODUCTS: Record<string, ProductExtra> = {
  'piratkalaset-for-4-aringar': {
    longDescription: "Fira med ett spännande Piratkalas! Perfekt för 4-åringar som älskar äventyr och skatter. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Färdiga diplom och länk till spellistor ingår. Få tips på dekorationer och använd vår utskriftbara mall för checklista och körschema för en smidig och minnesvärd fest.",
    images: [
      '/wf/images/inbjudan/piratkalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'safarikalaset-for-4-aringar': {
    longDescription: "Ge ditt barn en oförglömlig upplevelse med ett Safarikalas! Perfekt för 4-åringar som älskar djur och natur. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en enkel och rolig kalasplanering.",
    images: [
      '/wf/images/inbjudan/safarikalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'prins-prinsesskalaset-for-4-aringar': {
    longDescription: "Fira med ett förtrollande Prins & Prinsesskalas! Perfekt för 4-åringar som drömmer om slott och sagor. Spara tid med 20 färdiga lekar och aktiviteter, elegant inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en magisk och välorganiserad fest.",
    images: [
      '/wf/images/inbjudan/prins-prinsesskalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'djungelkalaset-for-4-aringar': {
    longDescription: "Ge ditt barn ett spännande äventyr med ett Djungelkalas! Perfekt för 4-åringar som älskar djur och vildmark. Spara tid med 20 färdiga lekar och aktiviteter, inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer.",
    images: [
      '/wf/images/inbjudan/djungelkalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'rymdkalaset-for-4-aringar': {
    longDescription: "Utforska universum med ett spännande Rymdkalas! Perfekt för 4-åringar som drömmer om stjärnor och planeter. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i.",
    images: [
      '/wf/images/inbjudan/rymdkalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'dinosauriekalaset-for-4-aringar': {
    longDescription: "Ge ditt barn ett urtida äventyr med ett Dinosauriekalas! Perfekt för 4-åringar som fascineras av dinosaurier.",
    images: [
      '/wf/images/inbjudan/dinosauriekalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'robotkalaset-for-4-aringar': {
    longDescription: "Fira med ett futuristiskt Robotkalas! Perfekt för 4-åringar som älskar teknik och robotar.",
    images: [
      '/wf/images/inbjudan/robotkalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'superhjaltekalaset-for-4-aringar': {
    longDescription: "Ge ditt barn ett actionfyllt Superhjältekalas! Perfekt för 4-åringar som älskar superhjältar och äventyr.",
    images: [
      '/wf/images/inbjudan/superhjaltekalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'aventyrskalaset-for-4-aringar': {
    longDescription: "Ge ditt barn ett spännande Äventyrskalas! Perfekt för 4-åringar som älskar mysterier och upptäckter.",
    images: [
      '/wf/images/inbjudan/aventyrskalaset-for-4-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'superhjaltekalaset-for-5-aringar': {
    longDescription: "Fira med ett actionfyllt Superhjältekalas! Perfekt för 5-åringar som älskar superhjältar och äventyr.",
    images: [
      '/wf/images/inbjudan/superhjaltekalaset-for-5-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'piratkalaset-for-5-aringar': {
    longDescription: "Segla in i äventyret med ett Piratkalas! Perfekt för 5-åringar som älskar skatter och sjörövare.",
    images: [
      '/wf/images/inbjudan/piratkalaset-for-5-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'safarikalaset-for-5-aringar': {
    longDescription: "Ge ditt barn en oförglömlig upplevelse med ett Safarikalas! Perfekt för 5-åringar som älskar djur och natur.",
    images: [
      '/wf/images/inbjudan/safarikalaset-for-5-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'robotkalaset-for-5-aringar': {
    longDescription: "Fira med ett futuristiskt Robotkalas! Perfekt för 5-åringar som älskar teknik och robotar.",
    images: [
      '/wf/images/inbjudan/robotkalaset-for-5-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'rymdkalaset-for-5-aringar': {
    longDescription: "Utforska universum med ett spännande Rymdkalas! Perfekt för 5-åringar som drömmer om stjärnor och planeter.",
    images: [
      '/wf/images/inbjudan/rymdkalaset-for-5-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'dinosauriekalaset-for-5-aringar': {
    longDescription: "Ge ditt barn ett urtida äventyr med ett Dinosauriekalas! Perfekt för 5-åringar som fascineras av dinosaurier.",
    images: [
      '/wf/images/inbjudan/dinosauriekalaset-for-5-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'vilda-vastern-kalaset-for-5-aringar': {
    longDescription: "Rid in i solnedgången med ett Vilda västern-kalas! Perfekt för 5-åringar som älskar cowboys och äventyr.",
    images: [
      '/wf/images/inbjudan/vilda-vastern-kalaset-for-5-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'aventyrskalaset-for-5-aringar': {
    longDescription: "Ge ditt barn ett spännande Äventyrskalas! Perfekt för 5-åringar som älskar mysterier och upptäckter.",
    images: [
      '/wf/images/inbjudan/aventyrskalaset-for-5-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'detektivkalaset-for-6-aringar': {
    longDescription: "Fira med ett klurigt Detektivkalas! Perfekt för 6-åringar som älskar att lösa mysterier och gåtor.",
    images: [
      '/wf/images/inbjudan/detektivkalaset-for-6-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'spokkalaset-for-6-aringar': {
    longDescription: "Ge ditt barn ett kusligt Spökkalas! Perfekt för 6-åringar som älskar skräck och spänning.",
    images: [
      '/wf/images/inbjudan/spokkalaset-for-6-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'vetenskapskalaset-for-6-aringar': {
    longDescription: "Utforska världen med ett spännande Vetenskapskalas! Perfekt för 6-åringar som älskar experiment och upptäckter.",
    images: [
      '/wf/images/inbjudan/vetenskapskalaset-for-6-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'superhjaltekalaset-for-6-aringar': {
    longDescription: "Fira med ett actionfyllt Superhjältekalas! Perfekt för 6-åringar som älskar superhjältar och äventyr.",
    images: [
      '/wf/images/inbjudan/superhjaltekalaset-for-6-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'ninjakalaset-for-6-aringar': {
    longDescription: "Ge ditt barn ett spännande Ninjakalas! Perfekt för 6-åringar som älskar ninjor och äventyr.",
    images: [
      '/wf/images/inbjudan/ninjakalaset-for-6-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'cirkuskalaset-for-6-aringar': {
    longDescription: "Skapa magi med ett roligt Cirkuskalas! Perfekt för 6-åringar som älskar clowner, jonglörer och akrobater.",
    images: [
      '/wf/images/inbjudan/cirkuskalaset-for-6-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'astronautkalaset-for-6-aringar': {
    longDescription: "Utforska universum med ett spännande Astronautkalas! Perfekt för 6-åringar som drömmer om rymden och stjärnor.",
    images: [
      '/wf/images/inbjudan/astronautkalaset-for-6-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'sportkalaset-for-6-aringar': {
    longDescription: "Fira med ett aktivt Sportkalas! Perfekt för 6-åringar som älskar sport och rörelse.",
    images: [
      '/wf/images/inbjudan/sportkalaset-for-6-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'sportkalaset-for-7-8-aringar': {
    longDescription: "Ge ditt barn ett aktivt Sportkalas! Perfekt för 7 och 8-åringar som älskar sport och rörelse.",
    images: [
      '/wf/images/inbjudan/sportkalaset-for-7-8-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'astronautkalaset-for-7-8-aringar': {
    longDescription: "Utforska universum med ett spännande Astronautkalas! Perfekt för 7 och 8-åringar som drömmer om rymden och stjärnor.",
    images: [
      '/wf/images/inbjudan/astronautkalaset-for-7-8-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'discokalaset-for-7-8-aringar': {
    longDescription: "Skapa en fest med ett glittrigt Discokalas! Perfekt för 7 och 8-åringar som älskar musik och dans.",
    images: [
      '/wf/images/inbjudan/discokalaset-for-7-8-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'pysselkalaset-for-7-8-aringar': {
    longDescription: "Fira med ett kreativt Pysselkalas! Perfekt för 7 och 8-åringar som älskar att skapa och pyssla.",
    images: [
      '/wf/images/inbjudan/pysselkalaset-for-7-8-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'vetenskapskalaset-for-7-8-aringar': {
    longDescription: "Utforska världen med ett spännande Vetenskapskalas! Perfekt för 7 och 8-åringar som älskar experiment och upptäckter.",
    images: [
      '/wf/images/inbjudan/vetenskapskalaset-for-7-8-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'cirkuskalaset-for-7-8-aringar': {
    longDescription: "Skapa magi med ett roligt Cirkuskalas! Perfekt för 7 och 8-åringar som älskar clowner, jonglörer och akrobater.",
    images: [
      '/wf/images/inbjudan/cirkuskalaset-for-7-8-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'filmkvallskalaset-for-7-8-aringar': {
    longDescription: "Skapa en stjärnkväll med ett Filmkvällskalas! Perfekt för 7 och 8-åringar som älskar film och popcorn.",
    images: [
      '/wf/images/inbjudan/filmkvallskalaset-for-7-8-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
  'konstnarskalaset-for-7-8-aringar': {
    longDescription: "Fira med ett kreativt Konstnärskalas! Perfekt för 7 och 8-åringar som älskar att måla och skapa.",
    images: [
      '/wf/images/inbjudan/konstnarskalaset-for-7-8-aringar.jpg',
      '/wf/images/checklistad.webp',
      '/wf/images/Innehaller.webp',
    ],
  },
}

export function getProductExtra(slug: string): ProductExtra | null {
  return PRODUCTS[slug] ?? null
}