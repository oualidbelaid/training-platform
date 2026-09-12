import type { Transition, Variants } from 'framer-motion'

/**
 * Motion tokens shared by Framer Motion, GSAP and CSS (spec §6/§12).
 * Keep these numerically in sync with the --duration and --ease custom
 * properties in src/styles/globals.css — one motion language everywhere.
 */
export const motionDurations = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
} as const

export const motionEasing = {
  premium: [0.16, 1, 0.3, 1],
  out: [0.22, 1, 0.36, 1],
} as const

const entranceTransition: Transition = {
  duration: motionDurations.base,
  ease: motionEasing.premium,
}

/** Entrance animations (spec M1 §9) — used by RevealOnScroll and similar mount/viewport triggers. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: entranceTransition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: entranceTransition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: entranceTransition },
}

/** Stagger the entrance of a list of children — pair with fadeInUp/fadeIn on each child. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

/** Hover/press micro-interaction presets — pass directly as whileHover/whileTap. */
export const hoverLift = {
  y: -4,
  transition: { duration: motionDurations.fast, ease: motionEasing.out },
}
export const pressScale = {
  scale: 0.98,
  transition: { duration: motionDurations.fast, ease: motionEasing.out },
}

/**
 * Page transition variants (spec M1 §9). Defined here as the shared token;
 * not wired into the router yet — there is only one real route today, and
 * wiring AnimatePresence belongs to the milestone that introduces real
 * page-to-page navigation.
 */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: entranceTransition },
  exit: { opacity: 0, transition: { duration: motionDurations.fast, ease: motionEasing.out } },
}
