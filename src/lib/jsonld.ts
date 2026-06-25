import { type Locale } from "@/i18n/config";
import { type Dictionary } from "@/i18n/dictionaries";
import { author, geo, knowsAbout, siteUrl } from "./site";

// Builds a schema.org @graph (JSON-LD) describing Omar Emad as a Person, the
// professional development services offered, and the website itself. Rendered
// server-side in a <script type="application/ld+json"> for rich results.
export function buildJsonLd(locale: Locale, dict: Dictionary) {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const serviceId = `${siteUrl}/#service`;
  const localizedName = locale === "ar" ? author.nameAr : author.name;
  const localizedJobTitle =
    locale === "ar" ? author.jobTitleAr : author.jobTitle;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: localizedName,
        alternateName: [author.name, author.nameAr],
        url: `${siteUrl}/${locale}`,
        image: author.image,
        jobTitle: localizedJobTitle,
        description: dict.meta.description,
        email: `mailto:${author.email}`,
        telephone: author.phones[0],
        gender: "Male",
        knowsLanguage: ["ar", "en"],
        knowsAbout,
        sameAs: author.sameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: geo.locality,
          addressRegion: "Cairo",
          addressCountry: geo.country,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: dict.education.school,
        },
        worksFor: { "@id": serviceId },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: `${author.name} — Web & Mobile Development`,
        description: dict.meta.ogDescription,
        url: `${siteUrl}/${locale}`,
        image: author.image,
        priceRange: "$$",
        founder: { "@id": personId },
        provider: { "@id": personId },
        serviceType: [
          "Front End Development",
          "Full Stack Engineering",
          "Mobile Application Development",
          "React Native Development",
          "Next.js Development",
        ],
        areaServed: [
          { "@type": "Country", name: "Egypt" },
          { "@type": "Place", name: "Middle East and North Africa" },
          { "@type": "Place", name: "Worldwide" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: geo.locality,
          addressCountry: geo.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
        sameAs: author.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteUrl}/${locale}`,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: locale,
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
    ],
  };
}
