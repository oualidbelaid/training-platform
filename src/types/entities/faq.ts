import type { LocalizedText } from '@/types/entities/common'

export interface Faq {
  id: string
  categoryKey: string
  category: LocalizedText
  question: LocalizedText
  answer: LocalizedText
}
