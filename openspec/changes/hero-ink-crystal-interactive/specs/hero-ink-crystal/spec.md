## ADDED Requirements

### Requirement: Interactive Installation Canvas
The Hero Area SHALL render an interactive `tsparticles` instance overlaid precisely on top of the global background component (or integrated via shared instance options) to act as an art installation for human-data interaction.

#### Scenario: Hero Mount
- **WHEN** the `hero-ink-crystal` component is rendered inside the `LandingHero` container
- **THEN** a canvas element is initialized, distinct from or modifying the global background
- **AND** it listens for user interaction events (`onMouseDown`, `onMouseMove`, `onMouseUp`)

### Requirement: Triggering the Ink Crystal (Gravity Well)
Clicking the canvas SHALL spawn a temporary "Ink Crystal" structure (represented technically by a Polygon Mask, e.g., a Hexagon) centered on the cursor coordinates.

#### Scenario: User Clicks Chaos
- **WHEN** the user presses and holds the mouse button down
- **THEN** the system immediately enables a `polygon-mask` (Hexagon shape) anchored at the click coordinates
- **AND** the system scales up the `attract` interaction mode to pull nearby chaotic background particles toward the mask's vertices and edges

### Requirement: Forming the Structure
Particles caught within the Ink Crystal's gravity well SHALL form a dense, glowing network representing structured knowledge (negative entropy).

#### Scenario: Particles Captured
- **WHEN** chaotic particles drift near or are pulled into the activated Polygon Mask
- **THEN** they align loosely along the hexagonal path
- **AND** the `links` (connections) between these captured particles become highly visible, dense, and brightly colored compared to the global background
- **AND** the particles continue to exhibit a soft "wobble" (ink-wash softening) rather than snapping rigidly to vertices

### Requirement: Dragging and Assimilation
The user SHALL be able to drag the Ink Crystal across the screen, continuing to pull in and assimilate new particles from the chaotic background.

#### Scenario: Crystal Dragging
- **WHEN** the user holds the mouse button and moves the cursor
- **THEN** the Polygon Mask's center coordinate updates in real-time to follow the cursor
- **AND** the leading edge of the hexagon captures newly encountered background particles, snapping them into the structure and illuminating their connections

### Requirement: Dissolution into Chaos
Releasing the mouse button SHALL dissolve the Ink Crystal structure, returning the particles to a chaotic state.

#### Scenario: User Releases Mouse
- **WHEN** the user stops holding the mouse button (`onMouseUp`)
- **THEN** the Polygon Mask is disabled
- **AND** the dense, glowing links between particles fade out
- **AND** the captured particles immediately resume their slow, random, unlinked bouncing movement across the screen
