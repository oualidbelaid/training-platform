# Project Rules

Permanent, non-negotiable rules for this project. Source of truth: root `CLAUDE.md`. This file exists so every session has a fast reference without re-reading the full spec.

## What this is

A premium, professional Training & Learning marketing / lead-generation website for a training company. Inspired by the professionalism of Cegos, Apple, Stripe, Linear, Framer, Vercel — **never copying** any of them. First major commercial project of the author; also serves as their portfolio piece, so it must not look like a template or an AI-generated site.

## What this is NOT

There is **no**:

- Login / user authentication
- User dashboard / customer account area
- Shopping cart / checkout / online payment / wishlist

The conversion model is entirely **contact and lead generation**: Request Information, Request a Quote, Register Interest, Contact an Advisor, Book a Consultation, Request a Brochure. Never add e-commerce affordances, even as a "quick win."

## Architecture rule

The UI must never depend on Dolibarr directly:

```
UI → Hooks → Services → Repositories → (Mock today | Dolibarr later)
```

Repositories are the only layer allowed to know whether data is mocked or real. See `DOLIBARR_GUIDE.md`.

## Non-negotiables carried into every milestone

- No hardcoded user-facing text — everything through i18next (`TRANSLATION_GUIDE.md`).
- No hardcoded design values — everything through design tokens (`DESIGN_SYSTEM.md`).
- `prefers-reduced-motion` respected by every animation system (Framer Motion, GSAP, React Three Fiber) via one shared hook.
- Every data-driven component handles loading / error / empty / success states.
- Strict TypeScript — `any` is not acceptable outside a documented, justified exception.
- Milestones are implemented one at a time, with quality gates (typecheck, lint, tests, build) run before completion, matching the process defined in `CLAUDE.md` §50.
