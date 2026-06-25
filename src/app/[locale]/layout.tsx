import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Cairo } from "next/font/google";
import {
  type Locale,
  isLocale,
  locales,
  localeDirection,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { buildJsonLd } from "@/lib/jsonld";
import RevealObserver from "@/components/RevealObserver";
import "../globals.css";

// Self-hosted, automatically optimised Google fonts (no render-blocking
// external <link>, no layout shift — key for the Lighthouse Performance score).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

// Pre-render only the supported locales at build time (SSG).
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale);
}

// Blocking inline script: applies the persisted/system theme before first
// paint to avoid a flash of incorrect theme and hydration mismatch.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const dir = localeDirection[typedLocale];
  const jsonLd = buildJsonLd(typedLocale, dict);

  return (
    <html
      lang={typedLocale}
      dir={dir}
      // Only ship/preload the font actually used by this locale so it doesn't
      // compete with the LCP image for bandwidth (en → Inter, ar → Cairo).
      className={typedLocale === "ar" ? cairo.variable : inter.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Without JS, never hide scroll-reveal content from crawlers/users. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body
        className={`${typedLocale === "ar" ? "font-arabic" : "font-sans"} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.header.skipToContent}
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
