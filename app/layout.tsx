import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./lib/cart-context";
import MiniCart from "./components/MiniCart";

// Body font — exact match with kalaseriet.se
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const FAVICON = 'https://cdn.prod.website-files.com/656cc3301afe859e486de65d/65da1a3331d71fae16c689a3_favicon.png'
const WEBCLIP = 'https://cdn.prod.website-files.com/656cc3301afe859e486de65d/65da1a384ef1f371942f39e0_webclip.png'

export const metadata: Metadata = {
  title: "Kalaseriet – Digitala kalaspaket för barn",
  description:
    "Ladda ner kompletta digitala kalaspaket med inbjudningar, lekar och dekoration. 33 teman för barn 4–8 år. Skriv ut hemma och fira direkt!",
  icons: {
    icon: [{ url: FAVICON, type: 'image/png' }],
    shortcut: FAVICON,
    apple: [{ url: WEBCLIP, sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Kalaseriet – Digitala kalaspaket för barn',
    description: 'Kompletta digitala kalaspaket med lekar, recept, inbjudan, körschema och mer. 33 teman för barn 4–8 år.',
    type: 'website',
    locale: 'sv_SE',
    siteName: 'Kalaseriet',
    images: [{ url: WEBCLIP, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalaseriet – Digitala kalaspaket för barn',
    description: 'Kompletta digitala kalaspaket. 33 teman för barn 4–8 år.',
    images: [WEBCLIP],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${manrope.variable} h-full antialiased`}>
      <head>
        {/* Caraque (caraque-melted, caraque-melted) via Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/lee7ejt.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <MiniCart />
        </CartProvider>
      </body>
    </html>
  );
}
