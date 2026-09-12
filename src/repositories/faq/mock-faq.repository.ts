import { mockFaqDTOs } from '@/mocks/data/faqs'
import type { Faq } from '@/types/entities/faq'
import { FaqMapper } from './faq.mapper'
import type { FaqRepository } from './faq.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockFaqRepository implements FaqRepository {
  private readonly faqs: Faq[] = mockFaqDTOs.map(FaqMapper.fromDTO)

  async getAll(): Promise<Faq[]> {
    return delay(this.faqs)
  }
}
