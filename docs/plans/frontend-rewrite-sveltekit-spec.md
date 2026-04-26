# Frontend Rewrite Spec (SvelteKit)

Created: 2026-02-15T03:59:21Z (UTC)
Branch: `feat/frontend-rewrite-sveltekit`

## Summary
Rewrite `web-frontend/` from the current webpack + vanilla JS setup to `SvelteKit`.

This keeps the frontend lightweight while giving us modern routing, component structure, build tooling, and deploy adapters without committing to a heavy framework runtime.

## Framework Decision

### Candidates
- `SvelteKit`
- `Astro`
- `SolidStart`

### Decision
Choose `SvelteKit`.

### Why SvelteKit for this repo
- Best fit for an app-style, interactive UI (editor + run action + output panes), not a content site.
- Lightweight component model and low runtime overhead.
- Official adapter model is straightforward for static or Node deployment targets.
- Very strong DX for small teams: fast iteration, easy state flow, clear file-based routing.

### Why not Astro as primary
- Astro is excellent for content-first sites with islands, but this project is a single interactive app surface where most UI is hydrated and stateful.
- Using Astro here would add conceptual overhead without clear payoff.

### Why not SolidStart as primary
- SolidStart is a valid option and performant, but SvelteKit has broader ecosystem/docs familiarity for handoff and maintenance in this codebase.

## Goals
- Replace legacy webpack frontend with a modern framework architecture.
- Preserve existing API behavior:
  - `GET /api/v1/languages`
  - `POST /api/v1/run`
- Keep UX familiar while improving maintainability and testability.
- Keep bundle size and dependencies modest.

## Non-goals
- Backend API redesign.
- Authentication/authorization changes.
- Feature expansion beyond current runner UX in phase 1.

## Proposed Architecture
- Framework: `SvelteKit`.
- Build toolchain: default SvelteKit tooling.
- Routing:
  - `/` main runner page.
- Core UI modules:
  - `LanguageSelect`
  - `ThemeSelect`
  - `CodeEditor`
  - `RunButton`
  - `OutputPanel` (`stdout`, `stderr`, `error`)
- API client:
  - Single module for `getLanguages()` and `runCode()`.
  - `PUBLIC_API_BASE_URL` env support for local/dev/prod.
  - Runtime selector for quickly switching between local and production backends during development.
- State:
  - Minimal Svelte stores for language/theme/source/output/loading.

## Migration Plan

### Phase 0: Scaffolding
- Create a new SvelteKit app in `web-frontend/` (or `web-frontend-v2/` if parallel migration is preferred).
- Add base page layout and shared styles.
- Add environment configuration for API base URL.

### Phase 1: API Integration
- Implement `GET /api/v1/languages` fetch and populate language select.
- Implement `POST /api/v1/run` with request/response typing.
- Add loading, error, and timeout UX states.

### Phase 2: Editor + UX Parity
- Integrate code editor component (CodeMirror wrapper).
- Add theme selection and default starter snippets by language.
- Preserve stdout/stderr/error rendering behavior.

### Phase 3: Hardening + Tests
- Add unit tests for API client and component behavior.
- Add one end-to-end smoke test for "select language -> run code -> see output".
- Validate production build and static assets.

## Acceptance Criteria
- Frontend starts locally and can run code against local API server.
- Frontend can also be run locally against the production backend used by GitHub Pages.
- Language list loads from server at runtime.
- Running sample `bash` and `python3` code returns output correctly when runtime binaries are available.
- No regression in core workflow vs current frontend.
- CI includes frontend build + at least basic tests.

## Local Dev Workflow (Target)
- Start API server: `go run ./server/main.go`
- Start frontend dev server in `web-frontend`: `npm install && npm run dev`
- Configure API URL via `.env` (`PUBLIC_API_BASE_URL=http://localhost:10100`) when you want to force the local backend.
- Leave `PUBLIC_API_BASE_URL` unset to exercise the production backend locally before a GitHub Pages deploy.

## Risks
- Runtime language availability differences (for example `python3` in sandbox rootfs).
- Migration friction if we replace `web-frontend` in place instead of parallel folder rollout.
- Existing styling/editor behavior parity may require incremental tuning.

## Rollout Recommendation
- Build in `web-frontend-v2/` first for low-risk validation.
- Switch deployment/build wiring after parity is confirmed.
- Remove legacy webpack frontend after cutover.
