# Pending tasks

**The only task list.** Each finding has exactly one document in `findings/` (or `private/findings/` on the owner's machine); this file holds the programme and an index generated from those documents. Update the finding in place, then run `python3 tools/checks/build_pending_index.py`. Never edit the index by hand, and do not create session notes.

- **Branch:** `dev` · **Last reviewed:** 2026-11-23
- **Status key:** `Open` · `In progress` · `Blocked` (waiting on the owner or access) · `Done` (verified; "uncommitted" = verified locally, waiting for a commit yes)
- **Priority key:** `P0` factually wrong in public · `P1` fix soon · `P2` improvement · `P3` housekeeping
- **Prefixes:** `F` fact, security, hygiene · `U` UI · `R` resume · `H` harness and process

## Start here

### The goal
A portfolio a hiring manager understands in a minute and trusts on a deeper read: a distinctive, calm visual identity; three or four systems shown with role, scale and a figure; every number traceable. (`../nextprompt.md` §1, `design/DESIGN_DIRECTION.md`.)

### The programme (closed list; work only on these lines, record anything else as a finding)

| # | Line | Done when | Owner | State |
|---|---|---|---|---|
| 1 | Facts true on every surface | All P0 findings done on the site, LaTeX, Word and profile README | Content and resume agents | Site, LaTeX source and PDF done and released 2026-11-24 (U-16, F-04); Word résumé (R-01), GitHub profile README (F-03, C8) and LinkedIn (F-31) still to align |
| 2 | One home per fact in the docs | No duplicate docs, no stale references, profile originals in the repo | Agent | Done 2026-11-23 (H-03), released 2026-11-24; stale-status sweep 2026-11-24 |
| 3 | Visual direction chosen | Owner picks an option; `PRODUCT.md` and the direction contract written | Sahil, then UI agent | Done 2026-11-23: option C (Evidence) |
| 4 | Redesign built and measured | U-15 done: new hero, order, sections, visuals (U-14), before/after recorded, detector clean | UI agent | Done and released 2026-11-24 (`7c0dce9`): U-14, U-15, U-16, U-17 closed; detector 0 hits; final critique 25/36 with both remaining P1 decisions applied |
| 5 | Accessibility and performance gate | U-07 and U-08 closed with a Lighthouse before/after | UI agent | Done 2026-11-24: live mobile 53 to 85, accessibility 100 |
| 6 | Release | Commits approved, `dev` → `main` with a yes, live checks recorded | Release agent | Done 2026-11-24: 7 commits, CI green, merged as `7c0dce9`, deployed and verified live |
| 7 | Hosting and CI hygiene | Only the Next.js workflow deploys; actions on a current runtime | Sahil (setting), agent (workflows) | Open: H-04 |
| 8 | Evidence upgraded | Owner-material figures that make the case move to `verified` (A1-A4), screenshots for the flagship studies (B1) | Sahil, then content agent | Open: needs owner inputs |
| 9 | Framework upgrade | Next.js and audited dependencies current on their own branch, all gates green | UI agent | Open: F-11 (research done; `npm audit` lists 7 advisories in the current stack) |

### Needs the owner
Everything only Sahil can supply (facts, files, decisions) is in **`OWNER_INPUTS.md`**, each with a recommendation and a default. Next for this repository: C16 (Pages source, H-04), C8 (push the profile README) and the A/B inputs that turn self-reported figures into verified ones. The credential cleanup in other repositories (F-09, F-10) is deferred by the owner: the keys are expired, and this repository's history holds none.

### Agents can start now
Bump the GitHub Actions to their Node 24 versions once the owner approves (H-04); extend `check_claims.py` to scan `src/components/` so a hard-coded figure is caught (F-29); research the framework upgrade path on a branch (F-11).

## Index

<!-- index:start -->
| ID | Finding | P | Status | Owner | Updated |
|----|---------|---|--------|-------|---------|
| [F-01](findings/F-01-marketplace-figures.md) | Marketplace platform figures disagreed across sources | P0 | Done on the site; career document and LaTeX resume still to align | Sahil (live read) / content agent | 2026-10-26 |
| [F-02](findings/F-02-dead-repository-links.md) | Seven links on the site and resume led to private or non-existent repositories | P0 | Done on the site; LaTeX resume still to check | Content agent | 2026-10-26 |
| [F-04](findings/F-04-published-resume-stale.md) | Published resume PDF is stale and its LaTeX source still has overstated wording | P0 | Done 2026-11-24 (released 2026-11-24): PDF rebuilt from the corrected source, one page | Resume agent; Sahil (rebuild machine) | 2026-11-24 |
| [F-05](findings/F-05-springer-authorship.md) | Springer paper authorship contradicted itself | P0 | Done on the site | Content agent | 2026-10-26 |
| [F-19](findings/F-19-role-claims-overstated.md) | Fitness-platform and FinTech role claims were overstated | P0 | Done on the site, Word and LaTeX source; career document still open | Sahil (career document) | 2026-10-26 |
| [F-27](findings/F-27-public-repo-confidentiality.md) | Audit notes would have published client names and credential locations | P0 | Done (released 2026-11-24) | Release agent | 2026-10-26 |
| [F-29](findings/F-29-hardcoded-component-copy-wrong.md) | Facts hard-coded in components contradict the data and the ledger | P0 | Done (released 2026-11-24) | Content agent; Sahil (24-hour promise, football wording) | 2026-11-23 |
| [F-30](findings/F-30-sde2-client-engagement.md) | The site did not show the SDE II client engagement | P0 | Done on the site (released 2026-11-24); LaTeX, Word and profile README still to align | Content agent; Sahil (C1: name the client or not) | 2026-11-23 |
| [F-03](findings/F-03-github-profile-readme.md) | GitHub profile README carries stale dates; profile has no bio or location | P1 | Edited locally in a separate clone; not pushed | Sahil (push, bio, pins) | 2026-10-26 |
| [F-06](findings/F-06-employer-naming.md) | Employer naming and internship duration inconsistencies | P1 | Done (released 2026-11-24) | Sahil | 2026-11-23 |
| [F-08](findings/F-08-linkedin-export-committed.md) | Raw LinkedIn export is committed to the public repository | P1 | Done 2026-11-23 (released 2026-11-24): removed from the tree; still in git history | Sahil (approval) | 2026-11-24 |
| `F-09` *(private)* | Credentials in the public git history of other repositories | P1 | Deferred by the owner 2026-11-24: old free-tier keys, expired; other repositories cleaned later, outside this repo | Sahil | 2026-11-24 |
| `F-10` *(private)* | Plaintext credential files sit beside work projects | P1 | Deferred by the owner 2026-11-24: outside this repository; owner cleans up later | Sahil | 2026-11-24 |
| [F-17](findings/F-17-accuracy-claim-attribution.md) | The 90%+ accuracy claim was attached to different features | P1 | Done on the site and Word; owner-material figure | Sahil | 2026-10-26 |
| [F-18](findings/F-18-aws-certification-wording.md) | "AWS Certified Cloud Practitioner" overstates the evidence | P1 | Done on the site, Word and LaTeX; profile README to check | Resume agent | 2026-10-26 |
| [F-20](findings/F-20-placeholder-publish-dates.md) | Case-study publish dates were placeholders | P1 | Done; one date unverified (A7) | Sahil | 2026-11-23 |
| [F-21](findings/F-21-internship-date-overlap.md) | Two 2022 internship date ranges overlap | P1 | Done (released 2026-11-24) | Sahil | 2026-11-23 |
| [F-22](findings/F-22-forecasting-figure-and-dating.md) | Forecasting model: dating and the 93.17% figure | P1 | Done on the site 2026-11-23 (labeled proof of concept, placed in the internship, note wording aligned) | Sahil | 2026-11-23 |
| [F-28](findings/F-28-project-card-figures.md) | Project-card figures contradicted the public repository or were illustrative | P1 | Done on the site; lip-reading figures remain owner-material | Sahil | 2026-10-26 |
| [F-31](findings/F-31-profile-drift-2026-11.md) | LinkedIn and Scholar had facts the site lacked or contradicted | P1 | Done on the site (released 2026-11-24); two details need the owner (A9) | Content agent; Sahil | 2026-11-23 |
| [R-01](findings/R-01-word-resume-digiflux.md) | Word resume in the company format | P1 | Built and validated; awaiting the owner's read-through | Sahil | 2026-10-26 |
| [U-01](findings/U-01-homepage-information-architecture.md) | Homepage order and length work against the one-minute case | P1 | Done (released 2026-11-24) | UI agent; Sahil (approve the order) | 2026-11-23 |
| [U-03](findings/U-03-hero-fit-and-template-tells.md) | Hero does not fit one screen and carries most of the template tells | P1 | Done (released 2026-11-24) | UI agent; Sahil (approve the rework against a mock-up) | 2026-11-23 |
| [U-07](findings/U-07-accessibility-gaps.md) | Accessibility gaps found by code review | P1 | Done 2026-11-24 (released 2026-11-24): keyboard walk, contrast and reduced motion verified | UI agent | 2026-11-24 |
| [U-14](findings/U-14-visual-case-studies.md) | Projects and case studies have no visuals | P1 | Done 2026-11-24 (released 2026-11-24): every case study has a system figure; owner screenshots (B1) would add to them | UI agent; Sahil (B1 screenshots) | 2026-11-24 |
| [U-15](findings/U-15-visual-direction-redesign.md) | Replace the visual world: from template-like to a distinctive, readable identity | P1 | Done (released 2026-11-24); finish review not run | Sahil (choose); UI agent (build) | 2026-11-23 |
| [U-16](findings/U-16-full-site-review-2026-11.md) | Full-site independent review, 2026-11-23 | P1 | Done and released 2026-11-24 (main 7c0dce9); live checks pass | Agent; Sahil for the gated items | 2026-11-24 |
| [U-17](findings/U-17-motion-and-lost-features.md) | Features and motion the redesign dropped: what to restore, what stays dropped | P1 | Done 2026-11-24 (released 2026-11-24): motion shipped after three review rounds (verdict: ship); Paper details fold still open | UI agent | 2026-11-24 |
| [F-07](findings/F-07-career-document-tenure.md) | Tenure figures in the career document are out of date | P2 | Open | Sahil | 2026-10-26 |
| [F-11](findings/F-11-stack-upgrade.md) | Framework versions lag by one to two majors | P2 | Research done; not started - needs approval | Sahil (approval); UI agent | 2026-10-26 |
| [F-12](findings/F-12-linkedin-not-readable.md) | LinkedIn cannot be read automatically | P2 | Blocked - needs the owner | Sahil | 2026-10-26 |
| [F-23](findings/F-23-unverifiable-colour-claims.md) | Two colourful claims cannot be checked | P2 | Done 2026-11-23 (default wording applied; avatar lines replaced) | Sahil | 2026-11-23 |
| [F-24](findings/F-24-skills-section-gaps.md) | Skills section omitted tools used daily | P2 | Done; self-ratings flagged | Sahil | 2026-10-26 |
| [H-01](findings/H-01-agent-harness.md) | Working brief, agent card, hooks and project skills | P2 | Done (released 2026-11-24) | Sahil | 2026-10-26 |
| [H-03](findings/H-03-docs-consolidation-2026-11.md) | Docs reduced to one home per fact | P2 | Done (released 2026-11-24) | Release agent (commit) | 2026-11-23 |
| [H-04](findings/H-04-pages-source-and-actions-runtime.md) | Pages deploys from the branch and from Actions; the actions run on a deprecated Node | P2 | Open: needs the owner's yes (repository setting and workflow versions) | Sahil (setting); agent (workflows) | 2026-11-24 |
| [U-02](findings/U-02-avatar-companion-hide.md) | 3D avatar companion: hide for now behind a flag | P2 | Hidden and no longer bundled (2026-11-23) | UI agent; Sahil (confirm hide) | 2026-11-23 |
| [U-04](findings/U-04-section-template-repetition.md) | Every section uses the same header template and label badge | P2 | Done (released 2026-11-24) | UI agent | 2026-11-23 |
| [U-05](findings/U-05-skills-section-redesign.md) | Skills section: self-rating bars, emoji icons, hover-only detail | P2 | Done (released 2026-11-24) | UI agent; Sahil (ratings decision) | 2026-11-23 |
| [U-06](findings/U-06-duplicated-and-ambiguous-stats.md) | Statistics repeat across sections and one label is ambiguous | P2 | Done (released 2026-11-24) | UI agent; Sahil | 2026-11-23 |
| [U-08](findings/U-08-performance-and-fonts.md) | Performance: heavy first load, infinite animations, three font families | P2 | Done 2026-11-24: live Lighthouse after release, mobile 85 (was 53), LCP 3.0 s (was 4.1 s) | UI agent | 2026-11-24 |
| [U-09](findings/U-09-copy-audit.md) | Copy contains generic phrases, placeholders and dash and emoji tells | P2 | Done (released 2026-11-24) | Content agent; UI agent | 2026-11-23 |
| [U-10](findings/U-10-contact-section.md) | Contact section duplicates the availability message and exposes a phone number | P2 | Done (released 2026-11-24) | UI agent; Sahil (phone number) | 2026-11-23 |
| [U-11](findings/U-11-research-and-achievements-overlap.md) | Publications and Achievements overlap and the lists are too long | P2 | Done (released 2026-11-24) | UI agent | 2026-11-23 |
| [U-12](findings/U-12-ui-audit-coverage.md) | UI audit coverage: what has and has not been reviewed | P2 | In progress | UI agent | 2026-11-23 |
| [F-13](findings/F-13-agent-context-files.md) | No agent context files in the repository | P3 | Done (released 2026-11-24) | Sahil (commit) | 2026-10-26 |
| [F-14](findings/F-14-documentation-spread.md) | Documentation spread across the root and docs/ | P3 | Done (released 2026-11-24) - see H-03 | Content agent | 2026-11-23 |
| [F-15](findings/F-15-untracked-files.md) | Untracked working files at the repository root | P3 | Done (released 2026-11-24) | Sahil (commit) | 2026-10-26 |
| [F-16](findings/F-16-personal-repositories-housekeeping.md) | Personal repository housekeeping | P3 | Open - external writes need approval | Sahil (approval) | 2026-10-26 |
| [F-25](findings/F-25-short-links.md) | Outbound links to verify | P3 | Done 2026-11-24 (released 2026-11-24): direct certificate URLs; link check in the release gate | Content agent | 2026-11-24 |
| [F-26](findings/F-26-nvidia-certificate-date.md) | NVIDIA certificate date is unverified | P3 | Open (low) | Sahil | 2026-10-26 |
| [H-02](findings/H-02-docs-reorganisation.md) | Reference guide and scope checklist reorganised | P3 | Done (released 2026-11-24) | Content agent | 2026-11-23 |
| [U-13](findings/U-13-case-study-diagram-and-404.md) | Case-study diagram text is small on phones; 404 canonical | P3 | Done 2026-11-23 (styled site 404; diagram themed, natural size, keyboard-scrollable) | UI agent | 2026-11-23 |
<!-- index:end -->

Resolved decisions: `DECISIONS.md`. Facts and figures: `CLAIMS_LEDGER.md`. History: `HISTORY.md`.
