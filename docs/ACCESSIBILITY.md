# Accessibility

Status: **foundation rules established**, exercised only on the components that exist so far. A full WCAG audit happens in the Accessibility milestone once real pages exist.

## Implemented in M0

- `:focus-visible` styling defined once in `src/styles/globals.css`, not per-component.
- `prefers-reduced-motion` respected globally: animations/transitions are forced to near-zero duration at the CSS level, and `useReducedMotion()` additionally gates Framer Motion and the 3D layer (`ANIMATION_GUIDE.md`).
- `document.documentElement.lang` and `dir` kept in sync with the active language by `DirectionProvider` (`TRANSLATION_GUIDE.md`).
- `LoadingState` uses `<output aria-live="polite">` (semantic tag, not a `div[role=status]`).
- `LanguageSwitcher` uses a `<fieldset>` + visually-hidden `<legend>` (semantic tag, not a `div[role=group]`) and `aria-pressed` on the active language.
- `Input` primitive associates `<label htmlFor>`, sets `aria-invalid` and `aria-describedby` pointing at its error message.
- `ErrorState` uses `role="alert"`.
- `oxlint`'s `jsx-a11y` plugin is enabled and enforced in CI-equivalent local checks (`npm run lint`).

## Not yet done

Full keyboard-navigation audit, skip-to-content link, color-contrast verification against the final (currently placeholder) palette, accessible modal/dialog/dropdown patterns — none of these components exist yet. Screen-reader pass deferred to the Accessibility milestone once real content exists to test against.
