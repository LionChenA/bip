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

### Requirement: Portfolio Schema
The portfolio content schema MUST support academic achievements as first-class citizens.

#### Scenario: Academic Stack
- **WHEN** a portfolio item is added
- **THEN** it SHALL support fields for `stack` (technologies used) and `projectUrl`
- **AND** the `stack` field MUST support academic courses (e.g., "CS188") as valid tools.

### Requirement: Learning Collection
The system MUST support a `learning` content collection for managing external course materials.

#### Scenario: Learning Schema Definition
- **WHEN** the `learning` collection is configured
- **THEN** it MUST support fields: `title`, `description`, `courseId`, `courseName`, `type`, `status`, `isPublic`, `tags`, `order`
- **AND** `type` MUST be one of: `lecture`, `project`, `hw`, `exam`, `reading`, `note`
- **AND** `status` MUST be one of: `not_started`, `in_progress`, `completed`, `reviewed`
- **AND** `isPublic` MUST default to `false` for privacy

#### Scenario: Distributed Content Sources
- **WHEN** learning content is sourced from external repositories
- **THEN** the content SHOULD be synced via GitHub Action from external private repository
- **AND** a development mock MAY exist at `src/content/learning_mock/` for testing
- **AND** the sync script MUST aggregate progress data from `.tutor/module.json` and frontmatter

#### Scenario: Progress Tracking
- **WHEN** the intellect-sync script runs
- **THEN** it MUST generate `src/modules/infra/data/intellect-progress.json`
- **AND** the JSON MUST include: `totalCourses`, `totalItems`, `completedItems`, `overallProgress`, `courses[]`
- **AND** each course MUST include: `courseId`, `courseName`, `progress`, `recentItems[]`

#### Scenario: External Private Repository Sync
- **WHEN** learning content is synced from external private GitHub repository
- **THEN** the system MUST pull:
  - `syllabus.json` - course metadata (id, title, provider)
  - `.tutor/module.json` - module metadata (id, type, title, status, completedDate, secret)
  - `notes.md` - learning notes (encrypted if marked secret)
- **AND** the sync SHOULD be performed via GitHub Action with proper authentication
- **AND** the sync script MUST support nested directory structure (lectures/, homeworks/, projects/)

#### Scenario: Privacy Marking
- **WHEN** `.tutor/module.json` contains `"secret": true`
- **THEN** the associated notes.md MUST be excluded from public build
- **AND** SHOULD be encrypted at rest in BIP repository

#### Scenario: Encrypted Notes Storage
- **WHEN** private notes are synced to BIP repository
- **THEN** they MUST be encrypted using age or openssl
- **AND** stored as `*.age` files
- **AND** decrypted on-demand with user-provided password

#### Scenario: Module Data Format
- **WHEN** reading module metadata from `.tutor/module.json`
- **THEN** it MUST contain: `id`, `type`, `title`, `status`
- **AND** MAY contain: `completedDate`, `from[]`, `to[]`, `resources`, `secret`
- **AND** status values MUST be: `not-started`, `in-progress`, `completed`, `reviewed`

