import { MEDIA } from '@/config/media'
import type { PartnerDTO } from '@/types/dto/partner.dto'

/**
 * Real ISTAM clients, sourced from the "…Ils nous ont fait confiance !"
 * client-trust slide in the official ISTAM 2026 institutional presentation.
 * Two tiers, both entirely real names — never invented:
 *
 * 1. Clients with a real, rights-appropriate logo file sourced from
 *    Wikimedia Commons (`logo_url` set — see `config/media.ts` for the
 *    exact source file per client, for traceability).
 * 2. Clients for which no such logo file could be confidently sourced
 *    (`logo_url` omitted) — `PartnerCard`/`TrustLogosSection` render these
 *    as a plain text wordmark tile rather than pairing a real company name
 *    with an unrelated placeholder mark.
 *
 * No per-client engagement description is invented: the source states only
 * that ISTAM counts them as a client, so that is all `description_*` says.
 */
export const mockPartnerDTOs: PartnerDTO[] = [
  // ---- Real logo sourced ----
  {
    id: 'ptn-sonatrach',
    name: 'Sonatrach',
    logo_url: MEDIA.clientSonatrach,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-djezzy',
    name: 'Djezzy',
    logo_url: MEDIA.clientDjezzy,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-air-algerie',
    name: 'Air Algérie',
    logo_url: MEDIA.clientAirAlgerie,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-danone',
    name: 'Danone',
    logo_url: MEDIA.clientDanone,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-lafarge',
    name: 'Lafarge',
    logo_url: MEDIA.clientLafarge,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-sofitel',
    name: 'Sofitel Luxury Hotels',
    logo_url: MEDIA.clientSofitel,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-hyatt-regency',
    name: 'Hyatt Regency',
    logo_url: MEDIA.clientHyatt,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-algerie-telecom',
    name: 'Algérie Télécom',
    logo_url: MEDIA.clientAlgerieTelecom,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-natixis',
    name: 'Natixis',
    logo_url: MEDIA.clientNatixis,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-bel',
    name: 'Bel',
    logo_url: MEDIA.clientBel,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-cevital',
    name: 'Cevital',
    logo_url: MEDIA.clientCevital,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-mobilis',
    name: 'Mobilis',
    logo_url: MEDIA.clientMobilis,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-institut-pasteur-algerie',
    name: "Institut Pasteur d'Algérie",
    logo_url: MEDIA.clientInstitutPasteurAlgerie,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-yassir',
    name: 'Yassir',
    logo_url: MEDIA.clientYassir,
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },

  // ---- Real name, no sourced logo asset — rendered as a text wordmark ----
  {
    id: 'ptn-numidis',
    name: 'Numidis',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-groupe-saidal',
    name: 'Groupe Saidal',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-rouiba',
    name: 'Rouiba',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-soummam',
    name: 'Soummam',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-royal-hotel',
    name: 'Royal Hotel',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-el-aurassi',
    name: 'El Aurassi',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-saeti',
    name: 'SAETI',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-pharmalliance',
    name: 'Pharmalliance',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-general-emballage',
    name: 'General Emballage',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
  {
    id: 'ptn-bergerat-monnoyeur',
    name: 'Bergerat Monnoyeur',
    description_fr: 'Organisation qui a fait confiance à ISTAM.',
    description_en: 'An organization that has trusted ISTAM.',
    description_ar: 'مؤسسة وضعت ثقتها في ISTAM.',
  },
]
