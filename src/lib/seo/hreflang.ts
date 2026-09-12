import { seoConfig } from '@/config/seo.config'
import { supportedLanguages, type SupportedLanguage } from '@/i18n'

export interface HreflangLink {
  hreflang: SupportedLanguage | 'x-default'
  href: string
}

/**
 * One `?lng=<lang>` variant per supported language + `x-default` pointing
 * at the bare canonical URL. The `?lng=` query param is read by the
 * `querystring` language detector added in `i18n/index.ts` specifically so
 * these URLs render real, language-differentiated content — not a
 * self-referencing hreflang set with nothing behind it. No in-app link
 * ever includes `?lng=`; these hrefs only ever appear in `<head>` alternate
 * tags and the sitemap (`scripts/generate-sitemap.ts`, which mirrors this
 * exact logic for its `xhtml:link` entries).
 */
export function buildHreflangLinks(canonicalPath: string): HreflangLink[] {
  const languageLinks = supportedLanguages.map((lang) => ({
    hreflang: lang,
    href: `${seoConfig.siteUrl}${canonicalPath}?lng=${lang}`,
  }))

  return [...languageLinks, { hreflang: 'x-default', href: `${seoConfig.siteUrl}${canonicalPath}` }]
}
