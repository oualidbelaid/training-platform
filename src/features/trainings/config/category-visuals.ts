import type { IconName } from '@/components/ui/Icon'

interface CategoryVisual {
  icon: IconName
  badgeClassName: string
}

/**
 * Icon/color presentation per category, keyed by slug. This is a UI-only
 * mapping — which icon represents "Finance" is not something Dolibarr will
 * ever supply, so it deliberately lives here rather than on the Category
 * entity/DTO (spec M2 §22/§24: only genuine business data goes through the
 * repository/service/hook pipeline).
 */
export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  'leadership-management': { icon: 'user-group', badgeClassName: 'bg-primary-100 text-primary-600' },
  'project-management': { icon: 'bullseye', badgeClassName: 'bg-warning-50 text-warning-700' },
  'it-digital': { icon: 'microchip', badgeClassName: 'bg-success-50 text-success-700' },
  finance: { icon: 'wallet', badgeClassName: 'bg-accent-400/20 text-accent-600' },
  'human-resources': { icon: 'user-group', badgeClassName: 'bg-error-50 text-error-700' },
  communication: { icon: 'bullhorn', badgeClassName: 'bg-primary-100 text-primary-600' },
}

export const DEFAULT_CATEGORY_VISUAL: CategoryVisual = {
  icon: 'chart-column',
  badgeClassName: 'bg-neutral-100 text-neutral-600',
}
