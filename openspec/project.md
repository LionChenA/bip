# Project Context

## Purpose
A personal website serving as a **Blog, Portfolio, and CV**.
It aims to showcase the user's technical skills, creative projects, and thoughts through a **minimalist yet interactive** interface.
The site serves as a professional identity hub for a developer/engineer.

## Tech Stack
- **Framework**: Astro 5 (Content-driven, Static Site Generation preferred)
- **Language**: TypeScript
- **UI Architecture**:
  - **Core**: React 19 (for interactive islands)
  - **Styling**: TailwindCSS 4
  - **Component Library**: shadcn/ui (customized via base-ui/radix-ui patterns)
  - **Icons**: Lucide React
- **Content Management**:
  - **Format**: MDX (Markdown + React components)
  - **Storage**: Git-based filesystem (`src/content/`)
  - **Validation**: Zod schemas via Astro Content Collections
- **Animation**: `framer-motion` (for React components) or `motion` (One) for high-performance micro-interactions.
- **Internationalization (i18n)**:
  - Languages: Chinese (Default), English.
  - Strategy: Sub-path routing (e.g., `/` for ZH, `/en/` for EN).

## Project Conventions

### Code Style
- **Aesthetics**:
  - **Visuals**: Minimalist structure (clean typography, generous whitespace).
  - **Interactivity**: "Creative nuances" - subtle micro-interactions, smooth view transitions, and a "Wow" factor on the homepage.
  - **Theme**: Support Light/Dark mode toggling.
- **File Structure**:
  - `@/` maps to `./src/`
  - Components: `src/components/ui` (atomic), `src/components/shared` (layout-related).
  - Content: `src/content/{collection}/{lang}/` (e.g., `src/content/blog/zh/my-post.md`).

### Architecture Patterns
- **Routing**:
  - `src/pages/[lang]/...` for localized routes.
  - `src/pages/index.astro` redirects or handles default locale.
- **Data Fetching**:
  - Use `getCollection()` for retrieving MDX content.
  - Implement separation of concerns: Content logic separate from UI presentation.

### Git Workflow
- **Commits**: Conventional Commits (feat, fix, docs, style, refactor).
- **Branching**: Main branch for production. Feature branches for new modules.

## Domain Context
- **Modules**:
  1. **Home**: High-impact introduction with interactive elements.
  2. **Blog**: Technical articles and thoughts.
  3. **Portfolio**: Visual showcase of projects with tech stack details.
  4. **CV**: Structured resume (Online + Print-friendly).
  5. **Snippets** (Planned): Reusable code blocks.
  6. **Uses** (Planned): Hardware/Software stack.

## Important Constraints
- **SEO First**: All content pages must generate semantic HTML.
- **Performance**: Minimize client-side JS. Use Astro Islands (`client:*`) only when necessary.
- **Accessibility**: Ensure sufficient contrast and keyboard navigability.
