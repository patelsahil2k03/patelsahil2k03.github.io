# U-11 — Publications and Achievements overlap and the lists are too long

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Done (released 2026-11-24) | ui | UI agent | 2026-10-26 | 2026-11-23 |

## Finding

The two papers appear four times (hero count, About highlight, Publications cards, Achievements grid, plus the two presentation events). The Achievements grid shows all 21 entries as equal cards, including student-club and event attendance entries, followed by a six-card category summary in a five-column grid and a 'Most recent' card. Publication highlight bullets include filler ('demonstrating leadership in research').

## Evidence

`Achievements.tsx` (all categories rendered, including `publication`), `Publications.tsx` (`getPublicationHighlights`), desktop height 3,780 px and phone 9,323 px for Achievements.

## Done so far

Recorded only.

**2026-11-23:** Papers shown once with DOI links; recognition grouped, awards and hackathons open, certifications, events and badges folded; summary cards and the highlight card removed. Section 2,761 px desktop.

## Next action

Merge into 'Research and recognition': two paper entries with a verified citation line and DOI, then five to six top recognitions; the rest behind a 'full list' disclosure or a separate page; remove the category summary and the highlight card.

**Owner:** UI agent  
**Done when:** Each paper appears once with its DOI; the section is under 1,500 px on desktop; no data removed from the files.

---
*Single source of truth for U-11. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
