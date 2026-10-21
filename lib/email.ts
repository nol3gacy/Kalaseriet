// Sends the order-confirmation email via Resend's REST API (no SDK dependency).

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

export async function sendOrderConfirmationEmail(to: string, items: OrderEmailItem[], orderPageUrl?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0e6ff;">
        <div style="font-family:sans-serif;font-weight:700;font-size:16px;color:#272729;">${escapeHtml(item.name)}</div>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f0e6ff;text-align:right;">
        <a href="${item.downloadUrl}" style="display:inline-block;background:#5910b6;color:#faf1ef;font-family:sans-serif;font-weight:700;font-size:14px;text-decoration:none;padding:10px 20px;border-radius:999px;">Ladda ner ›</a>
      </td>
    </tr>
  `).join('')

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#faf1ef;border-radius:24px;">
      <h1 style="color:#5910b6;font-size:28px;margin:0 0 8px;">Tack för ditt köp! 🎉</h1>
      <p style="color:#272729;font-size:16px;line-height:1.5;margin:0 0 24px;">
        Här är dina nedladdningslänkar. Länkarna är giltiga i 7 dagar.
      </p>
      <table style="width:100%;border-collapse:collapse;">
        ${itemsHtml}
      </table>
      <p style="color:#7c7c7c;font-size:13px;line-height:1.5;margin:24px 0 0;">
        ${orderPageUrl ? `Har länkarna gått ut? <a href="${orderPageUrl}" style="color:#5910b6;">Öppna din orderssida</a> så får du nya nedladdningslänkar.<br><br>` : ''}Problem med nedladdningen? Svara på det här mejlet så hjälper vi dig direkt.
      </p>
    </div>
  `

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
