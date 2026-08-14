import { describe, expect, it } from 'vitest'
import type { FaqDTO } from '@/types/dto/faq.dto'
import { FaqMapper } from './faq.mapper'

const dto: FaqDTO = {
  id: 'faq-test',
  category_key: 'training',
  category_fr: 'Formations',
  category_en: 'Training',
  category_ar: 'التدريب',
  question_fr: 'Question FR',
  question_en: 'Question EN',
  question_ar: 'سؤال',
  answer_fr: 'Réponse FR',
  answer_en: 'Answer EN',
  answer_ar: 'إجابة',
}

describe('FaqMapper.fromDTO', () => {
  it('maps a raw DTO to the canonical domain entity', () => {
    expect(FaqMapper.fromDTO(dto)).toEqual({
      id: 'faq-test',
      categoryKey: 'training',
      category: { fr: 'Formations', en: 'Training', ar: 'التدريب' },
      question: { fr: 'Question FR', en: 'Question EN', ar: 'سؤال' },
      answer: { fr: 'Réponse FR', en: 'Answer EN', ar: 'إجابة' },
    })
  })
})
