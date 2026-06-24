import { client } from '../sanity/lib/client'
import { allProductsQuery } from '../sanity/lib/queries'
import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import BentoBox from './components/BentoBox'
import DiscountMarquee from './components/DiscountMarquee'
import HeroVideo from './components/wf/HeroVideo'

export const themeColors: Record<string, { from: string; to: string; emoji: string }> = {
  pirat:        { from: '#dde3ea', to: '#b8c4d0', emoji: '☠️' },
  safari:       { from: '#fef3c7', to: '#fde68a', emoji: '🦁' },
  'prins prinsessa': { from: '#fce7f3', to: '#fbcfe8', emoji: '👑' },
  djungel:      { from: '#d1fae5', to: '#a7f3d0', emoji: '🌴' },
  superhjälte:  { from: '#dbeafe', to: '#bfdbfe', emoji: '⚡' },
  rymd:         { from: '#ede9fe', to: '#ddd6fe', emoji: '🚀' },
  dinosaurie:   { from: '#ccfbf1', to: '#99f6e4', emoji: '🦕' },
  robot:        { from: '#f1f5f9', to: '#e2e8f0', emoji: '🤖' },
  astronaut:    { from: '#e0e7ff', to: '#c7d2fe', emoji: '👨‍🚀' },
  äventyr:      { from: '#fef9c3', to: '#fef08a', emoji: '🗺️' },
  cirkus:       { from: '#ffe4e6', to: '#fecdd3', emoji: '🎪' },
  detektiv:     { from: '#e7e5e4', to: '#d6d3d1', emoji: '🔍' },
  disco:        { from: '#f5d0fe', to: '#e879f9', emoji: '🪩' },
  filmkväll:    { from: '#fef3c7', to: '#fde68a', emoji: '🎬' },
  konstnär:     { from: '#fce7f3', to: '#dbeafe', emoji: '🎨' },
  ninja:        { from: '#e2e8f0', to: '#94a3b8', emoji: '🥷' },
  spök:         { from: '#f5f3ff', to: '#ede9fe', emoji: '👻' },
  sport:        { from: '#dcfce7', to: '#bbf7d0', emoji: '⚽' },
  vetenskap:    { from: '#cffafe', to: '#a5f3fc', emoji: '🔬' },
  'vilda västern': { from: '#fef3c7', to: '#fde68a', emoji: '🤠' },
  pyssla:       { from: '#fce7f3', to: '#fbcfe8', emoji: '✂️' },
}

export type Product = {
  _id: string
  name: string
  theme: string
  ageGroup: string
  description: string
  price: number
  originalPrice?: number
  image: Record<string, unknown> | null
  externalImageUrl?: string
  isNew: boolean
  isPopular: boolean
  slug: { current: string }
  order?: number
}

export const fallbackProducts: Product[] = [
  // 4-åringar
  { _id: 'p01', name: 'Piratkalaset',            theme: 'pirat',           ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'piratkalaset-for-4-aringar'            }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662373210fabe6fc857df4ba_Piratkalaset-4-aringar-cover.avif',                          description: 'Fira med ett spännande Piratkalas! Perfekt för 4-åringar som älskar äventyr och skatter.' },
  { _id: 'p02', name: 'Safarikalaset',           theme: 'safari',          ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'safarikalaset-for-4-aringar'           }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e1e4739522fe6ee458c1_Safarikalaset%20for%204-aringar.avif',                        description: 'Upptäck den vilda safarins värld på ditt barns kalas! Perfekt för nyfikna 4-åringar.' },
  { _id: 'p03', name: 'Prins & Prinsesskalaset', theme: 'prins prinsessa', ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'prins-prinsesskalaset-for-4-aringar'    }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e2ce16064b6258464966_Prins%20och%20Prinsesskalaset%20for%204-aringar.avif', description: 'Bjud in till ett magiskt prins- och prinsesskalas! Idealiskt för 4-åringar som drömmer om sagornas värld.' },
  { _id: 'p04', name: 'Djungelkalaset',          theme: 'djungel',         ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'djungelkalaset-for-4-aringar'          }, image: null, externalImageUrl: '',                                                                                                                                          description: 'Äventyr väntar på Djungelkalaset! Perfekt för nyfikna 4-åringar redo att utforska.' },
  { _id: 'p05', name: 'Rymdkalaset',             theme: 'rymd',            ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'rymdkalaset-for-4-aringar'             }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e3b5739522fe6ee60bbc_Rymdkalaset%20for%204-aringar.avif',                        description: 'Starta en rymdresa på ditt barns kalas! Utforska universum med ett rymdtema för vetgiriga 4-åringar.' },
  { _id: 'p06', name: 'Dinosauriekalaset',       theme: 'dinosaurie',      ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'dinosauriekalaset-for-4-aringar'       }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623e3f1ca3e7be3c3fc93d8_Dinosauriekalaset%20for%204-aringar.avif',                   description: 'Återupplev dinosauriernas era på ditt barns kalas! Perfekt för små paleontologer.' },
  { _id: 'p07', name: 'Robotkalaset',            theme: 'robot',           ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'robotkalaset-for-4-aringar'            }, image: null, externalImageUrl: '',                                                                                                                                          description: 'Konstruera glädje med ett Robotkalas! Idealiskt för teknikintresserade 4-åringar.' },
  { _id: 'p08', name: 'Superhjältekalaset',      theme: 'superhjälte',     ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'superhjaltekalaset-for-4-aringar'      }, image: null, externalImageUrl: '',                                                                                                                                          description: 'Kalla in superhjältarna till festen! En supermakt-upplevelse för energiska 4-åringar.' },
  { _id: 'p09', name: 'Äventyrskalaset',         theme: 'äventyr',         ageGroup: '4', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'aventyrskalaset-for-4-aringar'         }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623ef739220a77532b03604_aventyrskalaset%20for%204-aringar.avif',                    description: 'Gå på ett spännande äventyrskalas! Idealiskt för modiga 4-åringar som älskar upptäcktsfärder.' },
  // 5-åringar
  { _id: 'p10', name: 'Superhjältekalaset',      theme: 'superhjälte',     ageGroup: '5', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'superhjaltekalaset-for-5-aringar'      }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623efc6927f948729df75d9_Superhjaltekalaset%20for%205-aringar.avif',               description: 'Hjältedåd väntar på Superhjältekalaset! Perfekt för energiska 5-åringar som vill rädda världen.' },
  { _id: 'p11', name: 'Piratkalaset',            theme: 'pirat',           ageGroup: '5', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'piratkalaset-for-5-aringar'            }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623f0183e60afcd069301a1_Piratkalaset%20for%205-aringar.avif',                        description: 'Arrr! Piratkalaset för 5-åringar väntar! Perfekt för små sjörövare i sökandet efter äventyr.' },
  { _id: 'p12', name: 'Safarikalaset',           theme: 'safari',          ageGroup: '5', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'safarikalaset-for-5-aringar'           }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6623f043c8724bd41b0fa685_Safarikalaset%20for%205-aringar.avif',                        description: 'Utforska den spännande safari-världen på ditt barns kalas! Perfekt för utforskningslystna 5-åringar.' },
  { _id: 'p13', name: 'Robotkalaset',            theme: 'robot',           ageGroup: '5', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'robotkalaset-for-5-aringar'            }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662401a345550758456aa26a_Robotkalaset%20for%205-aringar.avif',                        description: 'Bjud in till en teknikfylld fest med Robotkalaset! Idealiskt för uppfinningsrika 5-åringar.' },
  { _id: 'p14', name: 'Rymdkalaset',             theme: 'rymd',            ageGroup: '5', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'rymdkalaset-for-5-aringar'             }, image: null, externalImageUrl: '',                                                                                                                                          description: 'Upptäck kosmos med ett Rymdkalas! Perfekt för nyfikna 5-åringar intresserade av stjärnor.' },
  { _id: 'p15', name: 'Dinosauriekalaset',       theme: 'dinosaurie',      ageGroup: '5', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'dinosauriekalaset-for-5-aringar'       }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662402310dcb58bbdc355869_Dinosauriekalaset%20for%205-aringar.avif',                   description: 'Upptäck dinosauriernas värld på ditt barns kalas! Perfekt för små paleontologer.' },
  { _id: 'p16', name: 'Vilda västern-kalaset',   theme: 'vilda västern',   ageGroup: '5', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'vilda-vastern-kalaset-for-5-aringar'   }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624026bc56b10a4161132d6_Vilda%20vastern-kalaset%20for%205-aringar.avif',             description: 'Ge dig ut på ett vilda västern-äventyr! Idealiskt för små cowboys och cowgirls.' },
  { _id: 'p17', name: 'Äventyrskalaset',         theme: 'äventyr',         ageGroup: '5', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'aventyrskalaset-for-5-aringar'         }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624029ec8724bd41b1e55bf_aventyrskalaset%20for%205-aringar.avif',                    description: 'Gå på ett äventyr med Äventyrskalaset! Perfekt för 5-åringar med stor upptäckarlust.' },
  // 6-åringar
  { _id: 'p18', name: 'Detektivkalaset',         theme: 'detektiv',        ageGroup: '6', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'detektivkalaset-for-6-aringar'         }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662402d23fb7c4382d5f62f3_Detektivkalaset%20for%206-aringar.avif',                   description: 'Lös mysterier på Detektivkalaset! Perfekt för små detektiver.' },
  { _id: 'p19', name: 'Spökkalaset',             theme: 'spök',            ageGroup: '6', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'spokkalaset-for-6-aringar'             }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624030c330fd69fdd1dfa7b_Spokkalaset%20for%206-aringar.avif',                        description: 'Skäm bort gästerna med ett spökligt roligt kalas! Idealiskt för 6-åringar som älskar lite spänning.' },
  { _id: 'p20', name: 'Vetenskapskalaset',       theme: 'vetenskap',       ageGroup: '6', price: 99, originalPrice: 269, isNew: true,  isPopular: false, slug: { current: 'vetenskapskalaset-for-6-aringar'       }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66240334fb4048de4e32e211_Vetenskapskalaset%20for%206-aringar.avif',                   description: 'Blås liv i vetenskapens värld på ditt barns kalas! Perfekt för unga forskare.' },
  { _id: 'p21', name: 'Superhjältekalaset',      theme: 'superhjälte',     ageGroup: '6', price: 99, originalPrice: 269, isNew: true,  isPopular: true,  slug: { current: 'superhjaltekalaset-for-6-aringar'      }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/66240393316335c8ee8b1c17_Superhjaltekalaset%20for%206-aringar.avif',               description: 'Kalla in superhjältarna till festen! En supermakt-upplevelse för energiska 6-åringar.' },
  { _id: 'p22', name: 'Ninjakalaset',            theme: 'ninja',           ageGroup: '6', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'ninjakalaset-for-6-aringar'            }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/662403bd6cf6f76f6c7c13ce_Ninjakalaset%20for%206-aringar.avif',                        description: 'Förbered dig på en ninjafylld festdag! Perfekt för smidiga och snabba 6-åringar.' },
  { _id: 'p23', name: 'Cirkuskalaset',           theme: 'cirkus',          ageGroup: '6', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'cirkuskalaset-for-6-aringar'           }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cd5e399a5db334ca516c_Cirkuskalaset%20for%206-aringar.avif',                        description: 'Stig in i cirkusens färgglada värld! En fest full av skratt och akrobatik för 6-åringar.' },
  { _id: 'p24', name: 'Astronautkalaset',        theme: 'astronaut',       ageGroup: '6', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'astronautkalaset-for-6-aringar'        }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cda467bca134a1f53977_Astronautkalaset%20for%206-aringar.avif',                    description: 'Lyft upp ditt barns kalas till stjärnorna! Idealiskt för nyfikna 6-åringar fascinerade av rymden.' },
  { _id: 'p25', name: 'Sportkalaset',            theme: 'sport',           ageGroup: '6', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'sportkalaset-for-6-aringar'            }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6648bb089a59ec1541883fcf_Sportkalaset%20for%206-aringar.avif',                        description: 'Aktivera festen med ett sportkalas! Perfekt för sportiga 6-åringar som älskar att röra på sig.' },
  // 7 & 8-åringar
  { _id: 'p26', name: 'Sportkalaset',            theme: 'sport',           ageGroup: '7-8', price: 99, originalPrice: 269, isNew: false, isPopular: true,  slug: { current: 'sportkalaset-for-7-8-aringar'         }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624ce3cd06cde3819246335_Sportkalaset%20for%207-8-aringar.avif',                       description: 'Låt spelet börja på Sportkalaset! En aktiv fest för sportälskande 7 & 8-åringar.' },
  { _id: 'p27', name: 'Astronautkalaset',        theme: 'astronaut',       ageGroup: '7-8', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'astronautkalaset-for-7-8-aringar'     }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624ce7fa652ac384780e4e1_Astronautkalaset%20for%207-8-aringar.avif',                   description: 'Utforska rymdens mysterier på ditt barns kalas! Perfekt för 7 & 8-åringar med stjärnögon.' },
  { _id: 'p28', name: 'Discokalaset',            theme: 'disco',           ageGroup: '7-8', price: 99, originalPrice: 269, isNew: true,  isPopular: false, slug: { current: 'discokalaset-for-7-8-aringar'         }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cec2038ee7f978687f3f_Discokalaset%20for%207-8-aringar.avif',                       description: 'Dansa loss på Discokalaset! En rytmisk fest för 7 & 8-åringar som älskar att dansa.' },
  { _id: 'p29', name: 'Pysselkalaset',           theme: 'pyssla',          ageGroup: '7-8', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'pysselkalaset-for-7-8-aringar'        }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cf033f39ffabcd022d28_Pysselkalaset%20for%207-8-aringar.avif',                       description: 'Frigör kreativiteten på Pysselkalaset! Ett kreativt kalas för 7 & 8-åringar som älskar att skapa.' },
  { _id: 'p30', name: 'Vetenskapskalaset',       theme: 'vetenskap',       ageGroup: '7-8', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'vetenskapskalaset-for-7-8-aringar'    }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cf57ee1c0be74c56db7f_Vetenskapskalaset%20for%207-8-aringar.avif',                   description: 'Experimentera och utforska på Vetenskapskalaset! En upptäcktsfest för nyfikna 7 & 8-åringar.' },
  { _id: 'p31', name: 'Cirkuskalaset',           theme: 'cirkus',          ageGroup: '7-8', price: 99, originalPrice: 269, isNew: false, isPopular: false, slug: { current: 'cirkuskalaset-for-7-8-aringar'        }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624cfb49bf16dc9d02295a4_Cirkuskalaset%20for%207-8-aringar.avif',                       description: 'Kom och upplev cirkusmagin! En underhållande och färgglad fest för 7 & 8-åringar.' },
  { _id: 'p32', name: 'Filmkvällskalaset',       theme: 'filmkväll',       ageGroup: '7-8', price: 99, originalPrice: 269, isNew: true,  isPopular: true,  slug: { current: 'filmkvallskalaset-for-7-8-aringar'    }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624d006aa3a7203a335b0ce_Filmkvallskalaset%20for%207-8-aringar.avif',                   description: 'Gör dig redo för en filmkväll! En mysig och underhållande fest för filmälskande 7 & 8-åringar.' },
  { _id: 'p33', name: 'Konstnärskalaset',        theme: 'konstnär',        ageGroup: '7-8', price: 99, originalPrice: 269, isNew: true,  isPopular: false, slug: { current: 'konstnarskalaset-for-7-8-aringar'     }, image: null, externalImageUrl: 'https://cdn.prod.website-files.com/656cc33f15901291e8334d1e/6624d0993f39ffabcd03a4ec_Konstnarskalaset%20for%207-8-aringar.avif',                   description: 'Släpp loss konstnären inom dig på Konstnärskalaset! En kreativ fest för små konstnärer.' },
]

async function getProducts(): Promise<Product[]> {
  try {
    const data = await client.fetch(allProductsQuery, {}, { next: { revalidate: 60 } })
    return data?.length ? data : fallbackProducts
  } catch {
    return fallbackProducts
  }
}


export default async function Home() {
  const products = await getProducts()

  return (
    <>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero">
        <HeroVideo />
        <div className="hero-top">
          <div className="hero-preample">Vi har tydligen</div>
          <h1 className="heading is--xxl">Sveriges bästa kalaslekar<span className="hero-asterix">*</span></h1>
          <div className="hero-smallprint is--text">*Enligt Leo &amp; Wilma</div>
        </div>
        <div className="hero-sub is--hero">
          Gör barnkalaset oförglömligt med hjälp av våra <a href="/kalas">kalasteman</a>! Massor av idéer för kalaslekar, mall för inbjudning, recept, checklistor, musik med mera!
        </div>
        <div className="hero-bottom">
          <div className="hero-buttons-wrapper">
            <a href="/kalas" className="btn is--hero w-inline-block">
              <div><span className="btn-text">Kolla in kalasen ›</span></div>
            </a>
            <a href="/sa-funkar-det" className="btn is--secondary w-inline-block">
              <div><span className="btn-text is--secondary">Så funkar det</span></div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────── */}
      <DiscountMarquee />

      {/* ── Bento ─────────────────────────────────────────── */}
      <BentoBox />

      {/* ── Kalasen (filter + all products) ───────────────── */}
      <ProductGrid products={products} heading="Kalasen" />

      {/* ── About ─────────────────────────────────────────── */}
      <section className="about">
        <div className="container">
          <div className="text is--about w-richtext">
            <p>Hos Kalaseriet hittar du ett brett utbud av kalaslekpaket för det perfekta barnkalaset. Varje tema har roliga lekar som passar perfekt för kalas och för barnets ålder. Hos Kalaseriet gör vi varje kalas till en oförglömlig upplevelse!</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
