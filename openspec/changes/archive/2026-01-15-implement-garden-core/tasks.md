# Implementation Tasks

1.  **Content Layer Setup**
    -   [x] Define `garden` schema in `src/content/config.ts` (Migration from `blog`). <!-- validation: `openspec validate` -->
    -   [x] Create dummy content for `garden` (types: evergreen, literature, article) for testing.
    -   [x] Create build script to generate `src/data/garden-meta.json` (metadata bundle) using `getCollection`.
    -   [x] Implement `lib/backlinks.ts` script to generate `src/data/backlinks.json` by scanning content.

2.  **MDX Configuration**
    -   [x] Install dependencies: `remark-math`, `rehype-katex`, `remark-toc`.
    -   [x] Configure Astro `markdown` options (Shiki is built-in, add external plugins).
    -   [x] Implement custom Remark plugin for backlinks extraction.
    -   [x] Create `remark-garden-links` plugin (or similar logic) to validate/normalize links.

3.  **Garden Core UI Components**
    -   [x] Create `Timeline` component (Left sidebar, Year/Month/Quarter logic).
    -   [x] Create `FilterBar` component (Type selection).
    -   [x] Create `GardenList` component (Infinite scroll logic, fetching metadata JSON).

4.  **Interaction & Animation**
    -   [x] Implement `NoteItem` with Framer Motion `layoutId` for expansion.
    -   [x] Implement React-based Router logic for Garden Island (pushState/popstate) in `GardenList`.
    -   [x] Create floating `TOC` component.

5.  **Page Integration**
    -   [x] Create `src/pages/garden/index.astro` (Main entry).
    -   [x] Create `src/pages/garden/[...slug].astro` (Fallback for direct access/SEO).
    -   [x] Ensure `backlinks.json` is consumed correctly by the UI.
