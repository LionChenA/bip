# Change: Refactor Tailwind Class Organization

## Why
Currently, Tailwind CSS classes in Shadcn UI components (like `Badge` and `Button`) are stored as extremely long, single-line strings. This makes them:
1. Hard to read and understand (logic is hidden in a 100+ char string).
2. Hard to maintain (diffs are messy).
3. Prone to sorting inconsistencies.

## What Changes
1. **Tooling**: Enable Biome's experimental `useSortedClasses` rule in `biome.json` to enforce consistent class ordering for single-line strings.
2. **Refactoring**: Convert the `base` class strings of `Badge` and `Button` components into **multi-line template literals**, grouped by function (layout, typography, visual, interactive).
3. **Convention**: Establish a pattern where complex variant strings (>80 chars) SHOULD be multi-line.

## Impact
- **Affected Specs**: `ui`
- **Affected Code**: `src/components/ui/*.tsx`, `biome.json`
- **Risk**: Low. Purely cosmetic/formatting change. Runtime behavior is preserved as `cva` handles whitespace.
