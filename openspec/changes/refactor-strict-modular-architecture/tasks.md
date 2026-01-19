## 1. Module Renaming (Infra -> Core)
- [ ] 1.1 Rename directory `src/modules/infra` to `src/modules/core`.
- [ ] 1.2 Find and replace all imports of `@/modules/infra` to `@/modules/core` in the codebase.
- [ ] 1.3 Update `tsconfig.json` paths if applicable (usually covered by `@/modules/*`).

## 2. Data Encapsulation
- [ ] 2.1 Move `src/data/stack.ts` to `src/modules/portfolio/data/stack.ts`.
- [ ] 2.2 Update imports referencing `@/data/stack` to `@/modules/portfolio/data/stack`.
- [ ] 2.3 Remove empty `src/data` directory if no other files exist.

## 3. Script Organization
- [ ] 3.1 Move `src/modules/garden/generate-backlinks.ts` to `src/modules/garden/scripts/generate-backlinks.ts`.
- [ ] 3.2 Update `package.json` scripts (`gen:garden`) to point to the new path.

## 4. Verification
- [ ] 4.1 Run `pnpm check` to ensure no broken imports.
