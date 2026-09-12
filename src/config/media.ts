import heroTraining from '@/assets/images/photos/hero-training.webp'
import leadership from '@/assets/images/photos/leadership.webp'
import management from '@/assets/images/photos/management.webp'
import digitalTransformation from '@/assets/images/photos/digital-transformation.webp'
import communication from '@/assets/images/photos/communication.webp'
import strategy from '@/assets/images/photos/strategy.webp'
import featuredTraining from '@/assets/images/photos/featured-training.webp'
import companyTraining from '@/assets/images/photos/company-training.webp'
import testimonial from '@/assets/images/placeholders/testimonial.svg'
import events from '@/assets/images/events/event-01.webp'
import partner1 from '@/assets/images/placeholders/partners/partner-1.svg'
import partner2 from '@/assets/images/placeholders/partners/partner-2.svg'
import partner3 from '@/assets/images/placeholders/partners/partner-3.svg'
import partner4 from '@/assets/images/placeholders/partners/partner-4.svg'
import partner5 from '@/assets/images/placeholders/partners/partner-5.svg'
import partner6 from '@/assets/images/placeholders/partners/partner-6.svg'
import clientSonatrach from '@/assets/images/clients/sonatrach.svg'
import clientAirAlgerie from '@/assets/images/clients/air-algerie.svg'
import clientDjezzy from '@/assets/images/clients/djezzy.svg'
import clientLafarge from '@/assets/images/clients/lafarge.svg'
import clientSofitel from '@/assets/images/clients/sofitel.svg'
import clientHyatt from '@/assets/images/clients/hyatt.svg'
import clientAlgerieTelecom from '@/assets/images/clients/algerie-telecom.svg'
import clientDanone from '@/assets/images/clients/danone.png'
import clientNatixis from '@/assets/images/clients/natixis.svg'
import clientBel from '@/assets/images/clients/bel.svg'
import clientCevital from '@/assets/images/clients/cevital.svg'
import clientMobilis from '@/assets/images/clients/mobilis.svg'
import clientInstitutPasteurAlgerie from '@/assets/images/clients/institut-pasteur-algerie.png'
import clientYassir from '@/assets/images/clients/yassir.png'

/**
 * Centralized image registry (redesign spec §15B, branding-refinement §12).
 *
 * The 8 training/workshop-themed keys are real photography from
 * `src/assets/images/photos/`, all sourced from Unsplash's free tier
 * (commercial use permitted, no attribution required under the Unsplash
 * License). See `docs/DESIGN_SYSTEM.md` → "Imagery" for the full source
 * list (photo ID + photographer, per key) and licensing note. `events` is
 * likewise a real photo, from `src/assets/images/events/`. `testimonial`
 * remains the one locally generated decorative abstract texture — it was
 * never meant to be literal photography.
 *
 * Trainer portraits (`trainer1`–`trainer10`, `src/assets/images/trainers/`)
 * were removed at the client's explicit request: ISTAM does not publicly
 * expose individual trainer identities, profiles, photos or biographies.
 * See `docs/ROADMAP.md`.
 *
 * Swapping in client photography later means only:
 *   1. Drop the licensed file(s) into src/assets/images/photos/ (or
 *      src/assets/images/events/ for event photos).
 *   2. Point the relevant MEDIA entry (or entries) at the new import.
 *
 * No component, DTO, mapper, or entity changes required — every consumer
 * only ever sees a plain `image: string` URL (see Training/Event entities).
 *
 * `client*` keys (ISTAM Full Catalogue pass) are real official logos for
 * real ISTAM clients named in the official institutional presentation —
 * downloaded from Wikimedia Commons (freely-licensed trademark/logo files),
 * not generated or invented. Source files, for traceability:
 * Sonatrach.svg, Air_Algérie_logo.svg, Djezzy_Logo_2015.svg,
 * Lafarge_(Unternehmen)_logo.svg, Sofitel.svg, Hyatt_Logo.svg,
 * Algerie_Telecom.svg, Danone_Logo.png, Natixis.svg, BEL_Logo_neu.svg,
 * Cevital_logo_2016.svg, ATM_Mobilis.svg,
 * Logo-Institut-Pasteur-Algerie-1024x638.png, Logo_Yassir_2023.png — all
 * from commons.wikimedia.org. Client names the presentation lists but for
 * which no rights-appropriate logo file could be confidently sourced are
 * shown as a plain text wordmark instead (`PartnerCard`'s `logoUrl`-absent
 * branch) rather than paired with an unrelated placeholder mark.
 */
export const MEDIA = {
  heroTraining,
  leadership,
  management,
  digitalTransformation,
  communication,
  strategy,
  featuredTraining,
  companyTraining,
  testimonial,
  events,
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  clientSonatrach,
  clientAirAlgerie,
  clientDjezzy,
  clientLafarge,
  clientSofitel,
  clientHyatt,
  clientAlgerieTelecom,
  clientDanone,
  clientNatixis,
  clientBel,
  clientCevital,
  clientMobilis,
  clientInstitutPasteurAlgerie,
  clientYassir,
} as const

export type MediaKey = keyof typeof MEDIA
