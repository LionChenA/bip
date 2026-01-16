## MODIFIED Requirements
### Requirement: Dual Timeline Navigation
The Garden index page MUST feature a time-based navigation sidebar using a double-line SVG visualization.

#### Scenario: SVG Timeline Visualization
- **Given** the user is on `/garden`
- **Then** a fixed sidebar on the left MUST display a double vertical line structure (Prominent Year line + Subtle Month line)
- **And** delimiters (dots or gaps) MUST align horizontally with the FIRST note title of that period ("Top-Anchor" pattern)
- **And** the distance between markers MUST be proportional to content density ($k=0.4$ metaphor)
- **And** labels MUST be implicit, appearing only on hover or via scroll-sync.

## MODIFIED Requirements
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

## ADDED Requirements
### Requirement: Data Pre-heating
The system MUST optimize content delivery through tiered data loading.

#### Scenario: Tiered Loading
- **Given** the main Garden manifest
- **Then** it MUST include approximately 1KB of preview data for each note
- **When** the user hovers over a NoteItem for >100ms
- **Then** the system MUST background-fetch the full MDX JSON
- **And** it MUST pre-load backlinks for notes referenced in the current viewport or open article.
