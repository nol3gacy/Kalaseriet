import type { Metadata } from 'next'

// The blog index is a Client Component (it uses hover handlers), so it can't
// export metadata itself — this route layout supplies it.
export const metadata: Metadata = {
  title: 'Kalasbloggen – tips & inspiration för barnkalas',
  description:
    'Tips, lekar och inspiration för barnkalas: kalaspåsar, checklistor, skattjakter, recept och budgettips. Allt du behöver för att planera ett lyckat barnkalas.',
  alternates: { canonical: '/kalasbloggen' },
  openGraph: {
    title: 'Kalasbloggen – tips & inspiration för barnkalas',
    description: 'Tips, lekar och inspiration för barnkalas: kalaspåsar, checklistor, skattjakter, recept och budgettips.',
    type: 'website',
    locale: 'sv_SE',
    url: 'https://kalaseriet.se/kalasbloggen',
    siteName: 'Kalaseriet',
  },
}

export default function KalasbloggenLayout({ children }: { children: React.ReactNode }) {
  return children
}
