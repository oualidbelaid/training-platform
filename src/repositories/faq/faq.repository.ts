import type { Faq } from '@/types/entities/faq'

export interface FaqRepository {
  getAll(): Promise<Faq[]>
}
