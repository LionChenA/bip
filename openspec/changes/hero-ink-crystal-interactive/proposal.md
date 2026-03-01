## Why

The current Landing Page background relies on a custom `d3-force` physics engine. While functional, it lacks aesthetic refinement and fails to convey the website's underlying philosophy: a synthesis of "Swiss Flux" minimalism, Chinese ink-wash negative space (留白), and the Marxist humanistic concept of "Life feeds on negative entropy." We need to replace this with a high-performance, interactive art installation that visually represents the Zettelkasten knowledge growth process (entropy reduction) through human interaction.

## What Changes

- **BREAKING**: Completely remove the existing `d3-force` based `ConstellationBackground` component.
- Introduce `tsparticles` (v3) as the high-performance 2D Canvas rendering engine.
- Implement a global "Ink-Wash" background: a highly restrained, sparse, slow-moving particle network with minimal connections, representing raw data and negative space.
- Implement the "Ink Crystal" interactive Hero installation: a localized gravity well triggered by mouse clicks that captures chaotic background particles and forces them into a breathing, softened geometric structure (Polygon Mask), representing human agency ordering information into knowledge.

## Capabilities

### New Capabilities

- `hero-ink-crystal`: Defines the interactive hero installation, including the polygon mask gravity well, particle capture logic, dragging behavior, and the soft "ink" rendering effects.
- `global-particle-base`: Defines the restrained, slow-moving, sparse particle network that serves as the foundation for the entire site, handling subtle life spans and faint connections.

### Modified Capabilities

- (None. This is a complete replacement of the visual background infrastructure.)

## Impact

- **UI/Components**: Will heavily modify the `src/modules/home/components/LandingHero/` directory, specifically replacing the background components.
- **Dependencies**: Requires adding `@tsparticles/engine`, `@tsparticles/slim`, `@tsparticles/plugin-polygon-mask`, and `astro-particles`. The `d3-force` package and its types will be removed.
- **Performance**: Shifting from DOM/SVG-based link calculations to a highly optimized Canvas 2D engine is expected to significantly improve rendering performance and eliminate layout thrashing for particle networks.
