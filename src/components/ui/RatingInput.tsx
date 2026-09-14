import { useId } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

interface RatingInputProps {
  value: number
  onChange: (value: number) => void
  max?: number
  label: string
  starLabel: (value: number, max: number) => string
  error?: string
}

/**
 * Interactive star-rating field — `Rating.tsx` is display-only (no
 * selectable variant), so this is a new, separate primitive, reusing the
 * same `Icon name="star"` glyph. Standard accessible star-rating split:
 * `aria-checked` is `true` only on the exact selected star (correct
 * `radiogroup`/`radio` semantics — exactly one radio is checked), while the
 * *visual* fill highlights every star up to and including it (the familiar
 * star-rating look). Each star is individually focusable — a full
 * roving-tabindex/arrow-key radiogroup was judged unnecessary complexity
 * for a 5-item widget; every star already has its own accessible label and
 * is operable with Tab + Enter/Space via a native `<button>`.
 */
export function RatingInput({
  value,
  onChange,
  max = 5,
  label,
  starLabel,
  error,
}: RatingInputProps) {
  const labelId = useId()
  const errorId = useId()

  return (
    <div className="flex flex-col gap-1.5">
      <span id={labelId} className="text-small font-medium text-foreground-muted">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={error ? errorId : undefined}
        className="flex gap-1"
      >
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1
          const filled = starValue <= value

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={value === starValue}
              aria-label={starLabel(starValue, max)}
              onClick={() => onChange(starValue)}
              className={cn(
                'rounded-md p-1 transition-colors duration-(--duration-fast)',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                filled ? 'text-accent-500' : 'text-neutral-300 hover:text-accent-400',
              )}
            >
              <Icon name="star" aria-hidden="true" className="text-2xl" />
            </button>
          )
        })}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-caption text-error-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
