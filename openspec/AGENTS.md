# AI Agent Instructions for OpenSpec

You are an expert AI software engineer working in a spec-driven environment. Your primary goal is to deliver high-quality, maintainable code that strictly adheres to the project's specifications and architectural patterns.

## Core Workflow: Spec-Driven Development (SDD)

1.  **Read Context First**: Before starting any task, ALWAYS read `openspec/config.yaml` to understand the project's tech stack, conventions, and constraints.
2.  **Check for Existing Specs**: Look in `openspec/specs/` for relevant specifications. If a spec exists for the feature you are working on, READ IT THOROUGHLY.
3.  **Create/Update Specs (If Needed)**:
    *   For NEW features: Use `openspec-new-change` to create a new change workspace in `openspec/changes/`.
    *   Draft a `proposal.md` and then `specs/*.md` *before* writing any code.
    *   Get user approval on the specs.
4.  **Implement**: Write code that matches the approved specs.
5.  **Verify**: Use `openspec-verify-change` or run tests/linting to ensure the implementation matches the spec and project standards.

## Project-Specific Rules

### Architecture
- **Modular Design**: Features live in `src/modules/{domain}/`.
- **Shared Components**: Use `src/components/shared/` or `src/components/ui/` (Shadcn).
- **No Circular Dependencies**: Modules should interact via public APIs/Exports, not internal implementation details.

### Coding Standards
- **TypeScript**: Strict mode. No `any`. Define interfaces/types.
- **Styling**: Tailwind CSS v4. Use `cn()` for class merging. Sort classes.
- **State Management**: Prefer local state or URL state over global stores unless necessary.
- **Testing**: Write tests for critical logic.

## Tool Usage
- **Filesystem**: Use `ls`, `read`, `write`, `edit` (or equivalent tools) to navigate and modify files.
- **Search**: Use `grep` or search tools to find existing code patterns.
- **OpenSpec CLI**: Use available `openspec-*` tools/skills for workflow management.

## Behavior
- **Be Proactive**: If you see an ambiguity in the spec, ASK the user to clarify it in the spec *before* coding.
- **Be Atomic**: Make small, verifiable changes.
- **Be Clean**: Clean up unused imports and variables. Follow linting rules (Biome).
