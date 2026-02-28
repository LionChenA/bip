# ui Specification (Delta)

## MODIFIED Requirements

### Requirement: Motion Primitives
The landing page variants MUST leverage `framer-motion` and `react-bits` components to deliver high-quality, performant animations.

#### Scenario: Text Animation
- **WHEN** the "Swiss" variant loads
- **THEN** the slogan MUST animate in using a typewriter effect (TextType from react-bits).
- **AND** the animation SHALL start immediately without initial delay (`initialDelay: 0`) to prevent loading delays.
- **AND** the typing speed SHALL be set to 75ms per character.
