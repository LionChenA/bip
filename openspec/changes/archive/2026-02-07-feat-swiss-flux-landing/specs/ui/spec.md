## ADDED Requirements
### Requirement: Landing Page Exploration
The system SHALL support multiple visual variants for the homepage to facilitate A/B testing.

#### Scenario: Variant Switching
- **WHEN** a user visits the root path `/`
- **THEN** they see a "Variant Switcher" control
- **AND** they can toggle between "Swiss", "Terminal", "Lattice", "Flux", and "Focus" layouts
- **AND** the choice persists across reloads.

### Requirement: Motion Primitives
The landing page variants MUST leverage `framer-motion` and `react-bits` components to deliver high-quality, performant animations.

#### Scenario: Text Animation
- **WHEN** the "Swiss" variant loads
- **THEN** the slogan MUST animate in using a blur or split-text effect.
