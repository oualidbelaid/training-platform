import { testimonialRepository } from '@/repositories/testimonial'
import type { Testimonial } from '@/types/entities/testimonial'

export const TestimonialService = {
  getAll(): Promise<Testimonial[]> {
    return testimonialRepository.getAll()
  },
}
