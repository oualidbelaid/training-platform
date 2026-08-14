import { describe, expect, it } from 'vitest'
import type { IndustryDTO } from '@/types/dto/industry.dto'
import { IndustryMapper } from './industry.mapper'

const dto: IndustryDTO = {
  id: 'ind-test',
  slug: 'test-industry',
  name_fr: 'Nom FR',
  name_en: 'Name EN',
  name_ar: 'اسم',
  description_fr: 'Description FR',
  description_en: 'Description EN',
  description_ar: 'وصف',
}

describe('IndustryMapper.fromDTO', () => {
  it('maps a raw DTO to the canonical domain entity', () => {
    expect(IndustryMapper.fromDTO(dto)).toEqual({
      id: 'ind-test',
      slug: 'test-industry',
      name: { fr: 'Nom FR', en: 'Name EN', ar: 'اسم' },
      description: { fr: 'Description FR', en: 'Description EN', ar: 'وصف' },
    })
  })
})
