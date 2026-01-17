# mdx-processing Specification

## Purpose
TBD - created by archiving change implement-garden-core. Update Purpose after archive.
## Requirements
### Requirement: Syntax Highlighting & Math
The rendering pipeline MUST support advanced technical content.

#### Scenario: Rendering Code
- **Given** a code block in MDX
- **Then** it MUST be highlighted using `Shiki`
- **And** it SHOULD support standard themes defined in the design system.

#### Scenario: Rendering Math
- **Given** LaTeX syntax (e.g., `$E=mc^2$`)
- **Then** it MUST be rendered using `KaTeX`.

### Requirement: TOC Generation
Table of Contents MUST be generated conditionally.

#### Scenario: Auto-TOC
- **Given** an MDX document
- **When** it contains 2 or more Level 2 headings (`##`)
- **Then** a TOC structure MUST be generated and available to the UI.

