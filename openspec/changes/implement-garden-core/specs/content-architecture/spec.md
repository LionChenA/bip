# Content Architecture Spec

## ADDED Requirements

### Requirement: Garden Collection
The system MUST support a `garden` content collection to replace the legacy `blog`.

#### Scenario: Defining the Garden Schema
- **Given** the content configuration file `src/content/config.ts`
- **When** the `garden` collection is defined
- **Then** it MUST support a `type` field with values `evergreen`, `literature`, `article`
- **And** it MUST NOT support a `fleeting` type
- **And** it MUST include standard metadata: `title`, `description`, `pubDate`, `updatedDate`, `tags`, `lang`
- **And** `heroImage` SHOULD be optional (primarily for `article` type).

### Requirement: Backlink Generation
The build process MUST generate a bidirectional link index.

#### Scenario: Parsing Links
- **Given** a set of MDX files in `src/content/garden/`
- **When** the site builds
- **Then** a process MUST scan all markdown links matching the pattern `[Link Text](/garden/{slug})`
- **And** it MUST aggregate these references into a data structure mapping `target_slug` to `source_slug` (and context/title if possible)
- **And** this data MUST be available to the runtime (e.g., as `backlinks.json` or a build-time import) to display "Linked References" on note pages.

## REMOVED Requirements

### Requirement: Blog Collection
The `blog` collection is deprecated.

#### Scenario: Removing Legacy Blog
- **Given** the existing `blog` collection
- **When** the new `garden` is fully implemented
- **Then** the `blog` definition in `config.ts` MUST be removed or aliased to `garden` for backward compatibility during migration.
