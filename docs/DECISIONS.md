# Decisions

Resolved decisions that shape the work. Open decisions live in the "Start here" block of `PENDING_TASKS.md`, never here.

| ID | Decision | Outcome | Date |
|----|----------|---------|------|
| D-1 | Which marketplace figures to publish | **500K+ unique products across 85+ marketplace storefronts**, 6 vector indexes. Document-sourced, not read live (see F-01). | 2026-10-26 |
| D-2 | Name clients, or use industry descriptors | **Descriptors**, in every tracked file. Clients and internal systems are never named in this public repository. | 2026-10-26 |
| D-3 | Output handling for the Word resume | **New file; the employer template stays untouched.** Word files are git-ignored. | 2026-10-26 |
| D-4 | LinkedIn access method | Automation was attempted and stopped; **LinkedIn stays snapshot-only until the owner pastes or exports the profile** (F-12). | 2026-10-26 |
| D-5 | Where agent skills live | **`.cursor/skills/` is the one home for every harness;** `.claude/skills/` and `.agents/skills/` are relative links. | 2026-10-26 |
| D-6 | Where private evidence lives | **`docs/private/`** (git-ignored), with `PRIVATE_TERMS.txt` listing what tracked files must not name. | 2026-10-26 |
| D-7 | Tone and claims standard | Professional and outcome-led; exactly what the evidence supports, neither inflated nor undersold. | 2026-10-26 |
| D-8 | How to show the client role | **SDE II on a Digiflux client engagement (since November 2025) alongside Associate Software Engineer at Digiflux**, described by industry; naming the client waits for the owner (`OWNER_INPUTS.md` C1). | 2026-11-23 |
| D-9 | Where the owner's profile originals live | **`docs/private/profile/`** (git-ignored), copied from the private job-search repository; public index `PROFILE_SOURCES.md`. | 2026-11-23 |
| D-10 | Design system home and primary design skill | **`PRODUCT.md` and `DESIGN.md` at the repo root**, read by the **Impeccable** skill; research and the direction record in `docs/design/`. | 2026-11-23 |
| D-11 | Avatar companion | **Off** behind `AVATAR_ENABLED`; code kept; restore condition in U-02. | 2026-11-23 |
| D-13 | Redesign direction | **Option C, Evidence**: poster-type ink band, then paper-and-figures reading with every metric footnoted to the ledger; audience AI/ML engineer hiring; email-only contact; client described as a creator-commerce marketplace platform. | 2026-11-23 |
| D-12 | One home per kind of document | Owner inputs in `OWNER_INPUTS.md`, history in `HISTORY.md`, deploy and branches in `DEPLOYMENT.md`; the archive and session plans are retired. | 2026-11-23 |
