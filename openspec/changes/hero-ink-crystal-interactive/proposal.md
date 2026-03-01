## Why

The current Landing Page background relies on a custom `d3-force` physics engine. While functional, it lacks aesthetic refinement and fails to convey the website's underlying philosophy: a synthesis of "Swiss Flux" minimalism, Zettelkasten knowledge growth, and the personal creed that "meaningful things happen by chance, and changing life requires risk." We need to replace this with a high-performance, algorithmic art installation that visually represents this "Black Swan" evolution: the slow, stagnant buildup of knowledge networks, punctuated by random, chaotic collisions that break old paradigms and spark new connections.

## What Changes

- **BREAKING**: Completely remove the existing `d3-force` based `ConstellationBackground` component.
- Introduce `tsparticles` (v3) as the high-performance 2D Canvas rendering engine.
- Shift visual aesthetic from soft "ink wash" to crisp, modern "Cyber/Tech" geometry (circular nodes, linear movements, sharp links).
- Implement a custom `ParticleUpdater` evolution algorithm:
  - **Serendipity (Connection)**: Isolated particles decay and die. When particles accidentally meet and link, they become immortal, grow in maturity (size/brightness), and slow down.
  - **Stagnation**: Large clusters of immortal particles become stagnant and slow-moving (representing rigid, planned knowledge paradigms).
  - **The Black Swan (Destruction)**: A rare, high-velocity "chaos particle" randomly spawns. Upon collision with a stagnant cluster, it shatters all links, stripping particles of their immortality and forcing a chaotic reset/re-evolution.

## Capabilities

### New Capabilities

- `entropy-grid-physics`: Defines the underlying rigid, geometric particle network with basic physical collisions (bounce) and sharp link rendering.
- `knowledge-evolution-algorithm`: A custom `ParticleUpdater` hook for tsParticles that implements the complex logic of isolation decay, connection-based immortality/growth, stagnation, and the "Black Swan" destruction events.

### Modified Capabilities

- (None. This is a complete replacement of the visual background infrastructure.)

## Impact

- **UI/Components**: Will heavily modify the `src/modules/home/components/LandingHero/` directory, renaming `InkCrystalBackground` to `EntropyGridBackground`.
- **Dependencies**: Requires adding `@tsparticles/engine`, `@tsparticles/slim`, and `astro-particles`. `d3-force` and the previously planned `@tsparticles/plugin-polygon-mask` will be removed.
- **Performance**: While Canvas is highly optimized, the custom O(N) `ParticleUpdater` loop must be carefully written to avoid performance drops during maturity calculations and collision detection.
