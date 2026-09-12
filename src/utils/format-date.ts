import type { SupportedLanguage } from '@/i18n'

const LOCALE_MAP: Record<SupportedLanguage, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  ar: 'ar',
}

export function formatDate(isoDate: string, language: SupportedLanguage): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[language], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate))
}

/** Day-of-month only, for the large date-typography treatment on featured events. */
export function formatEventDay(isoDate: string, language: SupportedLanguage): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[language], { day: 'numeric' }).format(new Date(isoDate))
}

/** Short month label, paired with formatEventDay. */
export function formatEventMonth(isoDate: string, language: SupportedLanguage): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[language], { month: 'short' }).format(new Date(isoDate))
}
