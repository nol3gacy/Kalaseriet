// Hand-drawn organic-shape sticker images from kalaseriet.se design
// Stored as SVG in /public/stickers/

type StickerKind = 'poppis' | 'nyhet' | 'tips'

const SIZES: Record<StickerKind, { w: number; h: number }> = {
  poppis: { w: 149, h: 148 },
  nyhet:  { w: 124, h: 91 },
  tips:   { w: 184, h: 137 },
}

export default function Sticker({
  kind,
  width = 90,
  rotate = 0,
  style,
}: {
  kind: StickerKind
  width?: number
  rotate?: number
  style?: React.CSSProperties
}) {
  const { w, h } = SIZES[kind]
  const ratio = h / w
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`/stickers/${kind}.svg`}
      alt=""
      aria-hidden="true"
      width={width}
      height={Math.round(width * ratio)}
      style={{
        display: 'block',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}
