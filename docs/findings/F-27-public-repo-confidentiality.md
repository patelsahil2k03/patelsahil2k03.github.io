# F-27 — Audit notes would have published client names and credential locations

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P0 | Done (uncommitted) | security | Release agent | 2026-10-26 | 2026-10-26 |

## Finding

The repository is public. The audit tracker and agent context written earlier named client projects and credential files, contradicting the decision to describe clients by industry only. None of it had been committed.

## Evidence

`gh repo view` reports PUBLIC; the first run of the new public-safety check flagged four files.

## Done so far

Tracked documents rewritten with descriptors; private evidence moved to `docs/private/` (git-ignored); the write hook refuses private names in tracked files; `tools/checks/check_public_safe.py` scans before every commit; the Word resumes are git-ignored.

## Next action

Run the safety check before the first commit; owner reviews `docs/private/PRIVATE_TERMS.txt`.

**Owner:** Release agent  
**Done when:** The check passes on every commit.

---
*Single source of truth for F-27. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
