import { DE } from "./de/de";
import { EN } from "./en/en";
import type { ITranslation } from "./ITranslation";

export enum Locale {
  EN = "EN",
  DE = "DE",
}

export const Translations: Record<Locale, ITranslation> = {
  [Locale.EN]: EN,
  [Locale.DE]: DE,
};

export function getClientLocale(): Locale {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)MANUAL_NEXT_LOCALE=([^;]+)/);
    if (match?.[1]) {
      return match[1].toLowerCase().startsWith("de") ? Locale.DE : Locale.EN;
    }
  }
  if (typeof navigator !== "undefined") {
    return navigator.language.toLowerCase().startsWith("de")
      ? Locale.DE
      : Locale.EN;
  }
  return Locale.EN;
}
