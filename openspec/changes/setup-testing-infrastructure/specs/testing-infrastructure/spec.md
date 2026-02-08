## ADDED Requirements

### Requirement: Isolated Component Development

The system **MUST** provide an environment for developing UI components in isolation from the application context.

#### Scenario: Launching Component Workbench
- **WHEN** a developer runs the component workbench command (`pnpm storybook`)
- **THEN** a local server **MUST** start
- **AND** it **MUST** display a catalog of all defined component stories
- **AND** components **MUST** render correctly with Tailwind styles applied

### Requirement: End-to-End Verification

The system **MUST** provide automated verification of critical user flows across the full application stack.

#### Scenario: Running E2E Tests
- **WHEN** the E2E test command is executed (`pnpm test:e2e`)
- **THEN** tests **MUST** run against a production-like build of the site
- **AND** tests **MUST** verify key navigation paths (e.g., visiting the Garden index)
- **AND** results **MUST** be reported with pass/fail status

### Requirement: Unit Test Execution

The system **MUST** continue to support unit testing of logic and components via Vitest.

#### Scenario: Running Unit Tests
- **WHEN** the unit test command is executed (`pnpm test`)
- **THEN** all `*.test.ts` and `*.test.tsx` files **MUST** be executed
- **AND** the environment **MUST** simulate a browser DOM (jsdom/happy-dom)
