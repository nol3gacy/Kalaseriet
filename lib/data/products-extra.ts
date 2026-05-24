// Långa CSV-beskrivningar + extra bilder per produkt
// Keyed by slug. If a product is missing here, fall back to existing description.

export type ProductExtra = {
  longDescription: string
  images: string[]  // Cover + additional images for the carousel
}

const INBJUDAN_GENERIC = 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66b0a9431c40503c2514835b_inbjudan-26.avif'

const lookup: Record<string, ProductExtra> = {
  'piratkalaset-for-4-aringar': {
    longDescription: 'Fira med ett spännande Piratkalas! Perfekt för 4-åringar som älskar äventyr och skatter. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Färdiga diplom och länk till spellistor ingår. Få tips på dekorationer och använd vår utskriftbara mall för checklista och körschema för en smidig och minnesvärd fest.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662373210fabe6fc857df4ba_Piratkalaset-4-aringar-cover.avif', INBJUDAN_GENERIC],
  },
  'safarikalaset-for-4-aringar': {
    longDescription: 'Ge ditt barn en oförglömlig upplevelse med ett Safarikalas! Perfekt för 4-åringar som älskar djur och natur. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en enkel och rolig kalasplanering.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e1e4739522fe6ee458c1_Safarikalaset%20for%204-aringar.avif', INBJUDAN_GENERIC],
  },
  'prins-prinsesskalaset-for-4-aringar': {
    longDescription: 'Fira med ett förtrollande Prins & Prinsesskalas! Perfekt för 4-åringar som drömmer om slott och sagor. Spara tid med 20 färdiga lekar och aktiviteter, elegant inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en magisk och välorganiserad fest.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e2ce16064b6258464966_Prins%20och%20Prinsesskalaset%20for%204-aringar.avif', INBJUDAN_GENERIC],
  },
  'djungelkalaset-for-4-aringar': {
    longDescription: 'Ge ditt barn ett spännande äventyr med ett Djungelkalas! Perfekt för 4-åringar som älskar djur och vildmark. Spara tid med 20 färdiga lekar och aktiviteter, inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en rolig och smidig kalasplanering.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e30b5eec1f2331a69264_Djungelkalaset%20for%204-aringar.jpg', INBJUDAN_GENERIC],
  },
  'rymdkalaset-for-4-aringar': {
    longDescription: 'Utforska universum med ett spännande Rymdkalas! Perfekt för 4-åringar som drömmer om stjärnor och planeter. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en galaktiskt rolig fest.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e3b5739522fe6ee60bbc_Rymdkalaset%20for%204-aringar.avif', INBJUDAN_GENERIC],
  },
  'dinosauriekalaset-for-4-aringar': {
    longDescription: 'Ge ditt barn ett urtida äventyr med ett Dinosauriekalas! Perfekt för 4-åringar som fascineras av dinosaurier. Spara tid med 20 färdiga lekar och aktiviteter, inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en spännande och välorganiserad fest.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e3f1ca3e7be3c3fc93d8_Dinosauriekalaset%20for%204-aringar.avif', INBJUDAN_GENERIC],
  },
  'robotkalaset-for-4-aringar': {
    longDescription: 'Fira med ett futuristiskt Robotkalas! Perfekt för 4-åringar som älskar teknik och robotar. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer. Använd vår utskriftbara mall för checklista och körschema för en innovativ och rolig fest.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623ee1e1a155b5255f748a8_Robotkalaset%20for%204-aringar.jpg', INBJUDAN_GENERIC],
  },
  'superhjaltekalaset-for-4-aringar': {
    longDescription: 'Ge ditt barn ett actionfyllt Superhjältekalas! Perfekt för 4-åringar som älskar superhjältar och äventyr. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623ef43d1360a25b9ea5226_Superhjaltekalaset%20for%204-aringar.jpg', INBJUDAN_GENERIC],
  },
  'aventyrskalaset-for-4-aringar': {
    longDescription: 'Ge ditt barn ett spännande Äventyrskalas! Perfekt för 4-åringar som älskar mysterier och upptäckter. Spara tid med 20 färdiga lekar och aktiviteter, en inbjudan som du enkelt skriver ut och fyller i. Inkluderar färdiga diplom, länk till spellistor, och tips på dekorationer.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623ef739220a77532b03604_aventyrskalaset%20for%204-aringar.avif', INBJUDAN_GENERIC],
  },
  'superhjaltekalaset-for-5-aringar': {
    longDescription: 'Fira med ett actionfyllt Superhjältekalas! Perfekt för 5-åringar som älskar superhjältar och äventyr. Spara tid med 20 färdiga lekar och aktiviteter, en inbjudan som du enkelt skriver ut och fyller i.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623efc6927f948729df75d9_Superhjaltekalaset%20for%205-aringar.avif', INBJUDAN_GENERIC],
  },
  'piratkalaset-for-5-aringar': {
    longDescription: 'Segla in i äventyret med ett Piratkalas! Perfekt för 5-åringar som älskar skatter och sjörövare. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623f0183e60afcd069301a1_Piratkalaset%20for%205-aringar.avif', INBJUDAN_GENERIC],
  },
  'safarikalaset-for-5-aringar': {
    longDescription: 'Ge ditt barn en oförglömlig upplevelse med ett Safarikalas! Perfekt för 5-åringar som älskar djur och natur. Spara tid med 20 färdiga lekar och aktiviteter, en inbjudan som du enkelt skriver ut och fyller i.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623f043c8724bd41b0fa685_Safarikalaset%20for%205-aringar.avif', INBJUDAN_GENERIC],
  },
  'robotkalaset-for-5-aringar': {
    longDescription: 'Fira med ett futuristiskt Robotkalas! Perfekt för 5-åringar som älskar teknik och robotar. Spara tid med 20 färdiga lekar och aktiviteter, snygg inbjudan där du bara skriver ut och fyller i.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662401a345550758456aa26a_Robotkalaset%20for%205-aringar.avif', INBJUDAN_GENERIC],
  },
  'rymdkalaset-for-5-aringar': {
    longDescription: 'Utforska universum med ett spännande Rymdkalas! Perfekt för 5-åringar som drömmer om stjärnor och planeter.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662401e8f971285a23f6e93f_Rymdkalaset%20for%205-aringar.jpg', INBJUDAN_GENERIC],
  },
  'dinosauriekalaset-for-5-aringar': {
    longDescription: 'Ge ditt barn ett urtida äventyr med ett Dinosauriekalas! Perfekt för 5-åringar som fascineras av dinosaurier.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662402310dcb58bbdc355869_Dinosauriekalaset%20for%205-aringar.avif', INBJUDAN_GENERIC],
  },
  'vilda-vastern-kalaset-for-5-aringar': {
    longDescription: 'Rid in i solnedgången med ett Vilda västern-kalas! Perfekt för 5-åringar som älskar cowboys och äventyr.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624026bc56b10a4161132d6_Vilda%20vastern-kalaset%20for%205-aringar.avif', INBJUDAN_GENERIC],
  },
  'aventyrskalaset-for-5-aringar': {
    longDescription: 'Ge ditt barn ett spännande Äventyrskalas! Perfekt för 5-åringar som älskar mysterier och upptäckter.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624029ec8724bd41b1e55bf_aventyrskalaset%20for%205-aringar.avif', INBJUDAN_GENERIC],
  },
  'detektivkalaset-for-6-aringar': {
    longDescription: 'Fira med ett klurigt Detektivkalas! Perfekt för 6-åringar som älskar att lösa mysterier och gåtor.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662402d23fb7c4382d5f62f3_Detektivkalaset%20for%206-aringar.avif', INBJUDAN_GENERIC],
  },
  'spokkalaset-for-6-aringar': {
    longDescription: 'Ge ditt barn ett kusligt Spökkalas! Perfekt för 6-åringar som älskar skräck och spänning.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624030c330fd69fdd1dfa7b_Spokkalaset%20for%206-aringar.avif', INBJUDAN_GENERIC],
  },
  'vetenskapskalaset-for-6-aringar': {
    longDescription: 'Utforska världen med ett spännande Vetenskapskalas! Perfekt för 6-åringar som älskar experiment och upptäckter.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66240334fb4048de4e32e211_Vetenskapskalaset%20for%206-aringar.avif', INBJUDAN_GENERIC],
  },
  'superhjaltekalaset-for-6-aringar': {
    longDescription: 'Fira med ett actionfyllt Superhjältekalas! Perfekt för 6-åringar som älskar superhjältar och äventyr.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66240393316335c8ee8b1c17_Superhjaltekalaset%20for%206-aringar.avif', INBJUDAN_GENERIC],
  },
  'ninjakalaset-for-6-aringar': {
    longDescription: 'Ge ditt barn ett spännande Ninjakalas! Perfekt för 6-åringar som älskar ninjor och äventyr.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662403bd6cf6f76f6c7c13ce_Ninjakalaset%20for%206-aringar.avif', INBJUDAN_GENERIC],
  },
  'cirkuskalaset-for-6-aringar': {
    longDescription: 'Skapa magi med ett roligt Cirkuskalas! Perfekt för 6-åringar som älskar clowner, jonglörer och akrobater.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cd5e399a5db334ca516c_Cirkuskalaset%20for%206-aringar.avif', INBJUDAN_GENERIC],
  },
  'astronautkalaset-for-6-aringar': {
    longDescription: 'Utforska universum med ett spännande Astronautkalas! Perfekt för 6-åringar som drömmer om rymden och stjärnor.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cda467bca134a1f53977_Astronautkalaset%20for%206-aringar.avif', INBJUDAN_GENERIC],
  },
  'sportkalaset-for-6-aringar': {
    longDescription: 'Fira med ett aktivt Sportkalas! Perfekt för 6-åringar som älskar sport och rörelse.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6648bb089a59ec1541883fcf_Sportkalaset%20for%206-aringar.avif', INBJUDAN_GENERIC],
  },
  'sportkalaset-for-7-8-aringar': {
    longDescription: 'Ge ditt barn ett aktivt Sportkalas! Perfekt för 7 och 8-åringar som älskar sport och rörelse.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624ce3cd06cde3819246335_Sportkalaset%20for%207-8-aringar.avif', 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66b0a9431c40503c2514835b_inbjudan-26.avif'],
  },
  'astronautkalaset-for-7-8-aringar': {
    longDescription: 'Utforska universum med ett spännande Astronautkalas! Perfekt för 7 och 8-åringar som drömmer om rymden och stjärnor.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624ce7fa652ac384780e4e1_Astronautkalaset%20for%207-8-aringar.avif', INBJUDAN_GENERIC],
  },
  'discokalaset-for-7-8-aringar': {
    longDescription: 'Skapa en fest med ett glittrigt Discokalas! Perfekt för 7 och 8-åringar som älskar musik och dans.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cec2038ee7f978687f3f_Discokalaset%20for%207-8-aringar.avif', INBJUDAN_GENERIC],
  },
  'pysselkalaset-for-7-8-aringar': {
    longDescription: 'Fira med ett kreativt Pysselkalas! Perfekt för 7 och 8-åringar som älskar att skapa och pyssla.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cf033f39ffabcd022d28_Pysselkalaset%20for%207-8-aringar.avif', INBJUDAN_GENERIC],
  },
  'vetenskapskalaset-for-7-8-aringar': {
    longDescription: 'Utforska världen med ett spännande Vetenskapskalas! Perfekt för 7 och 8-åringar som älskar experiment och upptäckter.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cf57ee1c0be74c56db7f_Vetenskapskalaset%20for%207-8-aringar.avif', INBJUDAN_GENERIC],
  },
  'cirkuskalaset-for-7-8-aringar': {
    longDescription: 'Skapa magi med ett roligt Cirkuskalas! Perfekt för 7 och 8-åringar som älskar clowner, jonglörer och akrobater.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cfb49bf16dc9d02295a4_Cirkuskalaset%20for%207-8-aringar.avif', INBJUDAN_GENERIC],
  },
  'filmkvallskalaset-for-7-8-aringar': {
    longDescription: 'Skapa en stjärnkväll med ett Filmkvällskalas! Perfekt för 7 och 8-åringar som älskar film och popcorn.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624d006aa3a7203a335b0ce_Filmkvallskalaset%20for%207-8-aringar.avif', INBJUDAN_GENERIC],
  },
  'konstnarskalaset-for-7-8-aringar': {
    longDescription: 'Fira med ett kreativt Konstnärskalas! Perfekt för 7 och 8-åringar som älskar att måla och skapa.',
    images: ['https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624d0993f39ffabcd03a4ec_Konstnarskalaset%20for%207-8-aringar.avif', INBJUDAN_GENERIC],
  },
}

export function getProductExtra(slug: string): ProductExtra | null {
  return lookup[slug] ?? null
}
