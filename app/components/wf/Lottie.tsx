'use client'

import { useEffect, useState } from 'react'

// Lightweight wrapper around the lottie-player web component.
// Loads the player once, then renders a <lottie-player> filling its parent.
export default function Lottie({
  src,
  className,
  loop = true,
  autoplay = true,
  style,
}: {
  src: string
  className?: string
  loop?: boolean
  autoplay?: boolean
  style?: React.CSSProperties
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!customElements.get('lottie-player')) {
      import('@lottiefiles/lottie-player').then(() => setReady(true))
    } else {
      setReady(true)
    }
  }, [])

  if (!ready) return <div className={className} style={style} />

  return (
    /* @ts-expect-error web component */
    <lottie-player
      class={className}
      src={src}
      background="transparent"
      speed="1"
      loop={loop || undefined}
      autoplay={autoplay || undefined}
      style={{ width: '100%', height: '100%', ...style }}
    />
  )
}
