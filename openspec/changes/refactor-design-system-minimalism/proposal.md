# Change: Enhance Typography

## Why
The current default font stack (Inter) lacks the specific character required for the "Intellectual Infrastructure" vision. We need a typography system that balances academic rigor with engineering precision.

## What Changes
1. **Typography**: Introduce a "Precision" font stack.
   - **Sans**: `Geist Sans` (Modern, rational Neo-Grotesque).
   - **Mono**: `Maple Mono` (Characterful, rounded mechanical).
2. **Strategy**: 
   - Self-host English/Latin subsets via `@fontsource` for performance.
   - Use system fallbacks (PingFang SC, Microsoft YaHei) for Chinese to avoid bloat.

## Impact
- **Affected Specs**: `ui`
- **Affected Code**: `tailwind.config.mjs`, `src/layouts/BaseLayout.astro`, `package.json`
