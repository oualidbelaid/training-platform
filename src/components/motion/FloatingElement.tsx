import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

interface FloatingElementProps {
  children?: ReactNode
  className?: string
  /** Vertical travel distance in pixels. Kept small — ambient, not distracting. */
  distance?: number
  /** Full loop duration in seconds. */
  duration?: number
  delay?: number
}

/**
 * Ambient floating motion for decorative shapes/badges (spec M1 §11 —
 * "floating objects, layered elements"; CLAUDE.md root spec "floating
 * geometric shapes"). Purely decorative, so it is disabled outright rather
 * than merely shortened under prefers-reduced-motion.
 */
export function FloatingElement({
  children,
  className,
  distance = 12,
  duration = 6,
  delay = 0,
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
