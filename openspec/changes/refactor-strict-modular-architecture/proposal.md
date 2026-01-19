# Change: Strict Modular Architecture Refactor

## Why
An audit of the current codebase revealed several violations of the modular architecture specification (`specs/architecture/spec.md`) and general clean code principles. 
1. `src/modules/infra` is named inconsistently with the spec's `core` module definition.
2. `src/data/stack.ts` violates domain encapsulation by existing in a global "no-man's land".
3. `src/modules/garden` contains loose script files in its root.

## What Changes
1. **Rename Module**: Rename `src/modules/infra` to `src/modules/core` to align with Spec Requirement: Module Definitions.
2. **Encapsulate Data**: Move `src/data/stack.ts` to `src/modules/portfolio/data/stack.ts`.
3. **Organize Scripts**: Move `src/modules/garden/generate-backlinks.ts` to `src/modules/garden/scripts/`.
4. **Prepare About Data**: Create `src/modules/about/data/` directory structure.

## Impact
- **Affected Specs**: `architecture`
- **Affected Code**: All imports referencing `src/modules/infra` or `src/data/stack` will need to be updated.
- **Breaking**: Yes, internal import paths will change.
