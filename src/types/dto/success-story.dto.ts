export interface SuccessStoryResultDTO {
  value: string
  label_fr: string
  label_en: string
  label_ar: string
}

/** Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md. */
export interface SuccessStoryDTO {
  id: string
  client_name: string
  industry_fr: string
  industry_en: string
  industry_ar: string
  challenge_fr: string
  challenge_en: string
  challenge_ar: string
  approach_fr: string
  approach_en: string
  approach_ar: string
  results: SuccessStoryResultDTO[]
  category_id?: string
}
