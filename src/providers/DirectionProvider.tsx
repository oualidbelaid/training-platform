import { type ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDirection } from '@/hooks/useDirection'

interface DirectionProviderProps {
  children: ReactNode
}

/**
 * Keeps <html dir> and <html lang> in sync with the active i18next
 * language (spec §14). This is the single place direction is derived and
 * applied — components read direction via useDirection(), never by
 * inspecting the DOM themselves.
 */
export function DirectionProvider({ children }: DirectionProviderProps) {
  const { i18n } = useTranslation()
  const direction = useDirection()

  useEffect(() => {
    document.documentElement.dir = direction
    document.documentElement.lang = i18n.language
  }, [direction, i18n.language])

  return children
}
