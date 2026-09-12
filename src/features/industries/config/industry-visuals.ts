import type { IconName } from '@/components/ui/Icon'

interface IndustryVisual {
  icon: IconName
  badgeClassName: string
}

/**
 * Icon/color presentation per industry, keyed by slug — same reasoning as
 * `category-visuals.ts`: presentation-only, so it stays out of the
 * Industry entity/DTO.
 */
export const INDUSTRY_VISUALS: Record<string, IndustryVisual> = {
  'banking-finance': { icon: 'wallet', badgeClassName: 'bg-accent-400/20 text-accent-600' },
  technology: { icon: 'microchip', badgeClassName: 'bg-success-50 text-success-700' },
  manufacturing: { icon: 'industry', badgeClassName: 'bg-neutral-100 text-neutral-600' },
  healthcare: { icon: 'heart-pulse', badgeClassName: 'bg-error-50 text-error-700' },
  'public-sector': { icon: 'building', badgeClassName: 'bg-primary-100 text-primary-600' },
  retail: { icon: 'store', badgeClassName: 'bg-warning-50 text-warning-700' },
  'professional-services': { icon: 'briefcase', badgeClassName: 'bg-primary-100 text-primary-600' },
}

export const DEFAULT_INDUSTRY_VISUAL: IndustryVisual = {
  icon: 'industry',
  badgeClassName: 'bg-neutral-100 text-neutral-600',
}
