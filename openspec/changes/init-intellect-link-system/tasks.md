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
