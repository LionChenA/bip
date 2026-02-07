# Change: Swiss Flux Landing Page

## Why
The homepage is the "First Impression Engine". We need a visual metaphor that balances scientific rigor (Swiss Style) with organic growth (Flux). 
The goal is to showcase technical depth and "Intellectual Infrastructure" through subtle, high-quality micro-interactions without visual noise.

## What Changes
1. **Architecture**: Create `src/modules/home` to encapsulate landing-specific logic.
2. **Visual Language**: 12-column Swiss Grid using `var(--border)` at low opacity.
3. **Core Interactions (The Flux Soul)**:
   - **Slogan**: Blur-to-focus entrance + Mouse-proximity Viscosity (characters slightly displace when approached).
   - **Background**: Static vector grid with a faint, flowing light trail following the cursor.
   - **Navigation**: `[01] / LIBRARY` style index links with shared-layout morphing underlines.
4. **Integration**: Update `src/pages/index.astro` to serve this as the primary entry point while preserving the background language sniffing logic.

## Impact
- **Affected Specs**: `ui`
- **Affected Code**: `src/pages/index.astro`, `src/modules/home`
- **Performance**: High. Uses native Canvas/Framer Motion; avoids heavy 3D libraries.
