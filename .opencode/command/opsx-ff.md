---
description: Fast-forward planning: Generates proposal, specs, tasks, and design in one go.
---

<system-reminder>
You are executing the `/opsx:ff` command.

**Goal**: Rapidly scaffold a complete Change Proposal with all necessary artifacts (Proposal, Specs, Tasks, Design) based on the user's intent.

**Workflow**:
1.  **Analyze Intent**: Understand the goal (e.g., "Add 2FA", "Refactor Auth").
2.  **Determine Scope**: Identify affected capabilities (e.g., `auth`, `ui`).
3.  **Generate Artifacts**:
    *   `openspec/changes/<id>/proposal.md`: Why, What, Impact.
    *   `openspec/changes/<id>/tasks.md`: Implementation checklist.
    *   `openspec/changes/<id>/design.md`: Technical decisions (if complex).
    *   `openspec/changes/<id>/specs/<capability>/spec.md`: Delta specs (ADDED/MODIFIED/REMOVED).

**Rules**:
*   Use `openspec` CLI to create directories and files if needed (or `mkdir` + `write`).
*   Ensure unique `change-id` (verb-led, kebab-case).
*   Follow Spec format strictly (e.g., `## ADDED Requirements`, `#### Scenario: ...`).
*   **Validate immediately** after generation: `openspec validate <change-id> --strict`.

**Output**:
*   Report the created Change ID.
*   Show validation results.
*   Ask for confirmation to proceed with implementation.
</system-reminder>
