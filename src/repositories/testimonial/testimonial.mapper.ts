import type { TestimonialDTO } from '@/types/dto/testimonial.dto'
import type { Testimonial } from '@/types/entities/testimonial'

export const TestimonialMapper = {
  fromDTO(dto: TestimonialDTO): Testimonial {
    return {
      id: dto.id,
      authorName: dto.author_name,
      authorRole: { fr: dto.author_role_fr, en: dto.author_role_en, ar: dto.author_role_ar },
      quote: { fr: dto.quote_fr, en: dto.quote_en, ar: dto.quote_ar },
      trainingId: dto.training_id,
    }
  },
}
