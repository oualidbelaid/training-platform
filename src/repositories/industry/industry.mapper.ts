import type { IndustryDTO } from '@/types/dto/industry.dto'
import type { Industry } from '@/types/entities/industry'

export const IndustryMapper = {
  fromDTO(dto: IndustryDTO): Industry {
    return {
      id: dto.id,
      slug: dto.slug,
      name: { fr: dto.name_fr, en: dto.name_en, ar: dto.name_ar },
      description: { fr: dto.description_fr, en: dto.description_en, ar: dto.description_ar },
    }
  },
}
