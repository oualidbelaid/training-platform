import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { FormField } from '@/components/ui/FormField'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

/**
 * Design System input primitive. Every RHF-driven form field composes this
 * rather than styling a raw <input>, so label association, error state and
 * focus styles stay consistent everywhere (spec §7, §31, §35).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, required, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined

    return (
      <FormField label={label} htmlFor={inputId} error={error} hint={hint} required={required}>
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'h-11 rounded-md border border-neutral-300 px-3 text-body text-neutral-900',
            'transition-colors duration-(--duration-fast)',
            'focus-visible:border-primary-500 focus-visible:outline-2 focus-visible:outline-primary-500',
            error && 'border-error-600',
            className,
          )}
          {...props}
        />
      </FormField>
    )
  },
)

Input.displayName = 'Input'
