import { env } from '@/config/env'
import { MockTestimonialRepository } from './mock-testimonial.repository'
import type { TestimonialRepository } from './testimonial.repository'

function createTestimonialRepository(): TestimonialRepository {
  if (env.VITE_USE_MOCK) {
    return new MockTestimonialRepository()
  }

  throw new Error(
    'DolibarrTestimonialRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const testimonialRepository: TestimonialRepository = createTestimonialRepository()

export type { TestimonialRepository } from './testimonial.repository'
