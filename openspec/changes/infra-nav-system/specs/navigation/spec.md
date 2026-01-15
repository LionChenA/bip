## ADDED Requirements
### Requirement: Global Navigation Header
The system MUST display a global header on all pages containing the site logo, primary navigation links, and utility controls.

#### Scenario: Desktop Navigation
- **WHEN** viewing the site on desktop
- **THEN** links for Home, Garden, Work, and About are visible
- **AND** the Logo is on the left
- **AND** utility controls are on the right

### Requirement: Language Switching
The system MUST provide a control to switch between supported languages (English/Chinese) while preserving the current route path.

#### Scenario: Switch Language on Page
- **WHEN** user switches from English to Chinese on `/en/garden`
- **THEN** the user is redirected to `/zh/garden`

#### Scenario: Switch Language on Root
- **WHEN** user switches from English to Chinese on `/en`
- **THEN** the user is redirected to `/zh`
