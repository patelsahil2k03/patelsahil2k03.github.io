# F-01 — Marketplace platform figures disagreed across sources

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P0 | Done on the site; career document and LaTeX resume still to align | content | Sahil (live read) / content agent | 2026-10-26 | 2026-10-26 |

## Finding

The same marketplace search platform appeared with three different headline figures: 602K+ listings across 36 marketplaces on the site, 517K+ products across 29 marketplaces in the career document, and different counts again in the live project documents. They measure different grains (unique products, listings, staging rows).

## Evidence

Project documents dated October 2026 give separate counts for unique products, listings and staging rows over 85+ marketplace storefronts. The published figure is the unique-product grain: **500K+ unique products across 85+ marketplaces, 6 vector indexes**. Counts were read from documents, not from live databases.

Private evidence (names a client or a credential location, so it is not in this tracked file): `docs/private/evidence/F-01.md`.

## Done so far

Site (`personal.ts`, `caseStudies.ts`), bio and Word resume use 500K+ / 85+ / 6. Decision D-1 resolved.

## Next action

Read the live counts (read-only) and set the ledger row to `verified` with a date. Align the career document and `resume/main.tex`.

**Owner:** Sahil (live read) / content agent  
**Done when:** Ledger rows for the three figures are `verified` with a live-read date; LaTeX and career document agree.

## Surfaces (propagation)

Site: done · Word: done · LaTeX: waiting · Career document: waiting

---
*Single source of truth for F-01. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
