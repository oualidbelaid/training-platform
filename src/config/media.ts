import heroTraining from '@/assets/images/photos/hero-training.webp'
import leadership from '@/assets/images/photos/leadership.webp'
import management from '@/assets/images/photos/management.webp'
import digitalTransformation from '@/assets/images/photos/digital-transformation.webp'
import communication from '@/assets/images/photos/communication.webp'
import strategy from '@/assets/images/photos/strategy.webp'
import featuredTraining from '@/assets/images/photos/featured-training.webp'
import companyTraining from '@/assets/images/photos/company-training.webp'
import trainer1 from '@/assets/images/trainers/trainer-01.webp'
import trainer2 from '@/assets/images/trainers/trainer-02.webp'
import trainer3 from '@/assets/images/trainers/trainer-03.webp'
import trainer4 from '@/assets/images/trainers/trainer-04.webp'
import trainer5 from '@/assets/images/trainers/trainer-05.webp'
import trainer6 from '@/assets/images/trainers/trainer-06.webp'
import trainer7 from '@/assets/images/trainers/trainer-07.webp'
import trainer8 from '@/assets/images/trainers/trainer-08.webp'
import trainer9 from '@/assets/images/trainers/trainer-09.webp'
import trainer10 from '@/assets/images/trainers/trainer-10.webp'
import testimonial from '@/assets/images/placeholders/testimonial.svg'
import events from '@/assets/images/events/event-01.webp'
import partner1 from '@/assets/images/placeholders/partners/partner-1.svg'
import partner2 from '@/assets/images/placeholders/partners/partner-2.svg'
import partner3 from '@/assets/images/placeholders/partners/partner-3.svg'
import partner4 from '@/assets/images/placeholders/partners/partner-4.svg'
import partner5 from '@/assets/images/placeholders/partners/partner-5.svg'
import partner6 from '@/assets/images/placeholders/partners/partner-6.svg'

/**
 * Centralized image registry (redesign spec §15B, branding-refinement §12,
 * trainer-photography update §2/§3).
 *
 * The 8 training/workshop-themed keys are real photography from
 * `src/assets/images/photos/`, and `trainer1`–`trainer10` are real
 * individual portraits from `src/assets/images/trainers/` (10 distinct
 * people — expanded from 3 in the trainer-roster update) — all sourced from
 * Unsplash's free tier (commercial use permitted, no attribution required
 * under the Unsplash License). See `docs/DESIGN_SYSTEM.md` → "Imagery" for
 * the full source list (photo ID + photographer, per key) and licensing
 * note. `events` is likewise now a real photo, from
 * `src/assets/images/events/`. `testimonial` remains the one locally
 * generated decorative abstract texture — it was never meant to be literal
 * photography.
 *
 * Swapping in client photography later means only:
 *   1. Drop the licensed file(s) into src/assets/images/photos/ (or
 *      src/assets/images/trainers/ / src/assets/images/events/ for
 *      trainer portraits / event photos).
 *   2. Point the relevant MEDIA entry (or entries) at the new import.
 *
 * No component, DTO, mapper, or entity changes required — every consumer
 * only ever sees a plain `image: string` URL (see Training/Event entities,
 * Trainer.photoUrl).
 */
export const MEDIA = {
  heroTraining,
  leadership,
  management,
  digitalTransformation,
  communication,
  strategy,
  featuredTraining,
  trainer1,
  trainer2,
  trainer3,
  trainer4,
  trainer5,
  trainer6,
  trainer7,
  trainer8,
  trainer9,
  trainer10,
  companyTraining,
  testimonial,
  events,
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
} as const

export type MediaKey = keyof typeof MEDIA
