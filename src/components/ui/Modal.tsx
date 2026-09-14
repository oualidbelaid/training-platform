import { AnimatePresence, motion } from 'framer-motion'
import { type ReactNode, useEffect, useRef } from 'react'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { motionDurations, scaleIn } from '@/lib/motion'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

interface ModalProps {
  open: boolean
  onClose: () => void
  titleId: string
  title: ReactNode
  descriptionId?: string
  description?: ReactNode
  closeLabel: string
  children: ReactNode
}

/**
 * Centered, accessible dialog primitive — genuinely new (see
 * `docs/COMPONENT_GUIDE.md`, "Not built yet" previously listed `Modal`).
 * Deliberately not built by extracting `Drawer.tsx`'s logic into a shared
 * hook: that would mean refactoring an existing, shipped component for a
 * DRY gain nobody asked for, so the focus-trap/Escape/scroll-lock/
 * return-focus mechanics are duplicated here on purpose, adapted to a
 * centered scale/fade entrance (`scaleIn`, `lib/motion.ts`) instead of
 * Drawer's edge slide-in. Same WAI-ARIA "Dialog (Modal)" pattern
 * (`role="dialog"`, `aria-modal`, `aria-labelledby`, optional
 * `aria-describedby`) for the same reason documented in `Drawer.tsx`: a
 * native `<dialog>`'s imperative `showModal()`/`close()` doesn't compose
 * with Framer Motion's mount/unmount animation. Suppressed in
 * `.oxlintrc.json` overrides for this file (role on a plain `div`).
 */
export function Modal({
  open,
  onClose,
  titleId,
  title,
  descriptionId,
  description,
  closeLabel,
  children,
}: ModalProps) {
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
            className="fixed inset-0 z-(--z-index-modal) bg-neutral-900/50"
          />
          <div className="fixed inset-0 z-(--z-index-modal) flex items-center justify-center p-4">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              tabIndex={-1}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl outline-none sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id={titleId} className="text-h3 font-semibold text-foreground">
                    {title}
                  </h2>
                  {description ? (
                    <p id={descriptionId} className="mt-1 text-body text-foreground-muted">
                      {description}
                    </p>
                  ) : null}
                </div>
                <IconButton
                  aria-label={closeLabel}
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="shrink-0"
                >
                  <Icon name="xmark" aria-hidden="true" className="text-lg" />
                </IconButton>
              </div>
              <div className="mt-6">{children}</div>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
