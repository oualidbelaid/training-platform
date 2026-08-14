import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { fadeInUp } from '@/lib/motion'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  variants?: Variants
}

/**
 * Framer Motion reveal-on-scroll primitive (spec §11) — simple,
 * viewport-triggered fade/rise. Complex pinned or multi-step scroll
 * choreography belongs to GSAP ScrollTrigger instead (see lib/gsap.ts);
 * this component is deliberately not that.
 */
export function RevealOnScroll({ children, className, variants = fadeInUp }: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
