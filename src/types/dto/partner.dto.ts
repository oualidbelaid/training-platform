/**
 * Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md.
 * `logo_url` is optional: for real ISTAM clients where no rights-appropriate
 * logo image file could be sourced, the UI renders a plain text wordmark
 * tile instead — never a generic mark that could be mistaken for the
 * client's real logo. See docs/ROADMAP.md's "ISTAM Full Catalogue" entry.
 */
export interface PartnerDTO {
  id: string
  name: string
  logo_url?: string
  description_fr: string
  description_en: string
  description_ar: string
}
