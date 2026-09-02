import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const toneClasses = {
  light: 'border-neutral-0/30 bg-neutral-0/60 text-neutral-900',
  dark: 'border-neutral-0/10 bg-neutral-900/60 text-neutral-0',
} as const

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  tone?: keyof typeof toneClasses
}

/**
 * Restrained glass surface (spec M1 §8) — intended for a small number of
 * signature moments over imagery/gradients (a hero card, a floating
 * summary panel), not as a default surface. Reach for `Card` for ordinary
 * content surfaces.
 */
export function GlassPanel({ tone = 'light', className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn('rounded-xl border shadow-md backdrop-blur-md', toneClasses[tone], className)}
      {...props}
    />
  )
}
