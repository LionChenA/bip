## 1. Environment & Architecture Updates (Completed)

- [x] 1.1 Remove `d3-force` and `@types/d3-force` from `package.json` dependencies.
- [x] 1.2 Delete the existing `src/modules/home/components/LandingHero/ConstellationBackground` directory and its contents.
- [x] 1.3 Install new dependencies: `@tsparticles/engine`, `@tsparticles/slim`, and `astro-particles`.
- [x] 1.4 Rename component from `InkCrystalBackground` to `EntropyGridBackground` to reflect the new Cyber/Tech aesthetic.

## 2. Entropy Grid Physics Implementation (Completed)

- [x] 2.1 Update the base `tsparticles` options for the `entropy-grid-physics`: geometric shape (`circle`), sharper linear movement (`speed: {min: 0.5, max: 1.5}`).
- [x] 2.2 Remove all CSS `blur()` and `mix-blend-mode` effects to ensure a crisp, high-contrast look.
- [x] 2.3 Enable physical particle collisions (`collisions: { enable: true, mode: 'bounce' }`).
- [x] 2.4 Configure sharp connections: `links` with higher opacity and `width: 1.5`.
- [x] 2.5 Ensure the component uses proper light/dark mode hex colors for maximum visibility.

## 3. Knowledge Evolution Algorithm (Custom Updater)

- [x] 3.1 Create `src/modules/home/components/LandingHero/EntropyGridBackground/EvolutionUpdater.ts` implementing `IParticleUpdater` from `@tsparticles/engine`.
- [x] 3.2 Implement `init(particle)` method to inject custom variables: `deathTimer` (e.g., 300 frames), `maturity` (0.0 to 1.0), and `isBlackSwan` (boolean).
- [x] 3.3 Implement `update(particle)` method: Check `particle.links.length`. If 0, decrement `deathTimer`. If > 0, reset `deathTimer` and increment `maturity`.
- [x] 3.4 Implement visual mapping in `update()`: Interpolate `particle.options.size.value` based on `maturity` (e.g., from 1px to 4px).
- [x] 3.5 Implement death logic in `update()`: If `deathTimer <= 0`, call `particle.destroy()`.
- [x] 3.6 Hook the custom updater into the engine during `initParticlesEngine` via `engine.addParticleUpdater()`.

## 4. The Black Swan Mechanism

- [x] 4.1 In the `EntropyGridBackground` component, add a generic mechanism to replenish dead particles to keep the population stable.
- [x] 4.2 In `EvolutionUpdater`, add logic to occasionally spawn/flag a `isBlackSwan` particle.
- [x] 4.3 In the `update` loop, check distances between the Black Swan and mature particles.
- [x] 4.4 If a collision/proximity occurs, trigger the "Shatter" event: reset the target's `maturity` to 0, break its links, and apply a sudden velocity burst.

## 5. Integration & Verification

- [x] 5.1 Update `src/modules/home/components/LandingHero/LandingHero.tsx` to render the new `EntropyGridBackground`.
- [x] 5.2 Run `pnpm check` to ensure Biome linting and Astro type checking pass without errors.
- [x] 5.3 Manually verify: Isolated particles should shrink and disappear after a few seconds.
- [x] 5.4 Manually verify: Connected particles should grow larger and stay alive indefinitely.
- [x] 5.5 Manually verify: The Black Swan event successfully shatters stagnant clusters.
