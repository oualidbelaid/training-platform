/** Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md. */
export interface TrainerDTO {
  id: string
  slug: string
  name: string
  job_title_fr: string
  job_title_en: string
  job_title_ar: string
  bio_fr: string
  bio_en: string
  bio_ar: string
  photo_url?: string
  is_featured: boolean
}
