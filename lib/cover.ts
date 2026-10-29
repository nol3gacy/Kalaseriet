// Local cover JPGs have a WebP twin (~30-50% smaller); the JPG stays for og:image and structured data.
export const toWebp = (u?: string | null) => (u?.startsWith('/wf/images/covers/') ? u.replace(/\.jpg$/, '.webp') : u ?? undefined)
