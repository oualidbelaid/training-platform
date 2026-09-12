import { useTranslation } from 'react-i18next'
import { languageDirection, type SupportedLanguage } from '@/i18n'

export function useDirection(): 'ltr' | 'rtl' {
  const { i18n } = useTranslation()
  const language = i18n.language as SupportedLanguage
  return languageDirection[language] ?? 'ltr'
}
