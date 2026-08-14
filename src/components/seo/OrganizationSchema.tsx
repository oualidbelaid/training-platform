import { BRAND } from '@/config/brand'
import { seoConfig } from '@/config/seo.config'
import { SchemaScript } from '@/components/seo/SchemaScript'

/**
 * Organization structured data (spec M2 §20 — "appropriate structured
 * data if justified, don't overdo it"). One schema, on the homepage only,
 * describing the company itself — Course/Article/Event/FAQPage/Breadcrumb
 * schemas were added for their respective pages in M7.
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: BRAND.logo.startsWith('http') ? BRAND.logo : `${seoConfig.siteUrl}${BRAND.logo}`,
  }

  return <SchemaScript schema={schema} />
}
