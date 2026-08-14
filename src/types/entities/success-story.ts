import type { LocalizedText } from '@/types/entities/common'

/** One "before/after" stat highlight (spec §16 "Results"). */
export interface SuccessStoryResult {
  value: string
  label: LocalizedText
}

export interface SuccessStory {
  id: string
  clientName: string
  industry: LocalizedText
  challenge: LocalizedText
  approach: LocalizedText
  results: SuccessStoryResult[]
  categoryId?: string
}
