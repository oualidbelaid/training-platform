import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface UseCountUpOptions {
  duration?: number
}

/**
 * Animates an integer from 0 to `target` once its element scrolls into
 * view (spec redesign §10/§19 — "numbers may animate when entering the
 * viewport"). Skips the animation entirely under prefers-reduced-motion,
 * showing the final value immediately.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  options: UseCountUpOptions = {},
) {
  const ref = useRef<T>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const [value, setValue] = useState(prefersReducedMotion ? target : 0)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    const controls = animate(0, target, {
      duration: options.duration ?? 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isInView, prefersReducedMotion, target, options.duration])

  return { ref, value }
}
