// gtag.js only reads Arguments objects from dataLayer; a pushed plain array
// (e.g. from rest params) is silently ignored, so consent and purchases never land.
export const gtag: (...args: unknown[]) => void = function () {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

type LineItem = { productId: string; productName: string; price: number; quantity: number }

// GA4 ecommerce funnel: add_to_cart and begin_checkout, in the same shape as purchase on /tack.
export function trackCart(event: 'add_to_cart' | 'begin_checkout', items: LineItem[]) {
  gtag('event', event, {
    currency: 'SEK',
    value: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    items: items.map(i => ({ item_id: i.productId, item_name: i.productName, price: i.price, quantity: i.quantity })),
  })
}
