import { SchemaScript } from '@/components/seo/SchemaScript'
import { seoConfig } from '@/config/seo.config'
import { supportedLanguages } from '@/i18n'

/** `WebSite` structured data — homepage only, alongside `OrganizationSchema`. No `SearchAction`: the site has no search feature to describe. */
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    inLanguage: [...supportedLanguages],
  }

  return <SchemaScript schema={schema} />
}
