import { describe, expect, it } from 'vitest'
import { seoConfig } from '@/config/seo.config'
import { supportedLanguages } from '@/i18n'
import { buildHreflangLinks } from './hreflang'

describe('buildHreflangLinks', () => {
  it('returns one ?lng= link per supported language plus x-default', () => {
    const links = buildHreflangLinks('/trainings')

    expect(links).toHaveLength(supportedLanguages.length + 1)

    for (const lang of supportedLanguages) {
      expect(links).toContainEqual({
        hreflang: lang,
        href: `${seoConfig.siteUrl}/trainings?lng=${lang}`,
      })
    }

    expect(links).toContainEqual({
      hreflang: 'x-default',
      href: `${seoConfig.siteUrl}/trainings`,
    })
  })

  it('does not append a query string to the x-default entry', () => {
    const links = buildHreflangLinks('/about')
    const xDefault = links.find((link) => link.hreflang === 'x-default')

    expect(xDefault?.href).toBe(`${seoConfig.siteUrl}/about`)
    expect(xDefault?.href).not.toContain('?')
  })

  it('preserves the given canonical path exactly, including nested segments', () => {
    const links = buildHreflangLinks('/trainings/leadership-101')

    expect(links.every((link) => link.href.includes('/trainings/leadership-101'))).toBe(true)
  })
})
