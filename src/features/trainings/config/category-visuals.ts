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
  'business-functional-excellence': { icon: 'briefcase', badgeClassName: 'bg-primary-100 text-primary-600' },
  'sales-customer-growth': { icon: 'arrow-trend-up', badgeClassName: 'bg-warning-50 text-warning-700' },
  'leadership-people-development': { icon: 'user-group', badgeClassName: 'bg-success-50 text-success-700' },
  'culture-compliance-sustainability': { icon: 'shield', badgeClassName: 'bg-accent-400/20 text-accent-600' },
}

export const DEFAULT_CATEGORY_VISUAL: CategoryVisual = {
  icon: 'chart-column',
  badgeClassName: 'bg-neutral-100 text-neutral-600',
}
