# ui Specification

## Purpose
TBD - created by archiving change scaffold-modular-architecture. Update Purpose after archive.
## Requirements
### Requirement: Shadcn UI Integration
The system MUST use Shadcn UI for atomic components, located in `src/components/ui/`.

#### Scenario: Component Usage
- **WHEN** using a button
- **THEN** it is imported from `@/components/ui/button`

### Requirement: Initial Component Set
The system SHALL include the following base Shadcn components: `card`, `badge`, `separator`, `navigation-menu`, `sheet`, `avatar`, `button`.

#### Scenario: Card Availability
- **WHEN** building a blog post preview
- **THEN** the `Card` component is available for use

### Requirement: Theme System
The system MUST support Light, Dark, and System theme modes, persisting preference via `localStorage` and preventing flash of unstyled content (FOUC).

#### Scenario: Theme Persistence
- **WHEN** user selects Dark mode and reloads the page
- **THEN** the site remains in Dark mode without flickering

#### Scenario: System Preference
- **WHEN** user selects System mode
- **THEN** the site adapts to the OS color scheme preference

### Requirement: Visual Transitions
The system MUST use View Transitions API for theme changes and page navigation to provide smooth visual feedback.

#### Scenario: Theme Toggle Animation
- **WHEN** user toggles the theme
- **THEN** the colors transition smoothly (approx 0.3s)

### Requirement: Work Page
The system SHALL provide a `/work` page to showcase portfolio and skills.

#### Scenario: Portfolio Tab
- **WHEN** user visits `/work` and selects "Portfolio"
- **THEN** they see a grid of project cards with covers and descriptions.

#### Scenario: Stack Tab
- **WHEN** user selects "Stack"
- **THEN** they see an interactive list of technologies (Icon Wall) and their proficiency/usage.

#### Scenario: Stack-Project Linking
- **WHEN** user interacts with a technology in the Stack tab
- **THEN** they see a list of projects where this technology was used.

### Requirement: About Page
The system SHALL provide a `/about` page for personal information.

#### Scenario: Content Sections
- **WHEN** user visits `/about`
- **THEN** they see "Who Am I", "Interests", "Tech Stack", "Achievements", and "Contact" sections.

### Requirement: Home Page Feeds
The system SHALL display dynamic content on the homepage.

#### Scenario: Latest Garden
- **WHEN** user visits `/`
- **THEN** they see the 3 most recent posts from the Garden (blog).

#### Scenario: Featured Projects
- **WHEN** user visits `/`
- **THEN** they see highlighted projects marked as featured.

