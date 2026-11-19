import { DE } from "./de/de";
import { EN } from "./en/en";
import { ES } from "./es/es";
import { FR } from "./fr/fr";
import { NL } from "./nl/nl";
import { RU } from "./ru/ru";
import { TR } from "./tr/tr";
import type { ITranslation } from "./ITranslation";

export enum Locale {
  EN = "EN",
  DE = "DE",
  ES = "ES",
  FR = "FR",
  NL = "NL",
  TR = "TR",
  RU = "RU",
}

export const Translations: Record<Locale, ITranslation> = {
  [Locale.EN]: EN,
  [Locale.DE]: DE,
  [Locale.ES]: ES,
  [Locale.FR]: FR,
  [Locale.NL]: NL,
  [Locale.TR]: TR,
  [Locale.RU]: RU,
};

export function normalizeLocaleCode(code?: string | null): Locale {
  const lower = (code ?? "").trim().toLowerCase();
  if (lower.startsWith("de")) return Locale.DE;
  if (lower.startsWith("es")) return Locale.ES;
  if (lower.startsWith("fr")) return Locale.FR;
  if (lower.startsWith("nl")) return Locale.NL;
  if (lower.startsWith("tr")) return Locale.TR;
  if (lower.startsWith("ru")) return Locale.RU;
  return Locale.EN;
}

export function getClientLocale(): Locale {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)MANUAL_NEXT_LOCALE=([^;]+)/);
    if (match?.[1]) {
      return normalizeLocaleCode(match[1]);
    }
  }
  if (typeof navigator !== "undefined") {
    return normalizeLocaleCode(navigator.language);
  }
  return Locale.EN;
}
