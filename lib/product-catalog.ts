// Minimal server-side id -> display name lookup, used by the checkout
// webhook and thank-you page so email/download content never depends on
// client-submitted product names (which could be spoofed in the request body).
// Keep in sync with fallbackProducts in app/page.tsx.

export const PRODUCT_NAMES: Record<string, string> = {
  p01: 'Piratkalaset',
  p02: 'Safarikalaset',
  p03: 'Prins & Prinsesskalaset',
  p04: 'Djungelkalaset',
  p05: 'Rymdkalaset',
  p06: 'Dinosauriekalaset',
  p07: 'Robotkalaset',
  p08: 'Superhjältekalaset',
  p09: 'Äventyrskalaset',
  p10: 'Superhjältekalaset',
  p11: 'Piratkalaset',
  p12: 'Safarikalaset',
  p13: 'Robotkalaset',
  p14: 'Rymdkalaset',
  p15: 'Dinosauriekalaset',
  p16: 'Vilda västern-kalaset',
  p17: 'Äventyrskalaset',
  p18: 'Detektivkalaset',
  p19: 'Spökkalaset',
  p20: 'Vetenskapskalaset',
  p21: 'Superhjältekalaset',
  p22: 'Ninjakalaset',
  p23: 'Cirkuskalaset',
  p24: 'Astronautkalaset',
  p25: 'Sportkalaset',
  p26: 'Sportkalaset',
  p27: 'Astronautkalaset',
  p28: 'Discokalaset',
  p29: 'Pysselkalaset',
  p30: 'Vetenskapskalaset',
  p31: 'Cirkuskalaset',
  p32: 'Filmkvällskalaset',
  p33: 'Konstnärskalaset',
  // Hidden 1 kr product for verifying the live payment chain — not for sale.
  ptest: 'TESTPRODUKT (3 kr)',
}

export function getProductName(productId: string): string {
  return PRODUCT_NAMES[productId] ?? 'Ditt kalaspaket'
}

/**
 * Authoritative price in SEK, keyed by product id.
 *
 * The checkout request body must NEVER decide what a customer is charged —
 * a client can post any price it likes. Everything is 99 kr today, so this is
 * a lookup with a default rather than 33 duplicated lines; override per id
 * here if pricing ever differs.
 */
const PRICE_OVERRIDES: Record<string, number> = {
  // Hidden product used to verify the live payment chain cheaply. 3 kr is
  // Stripe's minimum charge for SEK — 1 kr is rejected outright.
  // Deliberately absent from fallbackProducts, so it never appears in any
  // listing, sitemap or search result — only reachable via a direct
  // checkout call with this id.
  ptest: 3,
}

const DEFAULT_PRICE_SEK = 99

export function getProductPrice(productId: string): number {
  return PRICE_OVERRIDES[productId] ?? DEFAULT_PRICE_SEK
}

/** Only ids we actually sell may be checked out. */
export function isKnownProduct(productId: string): boolean {
  return productId in PRODUCT_NAMES || productId in PRICE_OVERRIDES
}
