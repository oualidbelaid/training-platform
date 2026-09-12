import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const gapClasses = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
} as const

const colClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'lg:grid-cols-4',
}

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Columns at the sm/md/lg breakpoint respectively; mobile is always 1 column. */
  cols?: 2 | 3 | 4
  gap?: keyof typeof gapClasses
  children?: ReactNode
}

/**
 * Responsive CSS grid primitive (spec M1 §4). Mobile-first: always 1 column
 * below `sm`, expanding at the breakpoint matching `cols` and staying there
 * up to the next larger breakpoint — deliberately simple rather than a
 * fully configurable per-breakpoint API, which no page needs yet.
 */
export function Grid({ cols = 3, gap = 'md', className, children, ...props }: GridProps) {
  return (
    <div
      className={cn('grid grid-cols-1', colClasses[cols], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  )
}
