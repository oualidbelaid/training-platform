# API Layer Guide

## Environment configuration

`src/config/env.ts` is the **only** place `import.meta.env` is read. It validates every variable through Zod at startup and throws immediately if something is missing/malformed — fail fast rather than surfacing a confusing runtime error later.

| Variable            | Purpose                                                                   |
| ------------------- | ------------------------------------------------------------------------- |
| `VITE_API_URL`      | Base URL for the app's own API layer / future BFF                         |
| `VITE_DOLIBARR_URL` | Dolibarr REST API base URL (unused while `VITE_USE_MOCK=true`)            |
| `VITE_APP_ENV`      | `development` \| `staging` \| `production`                                |
| `VITE_USE_MOCK`     | When `true`, every repository factory resolves to its Mock implementation |

`.env.example` is committed; `.env` is gitignored and must be created locally (`cp .env.example .env`).

**Security note**: any variable prefixed `VITE_` is compiled into the public client bundle. Never put a Dolibarr write-capable API token there — see `DOLIBARR_GUIDE.md`.

## HTTP client

`src/core/http.ts` — a single `axios` instance (`httpClient`) with a 10s timeout and a response interceptor that normalizes errors to `{ message, status, code }`. Any future repository that talks to a real backend uses this instance rather than importing `axios` directly.

## Repository / Service / Hook pattern

See `ARCHITECTURE.md` for the full data-flow diagram. The Training domain is the reference implementation:

- `types/dto/training.dto.ts` — raw (provisional Dolibarr-shaped) payload
- `types/entities/training.ts` — canonical UI-facing shape
- `repositories/training/training.mapper.ts` — DTO → entity
- `repositories/training/training.repository.ts` — interface
- `repositories/training/mock-training.repository.ts` — Mock implementation
- `repositories/training/index.ts` — factory (single Mock↔Dolibarr switch point)
- `services/training.service.ts` — orchestration layer hooks call
- `features/trainings/hooks/{useTrainings,useTraining,useFeaturedTrainings}.ts` — TanStack Query wrappers

Adding a new domain (Category, Trainer, Testimonial, Event, Article, FAQ) means repeating this exact shape — no new pattern to invent.
