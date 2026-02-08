## Context

The project currently uses Vitest for unit tests. We are adding Storybook 8 for component development and Playwright for E2E testing to complete the testing pyramid.

## Goals

1. **Unified Config**: Ensure all tools (Vitest, Storybook) respect the Astro configuration (Tailwind, path aliases).
2. **Minimal Boilerplate**: Use official integrations where possible to reduce maintenance.
3. **CI-Ready**: Ensure all tests can run headlessly in CI.

## Decisions

### 1. Storybook Integration

We will use the official `@storybook/react-vite` framework.
- **Config**: `.storybook/main.ts` will use the `viteFinal` hook to merge Astro's Vite config.
- **Addon**: We will use `@storybook/addon-essentials` and `@storybook/addon-interactions` (for the `play` function).
- **Styles**: Import global CSS (Tailwind) in `.storybook/preview.ts`.

### 2. Playwright Configuration

- **Config**: `playwright.config.ts` will be created at root.
- **Base URL**: Set to `http://localhost:4321` (Astro dev server) or `4322` (preview server).
- **Web Server**: Configure Playwright to spin up `pnpm preview` automatically before running tests.

### 3. Vitest Configuration Fix

The current `vitest.config.ts` has a type error because `getViteConfig` returns a `UserConfig` which doesn't know about `test` property.
- **Fix**: Use `/// <reference types="vitest" />` (already there) but ensure the `test` object is recognized, or cast the config.

### 4. Project Structure

- **Unit Tests**: Co-located `*.test.tsx` files (continue existing pattern).
- **Stories**: Co-located `*.stories.tsx` files.
- **E2E Tests**: Dedicated `e2e/` directory at root.
