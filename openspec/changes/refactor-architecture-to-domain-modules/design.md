# Design: Domain-Driven Modular Architecture

## Context
Personal website (Blog/Portfolio/CV) with Modular Monolith pattern. Current issues: inconsistent module organization, leaky domain abstractions, terminology ambiguity.

## Goals
- Strict domain boundaries
- Module self-sufficiency (own logic + data + artifacts)
- Clear infrastructure scope
- Minimal complexity for project scale

## Key Decisions

### 1. Module Structure: Flat
**Choice**: All files in module root until scale requires subdivision

**Rationale**: 6 files (~850 LOC) too small for premature layering. YAGNI principle.

**Trigger**: Subdivide when >8 files of same type OR distinct sub-domains emerge

---

### 2. Infrastructure Scope
**Choice**: Rename `core` → `infra`, enforce strict charter

**Charter**:
- Universality: Used by 2+ domains
- Technical only: No business logic
- Stability: Rarely changes
- Essential: Required for site operation

**Examples**: Layouts, SEO, theme, global nav. NOT: domain components, content processing, business logic.

---

### 3. Data Ownership
**Choice**: Build artifacts in `modules/garden/data/`, gitignored

**Rationale**: Complete domain cohesion, cleaner git history, modular monolith principle

---

### 4. Pages Separation
**Choice**: Routes in `src/pages/`, components in `modules/`

**Rationale**: Follow Astro file-routing convention, avoid proxy complexity, route files already thin (29-55 LOC)

---

### 5. TypeScript Paths
**Choice**: Keep `@/*` only, use barrel exports for clean APIs

**Rationale**: Single alias sufficient, zero maintenance, self-documenting paths

---

### 6. Spec Organization
**Choice**: DDD single file per domain, split by sub-domain if >300 LOC

**Rationale**: Specs map to business capabilities, not technical layers

---

### 7. Migration
**Choice**: Atomic `git mv` commit + verification gates

**Gates**: TypeScript check, build success, manual testing. Rollback: `git reset --hard HEAD`

## Module Guidelines (for project.md)

### Structure Evolution
- Start: Flat (all files in root)
- Subdivide: When >8 files of same type
- Split: When >200 LOC with separable sub-domains

### Dependency Rules
**Allowed**: Module → infra, Module → `src/lib/`, Module → `components/ui/`

**Forbidden**: Module → Module, infra → Module

**Enforcement**: Code review

## Risks & Mitigation
| Risk | Mitigation |
|------|------------|
| Import breaks | TypeScript + LSP verification |
| Missing artifacts | Update CI, document local build |
| Infra drift | Explicit charter + code review |
| Git history loss | Use `git mv` |
