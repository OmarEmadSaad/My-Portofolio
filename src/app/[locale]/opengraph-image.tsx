import { ImageResponse } from "next/og";
import { author } from "@/lib/site";

// Dynamically generated 1200x630 Open Graph / Twitter card image. Rendered at
// build time per locale, so social shares show a branded card with no binary
// asset to maintain. Latin text keeps it font-safe across locales.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Omar Emad — Front End Developer & Full Stack Engineer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #312e81 0%, #4f46e5 60%, #6366f1 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, opacity: 0.85, display: "flex" }}>
          {author.email}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          {author.name}
        </div>
        <div
          style={{
            fontSize: 46,
            fontWeight: 600,
            marginTop: 16,
            display: "flex",
          }}
        >
          Front End Developer & Full Stack Engineer
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 28,
            opacity: 0.9,
            display: "flex",
          }}
        >
          React · Next.js · React Native · Cairo, Egypt
        </div>
      </div>
    ),
    { ...size },
  );
}
