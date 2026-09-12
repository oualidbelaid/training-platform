import type { IndustryDTO } from '@/types/dto/industry.dto'

/**
 * Content taxonomy, not client claims (spec §9: "these are content
 * categories, not claims that ISTAM currently serves specific clients in
 * every sector"). Same minimal shape as `Category` — id/slug/name/
 * description, no photography, presented as icon tiles.
 */
export const mockIndustryDTOs: IndustryDTO[] = [
  {
    id: 'ind-banking-finance',
    slug: 'banking-finance',
    name_fr: 'Banque & Finance',
    name_en: 'Banking & Finance',
    name_ar: 'البنوك والتمويل',
    description_fr: 'Leadership, conformité et relation client pour les établissements financiers.',
    description_en: 'Leadership, compliance and client relations for financial institutions.',
    description_ar: 'القيادة والامتثال وعلاقات العملاء للمؤسسات المالية.',
  },
  {
    id: 'ind-technology',
    slug: 'technology',
    name_fr: 'Technologie',
    name_en: 'Technology',
    name_ar: 'التكنولوجيا',
    description_fr: 'Gestion de projet et transformation digitale pour les équipes produit et IT.',
    description_en: 'Project management and digital transformation for product and IT teams.',
    description_ar: 'إدارة المشاريع والتحول الرقمي لفرق المنتجات وتقنية المعلومات.',
  },
  {
    id: 'ind-manufacturing',
    slug: 'manufacturing',
    name_fr: 'Industrie',
    name_en: 'Manufacturing',
    name_ar: 'الصناعة',
    description_fr: 'Management opérationnel et conduite du changement sur sites de production.',
    description_en: 'Operational management and change management on production sites.',
    description_ar: 'الإدارة التشغيلية وقيادة التغيير في مواقع الإنتاج.',
  },
  {
    id: 'ind-healthcare',
    slug: 'healthcare',
    name_fr: 'Santé',
    name_en: 'Healthcare',
    name_ar: 'الصحة',
    description_fr: 'Communication et management d’équipe adaptés aux environnements de soin.',
    description_en: 'Communication and team management adapted to care environments.',
    description_ar: 'التواصل وإدارة الفرق بما يتلاءم مع بيئات الرعاية الصحية.',
  },
  {
    id: 'ind-public-sector',
    slug: 'public-sector',
    name_fr: 'Secteur public',
    name_en: 'Public Sector',
    name_ar: 'القطاع العام',
    description_fr:
      'Développement des compétences managériales pour les administrations et collectivités.',
    description_en:
      'Management skills development for public administrations and local authorities.',
    description_ar: 'تطوير المهارات الإدارية للإدارات العامة والهيئات المحلية.',
  },
  {
    id: 'ind-retail',
    slug: 'retail',
    name_fr: 'Distribution & Commerce',
    name_en: 'Retail',
    name_ar: 'التجزئة',
    description_fr:
      'Formation des équipes terrain à la relation client et au management de proximité.',
    description_en: 'Training frontline teams in customer relations and on-the-ground management.',
    description_ar: 'تدريب فرق الميدان على علاقات العملاء والإدارة المباشرة.',
  },
  {
    id: 'ind-professional-services',
    slug: 'professional-services',
    name_fr: 'Services professionnels',
    name_en: 'Professional Services',
    name_ar: 'الخدمات المهنية',
    description_fr:
      'Communication, gestion de projet et développement commercial pour cabinets et prestataires.',
    description_en:
      'Communication, project management and business development for firms and service providers.',
    description_ar: 'التواصل وإدارة المشاريع وتطوير الأعمال للمكاتب ومقدمي الخدمات.',
  },
]
