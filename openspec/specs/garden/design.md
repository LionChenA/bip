# Garden UI Design & Architecture

## Core Interaction Patterns

### In-Place Expansion (The "Flow" Architecture)
The Garden uses a physics-based "In-Place Expansion" model instead of standard modals or page navigations. This maintains user context and "flow" but imposes strict constraints on the DOM structure.

#### The Challenge: Web Physics vs. Document Flow
Implementing "App-like" smooth expansion in a flow-based document (HTML) creates three distinct categories of layout glitches. Future modifications MUST respect the following locking strategies to prevent regression.

### 1. Sibling Layout Locking (Prevents Teleportation)
**Problem**: When a note expands, its height changes instantly in the DOM. Sibling elements "teleport" to their new positions before the animation engine can interpolate the movement, causing visual jitter.
**Solution**: **Global `<LayoutGroup>`**
- **Implementation**: The entire list is wrapped in Framer Motion's `<LayoutGroup>`.
- **Constraint**: ANY dynamic height change in the Garden list MUST occur within this context.
- **Why**: This forces siblings to participate in the layout projection, sliding smoothly instead of jumping.

### 2. Box Model Locking (Prevents Rubber-Banding)
**Problem**: Framer Motion defaults to `scale` transforms for performance. If the *content box dimensions* change during animation (e.g., removing padding to make a card full-width), the rasterized content is stretched/squashed (text distorts) during the transition.
**Solution**: **Constant Padding Strategy**
- **Constraint**: The parent container's padding MUST NOT change between collapsed and expanded states.
- **Technique**: To achieve "Full Width" headers while keeping padding:
  - Keep `p-6` on the container.
  - Use negative margins (`-mx-6`) on the child element that needs to be full width.
- **Result**: The "mathematical" width of the text container remains constant. Framer translates pixels instead of scaling them.

### 3. Viewport Environment Locking (Prevents Shift)
**Problem**: Switching from "Card List" (short content, no scrollbar) to "Reading Mode" (long content, scrollbar appears) reduces the viewport width by ~15px. This shifts the entire layout center to the left.
**Solution**: **`scrollbar-gutter: stable`**
- **Implementation**: Applied globally in `global.css` (or specifically to the Garden container).
- **Constraint**: Do not remove this property. It reserves the scrollbar track space even when not needed, freezing the layout geometric center.

## Rendering Strategy

### SPA Island within Astro
- **Routing**: Uses History API (`pushState`) to update URLs without triggering Astro's Multi-Page App (MPA) navigation.
- **Persistence**: The Garden list state (scroll position, expanded items) is preserved because the DOM is never destroyed, only mutated.

## Data Strategy
- **Preview**: Lightweight JSON manifest (embedded or eagerly fetched).
- **Full Content**: Lazy-fetched on hover (>100ms) or click.
