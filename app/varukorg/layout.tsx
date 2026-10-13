import type { Metadata } from 'next'

// Cart contents are per-visitor and have no search value.
export const metadata: Metadata = {
  title: 'Varukorg',
  robots: { index: false, follow: true },
}

export default function VarukorgLayout({ children }: { children: React.ReactNode }) {
  return children
}
