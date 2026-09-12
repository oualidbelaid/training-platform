import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * Single gate for prefers-reduced-motion, shared by Framer Motion, GSAP and
 * the 3D layer (spec §12/§31/§34) so reduced-motion handling never has to be
 * reimplemented per animation system.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
