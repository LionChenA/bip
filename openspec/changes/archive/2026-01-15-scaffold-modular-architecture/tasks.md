## 1. Cleanup
- [x] 1.1 Remove `src/pages/markdown-page.md`.
- [x] 1.2 Remove `src/pages/index.astro` (will be replaced).
- [x] 1.3 Remove any default components in `src/components` not being kept.

## 2. Architecture Scaffold
- [x] 2.1 Create `src/modules/blog/components`.
- [x] 2.2 Create `src/modules/portfolio/components`.
- [x] 2.3 Create `src/modules/core/components` (Header, Footer).
- [x] 2.4 Create `src/modules/core/layouts` (BaseLayout).

## 3. Content Layer
- [x] 3.1 Create `src/content/blog/` and `src/content/portfolio/`.
- [x] 3.2 Implement `src/content/config.ts` with Zod schemas for Blog and Portfolio.

## 4. UI Foundation (Shadcn)
- [x] 4.1 Initialize Shadcn (if not already strictly set) or ensure `components.json` matches constraints.
- [x] 4.2 Add components: `card`, `badge`, `separator`, `navigation-menu`, `sheet`, `avatar`, `button`.

## 5. Routing & i18n
- [x] 5.1 Create `src/pages/[lang]/index.astro` (Home).
- [x] 5.2 Create `src/pages/[lang]/blog/index.astro` (List).
- [x] 5.3 Create `src/pages/[lang]/blog/[...slug].astro` (Post).
- [x] 5.4 Implement `getStaticPaths` for supported languages (en, zh).

## 6. Verification
- [x] 6.1 Run `npm run build` to ensure no routing conflicts.
- [x] 6.2 Verify Content Collections load correctly.
