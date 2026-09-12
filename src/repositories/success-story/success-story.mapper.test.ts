import { describe, expect, it } from 'vitest'
import type { SuccessStoryDTO } from '@/types/dto/success-story.dto'
import { SuccessStoryMapper } from './success-story.mapper'

const dto: SuccessStoryDTO = {
  id: 'ssc-test',
  client_name: 'Test Client',
  industry_fr: 'Secteur FR',
  industry_en: 'Industry EN',
  industry_ar: 'قطاع',
  challenge_fr: 'Défi FR',
  challenge_en: 'Challenge EN',
  challenge_ar: 'تحدٍ',
  approach_fr: 'Approche FR',
  approach_en: 'Approach EN',
  approach_ar: 'منهجية',
  results: [{ value: '+10 %', label_fr: 'Label FR', label_en: 'Label EN', label_ar: 'تسمية' }],
  category_id: 'cat-test',
}

describe('SuccessStoryMapper.fromDTO', () => {
  it('maps a raw DTO, including nested results, to the canonical domain entity', () => {
    expect(SuccessStoryMapper.fromDTO(dto)).toEqual({
      id: 'ssc-test',
      clientName: 'Test Client',
      industry: { fr: 'Secteur FR', en: 'Industry EN', ar: 'قطاع' },
      challenge: { fr: 'Défi FR', en: 'Challenge EN', ar: 'تحدٍ' },
      approach: { fr: 'Approche FR', en: 'Approach EN', ar: 'منهجية' },
      results: [{ value: '+10 %', label: { fr: 'Label FR', en: 'Label EN', ar: 'تسمية' } }],
      categoryId: 'cat-test',
    })
  })
})
