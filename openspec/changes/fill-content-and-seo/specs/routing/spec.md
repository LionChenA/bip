## ADDED Requirements

### Requirement: Tag Pages
The system SHALL generate static pages for each tag used in the Garden.

#### Scenario: Tag View
- **WHEN** user visits `/garden/tags/react`
- **THEN** they see a list of all garden posts tagged with "react".

### Requirement: Garden Alias
The system SHALL expose `blog` content under the `/garden` URL path.

#### Scenario: URL Structure
- **WHEN** user navigates content
- **THEN** URLs follow the pattern `/garden/[slug]` or `/garden/tags/[tag]`.
