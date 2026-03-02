## Why

To improve the robustness, maintainability, and developer experience of the Digital Garden module by addressing technical debt identified during codebase scanning.

## What Changes

- **Refactor**: Extract duplicated content fetching logic in `GardenList` into a reusable helper.
- **Error Handling**: Add proper error logging in `GardenList` where errors are currently silently swallowed.
- **Testing**: Add unit tests for the `FilterBar` component to ensure UI stability.
- **Type Safety**: Replace `any` types in the garden API route with proper Astro `CollectionEntry` types.

## Capabilities

### New Capabilities
- `garden-maintenance`: Improvements to the internal quality and reliability of the garden module. The system MUST provide high quality of code.

### Modified Capabilities
<!-- No existing functional requirements are changing, just implementation quality. -->

## Impact

- `src/modules/garden/components/GardenList.tsx`: Logic extraction and error handling.
- `src/modules/garden/components/FilterBar.tsx`: Associated test file creation.
- `src/pages/garden/[slug].json.ts`: Type definition updates.
