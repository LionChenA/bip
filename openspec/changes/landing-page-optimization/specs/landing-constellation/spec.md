# landing-constellation Specification

## ADDED Requirements

### Requirement: Node Initialization
The constellation background SHALL initialize with exactly 50 nodes distributed randomly across the viewport.

#### Scenario: Random distribution
- **WHEN** the page loads
- **THEN** 50 nodes are created at random positions within the viewport bounds
- **AND** 15-25 connections are randomly established between nodes

### Requirement: Node Sizing
Nodes with 3 or more connections SHALL be rendered larger and brighter than nodes with fewer connections.

#### Scenario: Main star appearance
- **GIVEN** a node has exactly 3 connections
- **WHEN** the simulation runs
- **THEN** the node radius SHALL be 4px with full brightness
- **AND** a node with fewer than 3 connections SHALL have radius 2px with reduced brightness

### Requirement: Thermal Motion
All nodes SHALL exhibit random drift motion even when not being dragged.

#### Scenario: Idle drift
- **GIVEN** no user interaction is occurring
- **WHEN** each frame is rendered
- **THEN** each node's velocity SHALL have a random noise component of ±0.1px applied
- **AND** this drift SHALL NOT break existing connections

### Requirement: Drag to Create Connection
A user SHALL be able to create a new connection by dragging a node close to another node.

#### Scenario: Creating connection via drag
- **GIVEN** two nodes are not connected
- **WHEN** the user drags one node within 80px of another at speed < 50px/s
- **THEN** a new connection SHALL be established between those nodes

### Requirement: Drag to Break Connection
A user SHALL be able to break an existing connection by dragging a node away quickly or far enough.

#### Scenario: Breaking connection via distance
- **GIVEN** two nodes are connected
- **WHEN** the user drags one node more than 120px away
- **THEN** the connection SHALL be broken

#### Scenario: Breaking connection via speed
- **GIVEN** two nodes are connected
- **WHEN** the user drags one node at speed > 200px/s
- **THEN** the connection SHALL be broken

### Requirement: Physics Forces
Connected nodes SHALL be held together by spring forces, while all nodes SHALL repel each other at close range.

#### Scenario: Spring attraction
- **GIVEN** two nodes are connected
- **WHEN** the simulation runs
- **THEN** a spring force SHALL maintain a distance of approximately 60px between them
- **AND** the force strength SHALL be 0.3

#### Scenario: Repulsion
- **GIVEN** any two nodes are within 80px of each other
- **WHEN** the simulation runs
- **THEN** a repulsive force SHALL push them apart
- **AND** this prevents nodes from overlapping

### Requirement: Theme Adaptation
The constellation SHALL adapt its colors to match the current theme (light/dark).

#### Scenario: Light theme
- **GIVEN** the page is in light theme
- **WHEN** the constellation renders
- **THEN** nodes and connections SHALL use the light theme foreground color
- **AND** connection lines SHALL use muted color with reduced opacity

#### Scenario: Dark theme
- **GIVEN** the page is in dark theme
- **WHEN** the constellation renders
- **THEN** nodes and connections SHALL use the dark theme foreground color
- **AND** connection lines SHALL use muted color with reduced opacity
