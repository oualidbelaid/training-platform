import type { TrainerDTO } from '@/types/dto/trainer.dto'
import type { Trainer } from '@/types/entities/trainer'

export const TrainerMapper = {
  fromDTO(dto: TrainerDTO): Trainer {
    return {
      id: dto.id,
      slug: dto.slug,
      name: dto.name,
      jobTitle: { fr: dto.job_title_fr, en: dto.job_title_en, ar: dto.job_title_ar },
      bio: { fr: dto.bio_fr, en: dto.bio_en, ar: dto.bio_ar },
      photoUrl: dto.photo_url,
      featured: dto.is_featured,
    }
  },
}
