## MODIFIED Requirements
### Requirement: Dual Timeline Navigation
The Garden index page MUST feature a time-based navigation sidebar using a double-line visualization.

#### Scenario: Timeline Visualization
- **Given** the user is on `/garden`
- **Then** a fixed sidebar on the left MUST display a double vertical line structure (Year Line + Month Line)
- **And** the Year Line MUST be thicker/more prominent than the Month Line
- **And** visual dividers (horizontal lines or gaps) MUST align with the content groups
- **And** clicking a month anchor MUST scroll the main feed to the corresponding content.

## MODIFIED Requirements
### Requirement: Infinite Scroll & List Interaction
The note list MUST support high-performance browsing and fluid state transitions.

#### Scenario: Loading the List
- **Given** the Garden index loads
- **Then** it MUST fetch a lightweight JSON manifest containing metadata for ALL published garden notes
- **And** it MUST render the initial viewport items immediately
- **And** it MUST render subsequent items as the user scrolls.

#### Scenario: Card States
- **Given** a note item in the list
- **When** the item is in **Default State**
- **Then** it MUST display only `Title` and `Tags` (minimalist)
- **When** the user **Hovers** over the item
- **Then** it MUST smoothly expand (animate height) to reveal the `Summary`
- **When** the user **Clicks** the item (Active State)
- **Then** the URL MUST update to `/garden/{slug}`
- **And** the content MUST expand to fill available space
- **And** the Title MUST become sticky at the top
- **And** the Timeline sidebar MUST remain visible (dimmed, not removed)
- **And** subsequent sibling items MUST be pushed down (not hidden).
