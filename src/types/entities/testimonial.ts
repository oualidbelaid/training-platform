import type { LocalizedText } from '@/types/entities/common'

export interface Testimonial {
  id: string
  authorName: string
  authorRole: LocalizedText
  quote: LocalizedText
  trainingId?: string
}
