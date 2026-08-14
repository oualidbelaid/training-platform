import type { LocalizedText } from '@/types/entities/common'

export interface Category {
  id: string
  slug: string
  name: LocalizedText
  description: LocalizedText
}
