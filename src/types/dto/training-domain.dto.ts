/** Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md. */
export interface TrainingDomainCourseDTO {
  name_fr: string
  name_en: string
  name_ar: string
}

/**
 * A named skill domain under one of the 4 real ISTAM pillars (Category),
 * e.g. "Finance & Trésorerie" under "Business & Functional Excellence" —
 * distinct from `TrainingDTO`: a domain only ever carries a name and a
 * flat list of real course *titles* from the official ISTAM catalogue,
 * never the rich fields (objectives/program/prerequisites/sessions) a real
 * bookable `Training` needs — see docs/ROADMAP.md's "ISTAM Full Catalogue"
 * entry for why the two are deliberately kept separate.
 */
export interface TrainingDomainDTO {
  id: string
  slug: string
  category_id: string
  name_fr: string
  name_en: string
  name_ar: string
  courses: TrainingDomainCourseDTO[]
}
