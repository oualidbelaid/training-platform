import { act, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import i18n, { defaultLanguage } from '@/i18n'
import { DirectionProvider } from './DirectionProvider'

describe('DirectionProvider', () => {
  afterEach(async () => {
    await act(async () => {
      await i18n.changeLanguage(defaultLanguage)
    })
  })

  it('sets ltr for French and English', async () => {
    render(
      <DirectionProvider>
        <div>content</div>
      </DirectionProvider>,
    )

    await act(async () => {
      await i18n.changeLanguage('en')
    })
    await waitFor(() => expect(document.documentElement.dir).toBe('ltr'))
    expect(document.documentElement.lang).toBe('en')
  })

  it('switches to rtl when the language changes to Arabic', async () => {
    render(
      <DirectionProvider>
        <div>content</div>
      </DirectionProvider>,
    )

    await act(async () => {
      await i18n.changeLanguage('ar')
    })

    await waitFor(() => expect(document.documentElement.dir).toBe('rtl'))
    expect(document.documentElement.lang).toBe('ar')
  })
})
