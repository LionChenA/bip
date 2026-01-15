# Change: Refine Garden UI

## Why
The current Garden UI needs to better reflect the "Minimalist" aesthetic. The timeline needs to be less text-heavy, and the note interaction should be more dynamic and fluid, creating a "premium" feel.

## What Changes
- **Timeline Redesign**: Replace explicit text lists with a double vertical line system (Year + Month lines) with subtle indicators.
- **Note Interaction**:
  - **Default**: Minimal card (Title + Tags only).
  - **Hover**: Smooth expansion to reveal summary.
  - **Active**: Full expansion with sticky header; Timeline remains visible but dimmed; Siblings pushed down (not hidden).
- **Layout**: Precise alignment of horizontal dividers with timeline markers.

## Impact
- **Specs**: `garden-ui`
- **Code**: `Timeline.tsx`, `NoteItem.tsx`, `GardenList.tsx`
