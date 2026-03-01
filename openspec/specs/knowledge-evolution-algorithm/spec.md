# Knowledge Evolution Algorithm

## Purpose
A custom `ParticleUpdater` hook for tsParticles that implements the complex logic of isolation decay, connection-based immortality/growth, stagnation, and "Black Swan" destruction events to serve as a metaphor for Zettelkasten knowledge iteration.

## Requirements

### Requirement: Custom Evolution Loop Hook
The system SHALL inject a custom `IParticleUpdater` into the `tsparticles` engine to run the Zettelkasten evolution algorithm every frame.

#### Scenario: Updater Initialization
- **WHEN** the `tsparticles` engine is initialized
- **THEN** the custom evolution updater is registered before the particles are loaded

### Requirement: Isolation Decay and Smooth Death
Particles that do not have any active links SHALL have their internal death timer tick down. They must smoothly fade out and respawn randomly.

#### Scenario: Wandering Alone
- **WHEN** a particle's `links` are empty
- **THEN** its custom death timer decreases
- **AND** in its final second (60 frames), it smoothly lerps its size and opacity to 0
- **AND** when the timer reaches 0, it respawns at a totally random coordinate with reset maturity

### Requirement: Connection Immortality and Smooth Growth
Particles that form links SHALL have their death timer frozen/reset, and SHALL gradually increase in visual size and opacity (Maturity) using Linear Interpolation (LERP) for smoothness.

#### Scenario: Forming a Connection
- **WHEN** a particle drifts within link distance of another and forms a link
- **THEN** its death timer resets to maximum
- **AND** its `size` and `opacity` gradually lerp towards their maximum bounds
- **AND** its velocity linearly dampens (up to 70%) to simulate the stagnation of a large network

### Requirement: The Rare, Guided Black Swan (Paradigm Shift)
The system SHALL dynamically spawn a rare "Black Swan" to destroy overly stagnant clusters. It must be unique (only one at a time) and actively hunt the largest center of stagnation.

#### Scenario: High Stagnation Triggers a Unique Destruction
- **WHEN** more than 40% of the particles in the network are highly mature (stagnant)
- **AND** there are currently 0 Black Swans on the screen
- **THEN** newly respawning particles have an elevated chance to become a Black Swan
- **AND** the Black Swan is colored red (`#ef4444`) and moves at 4x speed
- **AND** the Black Swan calculates the "center of mass" of all mature particles and actively steers its velocity towards that cluster (Guided Missile)

#### Scenario: Shattering a Paradigm
- **WHEN** a Black Swan particle collides with a mature, connected particle (within a massive AoE radius)
- **THEN** the Black Swan is instantly consumed (burns out)
- **AND** all mature particles within the blast radius lose their links, flash amber (`#fbbf24`), puff up, and have their maturity instantly reset to 0
- **AND** a massive blast of kinetic velocity combined with random noise is applied to scatter the former cluster
