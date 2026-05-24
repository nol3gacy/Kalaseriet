'use client'

import { useEffect, useState } from 'react'

interface BentoItem {
  id: string
  label?: string        // "I varje nedladdning ingår"
  title: string
  subtitle?: string
  color: string         // background-color
  textColor?: string    // defaults to #faf1ef
  imageUrl?: string     // background image
  animationUrl?: string // Lottie JSON url
  span?: 'full' | 'half' | 'normal'
}

interface BentoBoxProps {
  items: BentoItem[]
}

function BentoCard({ item }: { item: BentoItem }) {
  const [lottieReady, setLottieReady] = useState(false)

  useEffect(() => {
    if (item.animationUrl) {
      if (!customElements.get('lottie-player')) {
        import('@lottiefiles/lottie-player').then(() => setLottieReady(true))
      } else {
        setLottieReady(true)
      }
    }
  }, [item.animationUrl])

  const spanClass = {
    full: 'md:col-span-3',
    half: 'md:col-span-2',
    normal: 'md:col-span-1',
  }[item.span || 'normal']

  const textColor = item.textColor ?? '#272729'

  return (
    <div
      className={`rounded-[1.875rem] overflow-hidden relative flex flex-col justify-between ${spanClass}`}
      style={{
        backgroundColor: item.color,
        backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '14rem',
        padding: '1.5rem',
      }}
    >
      {/* Dark overlay for image cards */}
      {item.imageUrl && (
        <div
          className="absolute inset-0 rounded-[1.875rem]"
          style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full gap-3">
        <div>
          {item.label && (
            <p
              className="mb-1 font-semibold"
              style={{
                fontFamily: 'caraque-melted, sans-serif',
                fontSize: '1rem',
                color: item.imageUrl ? '#faf1ef' : textColor,
                opacity: 0.75,
                lineHeight: 1.2,
              }}
            >
              {item.label}
            </p>
          )}
          <h3
            style={{
              fontFamily: 'caraque-solid, sans-serif',
              fontSize: item.span === 'full' ? '2.5rem' : item.span === 'half' ? '2.8rem' : '1.9rem',
              color: item.imageUrl ? '#faf1ef' : textColor,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            {item.title}
          </h3>
        </div>

        {item.subtitle && (
          <p
            className="font-semibold"
            style={{
              fontFamily: 'caraque-melted, sans-serif',
              fontSize: '1rem',
              color: item.imageUrl ? '#faf1ef' : textColor,
              opacity: 0.8,
              lineHeight: 1.3,
            }}
          >
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Lottie animation */}
      {item.animationUrl && lottieReady && (
        <div className="absolute bottom-0 right-0 z-0 opacity-90" style={{ width: '55%', pointerEvents: 'none' }}>
          {/* @ts-ignore */}
          <lottie-player
            src={item.animationUrl}
            background="transparent"
            speed="1"
            style={{ width: '100%', height: 'auto' }}
            loop
            autoplay
          />
        </div>
      )}
    </div>
  )
}

export default function BentoBox({ items }: BentoBoxProps) {
  return (
    <section className="py-8 sm:py-12" style={{ backgroundColor: '#faf1ef' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {items.map(item => (
            <BentoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
