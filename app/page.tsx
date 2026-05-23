import { client } from '../sanity/lib/client'
import { allProductsQuery } from '../sanity/lib/queries'
import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'

// Theme accent colours used as card backgrounds when no Sanity image exists
export const themeColors: Record<string, { from: string; to: string; emoji: string }> = {
  pirat:          { from: '#e2e8f0', to: '#cbd5e1', emoji: '☠️' },
  safari:         { from: '#fef3c7', to: '#fde68a', emoji: '🦁' },
  'prins prinsessa': { from: '#fce7f3', to: '#fbcfe8', emoji: '👑' },
  djungel:        { from: '#d1fae5', to: '#a7f3d0', emoji: '🌴' },
  superhjälte:    { from: '#dbeafe', to: '#bfdbfe', emoji: '⚡' },
  rymd:           { from: '#ede9fe', to: '#ddd6fe', emoji: '🚀' },
  dinosaurie:     { from: '#ccfbf1', to: '#99f6e4', emoji: '🦕' },
  robot:          { from: '#f1f5f9', to: '#e2e8f0', emoji: '🤖' },
}

// Fallback products used before Sanity is connected
const fallbackProducts = [
  // 4–6 år
  { _id: 'p1',  name: 'Piratkalaset',          theme: 'pirat',           ageGroup: '4-6', price: 99,  originalPrice: 269, description: 'Fira med ett spännande piratkalas!',                 isNew: false, isPopular: true,  slug: { current: 'piratkalaset-4-6' },          image: null, downloadContents: [] },
  { _id: 'p2',  name: 'Safarikalaset',          theme: 'safari',          ageGroup: '4-6', price: 99,  originalPrice: 269, description: 'Upptäck den vilda safarins värld!',                 isNew: false, isPopular: false, slug: { current: 'safarikalaset-4-6' },          image: null, downloadContents: [] },
  { _id: 'p3',  name: 'Prins & Prinsesskalaset',theme: 'prins prinsessa', ageGroup: '4-6', price: 99,  originalPrice: 269, description: 'Bjud in till ett magiskt prinsesskalas!',          isNew: true,  isPopular: true,  slug: { current: 'prins-prinsessa-4-6' },       image: null, downloadContents: [] },
  { _id: 'p4',  name: 'Djungelkalaset',         theme: 'djungel',         ageGroup: '4-6', price: 99,  originalPrice: 269, description: 'Ett vilt äventyr djupt in i djungeln!',             isNew: false, isPopular: false, slug: { current: 'djungelkalaset-4-6' },         image: null, downloadContents: [] },
  { _id: 'p5',  name: 'Superhjältekalaset',     theme: 'superhjälte',     ageGroup: '4-6', price: 99,  originalPrice: 269, description: 'Rädda världen på ditt superhjältekalas!',           isNew: false, isPopular: false, slug: { current: 'superhjaltekalaset-4-6' },     image: null, downloadContents: [] },
  { _id: 'p6',  name: 'Rymdkalaset',             theme: 'rymd',            ageGroup: '4-6', price: 99,  originalPrice: 269, description: 'Ta raketen till stjärnorna!',                      isNew: true,  isPopular: false, slug: { current: 'rymdkalaset-4-6' },           image: null, downloadContents: [] },
  { _id: 'p7',  name: 'Dinosauriekalaset',      theme: 'dinosaurie',      ageGroup: '4-6', price: 99,  originalPrice: 269, description: 'Roar! Bli en riktig dinosauriejägare.',             isNew: false, isPopular: false, slug: { current: 'dinosauriekalaset-4-6' },     image: null, downloadContents: [] },
  { _id: 'p8',  name: 'Robotkalaset',           theme: 'robot',           ageGroup: '4-6', price: 99,  originalPrice: 269, description: 'Koda och fira som en framtidens robot!',           isNew: false, isPopular: false, slug: { current: 'robotkalaset-4-6' },          image: null, downloadContents: [] },
  // 7–8 år
  { _id: 'p9',  name: 'Piratkalaset',           theme: 'pirat',           ageGroup: '7-8', price: 119, originalPrice: 269, description: 'Fira med ett spännande piratkalas!',                isNew: false, isPopular: false, slug: { current: 'piratkalaset-7-8' },          image: null, downloadContents: [] },
  { _id: 'p10', name: 'Safarikalaset',          theme: 'safari',          ageGroup: '7-8', price: 119, originalPrice: 269, description: 'Upptäck den vilda safarins värld!',                isNew: false, isPopular: false, slug: { current: 'safarikalaset-7-8' },          image: null, downloadContents: [] },
  { _id: 'p11', name: 'Prins & Prinsesskalaset',theme: 'prins prinsessa', ageGroup: '7-8', price: 119, originalPrice: 269, description: 'Bjud in till ett magiskt prinsesskalas!',          isNew: false, isPopular: true,  slug: { current: 'prinsessa-7-8' },            image: null, downloadContents: [] },
  { _id: 'p12', name: 'Djungelkalaset',         theme: 'djungel',         ageGroup: '7-8', price: 119, originalPrice: 269, description: 'Ett vilt äventyr djupt in i djungeln!',            isNew: false, isPopular: false, slug: { current: 'djungelkalaset-7-8' },         image: null, downloadContents: [] },
  { _id: 'p13', name: 'Superhjältekalaset',     theme: 'superhjälte',     ageGroup: '7-8', price: 119, originalPrice: 269, description: 'Rädda världen på ditt superhjältekalas!',          isNew: false, isPopular: true,  slug: { current: 'superhjaltekalaset-7-8' },    image: null, downloadContents: [] },
  { _id: 'p14', name: 'Rymdkalaset',             theme: 'rymd',            ageGroup: '7-8', price: 119, originalPrice: 269, description: 'Ta raketen till stjärnorna!',                     isNew: true,  isPopular: false, slug: { current: 'rymdkalaset-7-8' },           image: null, downloadContents: [] },
  { _id: 'p15', name: 'Dinosauriekalaset',      theme: 'dinosaurie',      ageGroup: '7-8', price: 119, originalPrice: 269, description: 'Roar! Bli en riktig dinosauriejägare.',            isNew: false, isPopular: false, slug: { current: 'dinosauriekalaset-7-8' },     image: null, downloadContents: [] },
  { _id: 'p16', name: 'Robotkalaset',           theme: 'robot',           ageGroup: '7-8', price: 119, originalPrice: 269, description: 'Koda och fira som en framtidens robot!',          isNew: false, isPopular: false, slug: { current: 'robotkalaset-7-8' },          image: null, downloadContents: [] },
]

async function getProducts() {
  try {
    const data = await client.fetch(allProductsQuery, {}, { next: { revalidate: 60 } })
    return data?.length ? data : fallbackProducts
  } catch {
    return fallbackProducts
  }
}

const marqueeItems = [
  '🎉 Pirat', '🦁 Safari', '👑 Prins & Prinsessa', '🌴 Djungel',
  '⚡ Superhjälte', '🚀 Rymd', '🦕 Dinosaurie', '🤖 Robot',
  '⚡ Ladda ner direkt', '💰 Spara pengar', '🌍 Miljövänligt', '⭐ 100% Garanti',
]

export default async function Home() {
  const products = await getProducts()
  const popular = products.filter((p: typeof fallbackProducts[0]) => p.isPopular)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Pill */}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] bg-violet-50 border border-violet-200 rounded-full px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full animate-pulse" />
              Sveriges roligaste kalaspaket – direkt nedladdning
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
              Vi har tydligen{' '}
              <span className="text-[#7C3AED]">Sveriges bästa</span>{' '}
              kalaslekar&nbsp;🎊
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed">
              Kompletta digitala kalaspaket med lekar, inbjudningar,
              bordsdekorationer och mer. Ladda ner, skriv ut hemma och fira!
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#alla-kalas"
                className="bg-[#7C3AED] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#6D28D9] transition-colors shadow-sm">
                Se alla kalas →
              </a>
              <a href="#sa-funkar-det"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                Hur funkar det?
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: '⚡', text: 'Ladda ner direkt' },
                { icon: '🛡️', text: '100% nöjdhetsgaranti' },
                { icon: '🌍', text: 'Miljövänligt' },
                { icon: '💰', text: 'Spara jämfört med tryckt' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────── */}
      <div className="bg-[#7C3AED] py-3 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 text-white font-semibold text-xs mx-3">
              {item}
              <span className="text-[#FCD34D]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Populära kalas ────────────────────────────────────── */}
      {popular.length > 0 && (
        <section id="populara" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Populära kalas
                </h2>
                <p className="text-gray-500 mt-1 text-sm">Barnens favoriter just nu</p>
              </div>
              <a href="#alla-kalas" className="text-sm font-semibold text-[#7C3AED] hover:underline shrink-0">
                Se alla →
              </a>
            </div>
            <ProductGrid products={popular} />
          </div>
        </section>
      )}

      {/* ── Alla kalas ────────────────────────────────────────── */}
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

      {/* ── Så funkar det ─────────────────────────────────────── */}
      <section id="sa-funkar-det" className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
              Så funkar det
            </h2>
            <p className="text-gray-500">Från köp till utskrivet på bara några minuter.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '1', icon: '🎯', title: 'Välj tema', body: 'Bläddra bland 16 teman och välj det perfekta för barnet.' },
              { n: '2', icon: '💳', title: 'Betala tryggt', body: 'Säker betalning med Swish, kort eller faktura.' },
              { n: '3', icon: '📥', title: 'Ladda ner direkt', body: 'Du får en länk på mejl direkt – inga dagar att vänta.' },
              { n: '4', icon: '🎉', title: 'Skriv ut & fira!', body: 'Skriv ut hemma eller hos en print-shop och fira!' },
            ].map(s => (
              <div key={s.n} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-50 text-3xl mb-5 mx-auto">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FCD34D] text-gray-900 text-xs font-extrabold rounded-full flex items-center justify-center">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fördelar ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
              Varför välja Kalaseriet?
            </h2>
            <p className="text-gray-500 text-sm">Vi gör det enkelt och prisvärt att förbereda barnets stora dag.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '⚡', title: 'Ladda ner direkt', body: 'Ingen väntetid – filer direkt efter betalning.' },
              { icon: '💰', title: 'Spara pengar', body: 'Bråkdelen av kostnaden jämfört med tryckt material.' },
              { icon: '🌍', title: 'Miljövänligt', body: 'Skriv ut bara det du behöver och minska svinn.' },
              { icon: '✏️', title: 'Anpassa enkelt', body: 'Lägg till barnets namn med valfritt program.' },
              { icon: '🖨️', title: 'Skriv ut hemma', body: 'Fungerar med vanlig skrivare eller en print-shop.' },
              { icon: '🎨', title: 'Brett utbud', body: '16 teman för barn 4–8 år.' },
              { icon: '🎂', title: 'Åldersanpassat', body: 'Allt innehåll anpassat för rätt ålder.' },
              { icon: '⭐', title: 'Nöjdhetsgaranti', body: '100% pengarna tillbaka om du inte är nöjd.' },
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

      {/* ── Garanti ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-2xl text-3xl mb-6">🛡️</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
            100% Nöjdhetsgaranti
          </h2>
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

      {/* ── Kalasbloggen teaser ───────────────────────────────── */}
      <section id="kalasbloggen" className="py-16 sm:py-20 bg-violet-50 border-t border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest mb-3 block">Kalasbloggen</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            Tips & inspiration
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
            Recept, aktiviteter och idéer för att göra barnets kalas ännu mer minnesvärt.
          </p>
          <a href="#kalasbloggen"
            className="inline-flex items-center gap-2 bg-[#7C3AED] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#6D28D9] transition-colors">
            Läs bloggen →
          </a>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 pt-12 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span>🎉</span>
                <span className="font-extrabold text-white">
                  <span className="text-[#7C3AED]">Kalas</span><span className="text-[#F472B6]">eriet</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
                Digitala kalaspaket som gör varje kalas oförglömligt.
                Ladda ner, skriv ut och fira!
              </p>
              <div className="flex gap-2 mt-4">
                {['Instagram', 'Facebook', 'TikTok'].map(s => (
                  <a key={s} href="#" className="text-xs text-gray-500 hover:text-white border border-gray-700 hover:border-gray-500 rounded-full px-3 py-1 transition-colors">{s}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Kalasteman</h4>
              <ul className="space-y-2 text-xs">
                {['Pirat', 'Safari', 'Prins & Prinsessa', 'Superhjälte', 'Rymd', 'Djungel'].map(t => (
                  <li key={t}><a href="#alla-kalas" className="hover:text-white transition-colors">{t}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Sidor</h4>
              <ul className="space-y-2 text-xs">
                {[
                  { l: 'Populära kalas', h: '#populara' },
                  { l: 'Alla kalas', h: '#alla-kalas' },
                  { l: 'Så funkar det', h: '#sa-funkar-det' },
                  { l: 'Kalasbloggen', h: '#kalasbloggen' },
                ].map(x => (
                  <li key={x.l}><a href={x.h} className="hover:text-white transition-colors">{x.l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Det finstilta</h4>
              <ul className="space-y-2 text-xs">
                {['Integritetspolicy', 'Köpvillkor', 'Cookies', 'Kontakt'].map(t => (
                  <li key={t}><a href="#" className="hover:text-white transition-colors">{t}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© {new Date().getFullYear()} Kalaseriet. Alla rättigheter förbehållna.</p>
            <p className="text-gray-600">Digitala kalaspaket för barn 4–8 år</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
