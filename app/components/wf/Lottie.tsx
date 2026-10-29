'use client'

import { useEffect, useRef, useState } from 'react'

// Lightweight wrapper around the lottie-player web component.
// Loads the player (and the animation JSON) only once the element is near the
// viewport, so below-the-fold animations don't cost anything on first paint.
// Loads the player once, then renders a <lottie-player> filling its parent.
// With a `poster` (a still of the first frame), the poster shows at once and the
// player loads only after the page's load event: always-visible animations like
// the logo then stop costing the player script on every first paint.
export default function Lottie({
  src,
  className,
  loop = true,
  autoplay = true,
  style,
  poster,
}: {
  src: string
  className?: string
  loop?: boolean
  autoplay?: boolean
  style?: React.CSSProperties
  poster?: string
}) {
  const [ready, setReady] = useState(false)
  const [near, setNear] = useState(false)
  const [painted, setPainted] = useState(!poster)
  const holder = useRef<HTMLDivElement>(null)
  const player = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = holder.current
    if (!el || typeof IntersectionObserver === 'undefined') { setNear(true); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); obs.disconnect() }
    }, { rootMargin: '300px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!near) return
    const load = () => {
      if (!customElements.get('lottie-player')) {
        import('@lottiefiles/lottie-player').then(() => setReady(true))
      } else {
        setReady(true)
      }
    }
    if (!poster || document.readyState === 'complete') { load(); return }
    window.addEventListener('load', load, { once: true })
    return () => window.removeEventListener('load', load)
  }, [near, poster])

  // Keep the poster until the player has drawn, so the swap shows no blank frame.
  useEffect(() => {
    const el = player.current
    if (!ready || painted || !el) return
    const done = () => setPainted(true)
    el.addEventListener('ready', done)
    return () => el.removeEventListener('ready', done)
  }, [ready, painted])

  const still = poster && !painted
    // eslint-disable-next-line @next/next/no-img-element
    ? <img src={poster} alt="" className={className} style={{ width: '100%', height: '100%', ...style }} />
    : null

  if (!ready) return <div ref={holder} className={className} style={still ? undefined : style}>{still}</div>

  return (
    <>
      {still}
      {/* @ts-expect-error web component */}
      <lottie-player
        ref={player}
        class={className}
        src={src}
        background="transparent"
        speed="1"
        loop={loop || undefined}
        autoplay={autoplay || undefined}
        style={{ width: '100%', height: '100%', ...style, ...(painted ? {} : { position: 'absolute', opacity: 0 }) }}
      />
    </>
  )
}
