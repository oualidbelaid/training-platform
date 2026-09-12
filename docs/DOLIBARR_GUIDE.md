# Dolibarr Integration Guide

## Current status: not connected

`VITE_USE_MOCK=true` by default. `repositories/training/index.ts` throws a clear error if `VITE_USE_MOCK` is ever false, since `DolibarrTrainingRepository` does not exist yet. This is intentional — M0 explicitly excludes any Dolibarr connection.

## Migration plan (executed in the Dolibarr Integration milestone)

1. Confirm the real Dolibarr endpoint shapes. Every `*DTO` type in `types/dto/` today is a **provisional guess**, not a confirmed contract.
2. Update the DTO types to match reality.
3. Update the matching `*.mapper.ts` if field names differ from what the mock assumed — this is the only place that absorbs the drift.
4. Implement `Dolibarr<Domain>Repository` for each domain, calling the real endpoint through `core/http.ts`.
5. Flip `VITE_USE_MOCK=false` (per-domain flags are possible if a phased rollout is preferred).
6. **No changes** to any component, page, hook, service, Zod schema, or route.

This works because Mock data is authored in the DTO shape and passed through the exact same mapper the Dolibarr repository will use (see `mocks/data/trainings.ts`) — the mapper is exercised from day one, not added as an afterthought at integration time.

## ⚠️ Open risk: credential handling

Dolibarr's REST API requires an API key/token. Any `VITE_`-prefixed environment variable is compiled into the **public** client bundle — it is not a safe place for a write-capable credential (e.g. one that creates Leads/Quotes as CRM records in Dolibarr).

Before the Dolibarr Integration milestone can ship a write path safely, one of these needs to be decided:

- **(a)** Dolibarr is configured with a public, read-only, origin-restricted key acceptable for client-side use (fine for reading Trainings/Trainers/Categories; **not** fine for writing Leads).
- **(b)** A minimal backend/BFF proxies authenticated requests so the real token never reaches the browser.

This project currently has no backend of its own — resolving this is a prerequisite for planning the Dolibarr Integration milestone in detail, not for M0–M11.
