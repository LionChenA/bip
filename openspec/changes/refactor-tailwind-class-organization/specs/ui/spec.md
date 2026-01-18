## ADDED Requirements
### Requirement: Tailwind Class Organization
The system code style MUST prioritize readability for Tailwind CSS classes.

#### Scenario: Complex Component Definition
- **WHEN** defining a component variant with a long list of classes (> 80 characters)
- **THEN** the classes SHOULD be formatted as a multi-line template literal
- **AND** classes SHOULD be logically grouped (e.g., layout, spacing, typography, colors)

#### Scenario: Automated Sorting
- **WHEN** writing Tailwind classes in `cva` or `cn` functions
- **THEN** the classes MUST be sorted according to the official Tailwind ordering (enforced by Biome)
