import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
  className?: string
}

/**
 * Shared label/hint/error chrome for form controls (spec M1 §5). `Input`,
 * `Textarea` and `Select` compose this internally so every control shares
 * one layout and one set of `aria-describedby`/error-id conventions —
 * callers pass the same `htmlFor`/`error` to both `FormField` and the
 * control's own `id`/`aria-describedby` (each control wires that itself).
 */
export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-small font-medium text-foreground-muted">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-error-600">
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="text-caption text-foreground-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-caption text-error-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
