## MODIFIED Requirements
### Requirement: Content Collections
The system MUST use Astro Content Collections to manage `garden` and `portfolio` content.

#### Scenario: Garden Schema Definition
- **WHEN** the `garden` collection is configured
- **THEN** it MUST replace the legacy `blog` collection
- **AND** it MUST support fields: `title`, `description`, `pubDate`, `updatedDate`, `tags`
- **AND** it MUST support `type`: `evergreen` | `literature` | `article`.

