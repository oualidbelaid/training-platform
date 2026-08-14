import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { seoConfig } from '@/config/seo.config'
import type { SupportedLanguage } from '@/i18n'
import { buildHreflangLinks } from '@/lib/seo/hreflang'

interface SeoProps {
  title: string
  description: string
  canonicalPath?: string
  noIndex?: boolean
  /** Page-specific social image (falls back to `seoConfig.defaultOgImage`) — an app-relative asset path, e.g. `training.image`. */
  image?: string
  /** `article` for content pages with a publish date/author (blog articles); every other page is `website`. */
  type?: 'website' | 'article'
}

/**
 * Per-page SEO foundation (spec M7). Every route-level page renders one of
 * these with its own title/description — this is the single place
 * title/canonical/hreflang/Open Graph/Twitter metadata is assembled, so
 * nothing is duplicated per page (spec M7 §13/§14).
 *
 * hreflang links are only emitted when `canonicalPath` is given (skipped
 * for pages like the 404 that don't have one) — see `lib/seo/hreflang.ts`
 * for why the `?lng=` variants are real, crawlable content rather than a
 * symbolic self-reference.
 */
export function Seo({ title, description, canonicalPath, noIndex = false, image, type = 'website' }: SeoProps) {
  const { i18n } = useTranslation()
  const language = i18n.language as SupportedLanguage
  const fullTitle = `${title} | ${seoConfig.siteName}`
  const canonicalUrl = canonicalPath ? `${seoConfig.siteUrl}${canonicalPath}` : undefined
  const hreflangLinks = canonicalPath ? buildHreflangLinks(canonicalPath) : []
  const resolvedImage = image ?? seoConfig.defaultOgImage
  const absoluteImage = resolvedImage.startsWith('http') ? resolvedImage : `${seoConfig.siteUrl}${resolvedImage}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {hreflangLinks.map((link) => (
        <link key={link.hreflang} rel="alternate" hrefLang={link.hreflang} href={link.href} />
      ))}
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={seoConfig.ogLocale[language] ?? seoConfig.ogLocale[seoConfig.defaultLocale]} />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      <meta property="og:image" content={absoluteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  )
}
