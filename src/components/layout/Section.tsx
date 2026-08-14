import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const spacingClasses = {
  none: '',
  sm: 'py-10 lg:py-14',
  md: 'py-16 lg:py-24',
  lg: 'py-24 lg:py-32',
} as const

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: keyof typeof spacingClasses
}

/** Establishes consistent vertical rhythm between page sections (spec M1 §4). */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ spacing = 'md', className, ...props }, ref) => (
    <section ref={ref} className={cn(spacingClasses[spacing], className)} {...props} />
  ),
)

Section.displayName = 'Section'
