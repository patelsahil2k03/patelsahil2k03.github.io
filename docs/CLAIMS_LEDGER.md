# Claims ledger

The single source of truth for every figure and checkable claim the portfolio publishes. A figure appears on a page only after it has a row here.
`python3 tools/checks/check_claims.py` fails when a figure in `src/data/` is missing from this file (the figure is matched when it appears in backticks).

**Status values**
- `verified` — checked against a primary source or measured; the check and its date are in the Source column.
- `owner-material` — comes from the owner's own documents and has no independent artifact yet. Published only with this status recorded; moves to `verified` when a measurement or record is supplied.
- `publication` — taken from a peer-reviewed publication by the owner (publisher record checked; the full text may not have been re-read). Shown as "published paper" in the site's notes.
- `unverified` — do not publish.

**Footnoted on the site:** only the ten figures in `KEY_FIGURES` (`src/data/claims.ts`), the ones that make the case; every other row here is still the source for its figure, which renders as plain text (owner decision 2026-11-24, U-16).

**Grain** is the unit the number counts. Never compare or combine numbers of different grains. This repository is public, so sources are described by kind; the identifying detail is in `docs/private/evidence/`.

*Last full review: 2026-11-23 (independent content review against `docs/private/profile/` and Crossref; see the 2026-11-23 row of `docs/HISTORY.md`).*

## Scale and impact

| Figure | Claim | Grain | Used in | Source | Status |
|---|---|---|---|---|---|
| `500K+` | Unique products in the marketplace search platform | unique products (not listings, not rows) | bio, case study, experience | Project documents, October 2026; read from documents, **not** a live query ([F-01](findings/F-01-marketplace-figures.md)) | owner-material |
| `85+` | Marketplace storefronts covered by that platform | storefronts | bio, case study, experience | Same documents | owner-material |
| `6` | Vector indexes behind its search | indexes | case study | Same documents | owner-material |
| `2M+` | Users of the FinTech platform the scraper fleet serves | platform users | bio, case study, experience, stats, SEO | Owner's earlier audit documents; no measurement artifact in the repositories | owner-material |
| `50+` (functions) | Lambda scrapers in the FinTech fleet | functions | case study, experience | Code inspection of the fleet repositories (function count not re-run) | owner-material |
| `125K+` | Customers of the meal-subscription business | customers | case study, experience, stats | Owner's earlier audit documents | owner-material |
| `44,500+` | Health workers on the public-health platform | workers (35 states and union territories) | case study, experience | Owner's earlier audit documents | owner-material |
| `40%` | Reduction in manual intervention from the content pipeline | share of manual steps | case study, experience | Owner's earlier audit documents | owner-material |
| `90%+` | Accuracy of the nutrition-scanning service | scan accuracy | case study, experience | Owner's earlier audit documents; no measurement in the repositories ([F-17](findings/F-17-accuracy-claim-attribution.md)) | owner-material |
| `93.17%` | Accuracy of the CNN+LSTM sales-forecasting proof of concept (internship, Jan–Jun 2024; labeled a proof of concept since 2026-11-23) | forecast accuracy | case study, project, experience | Owner's materials; the proof-of-concept script records about `96.9%` for its experiments (shown in the footnote as context, not as a claim) ([F-22](findings/F-22-forecasting-figure-and-dating.md)) | owner-material |
| `93%+` | Homepage "AI Accuracy" stat | rounded from the forecasting figure | stats | Derived from `93.17%`; the label is ambiguous ([U-06](findings/)) | owner-material |
| `4+` | Models compared in the forecasting study | models (hybrid, Random Forest, ARIMA, SARIMAX) | case study, project | Owner's materials | owner-material |

## Counts that describe the owner

| Figure | Claim | Grain | Used in | Source | Status |
|---|---|---|---|---|---|
| `50+` (technologies) | Technologies listed on the site | skills listed | avatar line, stats | Count of `src/data/skills.ts` (50 at 2026-10-26; more were added, so still true) | verified |
| `2+` | Years of experience | years | stats | Internship from 16 Jan 2024 (about 2.8 years at 2026-10-26) | verified |
| `6+` | Projects on the site | projects | stats | Count of `src/data/projects.ts` | verified |
| `5+` | Certifications | certificates | stats | Count of certification entries in `achievements.ts` | verified |
| `100+` | LeetCode streak days badge; problems solved | days / problems | achievements (footnoted as streak days), stats | Owner's LeetCode profile. The public LeetCode API showed 168 problems solved on 2026-11-23 (independent content review), so the problems reading is safe; the streak badge itself was not fetched | owner-material |
| `9.35` | CGPA | out of 10 | about (footnoted), education, achievements | University record per owner; 14th Convocation post, 4 January 2025 (no "distinction" wording in any source, so none is used) | owner-material |

## Research and projects

| Figure | Claim | Grain | Used in | Source | Status |
|---|---|---|---|---|---|
| `98.04%` | Accuracy of the question-paper quality model | classification accuracy | case study, project | Own paper (first of six authors, Springer LNNS, ICTIS 2024, pp. 119–129, 13 Nov 2024; Crossref record checked 2026-11-23); full text paywalled, not re-read | publication |
| `2,809` | Labeled instances in that study | instances | case study, project | Same paper | publication |
| `857` / `20,000+` | Teams advancing to the Odoo Hackathon 2026 finals / teams registered | teams | achievements (footnoted), resume | Owner's LinkedIn post (2026-11-19 capture) | owner-material |
| `5` (hackathons) | Hackathons entered | hackathons | stats | AI-Manthan post calls it the third; Odoo 2026 and Kanad 2026 followed | owner-material |
| `70+` | Proposals at the AI-Manthan hackathon | proposals (the source's grain; site copy says "Top 10 of 70+ proposals" everywhere since 2026-11-23) | achievements, case study, project, resume | Owner's LinkedIn post ("70+ incredible proposals"), checked in the October 2025 snapshot | owner-material (quoted from the owner's own post, so self-reported; changed from verified 2026-11-24 for consistency with the Odoo row) |
| `66%` | NPTEL cloud-computing score | course score | achievements | Owner's certificate (not seen) | owner-material |
| `78.56%` | Fruit-detection model validation accuracy | validation accuracy, 36 classes | project card | Public repository README, fetched 2026-10-26 ([F-28](findings/F-28-project-card-figures.md)) | verified |
| `93%` / `53%` | Lip-reading model training / validation accuracy | accuracy | project card | No public source (repository not public) | owner-material |
| `3,115` | Images in the lip-reading project | images | project card | No public source | owner-material |
| `15+` | Features in the tuition-management app | features | project card | Owner's description; repository not public | owner-material |

## Non-numeric claims that need care

| Claim | Evidence | Status |
|---|---|---|
| First author of the Springer ICTIS 2024 paper | Springer record and Crossref author order | verified 2026-10-26 |
| Co-author (fourth of four) of the AIP ICRAIC 2024 paper, published 2025 | Crossref (DOI 10.1063/5.0254155) | verified 2026-10-26 |
| Team Star Award (March 2025); AI Catalyst 2026 Special Recognition (March 2026); AI-Manthan Top 10 (October 2025) | Owner's career timeline; LinkedIn posts | owner-material |
| Associate Software Engineer at Digiflux since 8 Jul 2024; intern 16 Jan - 16 Jun 2024 | Owner's career timeline; LinkedIn experience (2026-11-19 capture) | owner-material |
| SDE II on a Digiflux client engagement (marketplace search platform) since Nov 2025; the Digiflux role continues | LinkedIn experience capture 2026-11-19; owner's confirmation 2026-11-23 | verified |
| 2022-2023 internships: L&T Power ML intern May-Jun 2022; Motorola Solutions web development intern May-Dec 2022 (the overlap is real); L&T Technology Services C# developer intern May-Jul 2023 | LinkedIn experience capture 2026-11-19 (certificates attached there, not seen) | owner-material |
| Odoo Hackathon 2026 finalist; Kanad S.H.I.E.L.D. 2026 participant (organisers read from the post's tags) | Owner's LinkedIn posts, 2026-11-19 capture | owner-material |
| Founding member of the three-person marketplace team; primary developer of its extractor and core services | Git authorship (majority of commits in both repositories); owner's confirmation | verified |
| Primary developer of the AI meal-logging service and the coach, admin and monitoring dashboards (fitness platform) | Git authorship (majority of commits; only Python service) | verified |
| Primary developer of the Lambda scraper fleet and the open/close analysis pipeline (FinTech) | Git authorship in the fleet repositories | verified |
| Primary developer of the nutrition-scanning service; AI Coach moved from GPT-4 to Gemini after benchmarking | Git authorship for the service; the migration is the owner's statement | verified (authorship) / owner-material (migration) |
| Co-developed the photoshop plugin and catalog pipelines (e-commerce SaaS) | No git history for the plugin; owner's career timeline | owner-material |
| AWS Cloud Practitioner is a university-delivered course with a university exam, not the AWS certification | Achievements data; LinkedIn post | verified |
| NVIDIA certificate (AI and Deep Learning) | LinkedIn headline "1x Nvidia Certified"; date and ID not seen ([F-26](findings/F-26-nvidia-certificate-date.md)) | owner-material |
| Digiflux: founded 2018, 150+ projects, 50+ people, India and UAE | The company's own About page, read 2026-10-26 | verified |

## How to add or change a row
1. Write the row first (figure in backticks, grain, source, status). 2. Edit the data file. 3. Run `python3 tools/checks/check_claims.py`. 4. Update the surfaces in `nextprompt.md` §5 or list the waiting ones in the finding.
