## ADDED Requirements
### Requirement: Modular Directory Structure
The application code MUST be organized into feature-specific modules under `src/modules/` and generic UI components under `src/components/ui/`.

#### Scenario: Module Separation
- **WHEN** a developer adds a new blog feature
- **THEN** the code is placed in `src/modules/blog/`
- **AND** it does not mix with `src/modules/portfolio/`

#### Scenario: Shared Core Components
- **WHEN** looking for the site Header or Footer
- **THEN** they are found in `src/modules/core/components`

### Requirement: Component Organization
All React and Astro components MUST be located in one of the following directories:
- `src/components/ui/` (Atomic Shadcn components)
- `src/components/shared/` (Generic layout components)
- `src/modules/<module-name>/components/` (Feature-specific components)
Components SHALL NOT exist directly in `src/components/` root.

#### Scenario: Forbidden Root Components
- **WHEN** a component is placed in `src/components/MyComponent.astro`
- **THEN** it violates the structural constraint

### Requirement: Module Definitions
The system SHALL support the following initial modules:
- `blog`: Article management and display.
- `portfolio`: Project showcase.
- `core`: Shared layouts, meta, and navigation.

#### Scenario: Blog Module Existence
- **WHEN** the project is initialized
- **THEN** `src/modules/blog/` exists
