## Context

We are building a highly customized, algorithmic particle background for the Landing Page using `tsparticles` v3. Moving away from both the old `d3-force` implementation and the previously proposed "Ink Wash Hexagon" idea, we are now aiming for a sharp, modern "Entropy Grid". The core interaction is no longer driven by a geometric mask, but by a complex, emergent physical evolution algorithm ("The Black Swan" collision model) that serves as a metaphor for Zettelkasten knowledge iteration: isolated ideas die, connected ideas grow and stagnate, and rare chaotic events destroy old paradigms to make way for new ones.

## Goals / Non-Goals

**Goals:**
- Implement a sharp, modern cyber aesthetic (crisp circles, linear movement, no blur).
- Write a custom `IParticleUpdater` for `tsparticles` to handle the complex "Immortality & Maturity" logic based on link states.
- Introduce a "Black Swan" (Chaos Particle) mechanism to break the "Giant Immortal Cluster" deadlock.
- Maintain smooth 60FPS despite per-frame custom physical calculations.

**Non-Goals:**
- Using external React intervals to control particle state (causes desync; must use internal tsParticles updaters).
- Using Polygon Masks or rigid shapes. The clusters should emerge naturally via distance-based links and collisions.
- Creating an overly complex node-gravity model. Simple `bounce` collisions combined with linear drift is sufficient.

## Decisions

### 1. Rendering Engine & Baseline Physics
- **Rationale:** We stick with `@tsparticles/slim` for minimal bundle size. We will use native `shape: 'circle'`, `links`, and `collisions: { enable: true, mode: 'bounce' }`. This provides the baseline "atoms" of the system.

### 2. Custom Updater: The Evolution Algorithm
- **Rationale:** Standard `tsparticles` features cannot handle "reset life on connection" or "grow based on connection time." We must write a custom class implementing `IParticleUpdater`.
- **Implementation Strategy:**
  - Hook into the engine via `engine.addParticleUpdater()`.
  - In the `update(particle, delta)` method:
    - Check if `particle.links.length > 0`.
    - If yes: Freeze death timer. Increase a custom `maturity` property up to a max limit. Interpolate `particle.options.size.value` and `opacity` based on maturity. Apply a damping factor to velocity (stagnation).
    - If no: Decrease death timer. Shrink maturity. If timer < 0, call `particle.destroy()`.

### 3. The Black Swan (Chaos Particle) Mechanism
- **Rationale:** To solve the "Giant Immortal Cluster" problem where the screen fills with max-maturity particles that never die, we introduce a paradigm-breaking mechanism.
- **Implementation Strategy:**
  - The updater will track the global population and cluster sizes.
  - Randomly (e.g., 0.1% chance per second), or triggered by user click, a particle is spawned or converted into a "Black Swan".
  - A Black Swan is visually distinct (e.g., bright red/accent color, moves very fast).
  - In the collision detection phase (or manual distance check in the updater), if a Black Swan touches a particle that has `maturity > 0`, it triggers a "Shatter" event:
    - The target particle and all particles recursively linked to it have their `links` forcibly severed, `maturity` reset to 0, and a repulsive velocity burst applied.

## Risks / Trade-offs

- **Risk: Performance of the Updater Loop:** Checking recursive links and modifying size/opacity on every frame for 60+ particles can degrade performance.
  - **Mitigation:** Avoid complex recursive checks every frame. Implement a cooldown/throttle (e.g., only calculate maturity updates every 5th frame). Use simple distance checks rather than deep graph traversal for the "Shatter" effect.
- **Risk: Visual Flicker on Link Thresholds:** Particles dancing on the edge of the link distance will cause their links to turn on and off rapidly, causing their "maturity" to jitter.
  - **Mitigation:** Implement Hysteresis in the Custom Updater. A particle must lose connections for at least 0.5 seconds before it starts losing maturity and shrinking.
- **Risk: Extinction:** If isolated particles die too fast, the screen empties out.
  - **Mitigation:** Ensure `particles.number.value` combined with an active emitter or native replacement mechanism keeps spawning new "infant" particles to replace dead ones.
