## Why

The current landing page has two main issues:
1. **Slogan loading problem**: The character-by-character animation has cumulative delays (index * 0.03s), causing the last character to appear ~510ms late. Additionally, language detection runs in useEffect, causing hydration mismatch.
2. **Background effect**: The current mouse trail effect doesn't match the "static constellation" metaphor the user wants - nodes connected by lines representing molecular bonds.

The user also referenced evomap.ai's node network background as inspiration.

## What Changes

- **Slogan Effect**: Replace current character-by-character blur animation with `TextType` component from react-bits. Set `initialDelay: 0` to ensure immediate display on first load.
- **Background**: Replace `TrailGrid` with a new `ConstellationBackground` component using d3-force + Canvas rendering.
- **Molecular Dynamics Physics**:
  - Unconnected nodes: weak repulsion force to prevent overlap + random drift (thermal motion)
  - Connected nodes: spring force to maintain bond stability
  - Initial state: 15-25 random connections among 50 nodes
- **Drag Interaction**:
  - Dragging a node that breaks through the repulsion threshold creates a new connection
  - High-speed drag or stretching beyond threshold breaks connections
- **Node Sizing**: Nodes with >=3 connections become "main stars" (larger and brighter)
- **Theme Adaptation**: Use CSS variables (`--foreground`, `--muted`) to adapt colors for light/dark themes.

## Capabilities

### New Capabilities
- `landing-constellation`: D3-force based particle network background with molecular dynamics simulation

### Modified Capabilities
- `ui`: Update text animation requirements to include typewriter effect (TextType)

## Impact

- `src/modules/home/components/LandingHero/FluxSlogan/`: Replace with TextType component
- `src/modules/home/components/LandingHero/TrailGrid/`: Replace with new ConstellationBackground component
- Dependencies: Add `d3-force` package
