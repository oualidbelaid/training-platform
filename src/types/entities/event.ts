import type { LocalizedText, TrainingFormat } from '@/types/entities/common'

export interface Event {
  id: string
  slug: string
  title: LocalizedText
  description: LocalizedText
  startDate: string
  format: TrainingFormat
  location?: LocalizedText
  image?: string
}
