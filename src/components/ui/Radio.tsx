import { type InputHTMLAttributes, type ReactNode, forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, id, className, ...props }, ref) => {
    const generatedId = useId()
    const radioId = id ?? generatedId

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={cn(
            'h-4 w-4 border-neutral-300 accent-primary-600',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            className,
          )}
          {...props}
        />
        <label htmlFor={radioId} className="text-body text-neutral-900">
          {label}
        </label>
      </div>
    )
  },
)

Radio.displayName = 'Radio'

interface RadioGroupProps {
  legend: string
  error?: string
  children: ReactNode
  className?: string
}

/** Groups a set of Radio controls under one accessible legend (spec M1 §15). */
export function RadioGroup({ legend, error, children, className }: RadioGroupProps) {
  return (
    <fieldset className={cn('m-0 flex flex-col gap-2 border-0 p-0', className)}>
      <legend className="mb-1 text-small font-medium text-foreground-muted">{legend}</legend>
      {children}
      {error ? (
        <p role="alert" className="text-caption text-error-600">
          {error}
        </p>
      ) : null}
    </fieldset>
  )
}
