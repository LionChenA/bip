## ADDED Requirements

### Requirement: Backlink Display
Notes MUST show where they are cited.

#### Scenario: Displaying References
- **Given** a note is viewed (expanded or separate page)
- **When** the `backlinks` data indicates other notes link to this one
- **Then** a "Backlinks" or "Linked by" section MUST appear at the bottom of the content
- **And** it MUST list the linking notes with clickable links.
