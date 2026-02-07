# Change: Refactor to Domain-Driven Modular Architecture

## Why
- **Inconsistent module organization**: Domain features scattered between `src/modules` and `src/components`
- **Leaky abstractions**: Domain logic in global `src/lib`
- **Terminology ambiguity**: Mixed use of "Blog" and "Garden"
- **Spec violations**: Components in forbidden root directories

## What Changes
1. **Strict modularization**: All domain features in `src/modules/<domain>/`
2. **Module rename**: `core` → `infra` for clarity
3. **File consolidation**:
   - `src/components/garden/` → `src/modules/garden/`
   - `src/lib/backlinks.ts` → `src/modules/garden/generate-backlinks.ts`
   - `src/components/SEO.astro` → `src/modules/infra/components/SEO.astro`
4. **Data ownership**: Build artifacts in `modules/garden/data/`, gitignored
5. **Terminology**: Standardize on "Garden" (deprecate "Blog")
6. **Spec consolidation**: Merge fragmented specs into unified `specs/garden/`

## Impact
**Specs**: 
- `architecture` (MODIFIED: module structure)
- `content` (MODIFIED: Garden schema)
- `routing` (MODIFIED: Blog → Garden terminology)
- `mdx-processing` (MODIFIED: Backlink Display moved to garden)
- `garden` (ADDED: consolidated from garden-ui + content-architecture + backlink display)
- `garden-ui` (to be archived: requirements moved to garden)
- `content-architecture` (to be archived: requirements moved to garden)

**Archive Notes**:
- `specs/garden-ui/design.md` → `specs/garden/design.md` (preserved)
- `specs/garden-ui/spec.md` → archive (obsolete)
- `specs/content-architecture/spec.md` → archive (obsolete)

**Code**: 
- 7 file moves (6 components + 1 script)
- Module rename affecting ~10 imports
- Config: `package.json`, `.gitignore`

**Breaking**: Import paths, build script paths, data file locations

**Validation**: TypeScript check, build success, LSP diagnostics, manual testing
