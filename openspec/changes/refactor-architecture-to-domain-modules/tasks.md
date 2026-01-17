## 0. Preparation
- [ ] Create branch, clean working tree, test current functionality

## 1. Documentation
- [ ] Update `openspec/project.md`:
      - Blog → Garden terminology
      - Add Infra Module Charter
      - Add Module Structure Guidelines
      - Add Dependency Rules

## 2. Specs
- [ ] Update `specs/architecture/spec.md`: Module structure, domain encapsulation
- [ ] Update `specs/content/spec.md`: Garden schema (remove Blog)
- [ ] Update `specs/routing/spec.md`: Blog → Garden terminology
- [ ] Update `specs/mdx-processing/spec.md`: Move Backlink Display to garden
- [ ] Create `specs/garden/spec.md`: Consolidate all Garden requirements (including Backlink Display)
- [ ] Move `specs/garden-ui/design.md` → `specs/garden/design.md`
- [ ] Archive obsolete specs (done by openspec archive command):
      - `specs/garden-ui/` → `changes/archive/.../specs/garden-ui/`
      - `specs/content-architecture/` → `changes/archive/.../specs/content-architecture/`

## 3. Code Cleanup
- [ ] Remove `garden-meta.json` generation from backlinks script
- [ ] Clean schema: remove uppercase type duplicates

## 4. Migration (Atomic Commit)
- [ ] Rename: `git mv src/modules/core src/modules/infra`
- [ ] Create: `mkdir -p src/modules/garden/data`
- [ ] Move components: `git mv src/components/garden/*.tsx src/modules/garden/`
- [ ] Move script: `git mv src/lib/backlinks.ts src/modules/garden/generate-backlinks.ts`
- [ ] Move SEO: `git mv src/components/SEO.astro src/modules/infra/components/`
- [ ] Update script output path to `modules/garden/data/`
- [ ] Create `src/modules/garden/index.ts` (barrel exports)
- [ ] Update imports in affected files (~10 files)
- [ ] Update `package.json` gen:garden script
- [ ] Add gitignore: `src/modules/garden/data/*.json`
- [ ] Delete old artifacts: `rm src/data/backlinks.json src/data/garden-meta.json`

## 5. Verification (Before Commit)
- [ ] Discovery: Verify no old paths remain
      ```bash
      grep -r "components/garden\|lib/backlinks\|data/backlinks\|modules/core" src/ -l
      ```
- [ ] TypeScript: `pnpm astro check` (0 errors)
- [ ] Build: `pnpm gen:garden && pnpm build` (success)
- [ ] Manual: Test Garden list, detail, backlinks, filtering

## 6. Commit
- [ ] Single atomic commit with migration + updates
- [ ] Message: `refactor(architecture): migrate to domain-driven modular monolith`
