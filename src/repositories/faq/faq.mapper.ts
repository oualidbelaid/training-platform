import type { FaqDTO } from '@/types/dto/faq.dto'
import type { Faq } from '@/types/entities/faq'

export const FaqMapper = {
  fromDTO(dto: FaqDTO): Faq {
    return {
      id: dto.id,
      categoryKey: dto.category_key,
      category: { fr: dto.category_fr, en: dto.category_en, ar: dto.category_ar },
      question: { fr: dto.question_fr, en: dto.question_en, ar: dto.question_ar },
      answer: { fr: dto.answer_fr, en: dto.answer_en, ar: dto.answer_ar },
    }
  },
}
