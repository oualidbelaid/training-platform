import type { SupportedLanguage } from '@/i18n'
import type { LocalizedText } from '@/types/entities/common'

export function getLocalizedText(text: LocalizedText, language: SupportedLanguage): string {
  return text[language]
}

/**
 * Zips three index-matched string arrays (one per language) into an array
 * of `LocalizedText` — the shape every `*_fr`/`*_en`/`*_ar` string-array
 * DTO field (objectives, target audience, prerequisites, …) needs to
 * become on the entity side. Assumes the three arrays are the same length
 * (the mapper is the only caller, and mock data is authored that way).
 */
export function zipLocalizedText(fr: string[], en: string[], ar: string[]): LocalizedText[] {
  return fr.map((value, index) => ({ fr: value, en: en[index]!, ar: ar[index]! }))
}
