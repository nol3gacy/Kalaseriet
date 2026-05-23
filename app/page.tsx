import { client } from '../sanity/lib/client'
import { allProductsQuery } from '../sanity/lib/queries'
import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'

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

const marqueeItems = [
  '☠️ Pirat', '🦁 Safari', '👑 Prins & Prinsessa', '🌴 Djungel',
  '⚡ Superhjälte', '🚀 Rymd', '🦕 Dinosaurie', '🤖 Robot',
  '👨‍🚀 Astronaut', '🎪 Cirkus', '🥷 Ninja', '👻 Spök',
  '⚡ Ladda ner direkt', '💰 Spara pengar', '⭐ 100% Garanti',
]

export default async function Home() {
  const products = await getProducts()
  const popular = products.filter(p => p.isPopular)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5910b6] bg-violet-50 border border-violet-200 rounded-full px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 bg-[#5910b6] rounded-full animate-pulse" />
              Sveriges roligaste kalaspaket – direkt nedladdning
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
              Vi har tydligen{' '}
              <span className="text-[#5910b6]">Sveriges bästa</span>{' '}
              kalaslekar&nbsp;🎊
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed">
              Kompletta digitala kalaspaket med lekar, inbjudningar,
              bordsdekorationer och mer. Ladda ner, skriv ut hemma och fira!
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#alla-kalas" className="btn-primary">
                Se alla {products.length} kalas ›
              </a>
              <a href="#sa-funkar-det" className="btn-secondary">
                Hur funkar det?
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: '⚡', text: 'Ladda ner direkt' },
                { icon: '🛡️', text: '100% nöjdhetsgaranti' },
                { icon: '🌍', text: 'Miljövänligt' },
                { icon: '💰', text: 'Spara jämfört med tryckt' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span>{b.icon}</span><span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ─────────────────────────────────────────── */}
      <div className="bg-[#5910b6] py-3 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 text-white font-semibold text-xs mx-3">
              {item}<span className="text-[#FCD34D]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Populära kalas ──────────────────────────────────── */}
      {popular.length > 0 && (
        <section id="populara" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Populära kalas</h2>
                <p className="text-gray-500 mt-1 text-sm">Barnens favoriter just nu</p>
              </div>
              <a href="#alla-kalas" className="text-sm font-semibold text-[#5910b6] hover:underline shrink-0">Se alla →</a>
            </div>
            <ProductGrid products={popular} />
          </div>
        </section>
      )}

      {/* ── Alla kalas ──────────────────────────────────────── */}
      <section id="alla-kalas" className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Alla kalas{' '}
              <span className="text-base font-normal text-gray-400 ml-1">({products.length} st)</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm">Välj tema och åldersgrupp</p>
          </div>
          <ProductGrid products={products} showFilter />
        </div>
      </section>

      {/* ── Så funkar det ───────────────────────────────────── */}
      <section id="sa-funkar-det" className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Så funkar det</h2>
            <p className="text-gray-500">Från köp till utskrivet på bara några minuter.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '1', icon: '🎯', title: 'Välj tema',        body: 'Bläddra bland 33 teman och välj det perfekta för barnet.' },
              { n: '2', icon: '💳', title: 'Betala tryggt',    body: 'Säker betalning med Swish, kort eller faktura.' },
              { n: '3', icon: '📥', title: 'Ladda ner direkt', body: 'Du får en länk på mejl direkt – inga dagar att vänta.' },
              { n: '4', icon: '🎉', title: 'Skriv ut & fira!', body: 'Skriv ut hemma eller hos en print-shop och fira!' },
            ].map(s => (
              <div key={s.n} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-50 text-3xl mb-5 mx-auto">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FCD34D] text-gray-900 text-xs font-extrabold rounded-full flex items-center justify-center">{s.n}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fördelar ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Varför välja Kalaseriet?</h2>
            <p className="text-gray-500 text-sm">Vi gör det enkelt och prisvärt att förbereda barnets stora dag.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '⚡', title: 'Ladda ner direkt',    body: 'Ingen väntetid – filer direkt efter betalning.' },
              { icon: '💰', title: 'Spara pengar',        body: 'Bråkdelen av kostnaden jämfört med tryckt material.' },
              { icon: '🌍', title: 'Miljövänligt',        body: 'Skriv ut bara det du behöver och minska svinn.' },
              { icon: '✏️', title: 'Anpassa enkelt',      body: 'Lägg till barnets namn med valfritt program.' },
              { icon: '🖨️', title: 'Skriv ut hemma',     body: 'Fungerar med vanlig skrivare eller en print-shop.' },
              { icon: '🎨', title: 'Brett utbud',         body: '33 teman för barn 4–8 år.' },
              { icon: '🎂', title: 'Åldersanpassat',      body: 'Allt innehåll anpassat för rätt ålder.' },
              { icon: '⭐', title: 'Nöjdhetsgaranti',     body: '100% pengarna tillbaka om du inte är nöjd.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-violet-300 hover:shadow-sm transition-all">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Garanti ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-2xl text-3xl mb-6">🛡️</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">100% Nöjdhetsgaranti</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Vi är övertygade om kvaliteten. Om du av någon anledning inte är nöjd,
            kontaktar du oss inom 30 dagar – vi löser det direkt, inga frågor ställs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['✅ 30 dagars garanti', '✅ Inga frågor ställs', '✅ Snabb återbetalning'].map(b => (
              <span key={b} className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kalasbloggen teaser ─────────────────────────────── */}
      <section id="kalasbloggen" className="py-16 sm:py-20 bg-violet-50 border-t border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-[#5910b6] uppercase tracking-widest mb-3 block">Kalasbloggen</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Tips & inspiration</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
            Recept, aktiviteter och idéer för att göra barnets kalas ännu mer minnesvärt.
          </p>
          <a href="#kalasbloggen" className="btn-primary">
            Läs bloggen ›
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}
