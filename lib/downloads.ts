// Maps product _id to the ZIP file identifier hosted on dl.kalaseriet.se
// ZIP naming: kalaseriet_[ID].zip
// Verified 1:1 against the source list of download links — each entry is
// commented with the product it must deliver. Do not reorder: the numeric
// prefix in the ID does NOT reliably match the pXX key (e.g. p33 -> 36...).

export const PRODUCT_ZIP_MAP: Record<string, string> = {
  p01: '1BnYdjz7XErbcfPi9gfKnEFhpHzk4RoDrnyMobFfr', // Piratkalaset för 4-åringar
  p02: '2GcJnMbsfX6PdDhLpTXsBNKoByBEJJnAgrDTmEnEk', // Safarikalaset för 4-åringar
  p03: '3orJTRNyAeFkQam3CMEXakFJyrTGRE74zi6Aoxpro', // Prins & Prinsesskalaset för 4-åringar
  p04: '4TeoRYjgMK6JycnMXAthpgCCjSyfhSmNsQ9nqn8Lf', // Djungelkalaset för 4-åringar
  p05: '5CQPqmp97n3mgEJBjEHqNHLXrCjbhTEe9chqr3rMS', // Rymdkalaset för 4-åringar
  p06: '6bKSiy5oBJSHrhbMARqCGs7FeCzYCbBYbQTDj3Trm', // Dinosauriekalaset för 4-åringar
  p07: '7bJBRtEfR4zSX3pffTe49ard5orcy5aHAFpAj5FF7', // Robotkalaset för 4-åringar
  p08: '8gGGxX9HBrmt8reznYEJQoTsPR3QGFFkdrPJyqN6q', // Superhjältekalaset för 4-åringar
  p09: '9ykEdH9JEyaxac57bHyodKdnfJBgkckAebkpDJCdr', // Äventyrskalaset för 4-åringar
  p10: '10e4ytNRDDbRLDNK3QmPjJMTnMtpRktgAYoqioEAg', // Superhjältekalaset för 5-åringar
  p11: '11cDq5KnMaSxtN9tGXQoen9Bg65tbszgpFm9sRXQ', // Piratkalaset för 5-åringar
  p12: '12f7stHqRjt65ysrA4jGgKrinGkJzq6op6jqbEGXT', // Safarikalaset för 5-åringar
  p13: '13eQ9gDLR8TbLszomdacrDjYbiLFQPEDy3S3FCNAd', // Robotkalaset för 5-åringar
  p14: '14NRhSG9MhdzQHXjP3q9bnq45LT53bDxKFg8KTckTD', // Rymdkalaset för 5-åringar
  p15: '15HQfempDdm3pTm99xtzfS6acr6jsTLYy7o4mPpAQr', // Dinosauriekalaset för 5-åringar
  p16: '16syEMPyFokn4tBhzE9E3gRF7NKYsKsx6ppARF3TzN', // Vilda västern-kalaset för 5-åringar
  p17: '17qj7oHJLzaYzpT5SdCTf8XHNxHtFhjHpTHtCjqrFT', // Äventyrskalaset för 5-åringar
  p18: '18fQi9mjtJ7k7tg9mkrMeCPpnbEmpLRJtRs5CtNtM', // Detektivkalaset för 6-åringar
  p19: '19HRDnmSXbxJY7poGDaJjMfEjRXfoxdiqTK9Y3Gxez', // Spökkalaset för 6-åringar
  p20: '20fPAry8e6aBGXGs9tfRtBztCJDmJrysLeN5ifztEH', // Vetenskapskalaset för 6-åringar
  p21: '21JGexo684JNEB6xA88kKX5XgsATLMJtfn9b7Qqk58', // Superhjältekalaset för 6-åringar
  p22: '22JSe7GHKETGopyQCrek453NeRGoLNmLa8jpBLhGXk', // Ninjakalaset för 6-åringar
  p23: '23sNfq4y5Yd64qmSFpngkGTKkqjryc668R7msJmk9', // Cirkuskalaset för 6-åringar
  p24: '24zsdKkXyJt6XiXXYsKyG37SAggMMaG5zL3PiGAXs', // Astronautkalaset för 6-åringar
  p25: '25YRxPM4yDbfzS4S3B8zDyDtjdyisGkJStzpqRR85', // Sportkalaset för 6-åringar
  p26: '36G69qR5sp4i9pmMXB8egqLsXJFX4yHpsX359NrXj', // Sportkalaset för 7 & 8-åringar
  p27: '27JmrrhAx8oi39SNqozsmL7HmcKpepyCSoPiXzBGb', // Astronautkalaset för 7 & 8-åringar
  p28: '28eKB6RgDfosseNApF8MJtToN87ao9DXXMxoPBebX', // Discokalaset för 7 & 8-åringar
  p29: '29iL59KAheKMrrLkmEEMeptHd4ij7KEMBCgC69CoD', // Pysselkalaset för 7 & 8-åringar
  p30: '30mYi4yt6hPxPXSL8niA3kEgrS5J5d8s5DKDDDN9p', // Vetenskapskalaset för 7 & 8-åringar
  p31: '31Ah8md4M7g5MrLokyN999RnfPaR3qB6MmxMxME9A', // Cirkuskalaset för 7 & 8-åringar
  p32: '32gY4zXJc386TdscB3kjec9yh3E6jSYQK56hNxfqb', // Filmkvällskalaset för 7 & 8-åringar
  p33: '33qAkPjrrpgB6rBH8QqyKtnn77BqX7Yy9Y6f9mBF9S', // Konstnärskalaset för 7 & 8-åringar
  // Test product — points at a real ZIP so the download step is exercised too.
  ptest: '1BnYdjz7XErbcfPi9gfKnEFhpHzk4RoDrnyMobFfr',
}


// Product ZIPs are hosted directly on Loopia (dl.kalaseriet.se), not in the
// Vercel deployment — the serverless filesystem has no persistent storage
// large enough (or writable) for these files.
export const ZIP_BASE_URL = 'https://dl.kalaseriet.se'

export function getZipFilename(productId: string): string | null {
  const zipId = PRODUCT_ZIP_MAP[productId]
  if (!zipId) return null
  return `kalaseriet_${zipId}.zip`
}

export function getZipUrl(productId: string): string | null {
  const filename = getZipFilename(productId)
  if (!filename) return null
  return `${ZIP_BASE_URL}/${filename}`
}
