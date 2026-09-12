import { describe, expect, it } from 'vitest'
import type { TrainingDTO } from '@/types/dto/training.dto'
import { TrainingMapper } from './training.mapper'

const dto: TrainingDTO = {
  id: 'trg-test',
  slug: 'test-training',
  title_fr: 'Titre FR',
  title_en: 'Title EN',
  title_ar: 'عنوان',
  summary_fr: 'Résumé FR',
  summary_en: 'Summary EN',
  summary_ar: 'ملخص',
  description_fr: 'Description longue FR',
  description_en: 'Long description EN',
  description_ar: 'وصف طويل',
  objectives_fr: ['Objectif 1'],
  objectives_en: ['Objective 1'],
  objectives_ar: ['هدف 1'],
  target_audience_fr: ['Public FR'],
  target_audience_en: ['Audience EN'],
  target_audience_ar: ['جمهور'],
  prerequisites_fr: ['Aucun'],
  prerequisites_en: ['None'],
  prerequisites_ar: ['لا يوجد'],
  program: [
    {
      title_fr: 'Module FR',
      title_en: 'Module EN',
      title_ar: 'وحدة',
      description_fr: 'Détail module FR',
      description_en: 'Module detail EN',
      description_ar: 'تفاصيل الوحدة',
    },
  ],
  methodology_fr: 'Méthode FR',
  methodology_en: 'Methodology EN',
  methodology_ar: 'منهجية',
  faq: [
    {
      question_fr: 'Question FR',
      question_en: 'Question EN',
      question_ar: 'سؤال',
      answer_fr: 'Réponse FR',
      answer_en: 'Answer EN',
      answer_ar: 'إجابة',
    },
  ],
  sessions: [
    {
      start_date: '2026-01-15',
      location_fr: 'Alger',
      location_en: 'Algiers',
      location_ar: 'الجزائر',
    },
  ],
  format: 'online',
  level: 'beginner',
  duration_hours: 7,
  category_id: 'cat-test',
  trainer_ids: ['trn-test'],
  is_featured: true,
  image_url: '/images/test-training.svg',
}

describe('TrainingMapper.fromDTO', () => {
  it('maps a raw DTO to the canonical domain entity', () => {
    const training = TrainingMapper.fromDTO(dto)

    expect(training).toEqual({
      id: 'trg-test',
      slug: 'test-training',
      title: { fr: 'Titre FR', en: 'Title EN', ar: 'عنوان' },
      summary: { fr: 'Résumé FR', en: 'Summary EN', ar: 'ملخص' },
      description: { fr: 'Description longue FR', en: 'Long description EN', ar: 'وصف طويل' },
      objectives: [{ fr: 'Objectif 1', en: 'Objective 1', ar: 'هدف 1' }],
      targetAudience: [{ fr: 'Public FR', en: 'Audience EN', ar: 'جمهور' }],
      prerequisites: [{ fr: 'Aucun', en: 'None', ar: 'لا يوجد' }],
      program: [
        {
          title: { fr: 'Module FR', en: 'Module EN', ar: 'وحدة' },
          description: { fr: 'Détail module FR', en: 'Module detail EN', ar: 'تفاصيل الوحدة' },
        },
      ],
      methodology: { fr: 'Méthode FR', en: 'Methodology EN', ar: 'منهجية' },
      faq: [
        {
          question: { fr: 'Question FR', en: 'Question EN', ar: 'سؤال' },
          answer: { fr: 'Réponse FR', en: 'Answer EN', ar: 'إجابة' },
        },
      ],
      sessions: [
        { startDate: '2026-01-15', location: { fr: 'Alger', en: 'Algiers', ar: 'الجزائر' } },
      ],
      format: 'online',
      level: 'beginner',
      durationHours: 7,
      categoryId: 'cat-test',
      trainerIds: ['trn-test'],
      featured: true,
      image: '/images/test-training.svg',
    })
  })
})
