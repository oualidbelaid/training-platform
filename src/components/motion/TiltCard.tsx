import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { useCanRender3D } from '@/hooks/useCanRender3D'
import { motionDurations } from '@/lib/motion'
import { cn } from '@/lib/cn'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. Kept small — this is depth, not a gimmick. */
  maxTilt?: number
}

/**
 * CSS-perspective 3D card tilt (spec M1 §11) — the "3D card tilt" /
 * "perspective transformations" primitive built with CSS transforms +
 * Framer Motion, deliberately not React Three Fiber (see
 * docs/ANIMATION_GUIDE.md's tool-selection table: card tilt is a CSS-3D
 * case, R3F is reserved for genuine 3D scenes). Falls back to a static,
 * untilted card on touch devices and under prefers-reduced-motion via the
 * same useCanRender3D() gate the R3F layer uses.
 */
export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const canTilt = useCanRender3D()

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const springX = useSpring(pointerX, { stiffness: 200, damping: 20 })
  const springY = useSpring(pointerY, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt])

  if (!canTilt) {
    return <div className={className}>{children}</div>
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width)
    pointerY.set((event.clientY - bounds.top) / bounds.height)
  }

  function handlePointerLeave() {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  return (
    <motion.div
      className={cn(className)}
      style={{ perspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="h-full w-full"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ duration: motionDurations.fast }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
