## MODIFIED Requirements
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
- **AND** if it is used globally, it SHOULD be in `src/modules/core/` or `src/components/shared/`.

