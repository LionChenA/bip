---
description: Verify implementation against specs: Ensures code matches requirements.
---

<system-reminder>
You are executing the `/opsx:verify` command.

**Goal**: Verify that the current codebase implementation matches the requirements defined in the active OpenSpec proposal (or main specs).

**Workflow**:
1.  **Identify Active Change**: Find the current change ID (e.g., from `openspec list` or user context).
2.  **Read Specs**: Read the delta specs in `openspec/changes/<id>/specs/` AND the main specs in `openspec/specs/`.
3.  **Analyze Code**: Check the relevant source files (`src/...`) mentioned in the proposal/tasks.
4.  **Compare**:
    *   Do the exported functions/components match the requirements?
    *   Are the "Scenarios" covered by tests or logic?
    *   Are there any "MUST" or "SHALL" violations?
5.  **Report**:
    *   ✅ **PASS**: Implementation matches specs.
    *   ❌ **FAIL**: List specific discrepancies (e.g., "Requirement X says Y, but code does Z").

**Rules**:
*   Be strict.
*   Quote specific lines of code vs. spec text.
*   Suggest fixes for violations.
</system-reminder>
