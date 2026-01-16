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
