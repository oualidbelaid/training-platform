# Responsive Guide

Status: **tokens only** — no business pages exist yet to audit against breakpoints (that happens page-by-page from M2 onward, per `CLAUDE.md` §13).

## Breakpoints

Tailwind v4 defaults (`sm` 40rem / `md` 48rem / `lg` 64rem / `xl` 80rem / `2xl` 96rem) plus a custom `3xl` (120rem / 1920px) added in `src/styles/globals.css` for ultra-wide support, per spec §13.

## Rule for every future page/component

Design mobile intentionally — do not just shrink the desktop layout (§13). Every page milestone must check navigation, hero, cards, forms, typography, images, spacing, animations and 3D at each breakpoint before being marked done, per the process in `CLAUDE.md` §50.

## Mobile-specific commitments (not yet exercised, since no pages exist)

- Reduced animation/3D complexity on mobile — the mechanism already exists (`useCanRender3D` gates on `(pointer: coarse)`; `useReducedMotion` gates on `prefers-reduced-motion`), see `ANIMATION_GUIDE.md`.
- Touch-friendly tap targets, a real mobile drawer nav, and a floating contact button are built in the Navigation and Contact Experience milestones.
