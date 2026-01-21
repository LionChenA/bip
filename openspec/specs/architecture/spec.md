# architecture Specification

## Purpose
TBD - created by archiving change scaffold-modular-architecture. Update Purpose after archive.
## Requirements
### Requirement: Modular Directory Structure
The application code MUST be organized into **Domain Modules** under `src/modules/`.
A Domain Module is a self-contained unit of business logic and UI.

#### Scenario: Module Anatomy
- **WHEN** a module (e.g., `garden`) is created
- **THEN** it MUST be located at `src/modules/garden/`
- **AND** it MAY contain subdirectories: `components/`, `lib/`, `services/`, `types/`
- **AND** it MUST NOT depend on other modules' internal implementation details (only public APIs).

### Requirement: Component Organization
All React and Astro components MUST be strictly categorized:
- `src/components/ui/`: **Atomic** Shadcn/Base-UI primitives (Buttons, Inputs).
- `src/components/shared/`: **Layout** and Composition components shared across multiple modules (Header, Footer).
- `src/modules/<domain>/components/`: **Domain-Specific** components (e.g., `GardenTimeline`, `PortfolioCard`).

#### Scenario: Forbidden Global Components
- **WHEN** a developer creates a feature-specific component (e.g., `SEO.astro`)
- **THEN** it MUST NOT exist in `src/components/` root.
- **AND** if it is used globally, it SHOULD be in `src/modules/infra/` or `src/components/shared/`.

### Requirement: Domain Logic Encapsulation
Business logic specific to a domain MUST reside within that module's directory.

#### Scenario: Backlinks Logic
- **WHEN** logic exists for parsing backlinks (specific to Garden)
- **THEN** it MUST be located in `src/modules/garden/lib/` or `src/modules/garden/utils/`
- **AND** it MUST NOT be placed in the global `src/lib/` (which is reserved for generic utilities).

### Requirement: Module Definitions
The system SHALL support the following initial modules:
- `blog`: Article management and display.
- `portfolio`: Project showcase.
- `infra`: Shared layouts, meta, and navigation.

#### Scenario: Blog Module Existence
- **WHEN** the project is initialized
- **THEN** `src/modules/blog/` exists

#### Scenario: Infra Module Existence
- **WHEN** the project is initialized
- **THEN** `src/modules/infra/` exists

