import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode helps surface problems early; harmless in production build.
  reactStrictMode: true,

  // Allow next/image to optimise the remote project screenshots referenced in
  // src/data/projects.ts. Modern AVIF/WebP formats keep payloads tiny.
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.designideas.pics" },
      { protocol: "https", hostname: "play-lh.googleusercontent.com" },
    ],
  },

  // Security + best-practices headers (counts toward the Lighthouse
  // "Best Practices" category and protects users globally on the Edge).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
