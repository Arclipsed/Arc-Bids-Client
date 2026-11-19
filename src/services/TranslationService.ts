import { cookies, headers } from "next/headers";
import type { ITranslation } from "@/translations/ITranslation";
import { Locale, Translations, normalizeLocaleCode } from "@/translations/Translations";

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
    return normalizeLocaleCode(code);
  };

  static GetTranslations = (locale: Locale): ITranslation => {
    return Translations[locale] ?? Translations[Locale.EN];
  };

  static GetUserTranslations = async (): Promise<ITranslation> => {
    const locale = await TranslationService.GetUserLocale();
    return TranslationService.GetTranslations(locale);
  };
}
