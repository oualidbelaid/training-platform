# Animation / 3D Guide

## Tool selection (decision table)

| Use case | Tool |
|---|---|
| Component mount/unmount transitions, hover/tap micro-interactions, staggered reveals | **Framer Motion** |
| Scroll-position-driven background/parallax movement, scroll-linked scale/opacity reveals | **GSAP + ScrollTrigger** |
| Always-on simple loops, focus states | **CSS animations/transitions** |
| Genuine 3D (hero object, real depth/lighting) | **React Three Fiber**, used sparingly |
| Card "tilt"/perspective effects | **CSS 3D transforms** (Framer-driven), not R3F — see `TiltCard` below |
| Numbers counting up on scroll-into-view | **Framer Motion** (`animate()` + `useInView`, see `useCountUp`) |

Rule of thumb: if it can be CSS, use CSS; if it's tied to React component state, use Framer Motion; if it's tied to scroll position independent of mount state, use GSAP ScrollTrigger; if it's genuinely three-dimensional, use R3F.

## What exists after M2

- `src/lib/motion.ts` — shared duration/easing constants (kept numerically in sync with the CSS custom properties in `styles/globals.css`) plus entrance variants (`fadeInUp`, `fadeIn`, `scaleIn`, `staggerContainer`), hover/press presets (`hoverLift`, `pressScale`), and a `pageTransition` variant defined but not yet wired into the router (no real page-to-page navigation exists yet).
- `src/components/motion/RevealOnScroll.tsx` — Framer Motion fade/rise-on-viewport-entry primitive, accepting a `variants` prop. Renders a plain, unanimated `<div>` when `useReducedMotion()` is true.
- `src/components/motion/TiltCard.tsx` — CSS-perspective pointer-follow 3D tilt (spring-smoothed via Framer Motion `useSpring`). Gated by `useCanRender3D()`.
- `src/components/motion/FloatingElement.tsx` — ambient decorative float; disabled outright under reduced motion.
- `src/hooks/useCountUp.ts` (M2) — animates an integer from 0 to a target once its element scrolls into view (`framer-motion`'s `animate()` + `useInView`), used by the Home Page's metrics bar. Shows the final value immediately under reduced motion rather than animating.
- `src/lib/gsap.ts` — `ensureGsapRegistered()` registers the `ScrollTrigger` plugin exactly once.
- `src/hooks/useReducedMotion.ts` — the single `prefers-reduced-motion` gate shared by Framer Motion, GSAP and the 3D layer.
- `src/components/layout/LanguageSwitcher.tsx` (branding-refinement pass) — the popover open/close is Framer `AnimatePresence` (a component-state transition, not scroll-driven — correctly a Framer case per the table above), skipped in favor of a plain conditional render under reduced motion. The `Map` component (`src/components/map/`) is a separate, simpler case: it isn't animation-library-driven at all, just a `zoomAnimation`/`fadeAnimation` boolean prop Leaflet itself respects, toggled from the same shared `useReducedMotion()` hook.

### GSAP ScrollTrigger usage — four instances, deliberately not more

Each is genuinely scroll-position-driven (not a viewport-entry boolean, which is Framer's job):

1. **`Hero`** — the background gradient layer moves at `yPercent: 15` scrubbed to scroll position as the Hero scrolls past (classic parallax, spec §11 "background movement"). Verified live: `getComputedStyle(bg).transform` changes from the identity matrix to a translated matrix after scrolling.
2. **`CompaniesSection`** — a soft radial glow drifts horizontally (`xPercent: -15`, scrubbed) behind the dark band as it enters/exits the viewport.
3. **`FinalCtaSection`** — the CTA panel scales from `0.94→1` and fades in, scrubbed to the panel's own scroll position (`top 90%`→`top 55%`) — a continuous scroll-linked "clip/scale reveal" (spec redesign §19), distinct from `RevealOnScroll`'s boolean fade.
4. **`ProfessionalDevelopmentSection`** (final pass — the site's signature interaction, spec §2–§8/§25) — see its own subsection below.

All four: skip entirely under `prefers-reduced-motion` (checked before `ensureGsapRegistered()` ever runs), and `kill()` both the tween/observer and its `ScrollTrigger` on unmount to avoid leaking observers across route changes.

### `ProfessionalDevelopmentSection` — the pinned scroll-storytelling section

Desktop only (`min-width: 1024px`) and only when motion isn't reduced — see "Mobile & reduced-motion fallback" below. Architecture, chosen specifically to satisfy spec §26 ("avoid continuously updating React state on every animation frame"):

- An outer `<section>` is given an explicit tall height (`STAGE_COUNT * 80vh`, currently 400vh for 5 stages) purely as scroll distance; a `position: sticky; top: 0; height: 100vh` inner panel is what the user actually sees — this is the "the section occupies approximately 100vh" behavior from spec §3, achieved with plain CSS sticky rather than GSAP's `pin: true` (fewer edge cases with unrelated layout, no manual `ScrollTrigger.refresh()` bookkeeping).
- One `ScrollTrigger.create()` (not a tween) tracks scroll progress across the outer section (`start: 'top top'`, `end: 'bottom bottom'`, `scrub: true`). Its `onUpdate` does two things:
  - Writes the progress rail's fill **directly to a ref's `style.transform`** every frame — a raw DOM write, never a React state update, because it changes on every scroll pixel.
  - Computes the discrete active stage (`0`–`4`) and calls `setStageIndex()` **only when it actually changes** (at most 4 times per scroll-through) — the one piece of this interaction that legitimately belongs in React state, because Framer Motion's `AnimatePresence` needs a state change to animate the text/image crossfade.
- The stage text (title/description) and the stage image each get their own `AnimatePresence` block keyed by `stageIndex`: text uses `mode="wait"` (old fades/moves up and fully exits before the new one enters, per spec §7's explicit "old title disappears, then new title becomes active"); the image uses the default overlapping mode so the crossfade has no visible gap.
- The five per-stage visuals are the same locally-generated abstract placeholder system as everywhere else (see `docs/DESIGN_SYSTEM.md` → "Imagery"), each one conceptually tied to its stage (`leadership.svg` — nodes converging on a point; `management.svg` — an organized grid; `digital-transformation.svg` — a circuit lattice; `communication.svg` — radiating connected nodes; `strategy.svg` — an ascending trajectory) rather than a literal second 3D scene, which would have doubled the GPU/complexity budget for a supporting visual (a deliberate scope decision, not an oversight).

**Mobile & reduced-motion fallback** (spec §9/§27): below `lg` or under `prefers-reduced-motion`, the component renders a completely different, much simpler tree — the five stages stacked as normal sequential content (image + icon + title + description per stage), each revealed via the existing `RevealOnScroll` primitive, no pin, no `ScrollTrigger`, no scroll-jacking. This is a real branch in the component (`usePinnedExperience` boolean), not a CSS `display: none` on the pinned version — the pinned tree's DOM (and its `ScrollTrigger`) is never created on mobile/reduced-motion at all.

## 3D architecture

- `src/components/three/HeroScene.tsx` — the **only** file importing `three`/`@react-three/fiber`/`@react-three/drei` directly. **Rewritten in M2** from the M0/M1 placeholder icosahedron into the Home Page's final hero visual: a "knowledge/connection/growth" orb —
  - A soft glass outer shell (drei `Sphere` + `MeshDistortMaterial`: `transmission`/`roughness`/`ior` for translucency, low `distort`/`speed` for a gentle organic wobble).
  - An emissive inner core mesh visible through the shell.
  - Two thin, semi-transparent encircling rings (`torusGeometry`, `MeshBasicMaterial`) at different rotations.
  - ~50 particles via drei's `<Sparkles>` — one cheap draw call, not individual meshes, to keep the GPU/particle budget sane (spec §22 "limit particles").
  - Motion: a `Group` auto-rotates slowly (`rotation.y += delta * 0.12`) and lerps a small pointer-follow tilt (`rotation.x/z` toward `useThree().pointer`, capped to ±0.15 rad) — both driven inside `useFrame`, so pointer movement never triggers a React re-render.
  - Deliberately abstract, not literal — no gaming/crypto/sci-fi visual cues (spec §5).
- `src/lib/r3f.ts` — shared `Canvas` defaults: capped device pixel ratio (`[1, 1.5]`), shadows off, `powerPreference: 'high-performance'`.
- `src/hooks/useCanRender3D.ts` — gates 3D rendering off for coarse-pointer (touch) devices and `prefers-reduced-motion`, **before** the R3F chunk is even requested. This is the "mobile fallback": touch devices never download `three`/`@react-three/fiber`/`@react-three/drei` at all.
- `src/components/three/Scene3D.tsx` — the only component a page ever uses to mount 3D content: capability gate → `React.lazy` code-splitting → `Suspense` fallback → `ErrorBoundary` fallback, all resolving to the same static radial-gradient fallback (visually consistent with the orb's glow, so the fallback doesn't look like a broken state) so a WebGL failure never blanks the page.

## Verified in the M2 production build

The `HeroScene` chunk remains separate from the main bundle after the M2 rewrite (still `three`/`@react-three/fiber`/`@react-three/drei`, still lazy-loaded and gated) — Vite's "chunk larger than 500 kB" warning for this chunk is expected and accepted, same reasoning as M0/M1: it is not part of the critical path for most pages/devices (touch devices never request it at all).
