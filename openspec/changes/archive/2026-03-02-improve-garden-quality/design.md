## Context

The `GardenList` component contains duplicated logic for fetching and caching note content in `handleHover` and `handleExpand`. Additionally, the codebase has accumulated some technical debt with `any` types and missing error handling.

## Goals

1. **DRY Principle**: Remove code duplication in `GardenList`.
2. **Robustness**: Prevent silent failures in content fetching.
3. **Type Safety**: Eliminate `any` in critical API paths.
4. **Testability**: Ensure UI components like `FilterBar` have regression tests.

## Decisions

### 1. Extract `fetchContent` Helper

Instead of a custom hook (which might be overkill for this single component use-case), we will extract a private async helper function `fetchContent` within the `GardenList` component or as a utility if it doesn't depend on component state.

Given it updates state (`setContentCache`), it's best kept inside the component or as a simple `useGardenContent` hook if we want to separate concerns cleanly. **Decision**: Keep it simple—refactor into a helper function inside the component that takes the slug and updates state, handling the fetch and error logging.

### 2. Error Logging Strategy

We will use `console.error` with a clear prefix `[GardenList]` to make debugging easier in development. We won't introduce a heavy logging library for this small scope.

### 3. Astro Content Types

We will import `CollectionEntry` from `astro:content` to type the API response props.

```typescript
import type { CollectionEntry } from 'astro:content';
// ...
export async function GET({ props }: { props: { entry: CollectionEntry<'garden'> } }) { ... }
```

### 4. Testing Strategy

We will use the existing testing setup (Vitest + React Testing Library) to create `src/modules/garden/components/FilterBar.test.tsx`.
