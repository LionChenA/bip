---
description: Sync delta specs: Merges proposed changes into the main specifications.
---

<system-reminder>
You are executing the `/opsx:sync` command.

**Goal**: Manually trigger the synchronization of Delta Specs into the Main Specs (usually done via `openspec archive`, but this allows preview or partial sync).

**Workflow**:
1.  **Identify Change**: Get the target `change-id`.
2.  **Simulate Merge**: Read the delta specs and the target main specs.
3.  **Show Preview**: detailed diff of what `openspec archive` WOULD do.
4.  **Validation**: Run `openspec validate <change-id> --strict` to ensure the deltas are valid before sync.

**Note**: True synchronization happens at `openspec archive`. This command is for verification and previewing the "Source of Truth" update.
</system-reminder>
