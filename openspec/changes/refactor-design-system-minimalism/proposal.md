# Change: Refactor Design System (Minimalism)

## Why
The current Shadcn default style lacks character and does not align with the "Intellectual Infrastructure" vision. The site needs a rigorous, typography-driven aesthetic (Occam's Razor).

## What Changes
1. **Design Tokens**: 
   - Remove default border radii (`rounded-none` or sharp).
   - Increase whitespace density for academic feel.
2. **Typography**: Introduce a "Swiss Style" font stack (Inter/Geist + JetBrains Mono/Fira Code).
3. **Components**: 
   - Strip `Card` components of unnecessary shadows and borders.
   - Implement "Scrambled Text" component for encrypted content feedback.

## Impact
- **Affected Specs**: `ui`
- **Affected Code**: `src/styles/global.css`, `tailwind.config.mjs`, `src/components/ui/*.tsx`
