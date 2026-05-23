import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, statSync, existsSync } from 'fs'
import path from 'path'
import { PRODUCT_ZIP_MAP, ZIP_BASE_PATH } from '../../../lib/downloads'

// Simple HMAC-based token validation
// Token = HMAC(productId + ":" + expiry, DOWNLOAD_SECRET)
// For now: accept any request with a valid productId (add HMAC in production)
const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET ?? 'change-me-in-production'

function validateToken(productId: string, token: string): boolean {
  // TODO: implement proper HMAC check
  // In production: const expected = hmac(DOWNLOAD_SECRET, `${productId}:${expiry}`)
  return token.length > 10 // placeholder — replace with real validation
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const productId = searchParams.get('productId')
  const token = searchParams.get('token')

  if (!productId || !token) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  if (!validateToken(productId, token)) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 })
  }

  const zipId = PRODUCT_ZIP_MAP[productId]
  if (!zipId) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  // Local file path (development) — replace with Vercel Blob URL in production
  const zipPath = path.join(ZIP_BASE_PATH, `kalaseriet_${zipId}.zip`)

  if (!existsSync(zipPath)) {
    console.error(`ZIP not found: ${zipPath}`)
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  try {
    const stat = statSync(zipPath)
    const filename = `kalaseriet_${zipId}.zip`

    // Stream the file
    const stream = createReadStream(zipPath)
    const readable = new ReadableStream({
      start(controller) {
        stream.on('data', chunk => controller.enqueue(chunk))
        stream.on('end', () => controller.close())
        stream.on('error', err => controller.error(err))
      },
    })

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': stat.size.toString(),
      },
    })
  } catch (err) {
    console.error('Download error:', err)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}
