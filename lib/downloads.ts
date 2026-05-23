// Maps product _id to the ZIP file identifier in the EXPORT folder
// ZIP naming: kalaseriet_[ID].zip
// The number prefix in each ID corresponds to product order on original site

export const PRODUCT_ZIP_MAP: Record<string, string> = {
  p01: '1BnYdjz7XErbcfPi9gfKnEFhpHzk4RoDrnyMobFfr',
  p02: '2GcJnMbsfX6PdDhLpTXsBNKoByBEJJnAgrDTmEnEk',
  p03: '3orJTRNyAeFkQam3CMEXakFJyrTGRE74zi6Aoxpro',
  p04: '4TeoRYjgMK6JycnMXAthpgCCjSyfhSmNsQ9nqn8Lf',
  p05: '5CQPqmp97n3mgEJBjEHqNHLXrCjbhTEe9chqr3rMS',
  p06: '6bKSiy5oBJSHrhbMARqCGs7FeCzYCbBYbQTDj3Trm',
  p07: '7bJBRtEfR4zSX3pffTe49ard5orcy5aHAFpAj5FF7',
  p08: '8gGGxX9HBrmt8reznYEJQoTsPR3QGFFkdrPJyqN6q',
  p09: '9ykEdH9JEyaxac57bHyodKdnfJBgkckAebkpDJCdr',
  p10: '10e4ytNRDDbRLDNK3QmPjJMTnMtpRktgAYoqioEAg',
  p11: '11cDq5KnMaSxtN9tGXQoen9Bg65tbszgpFm9sRXQ',
  p12: '12f7stHqRjt65ysrA4jGgKrinGkJzq6op6jqbEGXT',
  p13: '13eQ9gDLR8TbLszomdacrDjYbiLFQPEDy3S3FCNAd',
  p14: '14NRhSG9MhdzQHXjP3q9bnq45LT53bDxKFg8KTckTD',
  p15: '15HQfempDdm3pTm99xtzfS6acr6jsTLYy7o4mPpAQr',
  p16: '16syEMPyFokn4tBhzE9E3gRF7NKYsKsx6ppARF3TzN',
  p17: '17qj7oHJLzaYzpT5SdCTf8XHNxHtFhjHpTHtCjqrFT',
  p18: '18fQi9mjtJ7k7tg9mkrMeCPpnbEmpLRJtRs5CtNtM',
  p19: '19HRDnmSXbxJY7poGDaJjMfEjRXfoxdiqTK9Y3Gxez',
  p20: '20fPAry8e6aBGXGs9tfRtBztCJDmJrysLeN5ifztEH',
  p21: '21JGexo684JNEB6xA88kKX5XgsATLMJtfn9b7Qqk58',
  p22: '22JSe7GHKETGopyQCrek453NeRGoLNmLa8jpBLhGXk',
  p23: '23sNfq4y5Yd64qmSFpngkGTKkqjryc668R7msJmk9',
  p24: '24zsdKkXyJt6XiXXYsKyG37SAggMMaG5zL3PiGAXs',
  p25: '25YRxPM4yDbfzS4S3B8zDyDtjdyisGkJStzpqRR85',
  p26: '27JmrrhAx8oi39SNqozsmL7HmcKpepyCSoPiXzBGb',
  p27: '28eKB6RgDfosseNApF8MJtToN87ao9DXXMxoPBebX',
  p28: '29iL59KAheKMrrLkmEEMeptHd4ij7KEMBCgC69CoD',
  p29: '30mYi4yt6hPxPXSL8niA3kEgrS5J5d8s5DKDDDN9p',
  p30: '31Ah8md4M7g5MrLokyN999RnfPaR3qB6MmxMxME9A',
  p31: '32gY4zXJc386TdscB3kjec9yh3E6jSYQK56hNxfqb',
  p32: '33qAkPjrrpgB6rBH8QqyKtnn77BqX7Yy9Y6f9mBF9S',
  p33: '36G69qR5sp4i9pmMXB8egqLsXJFX4yHpsX359NrXj',
}

export const ZIP_BASE_PATH =
  '/Users/joel/the Apartment Dropbox/Joel Cornéer/No legacy/Kalaseriet/EXPORT'

export function getZipPath(productId: string): string | null {
  const zipId = PRODUCT_ZIP_MAP[productId]
  if (!zipId) return null
  return `${ZIP_BASE_PATH}/kalaseriet_${zipId}.zip`
}
