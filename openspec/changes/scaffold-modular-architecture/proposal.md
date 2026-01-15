# Change: Scaffold Modular Monolith Architecture & Blog Framework

## Why
The current project is a default Astro template. To support a scalable Blog, Portfolio, and CV with i18n capabilities, we need to transition to a modular architecture. This ensures clear separation of concerns, easier maintenance, and strict boundaries between generic UI components and feature-specific logic.

## What Changes
- **Architecture**: Introduce `src/modules/` for feature-based organization (Blog, Portfolio, Core).
- **Routing**: **BREAKING** Move all pages to `src/pages/[lang]/` to enforce internationalization.
- **Content**: Define type-safe Content Collections for `blog` and `portfolio`.
- **UI**: Establish `src/components/ui` as the exclusive home for Shadcn components.
- **Cleanup**: Remove default Astro template files (`index.astro`, `markdown-page.md`, generic layouts).

## Impact
- **Affected specs**: `architecture`, `routing`, `content`, `ui`.
- **Affected code**: `src/pages/`, `src/components/`, `src/content/config.ts`.
- **Breaking**: Default routes `/` will likely redirect or change behavior.
