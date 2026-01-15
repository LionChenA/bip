## ADDED Requirements
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
