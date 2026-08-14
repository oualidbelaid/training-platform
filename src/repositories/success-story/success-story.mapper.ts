import type { SuccessStoryDTO, SuccessStoryResultDTO } from '@/types/dto/success-story.dto'
import type { SuccessStory, SuccessStoryResult } from '@/types/entities/success-story'

function mapResult(dto: SuccessStoryResultDTO): SuccessStoryResult {
  return {
    value: dto.value,
    label: { fr: dto.label_fr, en: dto.label_en, ar: dto.label_ar },
  }
}

export const SuccessStoryMapper = {
  fromDTO(dto: SuccessStoryDTO): SuccessStory {
    return {
      id: dto.id,
      clientName: dto.client_name,
      industry: { fr: dto.industry_fr, en: dto.industry_en, ar: dto.industry_ar },
      challenge: { fr: dto.challenge_fr, en: dto.challenge_en, ar: dto.challenge_ar },
      approach: { fr: dto.approach_fr, en: dto.approach_en, ar: dto.approach_ar },
      results: dto.results.map(mapResult),
      categoryId: dto.category_id,
    }
  },
}
