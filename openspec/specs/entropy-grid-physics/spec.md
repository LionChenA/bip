# Entropy Grid Physics

## Purpose
Defines the underlying rigid, geometric particle network with basic physical collisions and sharp link rendering for the interactive background.

## Requirements

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
- **THEN** they move in straight lines with `speed` between `1.5` and `3.5`
- **AND** they wrap around the edges (`outModes: out`)

### Requirement: Global Electrostatic Repulsion
Particles SHALL possess a global Coulomb-like repulsion force to prevent them from overlapping and to maintain elegant negative space.

#### Scenario: Particle Proximity
- **WHEN** two particles approach within a certain distance
- **THEN** they repel each other strongly using an inverse-square like formula
- **AND** they do not overlap perfectly

### Requirement: Knowledge Bond Gravity
When particles form a link (representing a connection), they SHALL attract each other, fighting against the global repulsion to form structured, lattice-like networks.

#### Scenario: Forming a Cluster
- **WHEN** two particles drift close enough to form a link
- **THEN** a spring-like gravitational pull draws them together
- **AND** they reach an equilibrium distance (e.g., ~75px) where attraction and repulsion balance out

### Requirement: Theme Integration
The particles and links SHALL utilize appropriate high-contrast colors derived from the Tailwind theme, ensuring they are sharply visible against the background.

#### Scenario: Theme Toggle
- **WHEN** the user switches between light and dark mode
- **THEN** particles use a dark color in light mode and a light color in dark mode
