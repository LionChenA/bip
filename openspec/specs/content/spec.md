# content Specification

## Purpose
TBD - created by archiving change scaffold-modular-architecture. Update Purpose after archive.
## Requirements
### Requirement: Content Collections
The system MUST use Astro Content Collections to manage `garden` and `portfolio` content.

#### Scenario: Garden Schema Definition
- **WHEN** the `garden` collection is configured
- **THEN** it MUST replace the legacy `blog` collection
- **AND** it MUST support fields: `title`, `description`, `pubDate`, `updatedDate`, `tags`
- **AND** it MUST support `type`: `evergreen` | `literature` | `article`.

#### Scenario: Portfolio Schema
- **WHEN** a portfolio item is added
- **THEN** it supports fields for `stack` (technologies used) and `projectUrl`

