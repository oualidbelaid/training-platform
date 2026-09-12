import type {
  TrainingDTO,
  TrainingFaqItemDTO,
  TrainingProgramModuleDTO,
  TrainingSessionDTO,
} from '@/types/dto/training.dto'
import type {
  Training,
  TrainingFaqItem,
  TrainingProgramModule,
  TrainingSession,
} from '@/types/entities/training'
import { zipLocalizedText } from '@/utils/localized-text'

function mapProgramModule(dto: TrainingProgramModuleDTO): TrainingProgramModule {
  return {
    title: { fr: dto.title_fr, en: dto.title_en, ar: dto.title_ar },
    description: { fr: dto.description_fr, en: dto.description_en, ar: dto.description_ar },
  }
}

function mapFaqItem(dto: TrainingFaqItemDTO): TrainingFaqItem {
  return {
    question: { fr: dto.question_fr, en: dto.question_en, ar: dto.question_ar },
    answer: { fr: dto.answer_fr, en: dto.answer_en, ar: dto.answer_ar },
  }
}

function mapSession(dto: TrainingSessionDTO): TrainingSession {
  return {
    startDate: dto.start_date,
    location:
      dto.location_fr && dto.location_en && dto.location_ar
        ? { fr: dto.location_fr, en: dto.location_en, ar: dto.location_ar }
        : undefined,
  }
}

export const TrainingMapper = {
  fromDTO(dto: TrainingDTO): Training {
    return {
      id: dto.id,
      slug: dto.slug,
      title: { fr: dto.title_fr, en: dto.title_en, ar: dto.title_ar },
      summary: { fr: dto.summary_fr, en: dto.summary_en, ar: dto.summary_ar },
      description: { fr: dto.description_fr, en: dto.description_en, ar: dto.description_ar },
      objectives: zipLocalizedText(dto.objectives_fr, dto.objectives_en, dto.objectives_ar),
      targetAudience: zipLocalizedText(
        dto.target_audience_fr,
        dto.target_audience_en,
        dto.target_audience_ar,
      ),
      prerequisites: zipLocalizedText(
        dto.prerequisites_fr,
        dto.prerequisites_en,
        dto.prerequisites_ar,
      ),
      program: dto.program.map(mapProgramModule),
      methodology: { fr: dto.methodology_fr, en: dto.methodology_en, ar: dto.methodology_ar },
      faq: dto.faq.map(mapFaqItem),
      sessions: dto.sessions.map(mapSession),
      format: dto.format,
      level: dto.level,
      durationHours: dto.duration_hours,
      categoryId: dto.category_id,
      trainerIds: dto.trainer_ids,
      featured: dto.is_featured,
      image: dto.image_url,
    }
  },
}
