import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

// Detects the best matching locale from the Accept-Language header, falling
// back to the default. Keeps logic tiny so it runs cheaply on the Edge.
function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
    for (const lang of preferred) {
      if ((locales as readonly string[]).includes(lang)) return lang;
    }
  }
  return defaultLocale;
}

// Next.js 16 "proxy" convention (formerly "middleware"). Redirects any
// non-locale-prefixed path to the detected/default locale so every request
// reaching the app carries a valid /en or /ar prefix.
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension
  // (assets like /profile.jpeg, /sitemap.xml, /robots.txt, /manifest.webmanifest).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
