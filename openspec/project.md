# Project Context

## Purpose
A personal website serving as a **Digital Garden, Portfolio, and CV**.
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

## Modular Architecture

### Core Module Charter
The `core` module (`src/modules/core`) encapsulates shared technical foundations.
- **Responsibility**: Layouts, SEO, Design System primitives (UI kit), and global styles.
- **Non-Goal**: Domain-specific logic or content.
- **Exports**: Only generic components and utilities used by multiple domains.

### Module Structure Guidelines
All domain features reside in `src/modules/<domain>/`.
- **Structure**:
  - `components/`: React/Astro components private to the module.
  - `data/`: Data fetching, transformations, and Zod schemas.
  - `pages/`: (Optional) Module-specific routes if decoupled from global routing.
  - `index.ts`: Public API barrel file. **Only** import from here.

### Dependency Rules
- **Strict Encapsulation**: Modules (e.g., `garden`, `work`) MUST NOT import from each other directly.
- **Shared Access**: Modules MAY import from `core`.
- **Verticals**: `pages/` (the app root) orchestrates modules by importing from their public `index.ts`.

## Project Conventions

### Code Style
- **Aesthetics**:
  - **Visuals**: Minimalist structure (clean typography, generous whitespace).
  - **Interactivity**: "Creative nuances" - subtle micro-interactions, smooth view transitions, and a "Wow" factor on the homepage.
  - **Theme**: Support Light/Dark mode toggling.
- **File Structure**:
  - `@/` maps to `./src/`
  - Components: `src/components/ui` (atomic), `src/components/shared` (layout-related).
  - Content: `src/content/{collection}/{lang}/` (e.g., `src/content/garden/zh/my-post.md`).

### Architecture Patterns
- **Navigation**:
  - **Global Header**: Present on all pages with Logo, Links (Home, Garden, Work, About), and Utility controls (Theme, Lang).
  - **Language Switcher**: Switch between EN/ZH preserving the current path.
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
  2. **Garden** (Blog): Technical articles, thoughts, and knowledge base.
  3. **Work** (Portfolio): Visual showcase of projects with tech stack details.
  4. **About**: Professional identity, CV/Resume.
  5. **Snippets** (Planned): Reusable code blocks.
  6. **Uses** (Planned): Hardware/Software stack.

## Important Constraints
- **SEO First**: All content pages must generate semantic HTML.
- **Performance**: Minimize client-side JS. Use Astro Islands (`client:*`) only when necessary.
- **Accessibility**: Ensure sufficient contrast and keyboard navigability.
