# Architecture Refactoring: Decision Log

> **Architecture Context**: This project follows a **Modular Monolith** architecture pattern.
> All code is organized within a single repository, with clear module boundaries but shared runtime.

---

## Decision Status Legend
- ⏳ **PENDING**: Awaiting discussion
- ✅ **DECIDED**: Decision made
- 🚧 **IN PROGRESS**: Partial consensus
- ❌ **REJECTED**: Option ruled out

---

## P0 (Blocking) - Must Decide Before Implementation

### A1. Module Internal Structure 【✅ DECIDED】

**Question**: What internal organization should the `garden` module adopt?

**Context**:
- Current scale: 5 components + 1 utility file (~160 lines)
- Modular Monolith principle: Clear boundaries, but avoid premature abstraction

**Options**:

**Option 1: Layered Structure** (Current proposal)
```
src/modules/garden/
  ├── components/
  │   ├── FilterBar.tsx
  │   ├── GardenList.tsx
  │   ├── NoteItem.tsx
  │   ├── SVGTimeline.tsx
  │   └── TOC.tsx
  ├── lib/
  │   └── backlinks.ts
  └── (services/, types/)
```
- ✅ Pros: Clear separation of concerns, scalable
- ❌ Cons: Over-engineering for current scale, adds navigation cost

**Option 2: Flat Structure** (Agent recommendation)
```
src/modules/garden/
  ├── NoteItem.tsx
  ├── FilterBar.tsx
  ├── GardenList.tsx
  ├── SVGTimeline.tsx
  ├── TOC.tsx
  ├── backlinks.ts
  └── index.ts  # Public API
```
- ✅ Pros: YAGNI principle, minimal friction, easy navigation
- ❌ Cons: May need refactoring when scale grows

**Refactoring Trigger** (if Option 2 chosen):
- File count > 12
- Emergence of distinct sub-domains

**Decision**: 
- [ ] Option 1 (Layered)
- [x] Option 2 (Flat)
- [ ] Hybrid: _________________

**Rationale**:
- Current scale: 6 files (~849 LOC) - too small for premature layering
- YAGNI principle: avoid over-engineering
- Follows industry practice (Netflix, Kent C. Dodds)
- Refactoring trigger: > 8-12 files OR emergence of sub-domains
- Modular monolith emphasizes module boundaries over internal structure

---

### A2. SEO Component Placement 【✅ DECIDED】

**Question**: Where should `SEO.astro` component reside?

**Context**:
- SEO is infrastructure serving all pages
- Not domain-specific, not a pure UI primitive

**Options**:

**Option 1: `src/modules/core/components/SEO.astro`**
- ✅ Pros: SEO is foundational infrastructure, aligns with "core" domain
- ❌ Cons: Requires clear definition of "core" scope

**Option 2: `src/components/shared/SEO.astro`**
- ✅ Pros: `shared/` is for cross-module components
- ❌ Cons: Blurs the line between shared UI and infrastructure

**Decision**:
- [x] Option 1 (infra/components) - **NOTE: Renamed from "core" to "infra"**
- [ ] Option 2 (shared/)
- [ ] Other: _________________

**Rationale**:
- SEO is foundational infrastructure, not shared UI
- Consistent with existing Header/Footer/ThemeProvider in infra
- Clear dependency direction: modules → infra (never reverse)
- "Infra" naming eliminates ambiguity (vs "core" which implies business core)
- Must define Infra Charter to prevent it becoming a dumping ground

---

### E1. Design Document Necessity 【✅ DECIDED】

**Question**: Must we create `design.md` for this refactoring?

**Agent Assessment**: ✅ **Required**
- Reason: Cross-module architectural change
- Major design decisions (module boundaries, terminology unification)
- Needs trade-off discussion (Co-location vs Convention separation)

**Options**:
- [ ] Create comprehensive `design.md` covering all decisions
- [ ] Skip (lightweight refactoring, rely on proposal.md)
- [ ] Create minimal `design.md` with only critical decisions

**Decision**:
- [x] Yes, create design.md
- [ ] No, proposal.md is sufficient

**Rationale**:
- Meets 4/5 Google criteria for design doc (multi-module, multiple options, architecture change, > 1 week effort)
- "Constitutional" decisions need explicit record (module boundaries, Infra scope)
- Future reference: "Why is SEO in infra not shared?"
- Documents trade-offs for key decisions (flat vs layered, co-location vs separation)

---

## P1 (Important) - Affects Implementation Quality

### B1. Data File Location 【✅ DECIDED】

**Question**: How should `src/data/backlinks.json` be handled?

**Context**:
- Currently in global `src/data/`
- Referenced by multiple files
- Generated at build time

**Options**:

**Option 1: Move to `src/modules/garden/data/backlinks.json`**
- ✅ Pros: Co-location with domain logic
- ❌ Cons: Build script needs update, may break Astro conventions

**Option 2: Keep in `src/data/backlinks.json`**
- ✅ Pros: No build changes, maintains convention for generated files
- ❌ Cons: Data separated from its consumer

**Option 3: Build-time output to module, gitignore**
- ✅ Pros: Co-location without version control noise
- ❌ Cons: More complex build configuration

**Decision**:
- [x] Option 1 (Move to modules/garden/data/ + gitignore)
- [ ] Option 2 (Keep global)
- [ ] Option 3 (Build-time output)

**Rationale**:
- Complete domain cohesion: Garden owns its data generation and products
- Cleaner git history: no noise from build artifacts
-符合模块化单体: each module manages its own build outputs
- User decision: "为什么不直接实行阶段2的优化?" - do it right the first time

---

### B2. Import Path Update Checklist 【✅ DECIDED】

**Question**: Should we pre-list all files requiring import updates in `tasks.md`?

**Context**:
- Current Task 3.5 says "Update all imports" (too vague)
- Agent identified at least:
  - `src/pages/[lang]/garden/[...slug].astro`
  - `src/pages/[lang]/garden/index.astro`
  - `src/pages/garden/[slug].json.ts`
  - (Requires `grep -r "components/garden" src/` to find all)

**Options**:

**Option 1: Pre-generate complete list**
- ✅ Pros: Clear scope, reduces errors
- ❌ Cons: Upfront effort, may miss dynamically generated imports

**Option 2: Use command in tasks**
```markdown
- [ ] 3.5 Update imports (run `grep -r "components/garden" src/` to find all)
```
- ✅ Pros: Always accurate, handles edge cases
- ❌ Cons: Requires executor to interpret results

**Decision**:
- [ ] Option 1 (Pre-list all files)
- [ ] Option 2 (Command-based discovery)
- [x] Hybrid: List known files + discovery command + LSP verification

**Rationale**:
- Known files provide clear starting point
- Discovery commands catch edge cases
- LSP diagnostics (`lsp_diagnostics`) provide compile-time safety net
- User requirement: "明确列表 + 验证命令 并使用我们提供的验证命令"

---

### C1. Spec Consolidation Strategy 【✅ DECIDED】

**Question**: How should overlapping specs be merged?

**Context**:
- `content-architecture` (Garden data model)
- `garden-ui` (Garden UI requirements)
- Newly created `garden` (merged)

**Current Task 2.3 ambiguity**:
> "Archive `specs/content-architecture` and `specs/garden-ui` into a unified `specs/garden` capability **(or keep `garden-ui` if UI specific)**."

**Options**:

**Option 1: Full consolidation into `specs/garden/`**
```
specs/garden/spec.md  # All Garden requirements (schema + UI + logic)
```
- ✅ Pros: Single source of truth, reduced maintenance
- ❌ Cons: Large file, mixes concerns (data + UI)

**Option 2: Keep UI separate**
```
specs/garden/spec.md       # Data model, backlinks, core logic
specs/garden-ui/spec.md    # Timeline, filtering, reading mode
```
- ✅ Pros: Separation of concerns
- ❌ Cons: More files, requires coordination

**Decision**:
- [x] Option 1 (Full consolidation) with DDD strategy
- [ ] Option 2 (Keep garden-ui separate)

**Rationale**:
- DDD principle: specs map to business capabilities, not technical layers
- Single source of truth for Garden domain
- User guidance: "spec 使用DDD的策略，单一文件过大可以考虑在相应领域下进行拆分，默认的spec用于索引"
- Future: if spec > 300 lines, split by sub-domain with index spec

---

## P2 (Recommended) - Affects Long-term Maintainability

### A3. Pages/Routes Relationship to Modules 【✅ DECIDED】

**Question**: Should route files move into modules?

**Current State**:
```
src/pages/[lang]/garden/        ← Astro file-based routing
src/components/garden/           ← Components (to be migrated)
```

**After Proposal**:
```
src/pages/[lang]/garden/        ← Routes stay here
src/modules/garden/components/  ← Components move here
```

**Agent's Co-location Alternative**:
```
src/modules/garden/
  ├── components/
  ├── lib/
  └── routes/  # or pages/
      ├── [...slug].astro
      └── index.astro

src/pages/[lang]/garden/[...slug].astro  ← Re-exports from module
```

**Trade-offs**:
- ✅ Co-location: Improved cohesion, all Garden code in one place
- ❌ Co-location: Conflicts with Astro's file-routing convention

**Options**:
- [ ] Keep routes in `src/pages/` (current proposal)
- [ ] Co-locate routes in modules (re-export from pages)
- [ ] Defer decision until Astro provides better module support

**Decision**:
- [x] Keep routes in `src/pages/` (current proposal)
- [ ] Co-locate routes in modules (re-export from pages)
- [ ] Defer decision until Astro provides better module support

**Rationale**:
- Follow Astro file-routing convention (framework best practice)
- Avoid proxy file complexity (would double route file count)
- i18n routing naturally organized at top level
- Route files are thin (29-55 LOC) - logic already in modules
- User input: "这只是个个人网站项目，复杂度增长有限。不用过度工程化和提前优化"
- Use documentation to establish mental model (README in modules)

---

### A4. Infra Module Scope Definition 【✅ DECIDED】

**Question**: What should `src/modules/infra/` contain? (Renamed from "core")

**Naming Decision**: ✅ **Rename `core` → `infra`**
- "Infrastructure" eliminates ambiguity (technical vs business core)
- Industry standard for web applications
- Better semantic alignment with Charter

**Currently Included**:
- Header, Footer (`src/modules/core/components`)
- Layouts (`src/modules/core/layouts`)

**Unclear**:
- Global state management?
- Theme switching logic?
- i18n utilities?
- SEO component? (depends on A2)

**Agent Warning**:
> "Avoid `core` becoming a new garbage bin"

**Proposed Guideline**:
> Core contains **site-wide infrastructure** that is:
> 1. Used by 2+ domains
> 2. Non-business logic
> 3. Foundational (layouts, meta, global styles)

**Decision**:
- [x] Define explicit scope in `project.md` (Infra Module Charter)
- [ ] Create "Core Module Charter" in design.md
- [ ] Keep loose, refine iteratively

**Scope Definition**:
```markdown
## Infrastructure Module Charter

`src/modules/infra/` contains foundational infrastructure meeting ALL of:
1. Universality: Used by 2+ domain modules
2. No Business Logic: Pure technical concerns
3. Stability: Changes < 1/month
4. Essentiality: Removing breaks the entire site

Allowed: Layouts, Global nav, SEO, Theme, Global styles
Forbidden: Domain components, Content processing, Business logic, Data fetching
```

**Additional**:
- Preserve `src/lib/` for pure utility functions (no UI, no side effects)
- User feedback: "举例可作为 few shot prompt"
- Enforcement: Code review + periodic audit (quarterly)

---

### B3. TypeScript Path Aliases 【✅ DECIDED】

**Question**: Should we add path mappings for new module structure?

**Proposed `tsconfig.json` addition**:
```json
{
  "compilerOptions": {
    "paths": {
      "@/modules/garden": ["src/modules/garden/index.ts"],
      "@/modules/garden/*": ["src/modules/garden/*"]
    }
  }
}
```

**Trade-offs**:
- ✅ Pros: Cleaner imports, easier refactoring
- ❌ Cons: Adds configuration complexity

**Options**:
- [ ] Add module-specific aliases
- [ ] Use generic `@/modules/*` pattern
- [x] Skip (use existing `@/` alias) + barrel exports

**Decision**:
- Keep simple: `@/*` only
- Use barrel exports for clean imports

---

### D1. Migration Strategy 【✅ DECIDED】

**Question**: Should we use "copy-verify-delete" vs direct move?

**Agent's Safe Migration Flow**:
```
1. Create new directory structure
2. Copy files (keep old files)
3. Update imports
4. Verify functionality
5. Delete old files
6. Commit
```

**Current tasks.md**: Uses "Move" terminology

**Options**:
- [ ] Copy-verify-delete (safer, more steps)
- [ ] Direct move (faster, riskier)
- [x] Use git mv (preserves history, atomic)

**Decision**:
- Strategy: Atomic Git Move + Verification Gates
- Use `git mv` for all file moves
- Single commit with all changes
- Mandatory verification before commit

---

## P3 (Optional) - Future Optimization

### C2. Module Structure Standards 【✅ DECIDED】

**Question**: Should we define "when to create subdirectories" rules?

**Proposed Guideline**:
```markdown
## Module Structure Guidelines

### When to create subdirectories:
- `components/`: When module has > 10 component files
- `lib/`: When module has > 3 utility/logic files  
- `services/`: When module needs external API integration
- `types/`: When module has > 5 shared type definitions
```

**Options**:
- [ ] Add to `project.md`
- [ ] Add to `architecture` spec
- [ ] Document in design.md only
- [ ] Skip (decide case-by-case)

**Decision**:
_To be filled after discussion_

---

### D2. Rollback Plan 【✅ DEFERRED】

**Decision**: Deferred - already covered in D1 strategy
- `git reset --hard HEAD` if verification fails
- Single atomic commit ensures clean rollback

**Question**: What's the rollback strategy if migration fails?

**Options**:
- [ ] Git revert (if single commit)
- [ ] Keep old structure in separate branch
- [ ] No formal plan (fix forward)

**Decision**:
_To be filled after discussion_

---

### D3. Test Coverage Requirement 【✅ DECIDED - INCLUDED IN D1】

**Question**: Should we require tests before refactoring?

**Agent Warning**:
> "Branch protection: ensure all features have tests before refactoring"

**Current State**:
- Task 4.2 has manual test checklist
- No mention of automated tests

**Options**:
- [ ] Require automated tests for all moved components
- [ ] Manual testing checklist sufficient
- [ ] Add tests post-refactoring

**Decision**:
_To be filled after discussion_

---

### E2. Refactoring Trigger Conditions 【✅ DECIDED - INCLUDED IN A1/C2】

**Question**: When should flat structure → layered structure?

**Agent's Suggestion**:
- File count > 12
- Emergence of distinct sub-domains

**Options**:
- [ ] Document explicit triggers in specs
- [ ] Document in design.md only
- [ ] Defer (judge pragmatically when time comes)

**Decision**:
_To be filled after discussion_

---

### F1. Cross-Module Dependency Rules 【✅ DECIDED】

**Question**: How should modules communicate?

**Unclear Scenarios**:
- Can `garden` import from `core`?
- Can `portfolio` import `garden` types?
- How to expose public APIs? (via `index.ts`?)

**Agent's Future Suggestion**:
- Use `eslint-plugin-boundaries` to enforce module boundaries

**Options**:
- [ ] Define rules now in architecture spec
- [ ] Start lenient, add boundaries when problems emerge
- [ ] Use linter enforcement immediately

**Decision**:
_To be filled after discussion_

---

## Summary Table

| ID | Question | Priority | Status |
|----|----------|----------|--------|
| A1 | Module Internal Structure | P0 | ✅ DECIDED |
| A2 | SEO Component Placement | P0 | ✅ DECIDED |
| E1 | Design Document Necessity | P0 | ✅ DECIDED |
| B1 | Data File Location | P1 | ✅ DECIDED |
| B2 | Import Path Update Checklist | P1 | ✅ DECIDED |
| C1 | Spec Consolidation Strategy | P1 | ✅ DECIDED |
| A3 | Pages/Routes Relationship | P2 | ✅ DECIDED |
| A4 | Infra Module Scope | P2 | ✅ DECIDED |
| B3 | TypeScript Path Aliases | P2 | ✅ DECIDED |
| D1 | Migration Strategy | P2 | ✅ DECIDED |
| C2 | Module Structure Standards | P3 | ✅ DECIDED |
| D2 | Rollback Plan | P3 | ✅ DEFERRED |
| D3 | Test Coverage Requirement | P3 | ✅ DECIDED |
| E2 | Refactoring Trigger Conditions | P3 | ✅ DECIDED |
| F1 | Cross-Module Dependency Rules | P3 | ✅ DECIDED |

---

## Next Steps

1. Discuss and decide P0 questions (A1, A2, E1)
2. Update this document with decisions and rationale
3. Proceed to P1 questions
4. Update proposal.md, tasks.md, and create design.md based on decisions
5. Validate with `openspec validate --strict`
