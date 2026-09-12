import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

/**
 * Native checkbox styled via `accent-color` (Tailwind's `accent-*`
 * utility) rather than a custom-drawn control — the browser's own
 * checkbox already gets keyboard support, screen-reader semantics and OS
 * high-contrast-mode behavior for free.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId()
    const checkboxId = id ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            className={cn(
              'h-4 w-4 rounded border-neutral-300 accent-primary-600',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              className,
            )}
            {...props}
          />
          <label htmlFor={checkboxId} className="text-body text-neutral-900">
            {label}
          </label>
        </div>
        {error ? (
          <p id={`${checkboxId}-error`} role="alert" className="text-caption text-error-600">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
