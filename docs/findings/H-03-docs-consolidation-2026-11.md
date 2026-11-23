# H-03 — Docs reduced to one home per fact

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Done (uncommitted) | process | Release agent (commit) | 2026-11-23 | 2026-11-23 |

## Finding

History lived in 13 archive files and two execution plans; owner requests lived in three places; branch rules and deploy notes in two; the README restated content and pointed at retired files.

## Evidence

Inventory of every Markdown file with its code consumers (none for the retired files), per `UNIVERSAL_CLEANUP_REORGANIZATION_RULES.md` phases 1-2; cross-reference sweep afterwards.

## Done so far

New: `HISTORY.md` (one summarised history), `OWNER_INPUTS.md` (facts, files, decisions), `PROFILE_SOURCES.md`, `design/DESIGN_DIRECTION.md`. Merged: branch strategy into `DEPLOYMENT.md`. Moved: competitive research and the avatar spec into `docs/design/`. Retired with `gio trash` (recoverable): `docs/archive/` (13 files), `docs/superpowers/`, `resume/RESUME_IMPROVEMENTS.md`, `ASSETS_GUIDE.md`, `docs/CONTENT_DATA_REQUESTS.md`, `BRANCH_STRATEGY.md`, the untracked `.superpowers/` review scratch. README and `docs/README.md` rewritten. Every reference repointed.

## Next action

Commit with the owner's yes.

**Owner:** Release agent (commit)  
**Done when:** Committed; the sweep finds no reference to a retired path.

---
*Single source of truth for H-03. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
