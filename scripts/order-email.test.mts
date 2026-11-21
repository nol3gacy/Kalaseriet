// Order email content check, no sending: node --import ./scripts/ts-resolve.mjs scripts/order-email.test.mts
import assert from 'node:assert'
import { buildOrderEmail } from '../lib/email.ts'
const items = [
  { productId: 'p01', name: 'Piratkalaset för 4-åringar', downloadUrl: 'https://example.invalid/dl1' },
  { productId: 'p11', name: 'Piratkalaset för 5-åringar', downloadUrl: 'https://example.invalid/dl2' },
  { productId: 'p18', name: 'Detektivkalaset för 6-åringar', downloadUrl: 'https://example.invalid/dl3' },
]
const { html, text } = buildOrderEmail(items, 'https://kalaseriet.se/tack?session_id=x')
assert.equal((html.match(/Ladda ner ›/g) || []).length, 3, 'one button per item')
assert.equal((html.match(/guide till piratkalas/g) || []).length, 1, 'two ages of one theme give one guide link')
assert.ok(!/detektiv/i.test(html.split('Så här gör du')[1]), 'no guide link for a theme without a guide')
assert.ok(html.includes('https://kalaseriet.se/kalasbloggen/tema-piratkalas'), 'absolute guide URL')
assert.ok(html.includes('Öppna din ordersida') && !html.includes('orderssida'), 'typo fixed')
assert.ok(text.includes('Piratkalaset för 4-åringar: https://example.invalid/dl1') && text.includes('https://kalaseriet.se/faq'), 'text part has links')
const none = buildOrderEmail([items[2]])
assert.ok(!none.html.includes('Läs vår guide') && !none.html.includes('ordersida'), 'no guide and no order page line when absent')
console.log('all email checks passed')
