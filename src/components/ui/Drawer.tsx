import { AnimatePresence, motion } from 'framer-motion'
import { type ReactNode, useEffect, useRef } from 'react'
import { useDirection } from '@/hooks/useDirection'
import { motionDurations, motionEasing } from '@/lib/motion'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

interface DrawerProps {
  open: boolean
  onClose: () => void
  titleId: string
  title: ReactNode
  children: ReactNode
}

/**
 * Slide-in panel used by the mobile navigation (spec M2 §3 — "smooth
 * opening/closing, proper focus management, RTL support"). Slides from the
 * logical inline-end edge (`end-0`), which is the right in LTR and the
 * left in RTL automatically via CSS logical properties — only the
 * off-screen transform origin needs to know direction explicitly.
 *
 * Focus management: focuses the panel on open, traps Tab/Shift+Tab inside
 * it, closes on Escape or backdrop click, and returns focus to whatever
 * triggered it on close.
 */
export function Drawer({ open, onClose, titleId, title, children }: DrawerProps) {
  const direction = useDirection()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)

  useEffect(() => {
    if (!open) return

    triggerRef.current = document.activeElement
    panelRef.current?.focus()
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }
  }, [open, onClose])

  const offscreenX = direction === 'rtl' ? '-100%' : '100%'

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionDurations.fast }}
            className="fixed inset-0 z-(--z-index-drawer) bg-neutral-900/50"
          />
          {/* Native <dialog> requires imperative showModal()/close() calls
              that don't compose cleanly with AnimatePresence's mount/unmount
              animation, so this follows the WAI-ARIA "Dialog (Modal)"
              pattern instead — role="dialog" on a plain container is the
              standard implementation used by Radix/Headless UI too.
              Suppressed in .oxlintrc.json overrides for this file. */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ x: offscreenX }}
            animate={{ x: 0 }}
            exit={{ x: offscreenX }}
            transition={{ duration: motionDurations.base, ease: motionEasing.premium }}
            className="fixed inset-y-0 end-0 z-(--z-index-drawer) flex w-full max-w-sm flex-col bg-surface shadow-xl outline-none"
          >
            <h2 id={titleId} className="sr-only">
              {title}
            </h2>
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
