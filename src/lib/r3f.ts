/**
 * Shared React Three Fiber Canvas defaults (spec §10/§34) — capped device
 * pixel ratio and no shadows by default, so any scene built on top of this
 * starts from a performance-safe baseline.
 */
export const canvasDefaults = {
  dpr: [1, 1.5] as [number, number],
  shadows: false,
  gl: { antialias: true, powerPreference: 'high-performance' as const },
}
