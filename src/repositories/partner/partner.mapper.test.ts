import { describe, expect, it } from 'vitest'
import type { PartnerDTO } from '@/types/dto/partner.dto'
import { PartnerMapper } from './partner.mapper'

const dto: PartnerDTO = {
  id: 'ptn-test',
  name: 'Test Partner',
  logo_url: '/images/test-partner.svg',
  description_fr: 'Description FR',
  description_en: 'Description EN',
  description_ar: 'وصف',
}

describe('PartnerMapper.fromDTO', () => {
  it('maps a raw DTO to the canonical domain entity', () => {
    expect(PartnerMapper.fromDTO(dto)).toEqual({
      id: 'ptn-test',
      name: 'Test Partner',
      logoUrl: '/images/test-partner.svg',
      description: { fr: 'Description FR', en: 'Description EN', ar: 'وصف' },
    })
  })
})
