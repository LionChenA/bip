## 1. Data Creation
- [ ] 1.1 Create `src/modules/infra/data/siteConfig.ts` with "Lion Chen" identity and social links.
- [ ] 1.2 Create `src/modules/about/data/resume.ts` with "Paradigm Shift" narrative and philosophy.
- [ ] 1.3 Refactor `src/modules/portfolio/data/stack.ts` to use simple categories (Code, AI, Course, Environment).

## 2. Component Refactoring (About Page)
- [ ] 2.1 Refactor `AboutContent.tsx` to use a clean **Sidebar + Main Content** layout.
- [ ] 2.2 Implement `Sidebar` for Identity, Contact, and Actions (Download CV).
- [ ] 2.3 Implement `MainContent` using `prose` for Bio and Philosophy (Text-focused, no complex animations).
- [ ] 2.4 Remove legacy sections (Interests, Achievements) that duplicate the narrative.

## 3. Component Refactoring (Work Page)
- [ ] 3.1 Update `StackTab.tsx` to handle the new `stack.ts` data structure (categories, no colors).
