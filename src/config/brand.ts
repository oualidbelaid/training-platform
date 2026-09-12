import istamLogo from '@/assets/brand/istam-logo.png'

/**
 * Centralized brand asset reference (redesign §2). The Navbar, Footer and
 * mobile Drawer all import the logo from here rather than reaching into
 * `src/assets/` directly, so a future logo update (a proper SVG mark, a
 * separate compact icon-only version, favicon exports) is a one-file change.
 *
 * Only one lockup exists today — the full "mark + wordmark" PNG the client
 * supplied — so every context here still renders that same file at
 * different sizes. The browser-tab favicon is the one exception: there's
 * no separate icon-only source asset, so `public/favicon.png` and
 * `public/apple-touch-icon.png` are a square crop of this same PNG's icon
 * mark (generated once, not hand-drawn — see docs/DESIGN_SYSTEM.md →
 * "Branding"), not a second entry in this registry.
 */
export const BRAND = {
  name: 'ISTAM',
  logo: istamLogo,
} as const
