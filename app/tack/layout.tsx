import type { Metadata } from 'next'

// Post-purchase confirmation — reachable only with a Stripe session id.
export const metadata: Metadata = {
  title: 'Tack för ditt köp',
  robots: { index: false, follow: false },
}

export default function TackLayout({ children }: { children: React.ReactNode }) {
  return children
}
