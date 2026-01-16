# Change: Refine Garden UI

## Why
The current Garden UI needs to better reflect the "Minimalist" aesthetic. The timeline needs to be less text-heavy, and the note interaction should be more dynamic and fluid, creating a "premium" feel. This update incorporates final design decisions for timeline visualization, reading mode transitions, and data performance.

## What Changes
- **Double Vertical Line Timeline (SVG)**: Replace explicit text lists with a Year + Month vertical line system. Markers align horizontally with the first note of each period.
- **Reading Mode (SPA Island)**: **BREAKING** Note expansion uses layout projection. The title becomes sticky, and the URL updates via History API (`pushState`) without full page reloads.
- **Data Pre-heating**: Implementation of lightweight preview data (1KB) in the manifest and hover-triggered (100ms) background fetching for full content.
- **Cleanup**: **BREAKING** Completely remove `src/pages/[lang]/blog/` and legacy blog assets to unify under the Garden system.
- **Animation Stack**: Standardize on `framer-motion` for layout projection and micro-interactions.

## Impact
- Affected specs: `garden-ui`
- Affected code: `src/components/garden/*`, `src/pages/[lang]/garden/*`, `src/pages/[lang]/blog/*` (removal)

## Technical Retrospective: The Physics of Digital Garden

This section documents the technical journey of implementing the fluid "In-Place Expansion" interaction, which required solving significant challenges in Web layout physics.

### 1. The Vision: "Flow State"
We chose the difficult path of **In-Place Expansion** over standard Modals.
*   **Goal**: When a user clicks a card, it grows naturally within the list, pushing sibling elements away. The URL updates (for sharing), but the page does not reload.
*   **Challenge**: This requires the DOM structure to remain in the Document Flow while performing high-performance GPU animations—typically conflicting requirements.

### 2. The Conflicts
We encountered three major classes of physics failures during implementation:

#### A. The Broken Physics (Layout Thrashing)
*   **Symptom**: Expanding a card caused sibling cards below it to teleport instantly or jitter violently.
*   **Cause**: React renders the expanded state (adding 2000px of content) instantly. The document flow changes immediately, but Framer Motion's animation is continuous. Sibling elements were being "pushed" by the DOM update before the animation engine could smoothly interpolate their positions.

#### B. The Distortion (Rubber-Banding)
*   **Symptom**: During expansion, text headers and tags appeared to stretch horizontally or vertically like rubber, snapping back only when the animation finished.
*   **Cause**: To maintain 60fps, Framer Motion defaults to **Scale Transforms**. It takes a snapshot of the small card and scales it up. If the content box's aspect ratio or width changes during this process (e.g., removing padding), the rasterized snapshot is stretched, distorting the text.

#### C. The Environment Shift (Scrollbar Jump)
*   **Symptom**: When note content appeared, the entire page shifted left by ~15px.
*   **Cause**: The transition from "Preview Mode" (no scrollbar) to "Read Mode" (long content with scrollbar) caused the viewport width to decrease, shifting the layout center.

### 3. The Solution
We solved these by implementing a "Locking Strategy" across three dimensions:

#### A. Physical Locking: `<LayoutGroup>`
The solution to layout thrashing.
We wrapped the `GardenList` in Framer Motion's `<LayoutGroup>`.
*   **Mechanism**: This acts as a global sensor network. When one component triggers a layout change, `LayoutGroup` forces all sibling components to participate in the layout projection, ensuring they slide smoothly to their new positions instead of reacting passively to DOM reflows.

#### B. Box Model Locking: Constant Padding Strategy
The solution to text distortion.
We abandoned the "remove padding on expand" approach.
*   **Old Logic**: `isExpanded ? "p-0" : "p-6"` → Caused content width changes → Text stretching.
*   **New Logic**: Always keep `px-6`.
    *   **Technique**: For the Sticky Header which needs to be full-width, we use **negative margins** (`-mx-6`) to counteract the padding visually.
    *   **Result**: The content width for text elements remains mathematically constant throughout the animation. Framer Motion detects no geometry change for the text container, so it translates the text instead of scaling it.

#### C. Viewport Locking: `scrollbar-gutter`
The solution to environment shifts.
*   **Code**: `html { scrollbar-gutter: stable both-edges; }`
*   **Result**: The browser reserves space for the scrollbar at all times, even when content is short. The geometric center of the layout remains locked regardless of content length.

### Conclusion
Achieving "App-like" fluidity on the Web isn't just about using an animation library; it's about controlling the environment. By locking the **Sibling Relationships** (LayoutGroup), **Box Geometry** (Negative Margins), and **Browser Environment** (Scrollbar Gutter), we achieved a physically grounded, distortion-free interaction.
