// Real kalaseriet.se assets per product.
// Every product now gets 4 images for the carousel:
// 1. Cover photo (kids playing) — gets "Inspirationsbild" watermark
// 2. inbjudan-N.avif (invitation preview, varies per product)
// 3. mockup.jpg (generic product mockup from kalaseriet.se)
// 4. Innehaller.jpg (what's-included photo, from kalaseriet.se)

export type ProductExtra = {
  longDescription: string
  images: string[]
}

// Generic kalaseriet.se images that appear on every product page
const MOCKUP = 'https://cdn.prod.website-files.com/656cc3301afe859e486de65d/66acb7b4a9d59f2b09cdc6e8_mockup.jpg'
const INNEHALLER = 'https://cdn.prod.website-files.com/656cc3301afe859e486de65d/66acb8e180b47ef062986a15_Innehaller.jpg'
const CHECKLISTAD = 'https://cdn.prod.website-files.com/656cc3301afe859e486de65d/66a9e4459d7e614287a6ec83_checklistad.png'

// Per-product invitation preview — only 2 URLs verified on Webflow CDN.
// Alternate between them so each product still gets a real invitation image.
const INBJUDAN_VARIANTS = [
  'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66b0a7c3cec6424e8574c574_inbjudan-2.avif',
  'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66b0a9431c40503c2514835b_inbjudan-26.avif',
]
function inbjudan(n: number): string {
  return INBJUDAN_VARIANTS[n % INBJUDAN_VARIANTS.length]
}

// Map slug → cover image + inbjudan number
const PRODUCTS: Record<string, { cover: string; inbjudanNo: number; longDescription: string }> = {
  'piratkalaset-for-4-aringar':           { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662373210fabe6fc857df4ba_Piratkalaset-4-aringar-cover.avif', inbjudanNo: 1, longDescription: 'Fira med ett spännande Piratkalas! Perfekt för 4-åringar som älskar äventyr och skatter. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Färdiga diplom och länk till spellistor ingår. Få tips på dekorationer och använd vår utskriftbara mall för checklista och körschema för en smidig och minnesvärd fest.' },
  'safarikalaset-for-4-aringar':          { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e1e4739522fe6ee458c1_Safarikalaset%20for%204-aringar.avif', inbjudanNo: 2, longDescription: 'Ge ditt barn en oförglömlig upplevelse med ett Safarikalas! Perfekt för 4-åringar som älskar djur och natur. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en enkel och rolig kalasplanering.' },
  'prins-prinsesskalaset-for-4-aringar':  { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e2ce16064b6258464966_Prins%20och%20Prinsesskalaset%20for%204-aringar.avif', inbjudanNo: 3, longDescription: 'Fira med ett förtrollande Prins & Prinsesskalas! Perfekt för 4-åringar som drömmer om slott och sagor. Spara tid med 20 färdiga lekar och aktiviteter, elegant inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en magisk och välorganiserad fest.' },
  'djungelkalaset-for-4-aringar':         { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e30b5eec1f2331a69264_Djungelkalaset%20for%204-aringar.jpg', inbjudanNo: 4, longDescription: 'Ge ditt barn ett spännande äventyr med ett Djungelkalas! Perfekt för 4-åringar som älskar djur och vildmark. Spara tid med 20 färdiga lekar och aktiviteter, inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer.' },
  'rymdkalaset-for-4-aringar':            { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e3b5739522fe6ee60bbc_Rymdkalaset%20for%204-aringar.avif', inbjudanNo: 5, longDescription: 'Utforska universum med ett spännande Rymdkalas! Perfekt för 4-åringar som drömmer om stjärnor och planeter. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i.' },
  'dinosauriekalaset-for-4-aringar':      { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e3f1ca3e7be3c3fc93d8_Dinosauriekalaset%20for%204-aringar.avif', inbjudanNo: 6, longDescription: 'Ge ditt barn ett urtida äventyr med ett Dinosauriekalas! Perfekt för 4-åringar som fascineras av dinosaurier.' },
  'robotkalaset-for-4-aringar':           { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623ee1e1a155b5255f748a8_Robotkalaset%20for%204-aringar.jpg', inbjudanNo: 7, longDescription: 'Fira med ett futuristiskt Robotkalas! Perfekt för 4-åringar som älskar teknik och robotar.' },
  'superhjaltekalaset-for-4-aringar':     { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623ef43d1360a25b9ea5226_Superhjaltekalaset%20for%204-aringar.jpg', inbjudanNo: 8, longDescription: 'Ge ditt barn ett actionfyllt Superhjältekalas! Perfekt för 4-åringar som älskar superhjältar och äventyr.' },
  'aventyrskalaset-for-4-aringar':        { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623ef739220a77532b03604_aventyrskalaset%20for%204-aringar.avif', inbjudanNo: 9, longDescription: 'Ge ditt barn ett spännande Äventyrskalas! Perfekt för 4-åringar som älskar mysterier och upptäckter.' },
  'superhjaltekalaset-for-5-aringar':     { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623efc6927f948729df75d9_Superhjaltekalaset%20for%205-aringar.avif', inbjudanNo: 10, longDescription: 'Fira med ett actionfyllt Superhjältekalas! Perfekt för 5-åringar som älskar superhjältar och äventyr.' },
  'piratkalaset-for-5-aringar':           { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623f0183e60afcd069301a1_Piratkalaset%20for%205-aringar.avif', inbjudanNo: 11, longDescription: 'Segla in i äventyret med ett Piratkalas! Perfekt för 5-åringar som älskar skatter och sjörövare.' },
  'safarikalaset-for-5-aringar':          { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623f043c8724bd41b0fa685_Safarikalaset%20for%205-aringar.avif', inbjudanNo: 12, longDescription: 'Ge ditt barn en oförglömlig upplevelse med ett Safarikalas! Perfekt för 5-åringar som älskar djur och natur.' },
  'robotkalaset-for-5-aringar':           { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662401a345550758456aa26a_Robotkalaset%20for%205-aringar.avif', inbjudanNo: 13, longDescription: 'Fira med ett futuristiskt Robotkalas! Perfekt för 5-åringar som älskar teknik och robotar.' },
  'rymdkalaset-for-5-aringar':            { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662401e8f971285a23f6e93f_Rymdkalaset%20for%205-aringar.jpg', inbjudanNo: 14, longDescription: 'Utforska universum med ett spännande Rymdkalas! Perfekt för 5-åringar som drömmer om stjärnor och planeter.' },
  'dinosauriekalaset-for-5-aringar':      { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662402310dcb58bbdc355869_Dinosauriekalaset%20for%205-aringar.avif', inbjudanNo: 15, longDescription: 'Ge ditt barn ett urtida äventyr med ett Dinosauriekalas! Perfekt för 5-åringar som fascineras av dinosaurier.' },
  'vilda-vastern-kalaset-for-5-aringar':  { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624026bc56b10a4161132d6_Vilda%20vastern-kalaset%20for%205-aringar.avif', inbjudanNo: 16, longDescription: 'Rid in i solnedgången med ett Vilda västern-kalas! Perfekt för 5-åringar som älskar cowboys och äventyr.' },
  'aventyrskalaset-for-5-aringar':        { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624029ec8724bd41b1e55bf_aventyrskalaset%20for%205-aringar.avif', inbjudanNo: 17, longDescription: 'Ge ditt barn ett spännande Äventyrskalas! Perfekt för 5-åringar som älskar mysterier och upptäckter.' },
  'detektivkalaset-for-6-aringar':        { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662402d23fb7c4382d5f62f3_Detektivkalaset%20for%206-aringar.avif', inbjudanNo: 18, longDescription: 'Fira med ett klurigt Detektivkalas! Perfekt för 6-åringar som älskar att lösa mysterier och gåtor.' },
  'spokkalaset-for-6-aringar':            { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624030c330fd69fdd1dfa7b_Spokkalaset%20for%206-aringar.avif', inbjudanNo: 19, longDescription: 'Ge ditt barn ett kusligt Spökkalas! Perfekt för 6-åringar som älskar skräck och spänning.' },
  'vetenskapskalaset-for-6-aringar':      { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66240334fb4048de4e32e211_Vetenskapskalaset%20for%206-aringar.avif', inbjudanNo: 20, longDescription: 'Utforska världen med ett spännande Vetenskapskalas! Perfekt för 6-åringar som älskar experiment och upptäckter.' },
  'superhjaltekalaset-for-6-aringar':     { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66240393316335c8ee8b1c17_Superhjaltekalaset%20for%206-aringar.avif', inbjudanNo: 21, longDescription: 'Fira med ett actionfyllt Superhjältekalas! Perfekt för 6-åringar som älskar superhjältar och äventyr.' },
  'ninjakalaset-for-6-aringar':           { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662403bd6cf6f76f6c7c13ce_Ninjakalaset%20for%206-aringar.avif', inbjudanNo: 22, longDescription: 'Ge ditt barn ett spännande Ninjakalas! Perfekt för 6-åringar som älskar ninjor och äventyr.' },
  'cirkuskalaset-for-6-aringar':          { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cd5e399a5db334ca516c_Cirkuskalaset%20for%206-aringar.avif', inbjudanNo: 23, longDescription: 'Skapa magi med ett roligt Cirkuskalas! Perfekt för 6-åringar som älskar clowner, jonglörer och akrobater.' },
  'astronautkalaset-for-6-aringar':       { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cda467bca134a1f53977_Astronautkalaset%20for%206-aringar.avif', inbjudanNo: 24, longDescription: 'Utforska universum med ett spännande Astronautkalas! Perfekt för 6-åringar som drömmer om rymden och stjärnor.' },
  'sportkalaset-for-6-aringar':           { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6648bb089a59ec1541883fcf_Sportkalaset%20for%206-aringar.avif', inbjudanNo: 25, longDescription: 'Fira med ett aktivt Sportkalas! Perfekt för 6-åringar som älskar sport och rörelse.' },
  'sportkalaset-for-7-8-aringar':         { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624ce3cd06cde3819246335_Sportkalaset%20for%207-8-aringar.avif', inbjudanNo: 26, longDescription: 'Ge ditt barn ett aktivt Sportkalas! Perfekt för 7 och 8-åringar som älskar sport och rörelse.' },
  'astronautkalaset-for-7-8-aringar':     { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624ce7fa652ac384780e4e1_Astronautkalaset%20for%207-8-aringar.avif', inbjudanNo: 1, longDescription: 'Utforska universum med ett spännande Astronautkalas! Perfekt för 7 och 8-åringar som drömmer om rymden och stjärnor.' },
  'discokalaset-for-7-8-aringar':         { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cec2038ee7f978687f3f_Discokalaset%20for%207-8-aringar.avif', inbjudanNo: 2, longDescription: 'Skapa en fest med ett glittrigt Discokalas! Perfekt för 7 och 8-åringar som älskar musik och dans.' },
  'pysselkalaset-for-7-8-aringar':        { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cf033f39ffabcd022d28_Pysselkalaset%20for%207-8-aringar.avif', inbjudanNo: 3, longDescription: 'Fira med ett kreativt Pysselkalas! Perfekt för 7 och 8-åringar som älskar att skapa och pyssla.' },
  'vetenskapskalaset-for-7-8-aringar':    { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cf57ee1c0be74c56db7f_Vetenskapskalaset%20for%207-8-aringar.avif', inbjudanNo: 4, longDescription: 'Utforska världen med ett spännande Vetenskapskalas! Perfekt för 7 och 8-åringar som älskar experiment och upptäckter.' },
  'cirkuskalaset-for-7-8-aringar':        { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cfb49bf16dc9d02295a4_Cirkuskalaset%20for%207-8-aringar.avif', inbjudanNo: 5, longDescription: 'Skapa magi med ett roligt Cirkuskalas! Perfekt för 7 och 8-åringar som älskar clowner, jonglörer och akrobater.' },
  'filmkvallskalaset-for-7-8-aringar':    { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624d006aa3a7203a335b0ce_Filmkvallskalaset%20for%207-8-aringar.avif', inbjudanNo: 6, longDescription: 'Skapa en stjärnkväll med ett Filmkvällskalas! Perfekt för 7 och 8-åringar som älskar film och popcorn.' },
  'konstnarskalaset-for-7-8-aringar':     { cover: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624d0993f39ffabcd03a4ec_Konstnarskalaset%20for%207-8-aringar.avif', inbjudanNo: 7, longDescription: 'Fira med ett kreativt Konstnärskalas! Perfekt för 7 och 8-åringar som älskar att måla och skapa.' },
}

export function getProductExtra(slug: string): ProductExtra | null {
  const p = PRODUCTS[slug]
  if (!p) return null
  return {
    longDescription: p.longDescription,
    // 4 images: kids photo (cover) + per-product invitation + generic mockup + generic Innehaller
    images: [p.cover, inbjudan(p.inbjudanNo), MOCKUP, INNEHALLER],
  }
}
