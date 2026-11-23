# Owner inputs

**The one list of everything only Sahil can supply:** facts, files and decisions. Agents never guess these; they ask here, and when an answer arrives they apply it to the data, the ledger and the finding, then move the row to *Answered*. `PENDING_TASKS.md` links here instead of repeating it.

*Merged on 2026-11-23 from `CONTENT_DATA_REQUESTS.md`, the open checklist of `ASSETS_GUIDE.md` and the owner list of `PENDING_TASKS.md` (all three retired).* Each row: what is needed, why, where it goes, the finding, and the default that applies if no answer comes (a default never covers a gated action).

## A. Facts

| # | What is needed | Why | Goes into | Finding | Default |
|---|---|---|---|---|---|
| A1 | Which run produced the 93.17% forecasting accuracy (data split, date); the proof-of-concept script shows about 96.9% | Ledger status `owner-material` → `verified` | ledger, `caseStudies.ts` | F-22 | Keep with the `owner-material` label |
| A2 | Test set and date behind the 90%+ nutrition-scanning accuracy | Same | ledger | F-17 | Same |
| A3 | Source for 2M+ users, 125K+ customers, 44,500+ workers, 40% reduction, 50+ functions | All five are `owner-material` | ledger | ledger | Same |
| A4 | A live read-only count for the marketplace figures (unique products, storefronts, indexes) with a date | Figures come from documents, not live queries | ledger | F-01 | Same |
| A5 | Lip-reading project accuracy and dataset size (3,115 images?), and the "15+ features" of the tuition app | Repositories are not public, so no source | `projects.ts`, ledger | F-28 | Keep labelled; drop if not confirmed by the redesign |
| A6 | NVIDIA certificate date or credential ID; whether any AWS credential exists beyond the course | Dates and wording | `achievements.ts` | F-26, F-18 | Show without a date; say "course" |
| A7 | Start of the Photoshop plugin work | One case-study date is unverified | `caseStudies.ts` | F-20 | Keep 2024-08 flagged |
| A8 | A published mAP / precision / recall figure from the ICRAIC paper | The research case study has no headline metric | `caseStudies.ts` | — | No metric shown |
| A9 | What the Kanad S.H.I.E.L.D. 2026 result was, and the exact months of both 2026 hackathons | Only the post's opening lines were captured | `achievements.ts` | F-31 | Show year only, no placement |

## B. Files and links

Specifications: images as WebP or JPG, under 500 KB, at 2× the displayed size; logos as SVG or transparent PNG; never a screenshot that shows a client name, customer data or credentials (this repository is public).

| # | What | Size / format | Goes into | Default |
|---|---|---|---|---|
| B1 | Screenshots or short screen recordings of the strongest work (marketplace search, meal-logging and coach dashboards, FinTech pipeline output), cleaned of client names and data | 1600×1000 WebP, or MP4 under 4 MB | `public/images/projects/`, `image` fields; needed for the visual case studies (U-14) | Diagrams only, no screenshots |
| B2 | Company logos: Digiflux, L&T Technology Services, L&T, Motorola Solutions (and the client's, if it may be named, see C1) | SVG or 256 px PNG | `public/images/logos/`, `experience.ts` `logo` | No logos |
| B3 | Award and hackathon photos (Team Star, AI Catalyst, AI-Manthan, Odoo finale) | 1200 px wide | `public/images/achievements/`, `achievements.ts` `image` | No photos |
| B4 | Certificate badges (NVIDIA, Google Cloud, NPTEL, AWS course) | 400 px PNG | `public/images/certifications/` | Text only |
| B5 | Which private project repositories, if any, may be made public (so cards can link to code) | — | `projects.ts` `github` | No code links |
| B6 | Football photos, if the "beyond work" section is wanted | 1200 px | `public/images/football/` | Section omitted |
| B7 | The original full-resolution file of the presenting photo (the Instasize export is 1302×682), plus the event name and year for its caption | Original camera or organiser file | About section photo | Keep the current studio photo |

## C. Decisions and approvals

| # | Decision | Recommendation | Finding |
|---|---|---|---|
| C7 | Commit grouping and commits (no trailers) | Approve the proposed groups | H-01 |
| C8 | Push the corrected GitHub profile README; bio, location, pins | Show the diff first | F-03 |
| C9 | Rotate the credentials in public history; move plaintext credential files | Do this first: the only item with real exposure | F-09, F-10 |
| C11 | Framework upgrade on its own branch | After the redesign lands | F-11 |

## Answered

| Was | Answer | Source | Date |
|---|---|---|---|
| Correct dates of the 2022 internships (they overlap) | The overlap is real: L&T Power ML intern May-Jun 2022 and Motorola Solutions web development intern May-Dec 2022 | LinkedIn experience (certificates attached there) | 2026-11-19 capture |
| Division name of the energy internship | L&T Power (LinkedIn); site now says "Larsen & Toubro (L&T Power)" | LinkedIn | 2026-11-19 |
| SDE II role | Client engagement through Digiflux since November 2025; Digiflux role stays Associate Software Engineer | Sahil, in session | 2026-11-23 |
| AI-Manthan / ForeSight date | 2025-10-11, the hackathon repository's first commit | git | 2026-08 |
| Publication links | DOI links from the publisher records | Crossref, Springer | 2026-10-26 |
| "Typically responds within 24 hours" | Removed (no source) | — | 2026-11-23 |
| C10: rebuild `resume.pdf` on a machine with LaTeX | Done in a throwaway TeX Live container: one page, 0 errors, installed as `public/resume.pdf` | Agent, owner yes to recommended | 2026-11-24 |
| C3: keep numeric skill self-ratings, or drop them | Default applied: dropped; skills are plain grouped lists (AI/ML first) | Redesign U-15 | 2026-11-23 |
| C6: remove the committed LinkedIn export from the tree | Yes (with C14): trashed, private copy kept; still in git history | Sahil, in session | 2026-11-23 |
| C12: The SDE II entry says "Remote (client based in Dubai, UAE)". With your LinkedIn listing, the city and country can identify the client | Yes: "Remote" only; city and country removed from the site and the résumé source | Sahil, in session | 2026-11-23 |
| C13: Remove unused dependencies: framer-motion, react-intersection-observer, react-hot-toast, class-variance-authority (no imports in `src/`, confirmed by knip and grep) | Yes: framer-motion, react-intersection-observer, react-hot-toast and class-variance-authority uninstalled (no imports anywhere in `src/`) | Sahil, in session | 2026-11-23 |
| C14: Move unused tracked assets to the trash: `public/avatar.png` (1.2 MB), `src/assets/Avatar*.png` (about 4 MB), the `_ADD_*_HERE.txt` placeholders in `public/images/`, and `src/assets/linkedin_posts_text.txt` (a private copy exists) | Yes: 5.4 MB moved to the system trash (old avatar images, placeholder files, the LinkedIn export; a byte-identical private copy is in `docs/private/profile/02-linkedin/`); 3D models kept | Sahil, in session | 2026-11-23 |
| C15: Run the project's own checks in CI (`check_claims`, `check_public_safe`, guard tests, content check) and before the deploy upload | Yes: both workflows run lint, types, `check_claims`, `check_public_safe`, guard tests, the task-index check and the content check; the deploy stops on any failure | Sahil, in session | 2026-11-23 |
| C4: wording for "national-level footballer" | Default applied: played for the university at the West Zone Inter-University tournament (2022, 2023); "national" removed everywhere | Owner's LinkedIn posts (inter-university zonal event) | 2026-11-23 |
| Hero visual | Type only; a portrait and a pipeline drawing were tried and rejected; the real photo goes in About (B7) | Sahil, in session | 2026-11-23 |
| C1 Name the client? | No: "creator-commerce marketplace platform" | Sahil, in session | 2026-11-23 |
| C2 Phone on the public site? | Email only; phone removed from the site (the LaTeX resume still lists it, see U-10) | Sahil, in session | 2026-11-23 |
| C5 Visual direction | Option C, Evidence (contract in `.impeccable/surfaces/`) | Sahil, in session | 2026-11-23 |
| Primary audience | Hiring managers and technical recruiters for AI/ML engineer roles (`PRODUCT.md`) | Sahil, in session | 2026-11-23 |
