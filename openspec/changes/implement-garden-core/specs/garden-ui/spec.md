# Garden UI Spec

## ADDED Requirements

### Requirement: Dual Timeline Navigation
The Garden index page MUST feature a time-based navigation sidebar.

#### Scenario: Timeline Visualization
- **Given** the user is on `/garden`
- **Then** a fixed sidebar on the left MUST display a timeline of Years and Months derived from existing content
- **And** visual dividers MUST appear every three months (Quarterly)
- **And** clicking a month MUST scroll the main feed to the corresponding content
- **And** scrolling the main feed MUST automatically highlight the current month in the sidebar.

### Requirement: Infinite Scroll & List Interaction
The note list MUST support high-performance browsing of all content.

#### Scenario: Loading the List
- **Given** the Garden index loads
- **Then** it MUST fetch a lightweight JSON manifest containing metadata for ALL published garden notes
- **And** it MUST render the initial viewport items immediately
- **And** it MUST render subsequent items as the user scrolls (virtualization or simple append).

#### Scenario: In-Place Expansion
- **Given** a note item in the list
- **When** the user clicks the item
- **Then** the URL MUST update to `/garden/{slug}`
- **And** the item card MUST expand (using animation/morphing) to reveal the full content
- **And** the Title MUST move to a prominent position
- **And** the Timeline sidebar MUST fade out or disable
- **And** a Table of Contents (TOC) MUST appear floating on the right side.

### Requirement: Filtering System
The user MUST be able to filter content by type.

#### Scenario: Filtering by Type
- **Given** filter buttons `[All]`, `[Evergreen]`, `[Literature]`, `[Article]`
- **When** a user clicks a filter (e.g., `Evergreen`)
- **Then** the list MUST show only items of that type
- **And** the URL Query parameter MUST update to `?type=evergreen`
- **And** refreshing the page with that query param MUST preserve the filter state.
