import type { Bilingual } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function pick(text: Bilingual, locale: string): string {
  return locale === "en" ? text.en : text.fr;
}

export type { Locale };
