import type { Metadata } from "next";
import { Manrope, Fredoka } from "next/font/google";
import "./globals.css";

// Body font — exact match with kalaseriet.se
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Display/heading font — placeholder for Caraque (Adobe Fonts).
// To use the real Caraque: add a Typekit <script> in globals.css or a
// custom <head> component and set --font-display to "caraque-solid".
const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html
      lang="sv"
      className={`${manrope.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
