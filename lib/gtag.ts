// gtag.js only reads Arguments objects from dataLayer; a pushed plain array
// (e.g. from rest params) is silently ignored, so consent and purchases never land.
export const gtag: (...args: unknown[]) => void = function () {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

type LineItem = { productId: string; productName: string; price: number; quantity: number }

const META_EVENT = { view_item: 'ViewContent', add_to_cart: 'AddToCart', begin_checkout: 'InitiateCheckout' } as const

// Ecommerce funnel to GA4 and the Meta pixel, in the same shape as purchase on /tack.
// Both hold or drop these until cookie consent (consent mode / fbq revoke in layout.tsx).
export function trackCart(event: keyof typeof META_EVENT, items: LineItem[]) {
  const value = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  gtag('event', event, {
    currency: 'SEK',
    value,
    items: items.map(i => ({ item_id: i.productId, item_name: i.productName, price: i.price, quantity: i.quantity })),
  })
  window.fbq?.('track', META_EVENT[event], {
    value,
    currency: 'SEK',
    content_type: 'product',
    content_ids: items.map(i => i.productId),
  })
}
