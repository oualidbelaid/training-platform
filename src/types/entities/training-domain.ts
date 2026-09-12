import type { LocalizedText } from '@/types/entities/common'

export interface TrainingDomainCourse {
  name: LocalizedText
}

export interface TrainingDomain {
  id: string
  slug: string
  categoryId: string
  name: LocalizedText
  courses: TrainingDomainCourse[]
}
