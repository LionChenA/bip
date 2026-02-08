## 1. GardenList Refactoring

- [x] 1.1 Extract fetch logic in `src/modules/garden/components/GardenList.tsx` into a reusable `fetchContent` helper function.
- [x] 1.2 Implement error handling in the new `fetchContent` function to log errors with `[GardenList]` prefix instead of swallowing them.
- [x] 1.3 Verify that both `handleHover` and `handleExpand` use the new helper function.

## 2. API Type Safety

- [x] 2.1 Update `src/pages/garden/[slug].json.ts` to import `CollectionEntry` from `astro:content`.
- [x] 2.2 Replace `any` types in `GET` function props with `CollectionEntry<'garden'>`.
- [x] 2.3 Ensure type safety for `entry.data` access.

## 3. Component Testing

- [x] 3.1 Create `src/modules/garden/components/FilterBar.test.tsx`.
- [x] 3.2 Add test case: Renders all filter options correctly.
- [x] 3.3 Add test case: Calls `onFilterChange` with correct value when a button is clicked.
- [x] 3.4 Add test case: Highlights the active filter button.

## 4. Verification

- [x] 4.1 Run type check (`pnpm check` or `tsc`) to ensure no new type errors.
- [x] 4.2 Run tests (`pnpm test`) to verify `FilterBar` logic.
- [x] 4.3 Manual verify: Hover/Expand behavior in Garden still works.

## 5. Cleanup
- [x] 5.1 Remove `openspec/AGENTS.md`. (Confirmed deprecated by librarian)
