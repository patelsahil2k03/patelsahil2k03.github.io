# F-15 — Untracked working files at the repository root

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P3 | Done (released 2026-11-24) | process | Sahil (commit) | 2026-10-26 | 2026-10-26 |

## Finding

The Word template and the `ai_guidelines/` folder were untracked, and the Word resumes carry an employer template and personal data.

## Evidence

`git status`.

## Done so far

Word files are git-ignored. Two employer-specific rule files copied from another project were removed from `ai_guidelines/` (recoverable from the trash). `ai_guidelines/` is ready to track.

## Next action

Commit `ai_guidelines/` with the owner's yes.

**Owner:** Sahil (commit)  
**Done when:** `git status` shows no unexplained untracked file.

---
*Single source of truth for F-15. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
