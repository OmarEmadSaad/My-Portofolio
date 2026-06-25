# Omar Emad — Portfolio: Next.js 16 Migration, SEO & Lighthouse Report

Migrated from **Vite + React 18 SPA** to **Next.js 16.2.1 + React 19 (App Router)** with full
SSG, bilingual i18n routing, and an end-to-end SEO/Geo overhaul.

## Lighthouse Scores

Audited locally with Lighthouse against `next start` (production build), isolated headless Chrome.

| Category | Desktop (`/en` & `/ar`) | Mobile (`/en`) |
|----------------|:----:|:----:|
| Performance | **100** | **92–93** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |

**Core Web Vitals (mobile):** FCP ~1.0s (100), TBT ~80–100ms, CLS **0**, Speed Index ~2.4s.

### Note on the mobile Performance number
The only sub-100 metric is the **simulated** mobile LCP (~3.2s). The LCP image is just **15 KB**
(AVIF), preloaded with `fetchpriority="high"`, and FCP is ~1.0s. The high LCP is an artifact of
Lighthouse's Slow-4G **Lantern simulation over localhost HTTP/1.1**, which serializes the image
behind the React/JS bundle on a single connection. On **Vercel's HTTP/2/3 edge network** those
resources download in parallel, so production mobile LCP/Performance is expected to be ~98–100.
Re-run via [PageSpeed Insights](https://pagespeed.web.dev/) against the deployed URL to confirm.

> Tooling note: verify SEO with `lighthouse@12` locally — Lighthouse 13 crashes its `canonical`
> audit on Node < 20.19 (`URL.parse is not a function`), which falsely nulls the SEO category.

## What was done

### 1. Migration to Next.js 16.2.1 (App Router)
- All pages are **statically generated (SSG)** via `generateStaticParams` (`/en`, `/ar`).
- Most sections are **React Server Components** (Hero, About, Services, Projects, Footer) → minimal client JS.
- Client islands only where needed: `Header` (theme/menu), `Skills` (filter), `Contact` (form), `Typewriter`, `RevealObserver`.
- `next/image` with AVIF/WebP, priority LCP image, lazy below-the-fold images, remote-pattern allow-list.
- Self-hosted, per-locale `next/font` (Inter for EN, Cairo for AR) — no render-blocking font CDN, no CLS.

### 2. SEO
- **Metadata API**: dynamic per-locale title/description/keywords, Open Graph, Twitter cards, robots (full indexing).
- **Dynamic OG image** generated per build (`opengraph-image.tsx`, 1200×630).
- **sitemap.xml** (`app/sitemap.ts`) with hreflang alternates; **robots.txt** (`app/robots.ts`) allowing full indexing + sitemap.
- **Structured data (JSON-LD)** graph: `Person` + `ProfessionalService` + `WebSite`, with `sameAs`, `knowsAbout`, address, geo.

### 3. Keyword optimization (EN + AR)
- Target keywords woven naturally into H1/H2, meta, tagline, services, project descriptions, image `alt`, and JSON-LD —
  e.g. *Front End Developer, Full Stack Engineer, React Expert, Next.js Developer, React Native Specialist, Omar Emad / عمر عماد, مطور واجهات أمامية, تطبيقات الهاتف المحمول*.

### 4. Geo-optimization (Egypt / MENA)
- `geo.region` (`EG-C`), `geo.placename`, `geo.position`, `ICBM` meta tags.
- `ProfessionalService` JSON-LD with Cairo coordinates and `areaServed` (Egypt → MENA → Worldwide).
- Static pages served from Vercel's global Edge network.

### 5. Bilingual (Arabic RTL + English LTR)
- Locale-prefixed routes `/en` and `/ar`; `proxy.ts` redirects `/` by `Accept-Language`.
- `<html lang dir>` set per locale; full RTL; server-side translation dictionaries (`src/i18n`).
- `<link rel="alternate" hreflang>` for `en`, `ar`, `x-default`; per-locale canonical.

### 6. Accessibility & Best Practices (100)
- Fixed all color-contrast (AA) on buttons in light **and** dark mode.
- Skip-to-content link, `aria-label`s, `aria-live` form status, semantic landmarks, visible focus rings, reduced-motion support.
- Security headers (CSP-adjacent), no console errors, HTTPS-ready.

### Animations preserved (lighter)
framer-motion was replaced with **CSS keyframes/transitions + one shared IntersectionObserver**:
hero staggered entrance, **typewriter** role rotator (SEO-safe — H1/H2 stay static), scroll reveals,
hover lift/scale, bouncing scroll cue. Same feel, ~37 KB less JS, fully SSR-safe.

## Deploy
Push to the connected GitHub repo (Vercel auto-deploys), or `vercel --prod`. No env vars required
(`NEXT_PUBLIC_SITE_URL` is optional and defaults to the production URL).
