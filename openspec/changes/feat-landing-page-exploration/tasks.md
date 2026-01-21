## 1. Architecture
- [ ] 1.1 Create `src/modules/home/components/LandingHero/` directory.
- [ ] 1.2 Define the `LandingHero` interface (props, slots) to ensure interchangeable variants.

## 2. Variant Implementation (Prototypes)
- [ ] 2.1 Implement `SwissHero.astro` (Grid & Typography).
- [ ] 2.2 Implement `TerminalHero.tsx` (Interactive React Component with Typewriter).
- [ ] 2.3 Implement `LatticeHero.tsx` (SVG Topology).

## 3. Integration & Tooling
- [ ] 3.1 Create `VariantSwitcher` client component (persisted state).
- [ ] 3.2 Mount `LandingHero` in `src/pages/index.astro` using `client:idle` or dynamic imports for performance isolation.
