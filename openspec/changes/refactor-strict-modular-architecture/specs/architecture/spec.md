## MODIFIED Requirements
### Requirement: Module Definitions
The system SHALL support the following initial modules:
- `blog` (or `garden`): Article management and display.
- `portfolio`: Project showcase and tech stack management.
- `core`: Shared layouts, meta, navigation, and global configuration.
- `about`: Personal information and biography.

#### Scenario: Core Module Existence
- **WHEN** the project is initialized
- **THEN** `src/modules/core/` exists (formerly `infra`)
- **AND** it contains shared components and layouts.

## ADDED Requirements
### Requirement: Data Encapsulation
Static data files (JSON/TS) specific to a domain MUST be located within that module's `data/` directory.

#### Scenario: Stack Data Location
- **WHEN** defining the tech stack list for the portfolio
- **THEN** the file MUST be located at `src/modules/portfolio/data/stack.ts`
- **AND** MUST NOT be in a global `src/data/` directory.
