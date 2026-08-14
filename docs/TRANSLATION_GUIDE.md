# Translation Guide (i18n)

## Stack

`i18next` + `react-i18next` + `i18next-browser-languagedetector`. Bootstrap: `src/i18n/index.ts`.

## Languages

`fr` (default/fallback), `en`, `ar`. Direction is derived from language, never chosen independently:

```ts
export const languageDirection: Record<SupportedLanguage, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  en: 'ltr',
  ar: 'rtl',
}
```

`DirectionProvider` (`src/providers/DirectionProvider.tsx`) applies `document.documentElement.dir` and `lang` on every language change. Verified in `src/providers/DirectionProvider.test.tsx` (automated) and manually in a live browser during M0 (English: `dir="ltr" lang="en"`, mock training content rendered correctly).

**Default locale decision**: `fr` was chosen as the fallback (French-speaking market implied by the Cegos reference in `CLAUDE.md` §1) — flagged as a M0 default, not a confirmed product decision.

## Adding a language

1. Add the code to `supportedLanguages` in `src/i18n/index.ts`.
2. Add its direction to `languageDirection`.
3. Add `src/i18n/locales/<code>/common.json` with the same key shape as the other locales.
4. Register the resource in the `i18n.init({ resources: { ... } })` call.

No component code changes required — this is the point of centralizing direction/resources here.

## Namespace structure

Only `common` exists today (`app`, `nav`, `language`, `feedback`, `notFound`, `footer` keys). Per-feature namespaces (`trainings.json`, `forms.json`, `seo.json`, etc.) are added alongside the pages/features that need them — do not pre-create empty namespaces.

## Rules

- Never hardcode user-facing text in a component — always `t('key')`.
- Dynamic *content* (Training titles, Trainer bios, Article bodies) is **not** an i18next concern — it's modeled as a `LocalizedText` (`Record<SupportedLanguage, string>`) directly on the domain entity (see `types/entities/training.ts` and `utils/localized-text.ts`). i18next only covers static UI chrome.

## Arabic typography — resolved in M1

Latin uses Inter (body) + Fraunces (display, serif). Fraunces has no Arabic glyphs, so `:lang(ar)` overrides both `--font-sans` and `--font-display` to IBM Plex Sans Arabic — a professional, widely-used Arabic UI typeface. Verified live: switching to Arabic changes `getComputedStyle(document.body).fontFamily` to `"IBM Plex Sans Arabic", ...` with zero horizontal overflow. Full detail in `docs/DESIGN_SYSTEM.md`.

## Open question carried from the architecture review

Whether URLs are language-prefixed (`/en/...`, `/fr/...`, `/ar/...`) and whether slugs translate per locale is still undecided — it affects routing, SEO metadata, and RTL behavior of the (future) horizontal-scroll section. Not blocking for M0 since no real routes exist yet; needs resolving before the Home Page milestone introduces real routes.
