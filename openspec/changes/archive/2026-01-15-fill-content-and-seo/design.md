# Design: Fill Pages & SEO

## Context
We need to present portfolio work and technical skills in a rich, interactive way without over-engineering the data layer. We also need to expose content to search engines and RSS readers.

## Goals
-   **Rich Interactions**: Use `framer-motion` for the Stack tab (progress bars, hover effects) to give a "premium" feel.
-   **Content Driven**: All project data comes from Markdown/Content Collections.
-   **Automated SEO**: Sitemap and RSS should be generated automatically from content.

## Decisions

### 1. Stack Data Architecture
We will use a **Hybrid Relationship** pattern.
-   **Source of Truth**: `src/data/stack.ts` contains the canonical list of technologies, including metadata (Icon component, label, brand color).
-   **Usage Stats**: Derived dynamically from `portfolio` content collection tags at build/runtime.
-   **Work Page**: Combines `stack.ts` (definitions) + Portfolio Tags (usage count) + Manual Progress (optional field in `stack.ts`).
-   **About Page**: Uses `stack.ts` directly for a simple "Icon Wall".

### 2. Icon Strategy
-   **Library**: Use `react-icons` for a vast library of high-quality SVG icons.
-   **Usage**: Import specific icons (e.g., `SiReact`, `SiTypescript`) in `src/data/stack.ts`.
-   **Coloring**:
    -   **Monochrome**: Default to `currentColor` for cohesive UI.
    -   **Brand**: Use defined brand colors from `stack.ts` on hover or specific sections.

### 3. Garden vs Blog
The user refers to "Garden" but the collection is `blog`.
-   **Decision**: We will keep the directory `src/content/blog` but expose it as "Garden" in the UI (URLs `/garden/...`).
-   **Tag Pages**: generated at `src/pages/garden/tags/[tag].astro`.

### 3. SEO Strategy
-   **Global SEO**: A reusable `<SEO />` component layout that accepts `title`, `description`, `image`.
-   **Sitemap**: Use `@astrojs/sitemap` integration.
-   **RSS**: Two feeds.
    -   `/rss.xml`: Includes everything (or just main posts).
    -   `/rss-articles.xml`: Filtered list of "articles" (long-form).

## Risks
-   **Bundle Size**: `framer-motion` is heavy. We should lazy load it or ensure it's only on the Work page if possible (Astro isolates pages by default, so it's fine).
-   **Performance**: "Icon Wall" with many elements might be heavy. We will use simple SVGs or optimized icons.
