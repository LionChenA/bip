# Implementation Tasks

1.  **Content Layer Setup**
    -   [ ] Define `garden` schema in `src/content/config.ts` (Migration from `blog`). <!-- validation: `openspec validate` -->
    -   [ ] Create dummy content for `garden` (types: evergreen, literature, article) for testing.
    -   [ ] Create build script to generate `src/data/garden-meta.json` (metadata bundle) using `getCollection`.
    -   [ ] Implement `lib/backlinks.ts` script to generate `src/data/backlinks.json` by scanning content.

2.  **MDX Configuration**
    -   [ ] Install dependencies: `remark-math`, `rehype-katex`, `remark-toc`.
    -   [ ] Configure Astro `markdown` options (Shiki is built-in, add external plugins).
    -   [ ] Implement custom Remark plugin for backlinks extraction.
    -   [ ] Create `remark-garden-links` plugin (or similar logic) to validate/normalize links.

3.  **Garden Core UI Components**
    -   [ ] Create `Timeline` component (Left sidebar, Year/Month/Quarter logic).
    -   [ ] Create `FilterBar` component (Type selection).
    -   [ ] Create `GardenList` component (Infinite scroll logic, fetching metadata JSON).

4.  **Interaction & Animation**
    -   [ ] Implement `NoteItem` with Framer Motion `layoutId` for expansion.
    -   [ ] Implement React-based Router logic for Garden Island (pushState/popstate) in `GardenList`.
    -   [ ] Create floating `TOC` component.

5.  **Page Integration**
    -   [ ] Create `src/pages/garden/index.astro` (Main entry).
    -   [ ] Create `src/pages/garden/[...slug].astro` (Fallback for direct access/SEO).
    -   [ ] Ensure `backlinks.json` is consumed correctly by the UI.
