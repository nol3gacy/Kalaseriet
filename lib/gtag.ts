// gtag.js only reads Arguments objects from dataLayer; a pushed plain array
// (e.g. from rest params) is silently ignored, so consent and purchases never land.
export const gtag: (...args: unknown[]) => void = function () {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}
