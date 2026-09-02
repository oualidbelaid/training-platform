import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

interface RatingProps {
  value: number
  max?: number
  className?: string
}

/**
 * Star rating display. Supports fractional values via a clipped overlay
 * (two layered star rows) rather than rounding to the nearest whole star —
 * a composite visual a single <img> can't represent, so the container
 * takes role="img" (suppressed in .oxlintrc.json overrides), same pattern
 * as Avatar's image-with-fallback.
 */
export function Rating({ value, max = 5, className }: RatingProps) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <span
      role="img"
      aria-label={`${value} / ${max}`}
      className={cn('relative inline-flex', className)}
    >
      <span className="flex gap-0.5 text-neutral-200" aria-hidden="true">
        {Array.from({ length: max }).map((_, index) => (
          <Icon key={index} name="star" className="text-base" />
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 start-0 flex gap-0.5 overflow-hidden text-accent-500"
        style={{ width: `${percent}%` }}
      >
        {Array.from({ length: max }).map((_, index) => (
          <Icon key={index} name="star" className="text-base shrink-0" />
        ))}
      </span>
    </span>
  )
}
