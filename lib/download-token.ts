import { createHmac, timingSafeEqual } from 'crypto'

// Signed, expiring download tokens.
// Token format: <expiresAtMs>.<hexHmac>
// hexHmac = HMAC-SHA256(`${productId}.${expiresAtMs}`, DOWNLOAD_SECRET)

const SECRET = process.env.DOWNLOAD_SECRET

function secret(): string {
  if (!SECRET) throw new Error('DOWNLOAD_SECRET is not set')
  return SECRET
}

export function signDownloadToken(productId: string, ttlMs = 30 * 24 * 60 * 60 * 1000): string {
  const expiresAt = Date.now() + ttlMs
  const mac = createHmac('sha256', secret()).update(`${productId}.${expiresAt}`).digest('hex')
  return `${expiresAt}.${mac}`
}

const HEX_SHA256 = /^[0-9a-f]{64}$/

export function verifyDownloadToken(productId: string, token: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [expiresAtStr, mac] = parts

  // Buffer.from(str, 'hex') silently stops at the first invalid hex char
  // instead of throwing, so trailing garbage after a valid mac would
  // otherwise decode to the same bytes as the real mac. Reject anything
  // that isn't exactly a 64-char lowercase hex string up front.
  if (!HEX_SHA256.test(mac)) return false

  const expiresAt = Number(expiresAtStr)
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false

  const expected = createHmac('sha256', secret()).update(`${productId}.${expiresAt}`).digest('hex')
  const a = Buffer.from(mac, 'hex')
  const b = Buffer.from(expected, 'hex')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
