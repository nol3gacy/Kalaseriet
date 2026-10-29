// Minimal server-side id -> display name lookup, used by the checkout
// webhook and thank-you page so email/download content never depends on
// client-submitted product names (which could be spoofed in the request body).
// Keep in sync with fallbackProducts in app/page.tsx. Names carry the age so a
// buyer of one theme for two ages can tell the downloads apart.

export const PRODUCT_NAMES: Record<string, string> = {
  p01: 'Piratkalaset för 4-åringar',
  p02: 'Safarikalaset för 4-åringar',
  p03: 'Prins & Prinsesskalaset för 4-åringar',
  p04: 'Djungelkalaset för 4-åringar',
  p05: 'Rymdkalaset för 4-åringar',
  p06: 'Dinosauriekalaset för 4-åringar',
  p07: 'Robotkalaset för 4-åringar',
  p08: 'Superhjältekalaset för 4-åringar',
  p09: 'Äventyrskalaset för 4-åringar',
  p10: 'Superhjältekalaset för 5-åringar',
  p11: 'Piratkalaset för 5-åringar',
  p12: 'Safarikalaset för 5-åringar',
  p13: 'Robotkalaset för 5-åringar',
  p14: 'Rymdkalaset för 5-åringar',
  p15: 'Dinosauriekalaset för 5-åringar',
  p16: 'Vilda västern-kalaset för 5-åringar',
  p17: 'Äventyrskalaset för 5-åringar',
  p18: 'Detektivkalaset för 6-åringar',
  p19: 'Spökkalaset för 6-åringar',
  p20: 'Vetenskapskalaset för 6-åringar',
  p21: 'Superhjältekalaset för 6-åringar',
  p22: 'Ninjakalaset för 6-åringar',
  p23: 'Cirkuskalaset för 6-åringar',
  p24: 'Astronautkalaset för 6-åringar',
  p25: 'Sportkalaset för 6-åringar',
  p26: 'Sportkalaset för 7 & 8-åringar',
  p27: 'Astronautkalaset för 7 & 8-åringar',
  p28: 'Discokalaset för 7 & 8-åringar',
  p29: 'Pysselkalaset för 7 & 8-åringar',
  p30: 'Vetenskapskalaset för 7 & 8-åringar',
  p31: 'Cirkuskalaset för 7 & 8-åringar',
  p32: 'Filmkvällskalaset för 7 & 8-åringar',
  p33: 'Konstnärskalaset för 7 & 8-åringar',
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
 * a client can post any price it likes. Everything is 129 kr today, so this is
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

const DEFAULT_PRICE_SEK = 129

export function getProductPrice(productId: string): number {
  return PRICE_OVERRIDES[productId] ?? DEFAULT_PRICE_SEK
}

/** Only ids we actually sell may be checked out. */
export function isKnownProduct(productId: string): boolean {
  return productId in PRODUCT_NAMES || productId in PRICE_OVERRIDES
}
