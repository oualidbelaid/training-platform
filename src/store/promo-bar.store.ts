import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Whether the site-wide `AnnouncementBar` has been dismissed — a separate
 * store from `ui.store.ts` (documented as mobile-menu state only) since
 * this is a genuinely different, persisted concern: `persist` writes this
 * one boolean to `localStorage` so a dismissal survives reloads and
 * navigation, without changing how the existing mobile-menu slice behaves.
 */
interface PromoBarState {
  isDismissed: boolean
  dismiss: () => void
}

export const usePromoBarStore = create<PromoBarState>()(
  persist(
    (set) => ({
      isDismissed: false,
      dismiss: () => set({ isDismissed: true }),
    }),
    { name: 'istam-promo-bar-dismissed' },
  ),
)
