import type { Metadata } from "next";
import { type Locale, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { author, geo, siteUrl } from "./site";

// Builds the full per-locale Metadata object consumed by `generateMetadata`.
// Covers title/description, canonical + hreflang alternates, Open Graph,
// Twitter cards, robots directives (full indexing) and geo-meta tags.
export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const m = dict.meta;
  const path = `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: m.titleHome,
      template: `%s | ${author.name}`,
    },
    description: m.description,
    keywords: m.keywords,
    applicationName: author.name,
    authors: [{ name: author.name, url: siteUrl }],
    creator: author.name,
    publisher: author.name,
    category: "technology",
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: `${author.name} — Portfolio`,
      title: m.ogTitle,
      description: m.ogDescription,
      url: path,
      locale: ogLocale[locale],
      alternateLocale: Object.values(ogLocale).filter(
        (l) => l !== ogLocale[locale],
      ),
      // og:image is supplied automatically by app/[locale]/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDescription,
      // twitter:image falls back to the generated Open Graph image
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/logo.svg", type: "image/svg+xml" },
      ],
      apple: "/profile.jpeg",
    },
    manifest: "/manifest.webmanifest",
    other: {
      // Geo-optimization signals for Egypt / MENA local relevance.
      "geo.region": geo.region,
      "geo.placename":
        locale === "ar" ? geo.placenameAr : geo.placename,
      "geo.position": geo.position,
      ICBM: geo.icbm,
    },
  };
}
