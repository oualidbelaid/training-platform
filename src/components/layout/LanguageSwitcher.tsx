import { AnimatePresence, motion } from 'framer-motion'
import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { supportedLanguages, type SupportedLanguage } from '@/i18n'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

/** Rough panel height (3 items × ~36px + padding) used to decide whether it fits below the trigger. */
const ESTIMATED_PANEL_HEIGHT = 190
const VIEWPORT_MARGIN = 12

/**
 * Compact language switcher (branding refinement §8) — replaces the
 * always-visible 3-button toggle with a single globe-icon trigger that
 * opens a small accessible listbox popover. Standard WAI-ARIA
 * listbox-in-a-popup pattern:
 *   - `aria-haspopup="listbox"` / `aria-expanded` on the trigger.
 *   - `role="listbox"` panel, `role="option"` / `aria-selected` items.
 *   - Arrow Up/Down roves focus between options, Home/End jump to the
 *     first/last, Escape and outside-click close and return focus to the
 *     trigger — the panel never traps focus outside itself since it isn't
 *     modal content.
 *
 * **Mobile fix**: on mobile this renders inside the Navbar's `Drawer`,
 * where the trigger often sits near the bottom of the viewport (the
 * Drawer's bottom section). The panel used to always open downward
 * (`top-full`), which pushed it below the visible viewport there — and
 * since `Drawer` locks body scroll while open, there was no way to scroll
 * down to reach it. It now measures the space below the trigger when it
 * opens and flips to open upward (`bottom-full`) when there isn't enough
 * room, exactly like a standard popover/select would. Width is
 * `w-max` capped at `calc(100vw - 24px)` so it can never cause horizontal
 * viewport overflow either, regardless of how close to an edge the
 * trigger sits.
 */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const activeLanguage = i18n.language as SupportedLanguage
  const prefersReducedMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<'below' | 'above'>('below')
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const listboxId = useId()

  useEffect(() => {
    if (!open || !triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    setPlacement(spaceBelow < ESTIMATED_PANEL_HEIGHT + VIEWPORT_MARGIN ? 'above' : 'below')
  }, [open])

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const activeIndex = supportedLanguages.indexOf(activeLanguage)
      optionRefs.current[activeIndex >= 0 ? activeIndex : 0]?.focus()
    }
    // Only re-run when the popover opens — refocusing on every language change would steal focus after selection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function selectLanguage(language: SupportedLanguage) {
    void i18n.changeLanguage(language)
    setOpen(false)
    triggerRef.current?.focus()
  }

  function handleOptionKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      optionRefs.current[(index + 1) % supportedLanguages.length]?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      optionRefs.current[
        (index - 1 + supportedLanguages.length) % supportedLanguages.length
      ]?.focus()
    } else if (event.key === 'Home') {
      event.preventDefault()
      optionRefs.current[0]?.focus()
    } else if (event.key === 'End') {
      event.preventDefault()
      optionRefs.current[supportedLanguages.length - 1]?.focus()
    }
  }

  const panel = (
    <div
      id={listboxId}
      role="listbox"
      aria-label={t('language.switchTo')}
      className={cn(
        'absolute start-0 z-(--z-index-dropdown) w-max max-w-[calc(100vw-1.5rem)] rounded-lg border border-border bg-surface p-1 shadow-lg',
        placement === 'above' ? 'bottom-full mb-2' : 'top-full mt-2',
      )}
    >
      {supportedLanguages.map((language, index) => {
        const isActive = language === activeLanguage
        return (
          <button
            key={language}
            ref={(node) => {
              optionRefs.current[index] = node
            }}
            type="button"
            role="option"
            aria-selected={isActive}
            tabIndex={-1}
            onClick={() => selectLanguage(language)}
            onKeyDown={(event) => handleOptionKeyDown(event, index)}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-small transition-colors duration-(--duration-fast)',
              isActive ? 'text-brand' : 'text-foreground hover:bg-surface-subtle',
            )}
          >
            <Icon name="globe" aria-hidden="true" className="text-sm text-foreground-faint" />
            <span className="flex-1 text-start">{t(`language.${language}`)}</span>
            {isActive ? <Icon name="check" aria-hidden="true" className="text-sm" /> : null}
          </button>
        )
      })}
    </div>
  )

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-small font-medium text-neutral-700 transition-colors duration-(--duration-fast) hover:bg-neutral-100"
      >
        <Icon name="globe" aria-hidden="true" className="text-base" />
        <span>{t(`language.${activeLanguage}`)}</span>
        <Icon
          name="chevron-down"
          aria-hidden="true"
          className={cn(
            'text-xs transition-transform duration-(--duration-fast)',
            open && 'rotate-180',
          )}
        />
      </button>

      {prefersReducedMotion ? (
        open ? (
          panel
        ) : null
      ) : (
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: placement === 'above' ? 4 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: placement === 'above' ? 4 : -4 }}
              transition={{ duration: 0.15 }}
            >
              {panel}
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </div>
  )
}
