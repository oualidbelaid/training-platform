import type { TrainingDomainDTO } from '@/types/dto/training-domain.dto'
import type { TrainingDomain } from '@/types/entities/training-domain'

export const TrainingDomainMapper = {
  fromDTO(dto: TrainingDomainDTO): TrainingDomain {
    return {
      id: dto.id,
      slug: dto.slug,
      categoryId: dto.category_id,
      name: { fr: dto.name_fr, en: dto.name_en, ar: dto.name_ar },
      courses: dto.courses.map((course) => ({
        name: { fr: course.name_fr, en: course.name_en, ar: course.name_ar },
      })),
    }
  },
}
