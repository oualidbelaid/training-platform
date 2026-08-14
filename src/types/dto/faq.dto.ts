/** Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md. */
export interface FaqDTO {
  id: string
  /** Machine-stable grouping key (language-agnostic) — see `category_fr/en/ar` for the display label. */
  category_key: string
  category_fr: string
  category_en: string
  category_ar: string
  question_fr: string
  question_en: string
  question_ar: string
  answer_fr: string
  answer_en: string
  answer_ar: string
}
