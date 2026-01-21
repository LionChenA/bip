# Change: Landing Page Exploration

## Why
The homepage is the "Thesis Statement". We need to explore different visual metaphors (Swiss, Terminal, Lattice) to find the best fit. 
We also need to allow live preview switching while preserving the essential language redirection logic.

## What Changes
1. **Architecture**: Create `src/modules/home` to house landing page variants.
2. **Feature**: Implement a client-side **Layout Switcher** (persisted in localStorage).
3. **Variants**:
   - `Swiss`: Grid & Typography.
   - `Terminal`: Monospace & Typewriter effect.
   - `Lattice`: SVG Network topology.
4. **Routing**: Update `src/pages/index.astro` to render the Landing Page AND handle language redirection (e.g., auto-redirect only if no preference, or provide manual entry).

## Impact
- **Affected Specs**: `ui`
- **Affected Code**: `src/pages/index.astro`, `src/modules/home`
