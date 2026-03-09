## Quick orientation for AI coding agents

This repository is a two-piece Medusa + Nuxt storefront example. Keep instructions concise and actionable and reference concrete files below.

- Backend: `backend/` — a Medusa (Node + TypeScript) server. Key files:
  - `backend/medusa-config.ts` — Medusa project config (DB, CORS, admin vite/server settings).
  - `backend/package.json` — scripts: `dev` (medusa develop), `build`, `start`, `seed`, and test scripts (`test:integration:*`, `test:unit`).
  - `backend/Dockerfile`, `backend/docker-compose.yml` — compose brings up Postgres + Redis; the medusa service is commented but compose is used for DB/Redis.
  - `backend/start.sh` — helper to wait for DB/Redis and run setup (uses `pnpm`).
  - Backend code layout: `backend/src/api/*` (store/admin routes), `backend/src/modules/`, `backend/src/admin/` (admin UI customizations), `backend/src/scripts/seed.ts`.

- Frontend: `frontend/` — Nuxt (v4) app.
  - `frontend/nuxt.config.ts` — runtime config uses `public.medusa.backendUrl` (development fallback `http://localhost:9000`).
  - `frontend/package.json` — scripts: `dev`, `build`, `generate`, `preview`.

## Big picture architecture
- Two independent processes during development:
  1. Medusa backend (API + Admin dashboard dev server) running on localhost:9000.
  2. Nuxt frontend running separately (Nuxt dev server). The frontend reads the backend URL from `public.medusa.backendUrl` in `nuxt.config.ts`.
- Persistent data is Postgres + Redis (docker-compose in `backend/docker-compose.yml`). Medusa config reads DB and secret env vars from `process.env` in `medusa-config.ts`.

## Critical workflows & exact commands
- Recommended dev flow (local machine):
  1. Start DB & Redis:
     - cd `backend` && docker-compose up -d postgres redis
  2. In `backend/` install & run Medusa (this repo uses pnpm in helper scripts):
     - pnpm install
     - pnpm dev   # runs `medusa develop` (hot-reload admin + API)
     - or run `./start.sh` if you used docker-compose service names (script waits for services and runs `pnpm medusa develop`).
  3. In `frontend/`:
     - pnpm install
     - pnpm dev   # starts Nuxt dev server; it uses `public.medusa.backendUrl` fallback of `http://localhost:9000` in dev

- Tests (backend):
  - Unit: run `pnpm test:unit` from `backend/`.
  - Integration (http): `pnpm test:integration:http` (these set TEST_TYPE and use jest with experimental vm modules).

## Env vars & important config points
- Node engine: `>=20` (see `backend/package.json`).
- Important env vars referenced in `backend/medusa-config.ts`:
  - DATABASE_URL, REDIS_URL — DB/Redis connection strings
  - JWT_SECRET, COOKIE_SECRET — auth secrets (defaults present, but change for prod)
  - STORE_CORS, ADMIN_CORS, AUTH_CORS — CORS origins
  - MEDUSA_BACKEND_URL — optional admin backend URL override

## Project-specific patterns & conventions
- Uses Medusa's modular structure: add behaviors by creating modules under `backend/src/modules/` and custom routes under `backend/src/api/store/custom/` or `backend/src/api/admin/custom/`.
- Admin UI local dev uses Vite; Vite server settings are customized in `medusa-config.ts` (host 0.0.0.0, allowedHosts, HMR port client config). When editing admin frontend assets, medusa's dev server serves the admin dashboard.
- Nuxt runtime config is typed via `types/runtime-config.d.ts` (project augments runtime types in `nuxt.config.ts` → `typescript.tsConfig.compilerOptions.types`). Keep runtime config keys stable (frontend expects `public.medusa.backendUrl`).

## Integration & cross-component notes
- Frontend ↔ Backend: frontend calls Medusa API at `public.medusa.backendUrl` (dev fallback `http://localhost:9000`). When running backend inside Docker, ensure host/port mapping and `MEDUSA_BACKEND_URL`/`public.medusa.backendUrl` are consistent.
- Tests rely on `@medusajs/test-utils` and use `NODE_OPTIONS=--experimental-vm-modules` in scripts; preserve those flags when invoking Jest programmatically.

## Examples to reference when editing code
- Add an API route: look at `backend/src/api/store/custom/route.ts` for the route pattern and handlers.
- Admin i18n: see `backend/src/admin/i18n/json/en.json` — name keys are consumed by admin UI.
- DB setup in CI/local before running Medusa: `pnpm medusa db:setup` (see `start.sh`).

## Safety & testing guidance (for AI changes)
- Avoid changing secrets in repo; prefer reading env vars. If adding migrations or DB changes, run `pnpm medusa db:migrate` and ensure tests still pass.
- Running or editing integration tests: use the provided Jest scripts; maintain the `TEST_TYPE` pattern used by the test harness.

If any of these specifics are out-of-date or you'd like a shorter or more detailed variant (e.g., CI-focused or contributor-focused), tell me which section to expand or reword.
