## ADDED Requirements

### Requirement: Custom Evolution Loop Hook
The system SHALL inject a custom `IParticleUpdater` into the `tsparticles` engine to run the Zettelkasten evolution algorithm every frame.

#### Scenario: Updater Initialization
- **WHEN** the `tsparticles` engine is initialized
- **THEN** the custom evolution updater is registered before the particles are loaded

### Requirement: Isolation Decay and Death
Particles that do not have any active links SHALL have their internal death timer tick down, and be destroyed when it reaches zero.

#### Scenario: Wandering Alone
- **WHEN** a particle's `links.length` is 0
- **THEN** its custom death timer decreases
- **AND** if the timer reaches 0, the particle is destroyed and removed from the canvas

### Requirement: Connection Immortality and Growth
Particles that form links SHALL have their death timer frozen/reset, and SHALL gradually increase in visual size and opacity (Maturity).

#### Scenario: Forming a Connection
- **WHEN** a particle drifts within link distance of another and forms a link
- **THEN** its death timer resets to maximum
- **AND** its `size` gradually interpolates from `1` to a maximum of `4`
- **AND** its velocity decreases to simulate the stagnation of a large cluster

### Requirement: The Black Swan Event
The system SHALL occasionally generate a "Chaos Particle" (Black Swan) that destroys connections upon impact.

#### Scenario: Shattering a Paradigm
- **WHEN** a Black Swan particle collides with a mature, connected particle
- **THEN** the mature particle and its immediate neighbors lose all their links
- **AND** their maturity is instantly reset to 0 (shrinking them)
- **AND** a burst of repulsive velocity is applied to scatter the former cluster
