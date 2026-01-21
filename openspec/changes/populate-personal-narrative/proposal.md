# Change: Populate Personal Narrative

## Why
The current site uses placeholder data ("Lorem Ipsum", fake achievements). To serve as a genuine personal portfolio, it must reflect the user's unique journey from Chemistry to Media Ecology and HCI.

## What Changes
1. **Data Infrastructure**: 
   - Create `src/modules/infra/data/siteConfig.ts` for global metadata.
   - Create `src/modules/about/data/resume.ts` for bio and philosophy.
2. **Concept Integration**: 
   - Update `src/modules/portfolio/data/stack.ts` to include **Completed Courses** (e.g., CS188, CS61) as "Academic Tool Stack".
   - Include "AI-Native Engineering" tools (OpenCode, Biome) in the stack.
3. **UI Updates**: Refactor `AboutContent.tsx` to consume these data sources.

## Impact
- **Affected Specs**: `content`
- **Affected Code**: `src/modules/about`, `src/modules/portfolio`
