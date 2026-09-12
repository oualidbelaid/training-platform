import type { LocalizedText } from '@/types/entities/common'

export interface Article {
  id: string
  slug: string
  title: LocalizedText
  excerpt: LocalizedText
  content: LocalizedText
  category: LocalizedText
  authorName: string
  publishedDate: string
  readingTimeMinutes: number
  image: string
  featured: boolean
}
