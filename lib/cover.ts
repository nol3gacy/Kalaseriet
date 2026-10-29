// Local cover JPGs have a WebP twin (~30-50% smaller); the JPG stays for og:image and structured data.
export const toWebp = (u?: string | null) => (u?.startsWith('/wf/images/covers/') ? u.replace(/\.jpg$/, '.webp') : u ?? undefined)

// Covers also come as a 600 px WebP (<name>-600.webp, ~45% of the 1000 px one): enough for the
// product grid on any phone. Pair with a `sizes` that matches where the image is shown.
export const coverSrcSet = (u?: string | null) => {
  const webp = toWebp(u)
  return webp?.startsWith('/wf/images/covers/') && webp.endsWith('.webp')
    ? `${webp.replace(/\.webp$/, '-600.webp')} 600w, ${webp} 1000w`
    : undefined
}
