# U-09 — Copy contains generic phrases, placeholders and dash and emoji tells

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Done (released 2026-11-24) | ui | Content agent; UI agent | 2026-10-26 | 2026-11-23 |

## Finding

Generic or inflated phrasing: 'passionate technologist', 'bridge multiple worlds', 'Where Data Science Meets Determination', 'A unique blend of athletic discipline and technical expertise', 'Technical Excellence / Athletic Discipline' bullets, an unattributed quotation about business intelligence. The contact form uses placeholder values 'John Doe' and 'john@example.com'. The rendered homepage carries 25 emoji, 13 em dashes and 7 en dashes in visible text.

## Evidence

Measured on the 2026-10-26 build, headless Chromium at 1440x900 and 375x812, before any UI change. Counts from the rendered text. Source: `About.tsx`, `Contact.tsx` (lines 209, 226), `Skills.tsx`, `Projects.tsx`, `HeroEnhanced.tsx`, data files (dashes in `caseStudies.ts`, `achievements.ts`, `experience.ts`).

## Done so far

Recorded only.

**2026-11-23:** Generic About copy, form placeholders, emoji and every visible em dash removed (23 data strings reworded, punctuation only, reviewed through the content check).

## Next action

Rewrite to plain, specific statements tied to the case studies; replace form placeholders with neutral examples; remove emoji (use the existing icon library); replace dashes in visible copy (hyphen or restructure; date ranges with a hyphen); attribute or remove the quotation. Run a full copy self-audit of every visible string.

**Owner:** Content agent; UI agent  
**Done when:** No generic filler phrase, placeholder name, emoji or em dash in visible text; every visible string re-read once.

---
*Single source of truth for U-09. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
