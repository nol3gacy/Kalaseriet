// Local cover and blog JPGs have a WebP twin (~30-50% smaller); the JPG stays for og:image and structured data.
const HAS_WEBP = ['/wf/images/covers/', '/wf/images/blogg/']
const hasWebp = (u?: string | null) => !!u && HAS_WEBP.some(dir => u.startsWith(dir))
export const toWebp = (u?: string | null) => (hasWebp(u) ? u!.replace(/\.jpg$/, '.webp') : u ?? undefined)

// Those also come as a 600 px WebP (<name>-600.webp, ~45% of the 1000 px one): enough for the
// product grid and blog cards on any phone. Pair with a `sizes` that matches where the image is shown.
export const coverSrcSet = (u?: string | null) => {
  const webp = toWebp(u)
  return hasWebp(webp) && webp!.endsWith('.webp')
    ? `${webp!.replace(/\.webp$/, '-600.webp')} 600w, ${webp} 1000w`
    : undefined
}
