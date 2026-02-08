## ADDED Requirements

### Requirement: Robust Garden Content Fetching

The `GardenList` component must efficiently fetch and handle note content without duplication or silent failures.

#### Scenario: Fetching Note Content
- **WHEN** a user hovers over a note link OR clicks to expand a note
- **THEN** the system must fetch the content for that note slug
- **AND** cache the result to prevent re-fetching
- **AND** log any errors to the console if the fetch fails (do not fail silently)

### Requirement: FilterBar Interaction

The `FilterBar` component must correctly handle user interactions for filtering garden content.

#### Scenario: Selecting a Filter
- **WHEN** a user clicks a filter button (e.g., "Articles")
- **THEN** the `onFilterChange` callback must be invoked with the corresponding filter type
- **AND** the clicked button must display as active (primary color)

### Requirement: Type-Safe API

The Garden API endpoints must use strict typing for data integrity.

#### Scenario: API Response Structure
- **WHEN** the `GET` endpoint for a garden note is called
- **THEN** it must return a JSON object with `content`, `backlinks`, and metadata
- **AND** the internal data structures must use `CollectionEntry<'garden'>` instead of `any`
