import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Body font — exact match with kalaseriet.se
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalaseriet – Digitala kalaspaket för barn",
  description:
    "Ladda ner kompletta digitala kalaspaket med inbjudningar, lekar och dekoration. 16 teman för barn 4–8 år. Skriv ut hemma och fira direkt!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${manrope.variable} h-full antialiased`}>
      <head>
        {/* Caraque (caraque-solid, caraque-melted) via Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/lee7ejt.css" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
