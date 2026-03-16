## 1. Schema & Validation
- [x] 1.1 Update `src/content/config.ts` to include the `learning` collection schema.
- [x] 1.2 Define TypeScript interfaces for the `Syllabus` and `LearningData` in `src/modules/infra/types/learning.ts`.

## 2. Sync & Defense Infrastructure
- [x] 2.1 Create mock directory `src/content/learning_mock/` for testing before sync.
- [x] 2.2 Scaffold `src/modules/infra/scripts/intellect-sync.ts` to calculate progress based on `.tutor/module.json` and syllabus.
- [x] 2.3 Implement privacy marking in `.tutor/module.json` (secret: true).

## 3. Architecture - Sync from External Private Repo (NEW)
- [x] 3.1 Course repository is now a separate private GitHub repo (git@github.com:LionChenA/course.git).
- [x] 3.2 Sync script reads from external course repo (not submodule).
- [x] 3.3 Support nested course structure: lectures/, homeworks/, projects/ subdirectories.
- [x] 3.4 Fallback to frontmatter parsing for legacy format.

## 4. Encryption (NEW)
- [ ] 4.1 Implement encryption script for private notes (age or openssl).
- [ ] 4.2 Store encrypted notes (*.age) in BIP repository.
- [ ] 4.3 Decryption UI: password input to reveal private notes.
- [ ] 4.4 Configure GitHub Action to encrypt during sync.

## 5. GitHub Action - Automated Sync (NEW)
- [ ] 5.1 Create `.github/workflows/sync-course.yml`.
- [ ] 5.2 Configure定时触发 (daily at 6 AM UTC).
- [ ] 5.3 Configure手动触发 (workflow_dispatch).
- [ ] 5.4 Setup secrets: COURSE_REPO, COURSE_REPO_TOKEN, ENCRYPTION_PASSWORD.
- [ ] 5.5 Implement: pull course → encrypt notes → generate progress → commit.

## 6. UI Integration
- [x] 6.1 Create `IntellectDashboard` component in `src/modules/about/components/`.
- [x] 6.2 Add "Learning Path" slot to `AboutContent.tsx`.
- [x] 6.3 Create `/learning` page at `src/pages/[lang]/learning/`.
- [ ] 6.4 Add decryption UI for private notes.

## 7. Documentation
- [x] 7.1 Update `openspec/specs/content/spec.md` with distributed content requirements.
- [x] 7.2 Update `openspec/specs/architecture/spec.md` with privacy requirements.
- [ ] 7.3 Document encryption setup and password management.

## 8. Deferred / Future
- [ ] 8.1 Address schema conflict: `garden` vs `learning` separation.
- [ ] 8.2 Address "Knowledge Bridge": Bi-directional reference fields.
- [ ] 8.3 Research: Image path resolution for external content.
