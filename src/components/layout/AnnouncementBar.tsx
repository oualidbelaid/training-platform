import { useTranslation } from 'react-i18next'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { useDirection } from '@/hooks/useDirection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePromoBarStore } from '@/store/promo-bar.store'
import { cn } from '@/lib/cn'

const MESSAGE_CLASSNAME = 'text-caption font-medium tracking-wide text-neutral-0'

/**
 * Site-wide announcement strip, rendered in `MainLayout` above the sticky
 * `Navbar` (spec: "premium announcement bar, not an aggressive advertising
 * banner"). Non-sticky by design — it scrolls away with the page, so it
 * never competes with the Navbar's own `sticky top-0`/z-index behavior.
 *
 * The marquee is the exact same seamless-loop mechanism `TrustLogosSection`
 * already uses (`animate-marquee`/`animate-marquee-reverse`, defined once in
 * `src/styles/globals.css` — no new keyframes): the message track renders
 * twice back-to-back (`aria-hidden` on the second copy), animating
 * `translateX(0) → translateX(-50%)` linearly forever, which loops
 * seamlessly since both copies are identical. Direction mirrors for RTL via
 * `useDirection()`. `prefers-reduced-motion` renders a single static,
 * centered row instead — no duplication, no animation.
 *
 * Dismissal is a separate, `localStorage`-persisted Zustand store
 * (`usePromoBarStore`) rather than the existing `ui.store.ts`, which is
 * documented as mobile-menu state only — see `store/promo-bar.store.ts`.
 */
export function AnnouncementBar() {
  const { t } = useTranslation('common')
  const prefersReducedMotion = useReducedMotion()
  const direction = useDirection()
  const isDismissed = usePromoBarStore((state) => state.isDismissed)
  const dismiss = usePromoBarStore((state) => state.dismiss)
  const messages = t('promoBar.messages', { returnObjects: true }) as unknown as string[]

  if (isDismissed || messages.length === 0) return null

  return (
    <div className="relative flex items-center gap-4 bg-primary-600 py-2 ps-4 pe-2">
      <div className="min-w-0 flex-1 overflow-hidden">
        {prefersReducedMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
            {messages.map((message) => (
              <span key={message} className={MESSAGE_CLASSNAME}>
                {message}
              </span>
            ))}
          </div>
        ) : (
          <div
            className={cn(
              'flex w-max items-center gap-8',
              direction === 'rtl' ? 'animate-marquee-reverse' : 'animate-marquee',
            )}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-8"
                aria-hidden={copy === 1 || undefined}
              >
                {messages.map((message) => (
                  <span key={message} className={MESSAGE_CLASSNAME}>
                    {message}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <IconButton
        aria-label={t('promoBar.dismiss')}
        variant="inverse"
        size="sm"
        onClick={dismiss}
        className="shrink-0"
      >
        <Icon name="xmark" aria-hidden="true" className="text-sm" />
      </IconButton>
    </div>
  )
}
