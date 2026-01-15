# Implement Digital Garden Core

## Summary
This proposal replaces the traditional `blog` module with a "Digital Garden" core. It introduces a new content architecture (`garden` collection), a unique dual-timeline UI with infinite scroll and in-place expansion, and enhanced MDX processing for backlinks, math, and code highlighting.

## Motivation
The current linear blog format limits the expression of interconnected thoughts. A Digital Garden architecture allows for evolving content ("evergreen", "literature", "article") and bidirectional linking, creating a richer knowledge network. The new UI aims to provide a fluid, exploratory user experience.

## Scope
- **Data Layer**:
  - Replace `blog` collection with `garden`.
  - Implement bidirectional linking with custom Remark plugin generating `src/data/backlinks.json`.
  - Pre-bundle metadata into `src/data/garden-meta.json`.
- **UI/UX**:
  - Dual timeline layout.
  - Infinite scroll consuming client-side JSON.
  - **SPA Island Architecture**: React-based router handling `pushState`/`popstate` for in-place expansion without full page reloads.
  - Framer Motion based transitions.
  - Filtering system.
- **MDX**:
  - Integration of Shiki, KaTeX, Remark TOC.
  - Custom backlink extraction plugin.

## Risks & Mitigations
- **Performance**: Loading all metadata for infinite scroll might be heavy if the garden grows huge.
  - *Mitigation*: The user estimates 10KB for metadata, which is acceptable. We will ensure the JSON payload is minimal.
- **SEO**: Infinite scroll and in-place expansion can be tricky for SEO.
  - *Mitigation*: We will ensure individual pages are still accessible via their direct URLs (`/garden/slug`) and SSR/SSG is handled correctly for the initial load.
- **Migration**: Existing blog posts need to be migrated.
  - *Mitigation*: We will map existing posts to the `article` type.
