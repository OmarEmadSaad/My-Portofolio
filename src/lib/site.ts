// Single source of truth for site-wide constants used across metadata,
// structured data, sitemap and robots. Update the live URL here if the
// production domain ever changes.

// Production URL by default; override with NEXT_PUBLIC_SITE_URL for previews
// or local testing (e.g. http://localhost:3000). Trailing slash trimmed.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://my-portofolio-murex-omega.vercel.app"
).replace(/\/$/, "");

export const author = {
  name: "Omar Emad",
  nameAr: "عمر عماد",
  jobTitle: "Front End Developer & Full Stack Engineer",
  jobTitleAr: "مطور واجهات أمامية ومهندس برمجيات متكامل",
  email: "oemad3987@gmail.com",
  phones: ["+201112774155", "+201553826299"],
  image: `${siteUrl}/profile.jpeg`,
  ogImage: `${siteUrl}/og-image.png`,
  resume: "/Resume_Omar_Emad.docx",
  // Professional/social profiles — used for schema.org sameAs and rel="me".
  sameAs: [
    "https://github.com/OmarEmadSaad",
    "https://www.linkedin.com/in/omar-emad-1413a0238/",
    "https://wa.me/201112774155",
  ],
  social: {
    github: "https://github.com/OmarEmadSaad",
    linkedin: "https://www.linkedin.com/in/omar-emad-1413a0238/",
    whatsapp: "https://wa.me/201112774155",
    email: "mailto:oemad3987@gmail.com?subject=Contact%20from%20Portfolio",
  },
} as const;

// Geo-optimization signals for the MENA / Egypt region.
export const geo = {
  region: "EG-C", // ISO 3166-2: Cairo Governorate
  placename: "Cairo, Egypt",
  placenameAr: "القاهرة، مصر",
  position: "30.0444;31.2357",
  icbm: "30.0444, 31.2357",
  country: "EG",
  locality: "Cairo",
  latitude: 30.0444,
  longitude: 31.2357,
} as const;

// Areas of expertise — feeds schema.org knowsAbout + reinforces target keywords.
export const knowsAbout = [
  "Front End Development",
  "Full Stack Engineering",
  "Software Engineering",
  "Mobile Application Development",
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Responsive Web Design",
  "Search Engine Optimization",
];
