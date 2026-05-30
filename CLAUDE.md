# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What This App Does

LastBite is a Thai food-waste-reduction marketplace. Customers browse and buy discounted near-expiry food from local stores; merchants list surplus products and manage pickup orders. The UI is in Thai.

## Current Backend Status

The app is **entirely frontend with mock data.** Firebase (`src/lib/firebase.ts`) is initialized and exports `auth` and `db`, but is not yet called anywhere in the app. All reads come from JSON files in `src/data/` via helper functions in `src/lib/mock-data.ts`. Both Zustand stores are seeded from these JSON files on every page load and **reset on refresh** — there is no persistence layer yet.

## Route → Component Pattern

Every `page.tsx` is a thin shell that renders exactly one screen component and nothing else. All UI logic, state hooks, and event handlers live in `src/components/customer/` or `src/components/merchant/`. Keep this split: pages own routing concerns, screen components own everything else.

The one exception is `src/app/merchant/orders/check/page.tsx`, which wraps its screen in `<Suspense>` because the screen component calls `useSearchParams()` to read the QR-code URL parameter.

## State Management

Two Zustand stores, one per user role:

- `useCustomerStore` (`src/store/customer.ts`): cart, orders, demo user. Cart enforces single-store: adding a product from a different store returns `"needsClear"` and saves the product as `pendingProduct`; the UI must call `confirmAddDifferentStore` or `clearPendingProduct` to resolve it.
- `useMerchantStore` (`src/store/merchant.ts`): the merchant's products, orders, and withdrawal requests. All mutations are in-memory.

## Design System

Custom layout utility classes are defined in `src/app/globals.css`:
- `.page-shell` / `.page-layer`: stacking context pair used on every top-level page wrapper
- `.soft-panel` / `.warm-panel`: frosted-glass card surfaces used for headers and floating panels

Design tokens are CSS variables (`--lb-yellow`, `--lb-black`, `--lb-muted`, etc.). In practice, these are also used as inline Tailwind arbitrary values (e.g. `text-[#FFD600]`, `bg-[#1C1B1B]`). Keep these color values consistent with the `--lb-*` variable palette.

## Icons

All icons come from `@hugeicons/react` but must be imported exclusively through `src/components/ui/icons.tsx`. Add new icons to that wrapper file; never import from `@hugeicons/react` directly in page or component files.
