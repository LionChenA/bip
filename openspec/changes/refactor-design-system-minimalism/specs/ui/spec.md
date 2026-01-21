## MODIFIED Requirements
### Requirement: Visual Transitions
The system MUST use View Transitions API for theme changes and page navigation to provide smooth visual feedback.

## ADDED Requirements
### Requirement: Design Language
The system visual style MUST follow a "Swiss Minimalist" approach.

#### Scenario: Component Styling
- **WHEN** rendering a card or button
- **THEN** it MUST have sharp corners (radius: 0)
- **AND** it MUST rely on typography and whitespace rather than shadows.

### Requirement: Privacy UI
The system MUST provide visual feedback for encrypted/private content.

#### Scenario: Private Content Display
- **WHEN** a user encounters a private note
- **THEN** it is rendered as "Scrambled Text" or blurred
- **AND** it displays a "Respect Academic Integrity" notice.
