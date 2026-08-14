import { type TextareaHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { FormField } from '@/components/ui/FormField'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className, required, rows = 4, ...props }, ref) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const describedBy = error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined

    return (
      <FormField label={label} htmlFor={textareaId} error={error} hint={hint} required={required}>
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'resize-y rounded-md border border-neutral-300 px-3 py-2 text-body text-neutral-900',
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

Textarea.displayName = 'Textarea'
