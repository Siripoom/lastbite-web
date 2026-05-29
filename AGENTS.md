# Repository Guidelines

## Project Structure & Module Organization
`lastbite-web` is a Next.js App Router project. Application routes live under `src/app`:
- `src/app/app`: customer-facing PWA routes
- `src/app/merchant`: merchant console routes
- `src/app/login`, `register`, `offline`: standalone entry pages

Shared UI is split into `src/components/ui` (primitives), `src/components/customer`, and `src/components/merchant`. Mock data lives in `src/data`, app helpers in `src/lib`, Zustand stores in `src/store`, and shared TypeScript models in `src/types`. Static assets and PWA files live in `public/`.

## Build, Test, and Development Commands
- `npm run dev`: start the local Next.js dev server
- `npm run build`: create a production build and run TypeScript checks
- `npm run start`: serve the production build locally
- `npm run lint`: run ESLint with the Next.js config

Run `npm run lint` and `npm run build` before opening a PR.

## Coding Style & Naming Conventions
Use TypeScript with React function components. Prefer 2-space indentation in JSX/TSX formatting as already present in the repo. Use `PascalCase` for components, `camelCase` for variables/functions, and kebab-free route folder names matching URL segments. Reuse shared primitives in `src/components/ui` before adding custom one-off UI.

This repo uses ESLint (`eslint.config.mjs`) and Tailwind CSS v4 via `globals.css`. Hugeicons are wrapped through `src/components/ui/icons.tsx`; use that wrapper instead of importing icon packages directly.

## Testing Guidelines
There is no dedicated test framework yet. For now, validation is:
- `npm run lint`
- `npm run build`
- manual checks in customer routes and merchant routes after UI or state changes

When adding tests later, colocate them near the feature or under a dedicated `src/__tests__` tree, and name files `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Git history currently only contains the initial scaffold commit, so follow a short imperative style, for example: `Add merchant dashboard cards` or `Refine customer search layout`.

PRs should include:
- a concise summary of user-facing changes
- affected routes or modules
- screenshots for visual updates
- confirmation that `npm run lint` and `npm run build` passed

## Security & Configuration Tips
Use `.env.example` as the source of required Firebase variables. Do not commit real secrets. Keep PWA assets in `public/` and update `public/manifest.webmanifest` and `public/sw.js` together when changing install/offline behavior.
