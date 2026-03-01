## Context

The personal website currently features a `d3-force` based constellation background. To better align with the core philosophy ("Swiss Flux" minimalism, Chinese ink-wash aesthetics, and Marxist humanism), we are completely replacing this with a `tsparticles` (v3) canvas implementation. The new background acts as a global data void (chaos), while the Hero area acts as an interactive art installation (the "Ink Crystal") where human interaction (clicking/dragging) imposes geometric order (negative entropy) on the chaos.

## Goals / Non-Goals

**Goals:**
- Render a highly performant (60FPS), sparse global particle background representing raw data and negative space.
- Implement an interactive "Ink Crystal" that forms upon user click, capturing nearby chaotic particles into a softened Hexagon shape (Polygon Mask).
- Ensure the interaction clearly conveys the metaphor of "Life feeds on negative entropy" (moving from chaos to organized structure via human agency).
- Use `@tsparticles/slim` to minimize bundle size while retaining necessary features (links, life span, shapes).
- Integrate seamlessly with existing Tailwind color tokens (light/dark mode).

**Non-Goals:**
- Creating a complex WebGL/Three.js 3D environment (we are sticking to 2D Canvas for minimalism and performance).
- Applying generic, overused particle templates (e.g., standard "snow" or "matrix" effects).
- Routing background particles behind text in a way that hurts readability (particles must remain extremely faint).

## Decisions

### 1. Rendering Engine: `tsparticles` v3
- **Rationale:** `tsparticles` v3 is highly modular. By using `@tsparticles/slim`, we get core canvas drawing, standard shapes, and interaction links for ~30-35KB gzipped. It natively supports the required `life` span attributes and `links`, whereas DOM-based animation libraries (GSAP, Framer Motion) would cause severe layout thrashing when drawing hundreds of interconnecting lines.
- **Alternatives Considered:** Raw HTML5 Canvas (too much boilerplate for handling resize, retina display, and complex physics), Three.js (massive bundle size, overkill for a 2D effect), GSAP (unusable performance for particle line drawing).

### 2. The "Ink Crystal" Implementation: Polygon Mask Plugin
- **Rationale:** To create the Hexagon structure upon click, we will use `@tsparticles/plugin-polygon-mask`. This plugin allows us to define an SVG path (a hexagon) and force particles to adhere to its vertices and edges.
- **Interaction Flow:**
  - Base state: Polygon mask is disabled or scaled to 0.
  - `onMouseDown`: Trigger the `tsparticles` instance to enable the mask at the cursor's location and increase local `attract` values.
  - `onMouseMove` (while dragging): Update the mask's offset coordinates.
  - `onMouseUp`: Disable the mask, releasing particles back into chaos.

### 3. The "Ink Wash" Softening: CSS Blur vs. Canvas Rendering
- **Rationale:** To achieve the "ink wash" (水墨) feel and prevent the geometric hexagon from looking too rigid, we will apply a slight CSS `backdrop-blur` or `filter: blur()` to the canvas container, combined with particle properties like `opacity.animation` and `wobble`. This provides an organic, breathing aesthetic over the cold geometry.

## Risks / Trade-offs

- **Risk:** Implementing custom state-driven interactions (Click to enable Polygon Mask) might conflict with `tsparticles` internal event loops.
  - **Mitigation:** Rely on the `tsParticles.engine` instance API to update options dynamically (`instance.options.load()`) rather than trying to force React state down to the canvas aggressively.
- **Risk:** The Polygon Mask plugin might increase bundle size slightly.
  - **Mitigation:** Verify bundle size post-installation. The visual payoff of the "Entropy Reduction" metaphor justifies the plugin's cost.
