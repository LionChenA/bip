# Change: Init Intellect-Link System

## Why
To address the disconnect between fast-growing technology and human culture by building a personal intellectual infrastructure. 
The system aims to manage deep learning (Literature Notes) from external course repositories (like Berkeley CS188, CS61) and integrate them with personal insights (Permanent Notes) in a sovereign, decoupled, and automated way.

## What Changes
1. **Content Schema**: Define a new Astro Content Collection `learning` with fields for `courseId`, `type` (lecture/project/hw), `status`, and `isPublic`.
2. **Infrastructure**: 
   - Add a mount point for a Git Submodule at `src/content/learning/`.
   - Implement a sync script `src/modules/infra/scripts/intellect-sync.ts` to aggregate progress and enforce privacy (encryption/obfuscation).
3. **Architecture Expansion**: Formalize the "Dual-Track" intellectual output (Curriculum vs Synthesis) in the project specification.
4. **Skill Blueprint**: Define the interface for the AI Tutor Skill to fetch syllabi and analyze note alignment.

## Impact
- **Affected Specs**: `content`, `architecture`
- **Affected Code**: `src/content/config.ts`, `src/modules/about/components/AboutContent.tsx`
- **Risk**: Low. Content is pulled from an external repo; main site stability is maintained via strict schema validation.
