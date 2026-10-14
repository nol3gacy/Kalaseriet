import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lämna feedback & nöjdhetsgaranti',
  description:
    'Hur gick kalaset? Lämna feedback på ditt kalaspaket eller begär återbetalning enligt vår 100% nöjdhetsgaranti.',
  alternates: { canonical: '/feedback' },
}

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children
}
