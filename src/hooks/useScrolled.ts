import { useSyncExternalStore } from 'react'

/** True once the page has scrolled past `threshold` pixels — drives the header's transparent→solid transition. */
export function useScrolled(threshold = 24): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('scroll', onChange, { passive: true })
      return () => window.removeEventListener('scroll', onChange)
    },
    () => window.scrollY > threshold,
    () => false,
  )
}
