import type { CategoryDTO } from '@/types/dto/category.dto'

/**
 * Authored in DTO shape (see docs/DOLIBARR_GUIDE.md) — mapped through
 * CategoryMapper.fromDTO exactly like a future Dolibarr category record
 * would be.
 */
export const mockCategoryDTOs: CategoryDTO[] = [
  {
    id: 'cat-leadership-management',
    slug: 'leadership-management',
    name_fr: 'Leadership & Management',
    name_en: 'Leadership & Management',
    name_ar: 'القيادة والإدارة',
    description_fr: 'Développer des managers confiants et inspirants',
    description_en: 'Developing confident, inspiring managers',
    description_ar: 'تطوير مديرين واثقين وملهمين',
  },
  {
    id: 'cat-project-management',
    slug: 'project-management',
    name_fr: 'Gestion de projet',
    name_en: 'Project Management',
    name_ar: 'إدارة المشاريع',
    description_fr: 'Planifier, piloter et livrer avec méthode',
    description_en: 'Plan, run and deliver with the right method',
    description_ar: 'التخطيط والتنفيذ والتسليم بمنهجية',
  },
  {
    id: 'cat-it-digital',
    slug: 'it-digital',
    name_fr: 'IT & Digital',
    name_en: 'IT & Digital',
    name_ar: 'تقنية المعلومات والرقمنة',
    description_fr: 'Maîtriser les outils et la transformation digitale',
    description_en: 'Master digital tools and transformation',
    description_ar: 'إتقان الأدوات الرقمية والتحول الرقمي',
  },
  {
    id: 'cat-finance',
    slug: 'finance',
    name_fr: 'Finance',
    name_en: 'Finance',
    name_ar: 'المالية',
    description_fr: 'Fiabiliser vos analyses et décisions financières',
    description_en: 'Sharpen your financial analysis and decisions',
    description_ar: 'تعزيز موثوقية تحليلاتكم وقراراتكم المالية',
  },
  {
    id: 'cat-human-resources',
    slug: 'human-resources',
    name_fr: 'Ressources humaines',
    name_en: 'Human Resources',
    name_ar: 'الموارد البشرية',
    description_fr: 'Structurer une politique RH qui a de l’impact',
    description_en: 'Build an HR policy that makes an impact',
    description_ar: 'بناء سياسة موارد بشرية ذات أثر فعلي',
  },
  {
    id: 'cat-communication',
    slug: 'communication',
    name_fr: 'Communication',
    name_en: 'Communication',
    name_ar: 'التواصل',
    description_fr: 'Communiquer avec clarté, impact et confiance',
    description_en: 'Communicate with clarity, impact and confidence',
    description_ar: 'التواصل بوضوح وتأثير وثقة',
  },
]
