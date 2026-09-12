# Accessibility

Status: **M8 complete** — audited against WCAG 2.2 AA (code review + computed contrast ratios, no live browser available — see `docs/ROADMAP.md`'s M8 section for the full writeup, methodology, and quality-gate results).

## Foundation (M0)

- `:focus-visible` styling defined once in `src/styles/globals.css`, not per-component.
- `prefers-reduced-motion` respected globally: animations/transitions are forced to near-zero duration at the CSS level, and `useReducedMotion()` additionally gates Framer Motion and the 3D layer (`ANIMATION_GUIDE.md`).
- `document.documentElement.lang` and `dir` kept in sync with the active language by `DirectionProvider` (`TRANSLATION_GUIDE.md`).
- `LoadingState` uses `<output aria-live="polite">` (semantic tag, not a `div[role=status]`).
- `Input`/`Textarea`/`Select` associate `<label htmlFor>` via the shared `FormField`, and set `aria-invalid`/`aria-describedby` pointing at their error message.
- `ErrorState` and every form field's error message use `role="alert"`.
- `IconButton.aria-label` is required at the **type level** — an icon-only button cannot compile without an accessible name.
- `oxlint`'s `jsx-a11y` plugin is enabled and enforced in local checks (`npm run lint`).

## Landmarks and navigation (M8)

- `<header>`, `<main id="main-content" tabIndex={-1}>`, `<footer>` in `MainLayout.tsx`; `<nav aria-label>` on both the desktop and mobile navigation, and on each of the Footer's three link columns.
- **Skip-to-content link** — the first focusable element on every page, visually hidden until keyboard-focused (`sr-only focus:not-sr-only`), jumps straight to `#main-content`. Fixes WCAG 2.4.1 (Bypass Blocks) — previously every page forced keyboard users through the full Navbar (logo, 5 links, language switcher, CTA) before reaching content.
- **Route-change focus management** — `MainLayout` moves focus to `<main>` on every client-side navigation (skipped on first mount), the standard SPA pattern for giving screen-reader users a signal that a new page loaded.

## Dialogs and popovers

- `Drawer` (mobile navigation panel): WAI-ARIA dialog pattern (`role="dialog"`, `aria-modal`, `aria-labelledby`) — full Tab/Shift+Tab focus trap, Escape close, backdrop-click close, focus returned to the trigger on close, body scroll locked while open.
- `LanguageSwitcher`: WAI-ARIA listbox-popup pattern (`aria-haspopup="listbox"`, `role="listbox"`/`role="option"`, `aria-selected`) — roving-tabindex Arrow Up/Down/Home/End navigation, Escape and outside-click close and return focus to the trigger, and a viewport-flip (opens upward when there isn't room below) so it never gets clipped when opened from inside the mobile Drawer.

## Forms

- Every field across all 5 lead-generation forms and the Training Catalog's filter toolbar has an associated `<label>`, `aria-invalid`, and `aria-describedby` (hint or error).
- Radio groups use `<fieldset>`/`<legend>` (`RadioGroup`), not a `div[role=radiogroup]`.
- React Hook Form's `shouldFocusError` (default `true`) is never overridden — a failed submit automatically moves focus to the first invalid field.
- A honeypot field, invisible and out of tab order, provides anti-spam without a CAPTCHA.

## Color contrast (M8)

Verified via OKLCH → sRGB → WCAG relative-luminance computation for every color-token pairing actually used as text/UI in the app. Two token fixes were required in `src/styles/globals.css`:

- `--color-foreground-faint` re-aliased from `neutral-400` (3.36:1 on white — failed AA at the 12–14px sizes it's used at for disclaimers/hints/meta text) to `neutral-500` (6.00:1).
- `--color-warning-700` darkened from `oklch(0.6 0.14 85)` to `oklch(0.48 0.14 85)` — `Badge`'s `warning` variant was 3.54:1 on `warning-50`, now 5.84:1.
- The global `:focus-visible` ring is 7.16:1 on white but only 2.75:1 against `neutral-900`/`950` dark sections — `Button`/`IconButton`'s `inverse` variant now overrides it to `neutral-0` (19.67:1) so keyboard focus stays visible on dark backgrounds (`CompaniesSection`, `ProfessionalDevelopmentSection`, dark `CtaBanner` usages).

## Images

- The `Image` primitive requires `alt` at the type level; every empty `alt=""` case audited is a defensible decorative case (an adjacent heading already conveys the same information — stock/editorial photography, not content-bearing images).
- `Scene3D`'s decorative WebGL orb (and its static fallback) is `aria-hidden="true"`.

## RTL

Zero physical-direction Tailwind classes (`ml-`/`mr-`/`pl-`/`pr-`/`left-`/`right-`/`text-left`/`text-right`/`rounded-l-`/`rounded-r-`) exist anywhere in `src` — logical properties (`border-s`/`border-e`, `ms-`/`me-`/`ps-`/`pe-`, `start-`/`end-`) are used consistently throughout, verified by a sitewide grep during the M8 audit.

## Touch targets

`Button` sizes are 36/44/48px, `IconButton` 36/44px (default `md` = 44px) — all pass WCAG 2.2's SC 2.5.8 24×24 CSS px AA minimum.

## Known limitation

The Footer links to `/legal`, `/privacy`, `/cookies`, which have no routes yet (real 404s) — a missing content page, not an accessibility defect; those pages are a future content milestone, not something M8 improvised content for.
