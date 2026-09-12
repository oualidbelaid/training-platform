import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const gapClasses = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
} as const

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  gap?: keyof typeof gapClasses
  align?: keyof typeof alignClasses
  justify?: keyof typeof justifyClasses
  wrap?: boolean
}

/**
 * The one flex-composition primitive (spec M1 §4). Covers both "Stack" and
 * "Flex utilities" needs — a second, overlapping Flex component would be
 * redundant; ad-hoc one-off flex needs can still use Tailwind classes
 * directly (see docs/DESIGN_SYSTEM.md).
 */
export function Stack({
  direction = 'column',
  gap = 'md',
  align,
  justify,
  wrap = false,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        gapClasses[gap],
        align && alignClasses[align],
        justify && justifyClasses[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...props}
    />
  )
}
