## ADDED Requirements
### Requirement: Distributed Content Integration
The system SHALL support content integration from external Git repositories via submodules or automated sync scripts.

#### Scenario: Submodule Attachment
- **WHEN** an external learning vault is attached
- **THEN** it MUST be located at `src/content/learning/`
- **AND** the main repository MUST NOT write back to the submodule.

### Requirement: Intellectual Privacy Defense
Sensitive educational resources (solutions, private notes) MUST be protected from public indexing.

#### Scenario: Privacy Filtering
- **WHEN** a content item is marked `isPublic: false`
- **THEN** it MUST be excluded from search engines (No-Index)
- **AND** SHALL be obfuscated or omitted from the public build output.
