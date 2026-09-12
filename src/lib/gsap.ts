import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/**
 * Registers the ScrollTrigger plugin exactly once. Call this from any
 * component that needs GSAP scroll choreography (spec §11) instead of
 * importing/registering gsap directly — keeps plugin setup centralized.
 */
export function ensureGsapRegistered(): typeof gsap {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return gsap
}

export { ScrollTrigger }
