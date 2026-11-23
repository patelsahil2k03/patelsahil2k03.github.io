# U-15 — Replace the visual world: from template-like to a distinctive, readable identity

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done (released 2026-11-24); finish review not run | ui | Sahil (choose); UI agent (build) | 2026-11-23 | 2026-11-23 |

## Finding

The site reads as a generated template: four accent colours, gradient text, emoji, card grids, nine label badges, stat cards, and 2,870 words on one page. The owner wants something exquisite, engaging and understandable, with poster-grade typography.

## Evidence

`docs/design/DESIGN_DIRECTION.md` §2 (live-site measurements, 24 references, Impeccable `detect` hits). Before-state captures: `docs/private/ui-audit/before-2026-11-23/`.

## Done so far

Three directions drafted with a recommendation (C: research-paper voice with a poster-type hero). Impeccable skill installed; product context to be written to `PRODUCT.md` after the owner's answers.

**2026-11-23:** Owner chose option C (Evidence) on 2026-11-23, with AI/ML hiring as the audience. `PRODUCT.md` written; the direction contract is the surface brief `.impeccable/surfaces/src-app-page-tsx.md` (pinned, no roll). Before state captured from the live site and from a local build after the data fixes (`docs/private/ui-audit/before-2026-11-23/`).

**2026-11-23:** Built: tokens, fonts, hero with frontispiece, Selected work with figures and footnotes, records for experience, research, projects and skills, about, notes, contact close; case-study index and articles rebuilt in the same world; 15 dead components and helpers removed; `DESIGN.md` written from the built system. Before/after table below.

**2026-11-23 (hero visual):** three treatments tried and judged in the rendered page: a pencil-sketch plate (read as an ID or 'wanted' photo), a line-screen portrait drawn in light behind the headline (competed with the claim; the source photo's ID pose shows through), and the marketplace pipeline drawn behind the headline (owner: a single project's flowchart does not belong at the top). Decision: type-only hero; the owner's real presenting photo goes in About once the original file, event and year arrive (OWNER_INPUTS B7). All three experiments removed from the tree.

## Next action

Run Impeccable's independent finish review (critique and audit) and Lighthouse (U-08), then commit with the owner's yes.

**Owner:** Sahil (choose); UI agent (build)  
**Done when:** The approved direction is live on `dev`, the before/after table is in this finding, and the detector reports no slop hits.

## Before and after (2026-11-23)

Before: the live site. After: the redesign, released 2026-11-24 (`7c0dce9`). Captures and metrics in `docs/private/ui-audit/before-2026-11-23/` and `after-2026-11-23/` (`tools/ui/capture.py`, `tools/ui/sections.py`).

| Measure | Before | After |
|---|---|---|
| Hero height, desktop 1440×900 / phone 375×812 | 1,462 / 2,263 px (actions below the fold) | 774 / 698 px (fits one screen) |
| Homepage height, desktop / phone | 17,806 / 35,634 px | 16,367 / 25,785 px |
| Data details rendered (content check) | 441 of 469 | 517 of 531; 0 lost; 4 stat and filter labels retired with reasons |
| Emoji / em dashes in visible text | 25 / 12 | 0 / 0 |
| Accent colours / gradient text (Impeccable `detect`) | 4 / 3 hits | 1 / 0 hits |
| Section-label badges, stat cards | 9, 16 | 0, 0 |
| Homepage First Load JS | 415 kB | 360 kB |
| Fonts | Inter, Space Grotesk, JetBrains Mono | Bricolage Grotesque, Literata, JetBrains Mono (numbers only) |
| Proof shown | 3 case-study cards, no figures | 4 systems with pipeline figures; every number footnoted to its source |
| Visual of the owner | none above the fold | type-only hero by decision; real photo in About (presenting photo pending, B7) |
| Resume | hero button | hero link and navigation on every page |

Desktop is only 8% shorter because nothing was removed: 76 details that were hidden before (project long descriptions, all technologies, all recognition entries) now render, the long tail folded in disclosures. Phone is 28% shorter.

---
*Single source of truth for U-15. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
