/** Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md. */
export interface ArticleDTO {
  id: string
  slug: string
  title_fr: string
  title_en: string
  title_ar: string
  excerpt_fr: string
  excerpt_en: string
  excerpt_ar: string
  content_fr: string
  content_en: string
  content_ar: string
  category_fr: string
  category_en: string
  category_ar: string
  author_name: string
  published_date: string
  reading_time_minutes: number
  image_url: string
  is_featured: boolean
}
