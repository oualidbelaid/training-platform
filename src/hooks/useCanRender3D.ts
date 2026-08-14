import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Gate for mounting any React Three Fiber scene (spec §10/§34). Coarse
 * pointer (touch) devices and prefers-reduced-motion both fall back to a
 * static visual instead of downloading/running the 3D chunk at all.
 */
export function useCanRender3D(): boolean {
  const isCoarsePointer = useMediaQuery('(pointer: coarse)')
  const prefersReducedMotion = useReducedMotion()

  return !isCoarsePointer && !prefersReducedMotion
}
