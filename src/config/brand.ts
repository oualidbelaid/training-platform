import istamLogo from '@/assets/brand/istam-logo.png'

/**
 * Centralized brand asset reference (redesign §2). The Navbar, Footer and
 * mobile Drawer all import the logo from here rather than reaching into
 * `src/assets/` directly, so a future logo update (a proper SVG mark, a
 * separate compact icon-only version, favicon exports) is a one-file change.
 *
 * Only one lockup exists today — the full "mark + wordmark" PNG the client
 * supplied — so every context currently renders the same file at different
 * sizes. There is no separate icon-only mark to crop to a favicon from
 * without image-editing tooling; `public/favicon.svg` is unchanged until a
 * real favicon export is supplied (see docs/DESIGN_SYSTEM.md → "Branding").
 */
export const BRAND = {
  name: 'ISTAM',
  logo: istamLogo,
} as const
