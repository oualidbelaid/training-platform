import { describe, expect, it } from 'vitest'
import { getLocalizedText, zipLocalizedText } from './localized-text'

describe('getLocalizedText', () => {
  it('returns the value for the requested language', () => {
    const text = { fr: 'Bonjour', en: 'Hello', ar: 'مرحبا' }
    expect(getLocalizedText(text, 'en')).toBe('Hello')
    expect(getLocalizedText(text, 'ar')).toBe('مرحبا')
  })
})

describe('zipLocalizedText', () => {
  it('zips index-matched string arrays into LocalizedText objects', () => {
    const result = zipLocalizedText(['Un', 'Deux'], ['One', 'Two'], ['واحد', 'اثنان'])

    expect(result).toEqual([
      { fr: 'Un', en: 'One', ar: 'واحد' },
      { fr: 'Deux', en: 'Two', ar: 'اثنان' },
    ])
  })

  it('returns an empty array when given empty inputs', () => {
    expect(zipLocalizedText([], [], [])).toEqual([])
  })
})
