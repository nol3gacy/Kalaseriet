import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import { fallbackProducts, themeColors, type Product } from '../../page'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductBuySection from '../../components/ProductBuySection'
import { notFound } from 'next/navigation'

const INCLUDED_ITEMS = [
  { icon: '🎮', label: '20 kalaslekar', desc: 'Utvalda lekar för rätt åldersgrupp' },
  { icon: '🍰', label: '20 festrecept', desc: 'Tårtor, muffins och snacks' },
  { icon: '✉️', label: 'Inbjudningskort', desc: 'Skriv ut och skicka till gästerna' },
  { icon: '🎊', label: 'Dekorationer', desc: 'Flaggor, skyltar och bordsdekor' },
  { icon: '📋', label: 'Körschema', desc: 'Timme-för-timme planering' },
  { icon: '☑️', label: 'Checklista', desc: 'Missa inget inför kalaset' },
  { icon: '🏆', label: 'Diplom', desc: 'En minnesvärd avslutning för gästerna' },
]

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const data = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch {}
  return fallbackProducts.find(p => p.slug.current === slug) ?? null
}

async function getRelated(currentId: string, theme: string): Promise<Product[]> {
  try {
    const data = await client.fetch(
      `*[_type == "product" && theme == $theme && _id != $currentId][0...3]`,
      { theme, currentId },
      { next: { revalidate: 60 } }
    )
    if (data?.length) return data
  } catch {}
  return fallbackProducts
    .filter(p => p.theme === theme && p._id !== currentId)
    .slice(0, 3)
}

export async function generateStaticParams() {
  return fallbackProducts.map(p => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  return {
    title: `${product.name} – Kalaseriet`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const theme = themeColors[product.theme.toLowerCase()] ?? { from: '#f3f4f6', to: '#e5e7eb', emoji: '🎉' }
  const related = await getRelated(product._id, product.theme)
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null
  const ageLabel = product.ageGroup === '7-8' ? '7 & 8' : product.ageGroup

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 pt-10 pb-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
              {product.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={urlFor(product.image).width(800).height(600).url()}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : product.externalImageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={product.externalImageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-9xl"
                  style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                >
                  {theme.emoji}
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isNew && (
                  <span className="bg-[#7C3AED] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Nyhet
                  </span>
                )}
                {product.isPopular && (
                  <span className="bg-[#FCD34D] text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Populär
                  </span>
                )}
              </div>
              {discount && (
                <span className="absolute top-4 right-4 bg-[#F472B6] text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 mb-2">För {ageLabel}-åringar · {product.theme}</p>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-extrabold text-gray-900">{product.price} kr</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-[#F472B6] line-through font-bold">{product.originalPrice} kr</span>
                )}
              </div>

              {/* Buy section */}
              <ProductBuySection product={product} />

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: '⚡', label: 'Direkt nedladdning' },
                  { icon: '💯', label: '100% nöjdhetsgaranti' },
                  { icon: '🖨️', label: 'Skriv ut hemma' },
                ].map(b => (
                  <div key={b.label} className="bg-gray-50 rounded-xl py-3 px-2">
                    <div className="text-xl mb-1">{b.icon}</div>
                    <p className="text-xs text-gray-600 font-medium leading-tight">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="border-t border-gray-100 bg-violet-50">
          <div className="max-w-7xl mx-auto px-4 py-14">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Vad ingår?</h2>
            <p className="text-gray-500 text-center mb-10">
              Allt du behöver för ett perfekt kalas – nedladdningsbart direkt efter köp
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INCLUDED_ITEMS.map(item => (
                <div key={item.label} className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Hur fungerar det?</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Välj kalas', desc: 'Välj rätt tema och åldersgrupp för ditt barn.' },
              { num: '2', title: 'Betala', desc: 'Säker betalning med kort, Swish eller Klarna.' },
              { num: '3', title: 'Ladda ner', desc: 'Direkt tillgång till alla filer via e-post.' },
              { num: '4', title: 'Fira!', desc: 'Skriv ut hemma och njut av ett minnesvärts kalas.' },
            ].map(step => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-[#7C3AED] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Fler kalas du kan gilla</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map(p => {
                  const t = themeColors[p.theme.toLowerCase()] ?? { from: '#f3f4f6', to: '#e5e7eb', emoji: '🎉' }
                  return (
                    <a
                      key={p._id}
                      href={`/kalas/${p.slug.current}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all"
                    >
                      <div className="relative h-40 overflow-hidden">
                        {p.externalImageUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={p.externalImageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-5xl"
                            style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
                          >
                            {t.emoji}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-400 mb-0.5">för {p.ageGroup === '7-8' ? '7 & 8' : p.ageGroup}-åringar</p>
                        <h3 className="font-bold text-gray-900 group-hover:text-[#7C3AED] transition-colors">{p.name}</h3>
                        <p className="text-[#7C3AED] font-bold mt-1">{p.price} kr</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
