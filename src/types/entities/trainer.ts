import type { LocalizedText } from '@/types/entities/common'

export interface Trainer {
  id: string
  slug: string
  name: string
  jobTitle: LocalizedText
  bio: LocalizedText
  photoUrl?: string
  featured: boolean
}
