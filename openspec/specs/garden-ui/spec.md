# garden-ui Specification

## Purpose
TBD - created by archiving change implement-garden-core. Update Purpose after archive.
## Requirements
### Requirement: Dual Timeline Navigation
The Garden index page MUST feature a time-based navigation sidebar.

#### Scenario: Timeline Visualization
- **Given** the user is on `/garden`
- **Then** a fixed sidebar on the left MUST display a timeline of Years and Months derived from existing content
- **And** visual dividers MUST appear every three months (Quarterly)
- **And** clicking a month MUST scroll the main feed to the corresponding content
- **And** scrolling the main feed MUST automatically highlight the current month in the sidebar.

### Requirement: Filtering System
The user MUST be able to filter content by type.

#### Scenario: Filtering by Type
- **Given** filter buttons `[All]`, `[Evergreen]`, `[Literature]`, `[Article]`
- **When** a user clicks a filter (e.g., `Evergreen`)
- **Then** the list MUST show only items of that type
- **And** the URL Query parameter MUST update to `?type=evergreen`
- **And** refreshing the page with that query param MUST preserve the filter state.

### Requirement: Infinite Scroll & Reading Mode
The note list MUST support high-performance browsing and seamless transition into a Reading Mode island.

#### Scenario: Reading Mode Activation
- **Given** a NoteItem in the list
- **When** the user clicks the NoteItem
- **Then** the item MUST expand to `fit-content` using layout projection
- **And** the Title MUST become `sticky` under the global header
- **And** sibling notes MUST be pushed down while remaining in the DOM
- **And** the left timeline MUST remain visible but dimmed
- **And** the URL MUST update via `pushState` without an Astro page reload.

#### Scenario: Reading Mode Closure
- **Given** the Reading Mode is active
- **When** the user presses `Esc` or clicks the sticky title
- **Then** the note MUST collapse back to its list state
- **And** the URL MUST revert to `/garden` (or handle `popstate`).

### Requirement: Data Pre-heating
The system MUST optimize content delivery through tiered data loading.

#### Scenario: Tiered Loading
- **Given** the main Garden manifest
- **Then** it MUST include approximately 1KB of preview data for each note
- **When** the user hovers over a NoteItem for >100ms
- **Then** the system MUST background-fetch the full MDX JSON
- **And** it MUST pre-load backlinks for notes referenced in the current viewport or open article.

