import { type SelectHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { FormField } from '@/components/ui/FormField'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  placeholder?: string
  error?: string
  hint?: string
}

/**
 * Native <select>, styled to match the rest of the Design System. A native
 * element is accessible (keyboard, screen reader, mobile picker UI) by
 * default — a custom listbox is unnecessary complexity until a form
 * genuinely needs multi-select or async options.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, hint, id, className, required, value, defaultValue, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const describedBy = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
    // Controlled (`value` passed, e.g. a filter toolbar bound to URL state)
    // and uncontrolled (RHF `register()`, no `value`) usages both need to
    // work — React errors if a <select> gets both `value` and `defaultValue`,
    // so only fall back to `defaultValue=''` when the caller didn't opt into
    // controlled mode.
    const valueProps = value === undefined ? { defaultValue: defaultValue ?? '' } : { value }

    return (
      <FormField label={label} htmlFor={selectId} error={error} hint={hint} required={required}>
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...valueProps}
          className={cn(
            'h-11 rounded-md border border-neutral-300 bg-surface px-3 text-body text-neutral-900',
            'transition-colors duration-(--duration-fast)',
            'focus-visible:border-primary-500 focus-visible:outline-2 focus-visible:outline-primary-500',
            error && 'border-error-600',
            className,
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    )
  },
)

Select.displayName = 'Select'
