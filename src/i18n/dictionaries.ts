import "server-only";
import type { Locale } from "./config";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

// The English dictionary is the canonical shape; both locales share it.
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ar: ar as Dictionary,
};

// Synchronous because dictionaries are bundled JSON — no async needed, which
// keeps Server Components fully static (SSG) with zero runtime cost.
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
