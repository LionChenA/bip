## ADDED Requirements

### Requirement: Sparse Particle Initialization
The background component SHALL initialize a `tsparticles` instance covering the entire viewport with a sparse number of particles (e.g., maximum 80 on desktop, scaled down for mobile) to create a sense of vast negative space (留白).

#### Scenario: Component Mount
- **WHEN** the `global-particle-base` component is mounted in the Astro layout
- **THEN** a canvas element is created occupying `inset-0` with `pointer-events-none`
- **AND** a sparse network of particles is rendered without causing horizontal or vertical scrolling

### Requirement: Organic Ink-Wash Movement
Particles SHALL move extremely slowly in random directions (`outModes: bounce`) without snapping or sharp turns, mimicking the organic diffusion of ink in water.

#### Scenario: Idle Observation
- **WHEN** a user observes the background particles without interaction
- **THEN** particles move at a speed of `0.2` or less
- **AND** particles exhibit a subtle `wobble` or sine-wave variance to avoid looking purely mechanical

### Requirement: Faint Knowledge Connections
Particles SHALL NOT draw connections to each other unless they drift within a very close proximity threshold, representing the rare, spontaneous connection of isolated thoughts in a Zettelkasten.

#### Scenario: Particles Drift Close
- **WHEN** two wandering particles approach within the connection distance threshold (e.g., 60px)
- **THEN** a faint, low-opacity line is drawn between them
- **AND** the line immediately fades out when the particles drift apart

### Requirement: Subtle Life Spans
Particles SHALL have a defined, slow life span cycle (birth via fade-in, existence, death via fade-out, and delayed respawn) rather than persisting infinitely on the screen.

#### Scenario: Particle Lifecycle
- **WHEN** a particle is born
- **THEN** it fades in gradually
- **AND** it exists for a randomized duration (e.g., 10-20 seconds)
- **AND** upon expiration, it fades out completely and respawns in a new location after a randomized delay

### Requirement: Theme Integration
The particles and their faint connections SHALL utilize the `oklch` CSS variables defined in the application's Tailwind configuration to ensure seamless blending in both light and dark modes.

#### Scenario: Theme Toggle
- **WHEN** the user switches between light and dark mode
- **THEN** the `global-particle-base` detects the theme change (via CSS variables or MutationObserver)
- **AND** automatically updates the `tsparticles` instance colors without requiring a full page reload
