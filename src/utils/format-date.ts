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
