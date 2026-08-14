import { MEDIA } from '@/config/media'
import type { EventDTO } from '@/types/dto/event.dto'

export const mockEventDTOs: EventDTO[] = [
  {
    id: 'evt-digital-workshop',
    slug: 'atelier-transformation-digitale',
    title_fr: 'Atelier — Réussir sa transformation digitale',
    title_en: 'Workshop — Succeeding at Digital Transformation',
    title_ar: 'ورشة عمل — النجاح في التحول الرقمي',
    description_fr:
      'Un atelier interactif animé par nos formateurs experts en transformation digitale, avec retours d’expérience concrets.',
    description_en:
      'An interactive workshop led by our digital transformation experts, featuring concrete case studies.',
    description_ar: 'ورشة تفاعلية يقدمها خبراؤنا في التحول الرقمي، مع أمثلة عملية من الواقع.',
    start_date: '2026-05-12',
    format: 'online',
    image_url: MEDIA.events,
  },
  {
    id: 'evt-leadership-breakfast',
    slug: 'petit-dejeuner-leadership-marseille',
    title_fr: 'Petit-déjeuner leadership — Marseille',
    title_en: 'Leadership Breakfast — Marseille',
    title_ar: 'إفطار القيادة — مرسيليا',
    description_fr:
      'Un moment d’échange convivial entre dirigeants et managers autour des enjeux actuels du leadership.',
    description_en:
      'A relaxed networking session for executives and managers on current leadership challenges.',
    description_ar: 'لقاء ودي بين القادة والمديرين حول تحديات القيادة الراهنة.',
    start_date: '2026-06-20',
    format: 'in-person',
    location_fr: 'Marseille, France',
    location_en: 'Marseille, France',
    location_ar: 'مرسيليا، فرنسا',
  },
  {
    id: 'evt-leadership-webinar',
    slug: 'webinar-leadership-nouveaux-managers',
    title_fr: 'Webinaire — Réussir sa première année de management',
    title_en: 'Webinar — Succeeding in Your First Year as a Manager',
    title_ar: 'ندوة عبر الإنترنت — النجاح في أول عام كمدير',
    description_fr:
      'Une session gratuite animée par nos formateurs pour découvrir les clés d’un management efficace.',
    description_en:
      'A free session led by our trainers covering the essentials of effective management.',
    description_ar: 'جلسة مجانية يقدمها مدربونا حول أساسيات الإدارة الفعالة.',
    start_date: '2026-09-15',
    format: 'online',
    image_url: MEDIA.events,
  },
  {
    id: 'evt-project-management-open-day',
    slug: 'journee-portes-ouvertes-gestion-de-projet',
    title_fr: 'Journée portes ouvertes — Gestion de projet',
    title_en: 'Open Day — Project Management',
    title_ar: 'يوم مفتوح — إدارة المشاريع',
    description_fr:
      'Rencontrez nos formateurs et découvrez notre méthodologie sur notre campus.',
    description_en: 'Meet our trainers and discover our methodology on campus.',
    description_ar: 'تعرّف على مدربينا واكتشف منهجيتنا في مقرنا.',
    start_date: '2026-10-02',
    format: 'in-person',
    location_fr: 'Paris, France',
    location_en: 'Paris, France',
    location_ar: 'باريس، فرنسا',
  },
  {
    id: 'evt-hr-roundtable',
    slug: 'table-ronde-ressources-humaines',
    title_fr: 'Table ronde — L’avenir de la formation en entreprise',
    title_en: 'Roundtable — The Future of Corporate Training',
    title_ar: 'طاولة مستديرة — مستقبل التدريب في الشركات',
    description_fr:
      'Un échange entre dirigeants RH sur les nouvelles attentes en matière de développement des compétences.',
    description_en:
      'A discussion among HR leaders on evolving expectations for skills development.',
    description_ar: 'نقاش بين قادة الموارد البشرية حول التوقعات المتطورة لتطوير المهارات.',
    start_date: '2026-11-05',
    format: 'hybrid',
    location_fr: 'Lyon, France',
    location_en: 'Lyon, France',
    location_ar: 'ليون، فرنسا',
  },
]
