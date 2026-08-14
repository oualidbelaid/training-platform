import { MEDIA } from '@/config/media'
import type { PartnerDTO } from '@/types/dto/partner.dto'

/**
 * Demo partner records (M4). Names are generic/fictional — CLAUDE.md §4
 * "Do not invent official partnerships" — and the logos are the same
 * placeholder marks already used on the Home Page's `TrustLogosSection`
 * (`MEDIA.partner1`–`partner6`), not real company brand assets. The
 * Partners page surfaces the same "demo" disclaimer copy the Home Page
 * already uses for this exact reason.
 */
export const mockPartnerDTOs: PartnerDTO[] = [
  {
    id: 'ptn-meridia',
    name: 'Groupe Meridia',
    logo_url: MEDIA.partner1,
    description_fr: 'Partenaire de longue date pour la formation de ses équipes managériales à l’international.',
    description_en: 'A long-standing partner for the international training of its management teams.',
    description_ar: 'شريك منذ فترة طويلة في تدريب فرق الإدارة لديها على المستوى الدولي.',
  },
  {
    id: 'ptn-atlas-industries',
    name: 'Atlas Industries',
    logo_url: MEDIA.partner2,
    description_fr: 'Accompagnement sur des parcours de montée en compétences techniques et sécurité.',
    description_en: 'Support on technical upskilling and safety training pathways.',
    description_ar: 'دعم في مسارات تطوير المهارات التقنية والسلامة.',
  },
  {
    id: 'ptn-novatech-solutions',
    name: 'NovaTech Solutions',
    logo_url: MEDIA.partner3,
    description_fr: 'Collaboration autour de programmes de transformation digitale pour les équipes produit.',
    description_en: 'Collaboration on digital transformation programs for product teams.',
    description_ar: 'تعاون حول برامج التحول الرقمي لفرق المنتجات.',
  },
  {
    id: 'ptn-cabinet-delacroix',
    name: 'Cabinet Delacroix & Associés',
    logo_url: MEDIA.partner4,
    description_fr: 'Formations sur mesure en communication professionnelle et gestion de la relation client.',
    description_en: 'Tailored training in professional communication and client relationship management.',
    description_ar: 'تدريبات مخصصة في التواصل المهني وإدارة علاقات العملاء.',
  },
  {
    id: 'ptn-fedra-bank',
    name: 'Fedra Bank',
    logo_url: MEDIA.partner5,
    description_fr: 'Parcours de développement du leadership pour les responsables d’agence.',
    description_en: 'Leadership development pathways for branch managers.',
    description_ar: 'مسارات تطوير القيادة لمديري الفروع.',
  },
  {
    id: 'ptn-horizon-retail',
    name: 'Horizon Retail Group',
    logo_url: MEDIA.partner6,
    description_fr: 'Programmes de gestion de projet déployés auprès des équipes régionales.',
    description_en: 'Project management programs deployed across regional teams.',
    description_ar: 'برامج إدارة المشاريع المطبقة على الفرق الإقليمية.',
  },
]
