import type { CategoryDTO } from '@/types/dto/category.dto'

/**
 * Authored in DTO shape (see docs/DOLIBARR_GUIDE.md) — mapped through
 * CategoryMapper.fromDTO exactly like a future Dolibarr category record
 * would be.
 *
 * These 4 categories are ISTAM's real service pillars, sourced directly
 * from the official ISTAM 2026 institutional presentation ("Une
 * architecture claire" — 4 pillars structure the entire training/consulting
 * offer). Names are kept in English exactly as ISTAM itself names them in
 * the source deck; descriptions are each pillar's own tagline, translated.
 * Replaces the earlier fictional 6-category taxonomy.
 */
export const mockCategoryDTOs: CategoryDTO[] = [
  {
    id: 'cat-business-functional-excellence',
    slug: 'business-functional-excellence',
    name_fr: 'Business & Functional Excellence',
    name_en: 'Business & Functional Excellence',
    name_ar: 'التميز الوظيفي والأعمال',
    description_fr: "Développer l'expertise métier",
    description_en: 'Developing professional expertise',
    description_ar: 'تطوير الخبرة المهنية',
  },
  {
    id: 'cat-sales-customer-growth',
    slug: 'sales-customer-growth',
    name_fr: 'Sales, Customer & Growth',
    name_en: 'Sales, Customer & Growth',
    name_ar: 'المبيعات والعملاء والنمو',
    description_fr: 'Créer de la valeur pour le client et développer le business',
    description_en: 'Creating value for customers and driving business growth',
    description_ar: 'خلق قيمة للعميل وتطوير الأعمال',
  },
  {
    id: 'cat-leadership-people-development',
    slug: 'leadership-people-development',
    name_fr: 'Leadership & People Development',
    name_en: 'Leadership & People Development',
    name_ar: 'القيادة وتطوير الأفراد',
    description_fr: 'Faire grandir les femmes et les hommes',
    description_en: 'Growing people',
    description_ar: 'تنمية الرجال والنساء',
  },
  {
    id: 'cat-culture-compliance-sustainability',
    slug: 'culture-compliance-sustainability',
    name_fr: 'Culture, Compliance & Sustainability',
    name_en: 'Culture, Compliance & Sustainability',
    name_ar: 'الثقافة والامتثال والاستدامة',
    description_fr: 'Construire une entreprise responsable et performante',
    description_en: 'Building a responsible, high-performing company',
    description_ar: 'بناء مؤسسة مسؤولة وفعّالة',
  },
]
