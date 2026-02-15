# Web Frontend v2 (SvelteKit)

SvelteKit-based rewrite of the CodeCanvas frontend.

## Local Development

1. Start the API server from repo root:

```sh
go run ./server/main.go
```

2. Configure frontend API base URL:

```sh
cd web-frontend-v2
cp .env.example .env
```

3. Start the frontend:

```sh
npm run dev
```

App URL is shown by Vite (usually `http://localhost:5173`).

## API Contract

- `GET /api/v1/languages`
- `POST /api/v1/run`

## Quality Checks

```sh
npm run check
npm run build
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
