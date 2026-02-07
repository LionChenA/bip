## 0. Preparation
- [x] Create branch, clean working tree, test current functionality

## 1. Documentation
- [x] Update `openspec/project.md`:
      - Blog → Garden terminology
      - Add Infra Module Charter
      - Add Module Structure Guidelines
      - Add Dependency Rules

## 2. Specs
- [x] Update `specs/architecture/spec.md`: Module structure, domain encapsulation
- [x] Update `specs/content/spec.md`: Garden schema (remove Blog)
- [x] Update `specs/routing/spec.md`: Blog → Garden terminology
- [x] Update `specs/mdx-processing/spec.md`: Move Backlink Display to garden
- [x] Create `specs/garden/spec.md`: Consolidate all Garden requirements (including Backlink Display)
- [x] Move `specs/garden-ui/design.md` → `specs/garden/design.md`
- [x] Archive obsolete specs (done by openspec archive command):
      - `specs/garden-ui/` → `changes/archive/.../specs/garden-ui/`
      - `specs/content-architecture/` → `changes/archive/.../specs/content-architecture/`

## 3. Code Cleanup
- [x] Remove `garden-meta.json` generation from backlinks script
- [x] Clean schema: remove uppercase type duplicates

## 4. Migration (Atomic Commit)
- [x] Rename: `git mv src/modules/core src/modules/infra`
- [x] Create: `mkdir -p src/modules/garden/data`
- [x] Move components: `git mv src/components/garden/*.tsx src/modules/garden/`
- [x] Move script: `git mv src/lib/backlinks.ts src/modules/garden/generate-backlinks.ts`
- [x] Move SEO: `git mv src/components/SEO.astro src/modules/infra/components/`
- [x] Update script output path to `modules/garden/data/`
- [x] Create `src/modules/garden/index.ts` (barrel exports)
- [x] Update imports in affected files (~10 files)
- [x] Update `package.json` gen:garden script
- [x] Add gitignore: `src/modules/garden/data/*.json`
- [x] Delete old artifacts: `rm src/data/backlinks.json src/data/garden-meta.json`

## 5. Verification (Before Commit)
- [x] Discovery: Verify no old paths remain
      ```bash
      grep -r "components/garden\|lib/backlinks\|data/backlinks\|modules/core" src/ -l
      ```
- [x] TypeScript: `pnpm astro check` (0 errors)
- [x] Build: `pnpm gen:garden && pnpm build` (success)
- [x] Manual: Test Garden list, detail, backlinks, filtering

## 6. Commit
- [x] Single atomic commit with migration + updates
- [x] Message: `refactor(architecture): migrate to domain-driven modular monolith`
