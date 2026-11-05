// Sends the order-confirmation email via Resend's REST API (no SDK dependency).

import { themePageForName } from './data/themes'
import { BASE_URL } from './seo'

const RESEND_API_URL = 'https://api.resend.com/emails'

// Resend requires a verified sending domain. Until kalaseriet.se is verified
// in Resend, fall back to their shared onboarding domain so sending still
// works — swap this to hej@kalaseriet.se once DNS records are added.
const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'Kalaseriet <onboarding@resend.dev>'

// Where customer replies land. The From address must be on a domain verified
// in Resend (you can't send *from* gmail.com — you don't own it), but replies
// can be routed anywhere, so point them at the inbox that's actually read.
const REPLY_TO = process.env.EMAIL_REPLY_TO

export interface OrderEmailItem {
  productId: string
  name: string
  downloadUrl: string
}

// The order email, built separately from sending so it can be previewed without Resend.
export function buildOrderEmail(items: OrderEmailItem[], orderPageUrl?: string): { html: string; text: string } {
  // One guide per bought theme (names carry the age: "Piratkalaset för 4-åringar").
  const guides = [...new Map(items.flatMap(i => {
    const t = themePageForName(i.name)
    return t?.guide ? [[t.guide, t.heading] as const] : []
  })).entries()]

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0e6ff;">
        <div style="font-family:sans-serif;font-weight:700;font-size:16px;color:#272729;">${escapeHtml(item.name)}</div>
      </td>
      <td style="padding:12px 0 12px 12px;border-bottom:1px solid #f0e6ff;text-align:right;white-space:nowrap;">
        <a href="${item.downloadUrl}" style="display:inline-block;background:#5910b6;color:#faf1ef;font-family:sans-serif;font-weight:700;font-size:14px;text-decoration:none;padding:10px 20px;border-radius:999px;">Ladda ner ›</a>
      </td>
    </tr>
  `).join('')

  const p = 'color:#272729;font-size:15px;line-height:1.5;margin:0 0 8px;'
  const guidesHtml = guides.map(([slug, heading]) =>
    `<a href="${BASE_URL}/kalasbloggen/${slug}" style="color:#5910b6;">Läs vår guide till ${escapeHtml(heading.toLowerCase())}</a>`).join('<br>')

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#faf1ef;border-radius:24px;">
      <h1 style="color:#5910b6;font-size:28px;margin:0 0 8px;">Tack för ditt köp! 🎉</h1>
      <p style="color:#272729;font-size:16px;line-height:1.5;margin:0 0 24px;">
        Här är dina nedladdningslänkar. Länkarna är giltiga i 30 dagar.
      </p>
      <table style="width:100%;border-collapse:collapse;">
        ${itemsHtml}
      </table>
      <h2 style="color:#5910b6;font-size:18px;margin:28px 0 8px;">Så här gör du</h2>
      <p style="${p}">1. Ladda ner paketet. Det är en ZIP-fil; lättast är att öppna den på en dator. På mobilen öppnas den i appen Filer.</p>
      <p style="${p}">2. Skriv ut det ni vill använda, i A4 och gärna i färg. Ingen skrivare? <a href="${BASE_URL}/faq" style="color:#5910b6;">Se våra tips</a>.</p>
      <p style="${p}">3. Välj 5–7 lekar till ett kalas på två timmar och följ körschemat.</p>
      ${guides.length ? `<p style="${p}margin-top:16px;">${guidesHtml}</p>` : ''}
      <p style="color:#7c7c7c;font-size:13px;line-height:1.5;margin:24px 0 0;">
        ${orderPageUrl ? `Har länkarna gått ut? <a href="${orderPageUrl}" style="color:#5910b6;">Öppna din ordersida</a> så får du nya nedladdningslänkar.<br><br>` : ''}Problem med nedladdningen? Svara på det här mejlet så hjälper vi dig direkt.
      </p>
    </div>
  `

  // Plain-text part: read by simple mail clients and counts toward not looking like spam.
  const text = [
    'Tack för ditt köp!',
    '',
    'Här är dina nedladdningslänkar. Länkarna är giltiga i 30 dagar.',
    ...items.map(i => `${i.name}: ${i.downloadUrl}`),
    '',
    'Så här gör du',
    '1. Ladda ner paketet. Det är en ZIP-fil; lättast är att öppna den på en dator. På mobilen öppnas den i appen Filer.',
    `2. Skriv ut det ni vill använda, i A4 och gärna i färg. Ingen skrivare? Se våra tips: ${BASE_URL}/faq`,
    '3. Välj 5–7 lekar till ett kalas på två timmar och följ körschemat.',
    ...guides.map(([slug, heading]) => `Läs vår guide till ${heading.toLowerCase()}: ${BASE_URL}/kalasbloggen/${slug}`),
    '',
    ...(orderPageUrl ? [`Har länkarna gått ut? Nya länkar får du här: ${orderPageUrl}`] : []),
    'Problem med nedladdningen? Svara på det här mejlet så hjälper vi dig direkt.',
  ].join('\n')

  return { html, text }
}

export async function sendOrderConfirmationEmail(to: string, items: OrderEmailItem[], orderPageUrl?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')

  const { html, text } = buildOrderEmail(items, orderPageUrl)

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [to],
      ...(REPLY_TO ? { reply_to: REPLY_TO } : {}),
      subject: 'Ditt kalaspaket är redo att laddas ner!',
      html,
      text,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Resend send failed: ${res.status} ${body}`)
  }
}

// Forwards a contact/feedback form message to the shop's own inbox (REPLY_TO),
// with the customer's address as reply-to so answering the mail answers them.
export async function sendFormMessageEmail(opts: {
  subject: string
  customerEmail: string
  fields: Array<[string, string]>
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')
  if (!REPLY_TO) throw new Error('EMAIL_REPLY_TO is not set')

  const rows = opts.fields.map(([k, v]) =>
    `<p style="margin:0 0 12px;"><strong>${escapeHtml(k)}</strong><br>${escapeHtml(v).replace(/\n/g, '<br>')}</p>`).join('')

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [REPLY_TO],
      reply_to: opts.customerEmail,
      subject: opts.subject,
      html: `<div style="font-family:sans-serif;font-size:15px;">${rows}</div>`,
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Resend send failed: ${res.status} ${body}`)
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}
