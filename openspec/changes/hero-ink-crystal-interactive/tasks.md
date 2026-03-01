## 1. Environment Setup & Cleanup

- [ ] 1.1 Remove `d3-force` and `@types/d3-force` from `package.json` dependencies.
- [ ] 1.2 Delete the existing `src/modules/home/components/LandingHero/ConstellationBackground` directory and its contents.
- [ ] 1.3 Install new dependencies: `@tsparticles/engine`, `@tsparticles/slim`, `@tsparticles/plugin-polygon-mask`, and `astro-particles`.

## 2. Global Particle Base Implementation

- [ ] 2.1 Create `src/modules/home/components/LandingHero/InkCrystalBackground/index.tsx`.
- [ ] 2.2 Define the base `tsparticles` options for the `global-particle-base`: sparse particle count (~80), extremely slow random bounce movement (`speed: 0.2`).
- [ ] 2.3 Configure particle lifecycle in base options: subtle opacity animations for birth/death and random delay for respawn.
- [ ] 2.4 Configure faint connections in base options: `links` with low opacity and short distance.
- [ ] 2.5 Implement a CSS variable reader or theme observer in the component to extract `--foreground` and `--primary` colors from Tailwind for the particles and links.

## 3. Ink Crystal Interactive Implementation

- [ ] 3.1 Configure the `@tsparticles/plugin-polygon-mask` within the `tsparticles` options, defining an inline SVG path for a Hexagon, initially disabled or scaled to 0.
- [ ] 3.2 Add mouse event listeners (`onMouseDown`, `onMouseMove`, `onMouseUp`) to the container div or canvas overlay.
- [ ] 3.3 Implement the `onMouseDown` handler: Use the `tsParticles` instance API to enable the polygon mask at the cursor's location and activate `attract` mode.
- [ ] 3.4 Implement the `onMouseMove` handler: Update the polygon mask offset coordinates dynamically while the mouse is pressed (dragging).
- [ ] 3.5 Implement the `onMouseUp` handler: Disable the polygon mask and reset the `attract` mode, returning particles to chaos.
- [ ] 3.6 Apply CSS styling (e.g., `filter: blur()`) to the particles or the canvas container to achieve the "ink wash" softening effect over the rigid geometric hexagon.

## 4. Integration & Verification

- [ ] 4.1 Update `src/modules/home/components/LandingHero/LandingHero.tsx` to import and render the new `InkCrystalBackground` component instead of `ConstellationBackground`.
- [ ] 4.2 Run `pnpm check` to ensure Biome linting and Astro type checking pass without errors.
- [ ] 4.3 Manually verify in the browser: The background should be sparse and slow.
- [ ] 4.4 Manually verify in the browser: Clicking should form the glowing Hexagon crystal, and dragging should move it while capturing nearby particles.
