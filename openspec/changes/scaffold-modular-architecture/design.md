# Design: Modular Monolith & Blog Framework

## Context
We are building a personal website (Blog, Portfolio, CV) with Astro. The project requires i18n (Chinese/English) and a clean separation between generic UI components and domain-specific features.

## Goals
- **Modular Isolation**: Feature-specific code (e.g., Blog cards, Portfolio grids) lives in `src/modules/<feature>`.
- **Generic UI**: Reusable atoms (Buttons, Cards) live in `src/components/ui`.
- **i18n First**: Routing structure enforces locale handling from the start.
- **Type Safety**: Use Astro Content Collections for all content data.

## Decisions
- **Decision**: Use `src/modules/{core,blog,portfolio}` structure.
    - **Why**: Prevents `src/components` from becoming a dumping ground. keeps related logic together.
- **Decision**: Use `src/pages/[lang]/` dynamic routing.
    - **Why**: Native Astro support for i18n routing without complex middleware for this scale.
- **Decision**: strict separation of `components/ui` (Shadcn) vs `modules/*/components`.
    - **Why**: Allows updating the UI library without breaking business logic components.

## Risks / Trade-offs
- **Complexity**: Slightly more initial boilerplate than a flat structure.
- **Routing**: `[lang]` parameter needs to be handled in `getStaticPaths` or middleware for redirection.

## Open Questions
- Exact list of Shadcn components to install initially (starting with core set).
