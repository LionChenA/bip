# Design: Digital Garden Core

## Architecture

### Content Layer
- **Collection**: `garden`
  - **Types**:
    - `evergreen`: Permanent, evolving notes.
    - `literature`: Notes on books/papers.
    - `article`: Polished, standalone posts (migrated from blog).
  - **Schema Changes**: Add `type` enum. Remove `heroImage` (unless needed for articles). Add `lastGroomed` (optional) for evergreen notes.
- **Backlinks**:
  - **Strategy**: Custom Remark plugin used during the build process.
  - **Output**: `src/data/backlinks.json`.
  - **Syntax**: Standard Markdown links `[Title](/garden/slug)`.
  - **Logic**: Plugin extracts internal links -> builds adjacency list -> writes JSON file.
- **Content Strategy**:
  - Pre-bundle all metadata into a single JSON file (`src/data/garden-meta.json`) generated via `getCollection` at build time.
  - Infinite scroll consumes this client-side JSON to avoid repeated requests.
  - Full content loading: Fetch pre-built JSON or API route (if needed) but primarily rely on the pre-built metadata for the list and standard page loads for direct access.

### UI/UX Design

#### Timeline Layout
- **Left Sidebar**: 
  - Fixed position.
  - Shows Years and Months.
  - Visual dividers for quarters (Q1, Q2, Q3, Q4 markers).
  - Active state follows scroll position.
- **Main Feed**:
  - Infinite scroll list.
  - Items are initially compact summaries.
  - **Interaction**:
    - Click expands the item *in place* (using `layoutId` from Framer Motion).
    - The URL updates to the item's slug without a full page reload (using `history.pushState`).
    - The item title moves to a sticky header or prominent position.
    - A TOC appears on the right (floating).
    - The timeline fades out or becomes less prominent to focus on reading.

#### Rendering Strategy
- **SPA Island Architecture**:
  - The Garden List page acts as a persistent "Island".
  - **Routing Constraint**: Links in the garden list MUST use `preventDefault()` to bypass Astro View Transitions (if enabled) and browser default navigation.
  - **State Management**: Use React state for `selectedSlug` and `expanded` status.
  - **Navigation**:
    - Use `window.history.pushState` to update the URL when an article is expanded.
    - Handle `popstate` events to close the expanded view instead of navigating away when the back button is pressed.
- **List View**: Client-side rendering using the pre-fetched `garden-meta.json`.
- **Detail View**: 
  - Direct access (`bip.com/garden/my-note`) loads a standard SSG page.
  - In-app navigation expands the note in-place using the SPA logic.

### MDX Pipeline
- **Plugins**:
  - `remark-math` / `rehype-katex` for Math.
  - `shiki` for code (Astro default, ensure config).
  - `remark-toc` (conditional generation).
  - Custom `remark-garden-links`:
    - Transforms `[[WikiLink]]` (if supported) or verifies `[Link](/garden/...)`.
    - We will stick to the user's request: "Parse standard Markdown links `[Title](/garden/slug)`".

## Technical Components
- `src/content/config.ts`: Define `garden` collection.
- `src/pages/garden/index.astro`: The main app shell.
- `src/components/garden/Timeline.tsx`: Left navigation.
- `src/components/garden/NoteList.tsx`: Infinite scroll container.
- `src/components/garden/NoteItem.tsx`: Expandable card.
- `lib/backlinks.ts`: Logic for generating the graph.
