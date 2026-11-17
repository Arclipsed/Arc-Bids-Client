import { cookies, headers } from "next/headers";
import type { ITranslation } from "@/translations/ITranslation";
import { Locale, Translations } from "@/translations/Translations";

export class TranslationService {
  static GetUserLocale = async (): Promise<Locale> => {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("MANUAL_NEXT_LOCALE")?.value;

    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language") ?? "";
    const headerLocale = acceptLanguage.split(",")[0]?.split(";")[0] ?? "en";

    const userLocale = cookieLocale ?? headerLocale;
    return TranslationService.NormalizeLocale(userLocale);
  };

  static NormalizeLocale = (code: string): Locale => {
    const lower = code.trim().toLowerCase();
    if (lower.startsWith("de")) return Locale.DE;
    return Locale.EN;
  };

  static GetTranslations = (locale: Locale): ITranslation => {
    return Translations[locale] ?? Translations[Locale.EN];
  };

  static GetUserTranslations = async (): Promise<ITranslation> => {
    const locale = await TranslationService.GetUserLocale();
    return TranslationService.GetTranslations(locale);
  };
}
