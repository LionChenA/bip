## ADDED Requirements

### Requirement: Tech-Style Particle Initialization
The background component SHALL initialize a `tsparticles` instance with sharp, geometric settings (circular by default, no blur) representing cold data nodes.

#### Scenario: Component Mount
- **WHEN** the component is mounted
- **THEN** a canvas is created occupying `inset-0` with `opacity-60`
- **AND** a network of particles is rendered without any CSS blur filters

### Requirement: Linear Geometric Movement
Particles SHALL move in a linear, calculated fashion rather than organic wavy paths.

#### Scenario: Base Movement
- **WHEN** particles are generated
- **THEN** they move in straight lines with `speed` between `0.5` and `1.5`
- **AND** they bounce off the edges (`outModes: bounce`) or exit and re-enter

### Requirement: Physical Collisions
Particles SHALL possess physical volume and bounce off each other upon impact.

#### Scenario: Particle Collision
- **WHEN** two particles intersect in the canvas space
- **THEN** they bounce off each other using realistic collision physics
- **AND** they do not overlap

### Requirement: Theme Integration
The particles and links SHALL utilize appropriate high-contrast colors derived from the Tailwind theme, ensuring they are sharply visible against the background.

#### Scenario: Theme Toggle
- **WHEN** the user switches between light and dark mode
- **THEN** particles use `#000000` in light mode and `#ffffff` in dark mode (or equivalent calculated values)
