## MODIFIED Requirements
### Requirement: Content Collections
The system MUST use Astro Content Collections to manage `garden` and `portfolio` content.

#### Scenario: Garden Schema Definition
- **WHEN** the `garden` collection is configured
- **THEN** it MUST replace the legacy `blog` collection
- **AND** it MUST support fields: `title`, `description`, `pubDate`, `updatedDate`, `tags`
- **AND** it MUST support `type`: `evergreen` | `literature` | `article`.

## REMOVED Requirements
### Requirement: Blog Schema Validation
**Reason**: Replaced by Garden Schema to unify domain terminology.
**Migration**: Rename `src/content/blog` to `src/content/garden`.
