## ADDED Requirements
### Requirement: Portfolio Schema
The portfolio content schema MUST support academic achievements as first-class citizens.

#### Scenario: Academic Stack
- **WHEN** a portfolio item is added
- **THEN** it SHALL support fields for `stack` (technologies used) and `projectUrl`
- **AND** the `stack` field MUST support academic courses (e.g., "CS188") as valid tools.
