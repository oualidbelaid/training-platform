# Coding Standards

## TypeScript

Strict mode is on (`tsconfig.app.json`): `strict`, `noUncheckedIndexedAccess`, `noImplicitReturns`, `noPropertyAccessFromIndexSignature`, `forceConsistentCasingInFileNames`, plus `noUnusedLocals`/`noUnusedParameters`. Avoid `any`; when a real Dolibarr shape is unknown, model it as an explicit provisional DTO type instead (see `DOLIBARR_GUIDE.md`), not `any`/`unknown`.

Path alias: `@/*` → `src/*` (configured in both `tsconfig.app.json` and `vite.config.ts` — keep them in sync if either changes).

## Naming

- Components: `PascalCase` (`TrainingCard.tsx`)
- Hooks: `useSomething` (`useTrainings.ts`)
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE` where genuinely constant
- One component per file where practical; files should map to what they export

## Linting & formatting

- **oxlint** (`.oxlintrc.json`) — plugins: `react`, `typescript`, `oxc`, `import`, `jsx-a11y`, `vitest`. Chosen over ESLint for speed; already scaffolded in the project before M0. Run: `npm run lint`.
- **Prettier** (`.prettierrc.json`) — no semicolons, single quotes, trailing commas, 100-char print width. Run: `npm run format` / `npm run format:check`.
- **Husky** pre-commit hook (`.husky/pre-commit`) runs `typecheck`, `lint`, and `format:check` before every commit.

## Git

Conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `perf:`, `test:`, `chore:`. Never commit `.env`, secrets, credentials, or build artifacts (enforced by `.gitignore`).

## Architecture discipline

- UI never imports a repository directly — only a service (see `ARCHITECTURE.md`).
- No component contains data-fetching *and* heavy business logic *and* presentation — split across hook/service/component.
- No new top-level `src/` folder without updating `ARCHITECTURE.md` first.
