## Phase 1: Cleanup
- [x] 1.1 Remove `src/pages/[lang]/blog/` directory and all legacy blog-specific assets.
- [x] 1.2 Update global navigation to point all blog references to `/garden`.

## Phase 2: Core Logic
- [x] 2.1 Implement backlinks indexing logic in the MDX processing pipeline.
- [x] 2.2 Implement proportional calculation logic ($k=0.4$) for timeline marker spacing based on note density.
- [x] 2.3 Refactor Garden manifest generation to include 1KB preview data per note.

## Phase 3: Components
- [x] 3.1 Create `SVGTimeline.tsx` with double-line structure and "Top-Anchor" alignment logic.
- [x] 3.2 Update `NoteItem.tsx` with 3-state logic (Default, Hover, Active) using `framer-motion` layout projection.
- [x] 3.3 Implement `StickyTitle` component for Reading Mode.

## Phase 4: UX
- [x] 4.1 Implement History API management (`pushState`, `popstate`) for SPA-like navigation in Garden.
- [x] 4.2 Add pre-heating listeners (100ms hover delay) to trigger background content fetching.
- [x] 4.3 Implement `Esc` key listener and Shadcn `Kbd` hint for Reading Mode closure.

## Phase 5: Refinements (User Request)
- [x] 5.1 Generate 20+ mock data items covering 5 years.
- [x] 5.2 Refine Timeline: Increase width (1.5x), thicker lines (3px -> 6px on hover), adjust proportion factor k.
- [x] 5.3 Refine NoteItem: Browse/Hover/Read states (Title -> Meta, No summary -> Reveal Summary).
- [x] 5.4 Fix "stretched title" animation bug in NoteItem.
- [x] 5.5 Styles: Replace hardcoded colors with `global.css` semantic variables.
- [x] 5.6 Layout: Reduce/unify spacing under Headings across Garden/Work/About.
