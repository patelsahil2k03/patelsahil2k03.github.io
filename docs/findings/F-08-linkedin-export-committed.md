# F-08 — Raw LinkedIn export is committed to the public repository

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done 2026-11-23 (uncommitted): removed from the tree; still in git history | security | Sahil (approval) | 2026-10-26 | 2026-11-24 |

## Finding

`src/assets/linkedin_posts_text.txt` (53 KB) contains other people's names and comment text. Nothing in the application reads it; only planning documents mention it.

## Evidence

`git log` on the file; a search for importers found none.

## Done so far

-

**2026-11-23:** `src/assets/linkedin_posts_text.txt` moved to the system trash with the owner's yes (C14); a byte-identical copy is in `docs/private/profile/02-linkedin/`. It remains in git history; rewriting public history is not planned (it holds the owner's own public posts, no secrets).

## Next action

With approval: remove the file from the tree (`git rm`) and keep a private copy under `docs/private/`. It remains in git history either way, so decide whether that matters.

**Owner:** Sahil (approval)  
**Done when:** The file is gone from the tree, no code or document depends on it, and the owner has accepted that history keeps it.

---
*Single source of truth for F-08. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
