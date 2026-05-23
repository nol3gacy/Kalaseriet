'use client'

import { useState } from 'react'
import { urlFor } from '../../sanity/lib/image'
import { themeColors } from '../page'

type Product = {
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
}

const AGE_FILTERS = [
  { label: 'Alla', value: 'all' },
  { label: '4-åringar', value: '4' },
  { label: '5-åringar', value: '5' },
  { label: '6-åringar', value: '6' },
  { label: '7 & 8-åringar', value: '7-8' },
]

export default function ProductGrid({
  products,
  showFilter = false,
}: {
  products: Product[]
  showFilter?: boolean
}) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filtered =
    activeFilter === 'all'
      ? products
      : products.filter(p => p.ageGroup === activeFilter)

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-8">
          {AGE_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === f.value
                  ? 'bg-[#7C3AED] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#7C3AED] hover:text-[#7C3AED]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const theme = themeColors[product.theme.toLowerCase()] ?? {
    from: '#f3f4f6',
    to: '#e5e7eb',
    emoji: '🎉',
  }
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null

  return (
    <a
      href={`/kalas/${product.slug.current}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all duration-200 flex flex-col"
    >
      {/* Image / placeholder */}
      <div className="relative overflow-hidden">
        {product.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={urlFor(product.image).width(400).height(280).url()}
            alt={product.name}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : product.externalImageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.externalImageUrl}
            alt={product.name}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-44 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
            }}
          >
            {theme.emoji}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {product.isNew && (
            <span className="bg-[#7C3AED] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Nyhet
            </span>
          )}
          {product.isPopular && (
            <span className="bg-[#FCD34D] text-gray-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Populär
            </span>
          )}
        </div>

        {/* Discount pill */}
        {discount && (
          <span className="absolute top-2.5 right-2.5 bg-[#F472B6] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-0.5">
          för {product.ageGroup === '7-8' ? '7 & 8' : product.ageGroup}-åringar
        </p>
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 group-hover:text-[#7C3AED] transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-[#7C3AED]">{product.price} kr</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">{product.originalPrice} kr</span>
            )}
          </div>
          <span className="text-xs font-semibold text-[#7C3AED] bg-violet-50 px-3 py-1.5 rounded-full group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
            Kolla in
          </span>
        </div>
      </div>
    </a>
  )
}
