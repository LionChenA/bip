## 1. Schema & Validation
- [ ] 1.1 Update `src/content/config.ts` to include the `learning` collection schema.
- [ ] 1.2 Define TypeScript interfaces for the `Syllabus` and `LearningData` in `src/modules/infra/types/learning.ts`.

## 2. Sync & Defense Infrastructure
- [ ] 2.1 Create mock directory `src/content/learning_mock/` for testing before submodule attachment.
- [ ] 2.2 Scaffold `src/modules/infra/scripts/intellect-sync.ts` to calculate progress based on file count and syllabus mapping.
- [ ] 2.3 Implement basic `No-Index` and `isPublic` filtering logic in the data layer.

## 3. UI Integration (Skeleton)
- [ ] 3.1 Create `IntellectDashboard` component in `src/modules/about/components/`.
- [ ] 3.2 Add "Learning Path" slot to `AboutContent.tsx`.

## 4. Documentation
- [ ] 4.1 Update `openspec/specs/content/spec.md` with distributed content requirements.

## 5. Conflict Resolution (Deferred)
- [ ] 5.1 Address schema conflict: `garden` vs `learning` separation might require a migration strategy for existing content.
- [ ] 5.2 Address "Knowledge Bridge": Bi-directional `reference()` fields need to be synchronized with `populate-personal-narrative` stack definitions.

## 6. Submodule Engineering Challenges
- [ ] 6.1 Research: Image path resolution for submodules (Relative paths in MDX break when moved).
- [ ] 6.2 Ops: Configure CI/CD (GitHub Actions) with proper tokens to fetch private/public submodules.
