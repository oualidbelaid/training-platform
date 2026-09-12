import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { seoConfig } from '@/config/seo.config'
import { supportedLanguages } from '@/i18n'
import { mockArticleDTOs } from '@/mocks/data/articles'
import { mockTrainingDTOs } from '@/mocks/data/trainings'

/**
 * Build-time sitemap generator (spec M7 §4). Run via
 * `npm run generate:sitemap`, which bundles this file with `vite build
 * --ssr` before executing it with Node — a plain `tsx`/Node run can't
 * import this file directly, because it (transitively, through the mock
 * data files) imports real `.webp`/`.png` assets via `@/config/media`,
 * which only Vite's own asset pipeline knows how to resolve. Going
 * through a real (SSR) Vite build reuses that exact resolution — and
 * `@/config/env.ts`'s `import.meta.env` reads — instead of re-inventing
 * either with a custom Node loader.
 *
 * Slugs are imported directly from the same mock data every page already
 * reads through its repository (`mocks/data/trainings.ts` /
 * `articles.ts`) — never a hand-maintained, driftable duplicate list.
 */

const STATIC_PATHS = [
  '/',
  '/trainings',
  '/about',
  '/testimonials',
  '/partners',
  '/success-stories',
  '/events',
  '/resources',
  '/faq',
  '/industries',
  '/solutions-for-companies',
  '/request-information',
  '/request-quote',
  '/contact',
  '/register-interest',
  '/consultation',
]

const dynamicPaths = [
  ...mockTrainingDTOs.map((training) => `/trainings/${training.slug}`),
  ...mockArticleDTOs.map((article) => `/resources/${article.slug}`),
]

const allPaths = [...STATIC_PATHS, ...dynamicPaths]

function priorityFor(path: string): string {
  if (path === '/') return '1.0'
  const isDetailPage = path.split('/').length > 2
  return isDetailPage ? '0.6' : '0.8'
}

function buildUrlEntry(path: string): string {
  const loc = `${seoConfig.siteUrl}${path}`
  const alternates = supportedLanguages
    .map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${seoConfig.siteUrl}${path}?lng=${lang}" />`,
    )
    .join('\n')
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />`

  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    alternates,
    xDefault,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priorityFor(path)}</priority>`,
    '  </url>',
  ].join('\n')
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPaths.map(buildUrlEntry).join('\n')}
</urlset>
`

// `process.cwd()`-relative, not `import.meta.url`-relative: the SSR bundle
// this runs from lives in a temp build output directory, not `scripts/`.
const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml')
writeFileSync(sitemapPath, xml, 'utf-8')

/**
 * `robots.txt`'s `Sitemap:` line needs the same `seoConfig.siteUrl` the
 * sitemap itself uses — generating both from the same script is what
 * keeps them from silently drifting apart if `VITE_SITE_URL` changes for
 * a real deployment (a hand-authored static `robots.txt` wouldn't notice).
 */
const robotsTxt = `User-agent: *
Allow: /
Disallow: /_design-system

Sitemap: ${seoConfig.siteUrl}/sitemap.xml
`
const robotsPath = resolve(process.cwd(), 'public/robots.txt')
writeFileSync(robotsPath, robotsTxt, 'utf-8')

// eslint-disable-next-line no-console
console.log(`Generated ${sitemapPath} (${allPaths.length} URLs) and ${robotsPath}.`)
