## 1. Setup

- [ ] 1.1 Install d3-force and types: `pnpm add d3-force @types/d3-force`
- [ ] 1.2 Verify installation with `pnpm check`

## 2. TextType Component Integration

- [ ] 2.1 Copy TextType component from react-bits to `src/components/TextType/`
- [ ] 2.2 Add TextType CSS to `src/components/TextType/TextType.css`
- [ ] 2.3 Update `src/modules/home/components/LandingHero/FluxSlogan/index.tsx` to use TextType
- [ ] 2.4 Configure TextType: `initialDelay: 0`, `typingSpeed: 75`, `showCursor: true`, `cursorCharacter: "_"`
- [ ] 2.5 Handle language switching (zh/en) with TextType `text` prop

## 3. ConstellationBackground Implementation

- [ ] 3.1 Create `src/modules/home/components/LandingHero/ConstellationBackground/index.tsx`
- [ ] 3.2 Implement node initialization (50 nodes, random positions)
- [ ] 3.3 Implement initial connections (15-25 random links)
- [ ] 3.4 Setup d3-force simulation with all physics forces
- [ ] 3.5 Implement Canvas rendering for nodes and connections
- [ ] 3.6 Add theme color detection and caching
- [ ] 3.7 Implement theme change observer (MutationObserver)

## 4. Drag Interaction & Connection Logic

- [ ] 4.1 Implement node drag with d3-drag or custom mouse handlers
- [ ] 4.2 Track drag velocity over 3-5 frames
- [ ] 4.3 Implement connection creation logic (distance < 80px, speed < 50px/s)
- [ ] 4.4 Implement connection break logic (distance > 120px OR speed > 200px/s)
- [ ] 4.5 Add visual feedback for active drag state

## 5. Node Sizing & Dynamic Updates

- [ ] 5.1 Calculate connection count per node each frame
- [ ] 5.2 Update node radius based on connection count (>=3 = main star)
- [ ] 5.3 Adjust node brightness based on connection count

## 6. Integration & Verification

- [ ] 6.1 Update `src/modules/home/components/LandingHero/LandingHero.tsx` to use ConstellationBackground
- [ ] 6.2 Run `pnpm check` to verify no type errors
- [ ] 6.3 Manual test: Verify slogan appears immediately on load
- [ ] 6.4 Manual test: Verify constellation renders with ~50 nodes
- [ ] 6.5 Manual test: Verify drag interaction creates/breaks connections
- [ ] 6.6 Manual test: Verify theme switching updates constellation colors
