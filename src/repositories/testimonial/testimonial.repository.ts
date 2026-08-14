import type { Testimonial } from '@/types/entities/testimonial'

export interface TestimonialRepository {
  getAll(): Promise<Testimonial[]>
}
