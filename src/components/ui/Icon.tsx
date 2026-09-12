import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/**
 * Every icon name actually used across the site (redesign §9/§10). Keeping
 * this a closed union — rather than `string` — means a typo is a build
 * error, not a silently-missing glyph.
 */
export type IconName =
  | 'arrow-right'
  | 'arrow-trend-up'
  | 'award'
  | 'bars'
  | 'briefcase'
  | 'building'
  | 'bullhorn'
  | 'bullseye'
  | 'calendar-days'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'circle-question'
  | 'clock'
  | 'chart-column'
  | 'compass'
  | 'diagram-project'
  | 'envelope'
  | 'globe'
  | 'graduation-cap'
  | 'handshake'
  | 'heart-pulse'
  | 'industry'
  | 'location-dot'
  | 'magnifying-glass'
  | 'microchip'
  | 'network-wired'
  | 'newspaper'
  | 'phone'
  | 'quote-left'
  | 'rocket'
  | 'shield'
  | 'sliders'
  | 'star'
  | 'store'
  | 'user-group'
  | 'users'
  | 'wallet'
  | 'xmark'

export type IconBrandName = 'linkedin' | 'facebook' | 'instagram' | 'youtube'

export interface IconProps extends HTMLAttributes<HTMLElement> {
  name: IconName | IconBrandName
  /** `solid` (default) / `regular` (outline weight) — `brands` is inferred automatically for brand names. */
  variant?: 'solid' | 'regular'
}

const BRAND_NAMES = new Set<string>(['linkedin', 'facebook', 'instagram', 'youtube'])

/**
 * Single abstraction over the self-hosted FontAwesome font (redesign §9/§10
 * — "do not hardcode long FontAwesome HTML strings everywhere"). Renders a
 * semantic `name`, not a raw `fa-solid fa-arrow-right` class string, so a
 * future icon-set change touches this one file, not every call site.
 *
 * Sizing: FontAwesome icons are font glyphs, sized via `font-size`
 * (`text-*` utilities), not `h-*`/`w-*` like the SVG icon set they replace
 * — pass e.g. `className="text-xl"` for a 20px glyph. Color follows the
 * inherited text color exactly like the old SVG icons did, so existing
 * `text-*` color utilities on a parent/className keep working unchanged.
 *
 * Accessibility: decorative by default (`aria-hidden`) unless an
 * `aria-label` is supplied, in which case it takes `role="img"` — the same
 * pattern used throughout the design system for non-text visual content.
 */
export function Icon({
  name,
  variant = 'solid',
  className,
  'aria-label': ariaLabel,
  ...props
}: IconProps) {
  const style = BRAND_NAMES.has(name) ? 'fa-brands' : `fa-${variant}`

  return (
    <i
      className={cn(style, `fa-${name}`, className)}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      {...props}
    />
  )
}
