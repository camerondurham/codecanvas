# Web Frontend v2 (SvelteKit)

SvelteKit-based rewrite of the CodeCanvas frontend.

## Local Development

By default, the frontend now targets the production backend (`https://runner.fly.dev`) so you can verify a local UI change against the same endpoint the GitHub Pages build will use.

1. Start the frontend against the production API:

```sh
cd web-frontend-v2
npm run dev
```

2. If you want to test against a local API server instead, either start the dev server with the local preset:

```sh
npm run dev:local-api
```

or create a local override:

```sh
cp .env.example .env
```

3. To run the backend locally, start the API server from repo root:

```sh
go run ./server/main.go
```

App URL is shown by Vite (usually `http://localhost:5173`).

In local development, you can switch between `Production` and `Local` backends in the app header without restarting the frontend.

## GitHub Pages Parity Check

To verify the exact deployment-style configuration locally, build with the Pages base path and the production API endpoint, then preview it locally:

```sh
npm run preview:pages
```

This serves the static site with:
- base path: `/codecanvas`
- API backend: `https://runner.fly.dev`
- backend selector hidden, matching the deployed GitHub Pages app

## API Contract

- `GET /api/v1/languages`
- `POST /api/v1/run`

## Quality Checks

```sh
npm run check
npm run build
npm run build:pages
```

## Smoke Test

Runs an end-to-end UI smoke test with Playwright. It starts both the API server and frontend dev server automatically.

```sh
npm run test:smoke
```

On NixOS, use the Chromium wrapper from `nixpkgs`:

```sh
npm run test:smoke:nix
```

## GitHub Pages Deployment

Concrete deployment target:
- URL: `https://camerondurham.github.io/codecanvas/`
- API backend URL used in Pages build: `https://runner.fly.dev`
- Workflow: `.github/workflows/deploy-web-frontend-v2-pages.yml`

The workflow triggers on push to `main` when `web-frontend-v2/**` changes, and can also be run manually.
