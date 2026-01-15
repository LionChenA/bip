## ADDED Requirements
### Requirement: Content Collections
The system MUST use Astro Content Collections to manage `blog` and `portfolio` content with schema validation.

#### Scenario: Blog Schema Validation
- **WHEN** a blog post is added
- **THEN** it must have `title`, `date`, and `description` frontmatter
- **AND** the build fails if required fields are missing

#### Scenario: Portfolio Schema
- **WHEN** a portfolio item is added
- **THEN** it supports fields for `stack` (technologies used) and `projectUrl`
