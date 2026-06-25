import type { MetadataRoute } from "next";
import { author } from "@/lib/site";

// PWA web app manifest, served at /manifest.webmanifest. Improves the
// Lighthouse "Best Practices"/installability signals.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${author.name} — Front End Developer & Full Stack Engineer`,
    short_name: author.name,
    description:
      "Portfolio of Omar Emad — Front End Developer, Full Stack Engineer, React expert and React Native mobile app specialist.",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/profile.jpeg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}
