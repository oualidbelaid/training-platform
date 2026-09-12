import { faqRepository } from '@/repositories/faq'
import type { Faq } from '@/types/entities/faq'

export const FaqService = {
  getAll(): Promise<Faq[]> {
    return faqRepository.getAll()
  },
}
