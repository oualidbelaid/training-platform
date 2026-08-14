/** Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md. */
export interface EventDTO {
  id: string
  slug: string
  title_fr: string
  title_en: string
  title_ar: string
  description_fr: string
  description_en: string
  description_ar: string
  start_date: string
  format: 'in-person' | 'online' | 'hybrid'
  location_fr?: string
  location_en?: string
  location_ar?: string
  image_url?: string
}
