import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakta oss',
  description:
    'Har du en fråga om våra kalaspaket, ditt köp eller nedladdningen? Hör av dig till Kalaseriet så svarar vi så snabbt vi kan.',
  alternates: { canonical: '/kontakt' },
}

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children
}
