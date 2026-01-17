# routing Specification

## Purpose
TBD - created by archiving change scaffold-modular-architecture. Update Purpose after archive.
## Requirements
### Requirement: Internationalized Routing
All content routes MUST be prefixed with the language code (e.g., `/en/`, `/zh/`) to support internationalization.

#### Scenario: English Home Page
- **WHEN** accessing the home page in English
- **THEN** the URL is `/en/`

#### Scenario: Chinese Garden Index
- **WHEN** accessing the garden list in Chinese
- **THEN** the URL is `/zh/garden/`

### Requirement: Dynamic Route Generation
The system SHALL generate static routes for all supported languages using `[lang]` parameters.

#### Scenario: Static Build
- **WHEN** the site is built
- **THEN** HTML files are generated for both `/en/...` and `/zh/...` paths

### Requirement: Core Section Routes
The system MUST provide accessible routes for all core sections: Garden, Work, and About, in all supported languages.

#### Scenario: Access Garden
- **WHEN** navigating to `/en/garden` or `/zh/garden`
- **THEN** the Garden index page is rendered

#### Scenario: Access Work
- **WHEN** navigating to `/en/work` or `/zh/work`
- **THEN** the Work index page is rendered

#### Scenario: Access About
- **WHEN** navigating to `/en/about` or `/zh/about`
- **THEN** the About index page is rendered

### Requirement: Tag Pages
The system SHALL generate static pages for each tag used in the Garden.

#### Scenario: Tag View
- **WHEN** user visits `/garden/tags/react`
- **THEN** they see a list of all garden posts tagged with "react".

### Requirement: Garden URL Structure
The system SHALL expose Garden content under the `/garden` URL path.

#### Scenario: URL Structure
- **WHEN** user navigates content
- **THEN** URLs follow the pattern `/garden/[slug]` or `/garden/tags/[tag]`.

