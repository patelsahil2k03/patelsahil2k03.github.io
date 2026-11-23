# U-04 — Every section uses the same header template and label badge

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Done (uncommitted) | ui | UI agent | 2026-10-26 | 2026-11-23 |

## Finding

All eight section headers repeat one pattern: a centred label badge, an H2 with one accent-coloured word, and a 20 px centred subtitle. Nine label badges for nine sections (the guideline allows about one per three). Sections also repeat the same layout families (centred header, then a card grid) and the same card styling with hover lift.

## Evidence

Source: the `Badge size="lg"` plus `font-display text-4xl sm:text-5xl` header block in `About`, `Experience`, `CaseStudies`, `Skills`, `Projects`, `Publications`, `Achievements`, `Contact`. Accent words: 'Data Science', 'Determination', 'Journey', 'patterns', 'Stack', 'Work', 'Research', 'Recognition', 'Connect'.

## Done so far

Recorded only.

**2026-11-23:** One shared section heading component, left-aligned, no label badges, no two-colour words; five layout families (poster band, text-plus-figure, dated records, definition list, notes grid).

## Next action

Drop the badges (keep one where it adds meaning), left-align headers, remove the two-colour heading words, and vary section layouts (a list for experience, a 2-column feature for the lead case study, a compact table for research). Define the header once as a shared component.

**Owner:** UI agent  
**Done when:** At most three label badges on the homepage; at least four distinct layout families across the sections; one shared section-header component.

---
*Single source of truth for U-04. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
