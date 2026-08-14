import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Accessible name — visually hidden (a placeholder alone is never a sufficient label). */
  label: string
  onClear?: () => void
  /** Accessible name for the clear button, shown once there's a value to clear. */
  clearLabel?: string
}

/**
 * Search input for toolbars (catalog search, future filter bars) — visually
 * distinct from the labeled `Input`/`Select` form primitives (icon-prefixed,
 * pill-ish, no visible label) since it's a filter control, not a form
 * field, but still keyboard/screen-reader accessible via a real
 * (visually-hidden) `<label>`.
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ label, onClear, clearLabel = 'Clear', className, value, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const hasValue = Boolean(value)

    return (
      <div className={cn('relative', className)}>
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <Icon
          name="magnifying-glass"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 start-4 -translate-y-1/2 text-small text-foreground-faint"
        />
        <input
          ref={ref}
          id={inputId}
          type="search"
          value={value}
          className={cn(
            'h-11 w-full rounded-full border border-neutral-300 bg-surface ps-10 text-body text-neutral-900',
            'transition-colors duration-(--duration-fast)',
            'focus-visible:border-primary-500 focus-visible:outline-2 focus-visible:outline-primary-500',
            hasValue && onClear ? 'pe-10' : 'pe-4',
          )}
          {...props}
        />
        {hasValue && onClear ? (
          <button
            type="button"
            onClick={onClear}
            aria-label={clearLabel}
            className="absolute top-1/2 end-3 -translate-y-1/2 rounded-full p-1 text-foreground-faint transition-colors duration-(--duration-fast) hover:bg-neutral-100 hover:text-foreground"
          >
            <Icon name="xmark" aria-hidden="true" className="text-small" />
          </button>
        ) : null}
      </div>
    )
  },
)

SearchBar.displayName = 'SearchBar'
