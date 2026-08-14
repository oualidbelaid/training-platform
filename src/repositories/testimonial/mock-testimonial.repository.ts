import { mockTestimonialDTOs } from '@/mocks/data/testimonials'
import type { Testimonial } from '@/types/entities/testimonial'
import { TestimonialMapper } from './testimonial.mapper'
import type { TestimonialRepository } from './testimonial.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockTestimonialRepository implements TestimonialRepository {
  private readonly testimonials: Testimonial[] = mockTestimonialDTOs.map(
    TestimonialMapper.fromDTO,
  )

  async getAll(): Promise<Testimonial[]> {
    return delay(this.testimonials)
  }
}
