## Context

The landing page at `src/modules/home/components/LandingHero/` has two components that need refactoring:
1. **FluxSlogan**: Currently uses Framer Motion for character-by-character animation with cumulative delays
2. **TrailGrid**: Canvas-based mouse trail effect that doesn't match the desired "constellation" metaphor

The user wants a molecular dynamics simulation where:
- Nodes (particles) float with thermal motion
- Some nodes are connected by "chemical bonds" (spring forces)
- User can drag nodes to create/break connections by overcoming repulsion threshold
- Nodes with >=3 connections become "main stars" (larger and brighter)
- Colors adapt to light/dark themes via CSS variables

## Goals / Non-Goals

**Goals:**
1. Fix slogan loading delay - immediate display on first load
2. Implement constellation background with 50 nodes and 15-25 initial connections
3. Add molecular dynamics physics: repulsion, spring forces, thermal drift
4. Implement drag interaction: break through repulsion threshold to create connections
5. Dynamic node sizing based on connection count (>=3 = main star)
6. Theme-adaptive colors using CSS variables

**Non-Goals:**
- 3D visualization (2D canvas only)
- Complex physics beyond: repulsion, spring, thermal drift
- Persistent user connections (resets on page reload)
- Mobile touch drag support (mouse only for v1)

## Decisions

### 1. TextType vs Custom Implementation
**Decision**: Use react-bits TextType component
- **Rationale**: The user specifically requested this component
- **Configuration**: `initialDelay: 0`, `typingSpeed: 75`, `showCursor: true`, `cursorCharacter: "_"`
- **Alternative**: Custom Framer Motion implementation (rejected - user preference)

### 2. d3-force + Canvas vs SVG vs DOM
**Decision**: d3-force for physics + Canvas 2D for rendering
- **Rationale**:
  - d3-force provides stable Verlet integration for physics
  - Canvas offers better performance for 50+ animated nodes vs DOM
  - Full control over theme colors via CSS variables in canvas
- **Alternative**: react-force-graph (rejected - insufficient control over physics)

### 3. Physics Model

| Force | d3-force | Parameters |
|-------|----------|------------|
| Repulsion | `forceManyBody()` | `strength: -30`, `distanceMax: 80` |
| Connection | `forceLink()` | `distance: 60`, `strength: 0.3` |
| Collision | `forceCollide()` | `radius: node.radius * 1.5` |
| Center | `forceCenter()` | `strength: 0.05` |
| Thermal | Custom velocity noise | `±0.1px/frame` |

### 4. Connection State Machine

```
States: UNCONNECTED | DRAGGING | CONNECTED

UNCONNECTED + (drag into range) + (speed < SLOW_THRESHOLD: 50px/s) → CONNECTED
UNCONNECTED + (drag out of range) + (speed > FAST_THRESHOLD: 200px/s) → UNCONNECTED
CONNECTED + (distance > BREAK_THRESHOLD: 120px) → UNCONNECTED
CONNECTED + (speed > FAST_THRESHOLD: 200px/s) → UNCONNECTED
```

### 5. Node Sizing Logic

```typescript
const getNodeRadius = (connectionCount: number): number => {
  if (connectionCount >= 3) return 4; // Main star
  return 2; // Regular node
};
```

### 6. Theme Adaptation
- Read CSS variables at component mount: `getComputedStyle(document.documentElement)`
- Cache values: `--foreground`, `--muted`
- Update on theme change via MutationObserver

## Risks / Trade-offs

1. **[Risk] Hydration mismatch with TextType**
   - **Mitigation**: Use `client:load` directive in Astro, or wrap in `<ClientOnly>`

2. **[Risk] Performance with 50 nodes + 25 connections**
   - **Mitigation**: d3-force + Canvas is performant; will monitor frame rate

3. **[Risk] Drag detection accuracy**
   - **Mitigation**: Use velocity tracking over 3-5 frames to smooth out jitter

4. **[Risk] Initial random connections may create disconnected clusters**
   - **Mitigation**: Acceptable for v1 - clusters will naturally drift together via center force

5. **[Trade-off] No persistence**
   - User connections reset on page reload; acceptable for landing page aesthetic

## Migration Plan

1. Install dependencies: `pnpm add d3-force @types/d3-force`
2. Add TextType component to `src/components/`
3. Replace `FluxSlogan/index.tsx` with TextType usage
4. Create `ConstellationBackground/index.tsx` (new component)
5. Update `LandingHero.tsx` to use new components
6. Verify: `pnpm check`, `pnpm dev`

## Open Questions

1. **Q: Should connections have a maximum limit per node?**
   - A: Not for v1 - let physics naturally limit through repulsion

2. **Q: Should the constellation animate on slogan completion?**
   - A: Nice to have, not required for v1
