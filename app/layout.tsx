import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
// Self-hosted Caraque @font-face (replaces Adobe Typekit) — declared before the
// stylesheets that use the families.
import "./webflow/caraque.css";
// Webflow export stylesheets — imported AFTER globals so they own the styling (exact replica)
import "./webflow/normalize.css";
import "./webflow/webflow.css";
import "./webflow/kalaseriet.webflow.css";
// Project overrides — must load last so Caraque wins everywhere
import "./webflow/overrides.css";
import { CartProvider } from "./lib/cart-context";
import MiniCart from "./components/MiniCart";
import CookieConsent from "./components/CookieConsent";
import { BASE_URL, OG_IMAGE, SITE_NAME, jsonLd, organizationSchema, websiteSchema } from "../lib/seo";

// Body font — exact match with kalaseriet.se
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const FAVICON = '/wf/images/favicon.png'
const WEBCLIP = '/wf/images/webclip.png'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kalaspaket för barnkalas – lekar, recept & inbjudan | Kalaseriet",
    // Child pages set only their own title; this appends the brand once.
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kompletta kalaspaket för barnkalas 4–8 år: 20 kalaslekar, 20 recept, inbjudan, checklista & körschema. Ladda ner direkt för 99 kr och skriv ut hemma.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [{ url: FAVICON, type: 'image/png' }],
    shortcut: FAVICON,
    apple: [{ url: WEBCLIP, sizes: '256x256', type: 'image/png' }],
  },
  openGraph: {
    title: 'Kalaspaket för barnkalas – lekar, recept & inbjudan',
    description: 'Kompletta kalaspaket för barnkalas 4–8 år: 20 kalaslekar, 20 recept, inbjudan, checklista & körschema. Ladda ner direkt för 99 kr.',
    type: 'website',
    locale: 'sv_SE',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Kalaseriet – digitala kalaspaket för barnkalas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalaspaket för barnkalas – lekar, recept & inbjudan',
    description: 'Kompletta kalaspaket för barnkalas 4–8 år. Ladda ner direkt för 99 kr och skriv ut hemma.',
    images: [OG_IMAGE],
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" data-wf-page="kalaseriet" data-wf-site="kalaseriet" className={manrope.variable}>
      <head>
        {/* Preload the two most-used Caraque weights for fast first paint */}
        <link rel="preload" href="/wf/fonts/caraque/Caraque-XBoldMelted.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/wf/fonts/caraque/Caraque-XBoldSolid.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Sitewide entity graph — Organization + WebSite, referenced by @id
            from every page-level schema so Google resolves one publisher. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema, websiteSchema) }}
        />
        {GA_ID && (
          <>
            {/* Plain <script> tags, not next/script — this is a static export
                with no hydration to defer for, and Search Console's Google
                Analytics ownership check reads the literal prerendered
                <head>. next/script's afterInteractive strategy injects into
                <body> at runtime instead, which the check doesn't see and
                fails as "tracking code is in the wrong location". */}
            <script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} async />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                var c = 'denied'; try { if (localStorage.getItem('kalaseriet_cookie_consent') === 'accepted') c = 'granted'; } catch (e) {}
                gtag('consent', 'default', { analytics_storage: c, ad_storage: c });
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `,
              }}
            />
          </>
        )}
        {META_PIXEL_ID && (
          /* Consent is revoked before init, so the pixel queues events but
             sends nothing until CookieConsent grants it. Meta flushes the
             queue on grant, so the PageView isn't lost. */
          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('consent', 'revoke');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
            }}
          />
        )}
      </head>
      <body>
        <CartProvider>
          {children}
          <MiniCart />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}
