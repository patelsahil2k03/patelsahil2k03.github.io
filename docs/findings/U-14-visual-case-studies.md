# U-14 — Projects and case studies have no visuals

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done 2026-11-24 (uncommitted): every case study has a system figure; owner screenshots (B1) would add to them | ui | UI agent; Sahil (B1 screenshots) | 2026-11-23 | 2026-11-24 |

## Finding

Only one of ten case studies has a diagram, and no project card has an image. The owner asked for "visual understanding in projects". References that earn trust (Lilian Weng, Maggie Appleton) explain systems with figures.

## Evidence

`caseStudies.ts` (`architectureDiagram` set on one study, `image` on none); `projects.ts` (`image` on none); `Project.image` and `CaseStudy.image` are not rendered at all.

## Done so far

Recorded only.

**2026-11-23:** Four production case studies have pipeline figures drawn from their own text (`figure` in `caseStudies.ts`, `SystemFigure`); articles lead with them; the architecture diagram scrolls on phones.

**2026-11-24:** figures added for the six remaining studies (HealthTech content pipeline, forecasting comparison, Photoshop plugin, ForeSight, question-paper NLP, small-bird detection), each drawn only from its own study's text, no figures inside. All ten articles now lead with Figure 1.

## Next action

Add figures for the remaining six studies; wire owner screenshots when supplied (B1).

**Owner:** UI agent; Sahil (B1 screenshots)  
**Done when:** Every production case study and featured project has a figure that explains it, readable on a phone.

---
*Single source of truth for U-14. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
