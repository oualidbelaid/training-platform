import '@testing-library/jest-dom/vitest'

/**
 * jsdom has no `window.matchMedia` implementation. Every page renders
 * `RevealOnScroll` (→ `useReducedMotion` → `useMediaQuery`), so any test
 * that mounts a full page — not just an isolated component — needs this
 * polyfilled globally, not per-test. Defaults to "no match" (`matches:
 * false`), i.e. `prefers-reduced-motion` reads as off, same as a default
 * browser profile.
 */
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

/**
 * jsdom also has no `IntersectionObserver`, which Framer Motion's
 * `whileInView` (used by `RevealOnScroll`, on every page) needs to even
 * mount. A no-op stub is enough for tests — they assert on final rendered
 * state, not the scroll-triggered reveal animation itself.
 */
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  // Structurally sufficient for the code under test, not a spec-complete
  // implementation (newer DOM lib versions add fields like `scrollMargin`
  // this stub deliberately doesn't need) — cast rather than chase the lib's
  // full interface.
  class MockIntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly thresholds: ReadonlyArray<number> = []
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
  globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
}
