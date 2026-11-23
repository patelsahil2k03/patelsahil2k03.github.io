# U-01 — Homepage order and length work against the one-minute case

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done (uncommitted) | ui | UI agent; Sahil (approve the order) | 2026-10-26 | 2026-11-23 |

## Finding

Proof comes late and the page is very long. Order today: Hero, About, Experience, Case Studies, Skills, Projects, Publications, Achievements, Contact. A hiring manager reaches the strongest evidence (case studies) after two long sections. The same facts repeat across Hero stats, About highlights, Publications stats, Achievements summary and the Experience footer cards.

## Evidence

Measured on the 2026-10-26 build, headless Chromium at 1440x900 and 375x812, before any UI change. Page height 18,039 px desktop and 36,314 px phone. Section heights desktop: hero 1,462, about 1,698, experience 3,166, case studies 950, skills 1,458, projects 2,054, publications 1,696, achievements 3,780, contact 1,394. 8 H2 and 53 H3 headings. Phone: achievements alone is 9,323 px.

## Done so far

Recorded only.

**2026-11-23:** New order: hero, selected work, experience, research and recognition, projects, skills, about, notes, contact. Section ids unchanged; nav labels now Work, Experience, Research, Projects, About, Case studies, Resume, Email. Each statistic appears once.

## Next action

Propose (with a rendered mock-up) this reader-first order: Hero (fits one screen) > Selected work (case studies) > Experience (compact) > Research and recognition (publications and the top awards merged) > Skills (compact) > About (short) > Contact. Keep section ids and nav labels stable (nothing is renamed without a yes). Cap long lists (top five plus a link).

**Owner:** UI agent; Sahil (approve the order)  
**Done when:** First case study is within two screens of the top; desktop page height is cut by at least a third without losing a fact; no stat appears in more than one place.

---
*Single source of truth for U-01. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
