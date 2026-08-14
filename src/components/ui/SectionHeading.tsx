import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'start' | 'center'
  className?: string
  /** HTML heading level — `h2` (default) for every in-page section; pass `h1` only for a page's single hero usage (spec M7 §9 — same `text-h2` class either way, so this changes semantics, never appearance). */
  as?: 'h1' | 'h2'
}

/**
 * The recurring "eyebrow + large headline + supporting text" block used to
 * open a page section (spec M1 §5 / CLAUDE.md §8 "editorial layouts, strong
 * typography, visual hierarchy"). Business sections compose this rather
 * than hand-rolling heading markup per section.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-2xl flex-col gap-3',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-caption font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>
      ) : null}
      <Heading className="text-h2 text-foreground">{title}</Heading>
      {description ? (
        <p className="text-body-lg text-foreground-muted">{description}</p>
      ) : null}
    </div>
  )
}
