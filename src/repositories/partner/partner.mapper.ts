import type { PartnerDTO } from '@/types/dto/partner.dto'
import type { Partner } from '@/types/entities/partner'

export const PartnerMapper = {
  fromDTO(dto: PartnerDTO): Partner {
    return {
      id: dto.id,
      name: dto.name,
      logoUrl: dto.logo_url,
      description: { fr: dto.description_fr, en: dto.description_en, ar: dto.description_ar },
    }
  },
}
