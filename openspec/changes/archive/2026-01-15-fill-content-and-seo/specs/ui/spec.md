## ADDED Requirements

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
