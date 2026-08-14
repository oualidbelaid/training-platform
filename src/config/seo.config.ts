import { env } from '@/config/env'
import type { SupportedLanguage } from '@/i18n'
// A direct, single-asset import — not `MEDIA.heroTraining` from
// `@/config/media` — deliberately: `MEDIA` is one barrel object built from
// ~26 image imports, and `Seo.tsx` (which reads `defaultOgImage`) is
// rendered by every single page. Importing through the barrel would pull
// all 26 into every page's dependency graph merely for this one fallback;
// importing the one file directly doesn't.
import defaultOgImageAsset from '@/assets/images/photos/hero-training.webp'

/**
 * `siteUrl` is env-driven (`VITE_SITE_URL`) so a real production deployment
 * needs zero code changes — the placeholder below is only the fallback
 * until a real domain is assigned (see docs/SEO_GUIDE.md).
 */
export const seoConfig = {
  siteName: 'ISTAM',
  siteUrl: env.VITE_SITE_URL || 'https://www.example-training.com',
  defaultLocale: 'fr' satisfies SupportedLanguage,
  /** BCP47-ish Open Graph locale per supported language (`og:locale`). */
  ogLocale: {
    fr: 'fr_FR',
    en: 'en_US',
    ar: 'ar_AR',
  } satisfies Record<SupportedLanguage, string>,
  /** Fallback `og:image`/`twitter:image` when a page has no image of its own — reuses existing photography, no new asset. */
  defaultOgImage: defaultOgImageAsset,
} as const
