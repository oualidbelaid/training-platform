import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface FormSectionProps {
  title: string
  children: ReactNode
  className?: string
}

/** Logical field grouping (spec M5 §"Form UX" — Personal info / Company info / Training requirements / Message / Consent) shared by every lead form. */
export function FormSection({ title, children, className }: FormSectionProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <h2 className="text-small font-semibold uppercase tracking-wide text-foreground-faint">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </div>
  )
}
