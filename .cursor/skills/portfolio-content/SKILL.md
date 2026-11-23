---
name: portfolio-content
description: Change or verify any public claim on the portfolio (case studies, experience, achievements, skills, stats, bio). Use before editing src/data/*.ts or any figure, role, date or link.
---

# portfolio-content

Read `nextprompt.md` §2, §5, §6 first. The site's content lives only in `src/data/*.ts`; every figure has a row in `docs/CLAIMS_LEDGER.md`.

## Procedure (one claim at a time)
1. **Find every place the fact appears.** `grep -rn "<figure or phrase>" src resume/main.tex README.md docs` and the surfaces in `nextprompt.md` §5.
2. **Establish the evidence.** Roles: git authorship per repository (`git shortlog -sn --no-merges`, `git rev-list --count HEAD`; ignore bot and merge noise) and the owner's confirmation. Figures: a source with a date, or label `owner-material`. Publications: the publisher record (Crossref API / publisher page) for author order, date and DOI. Links: fetch them.
3. **Pick the wording from the ladder** (`nextprompt.md` §6): founding member / primary developer → co-developed → contributed. Do not undersell: if the evidence shows ownership, say it plainly.
4. **Edit the data file**, then the ledger row (value, unit, where used, source, date, status), then the other surfaces.
5. **Verify:** `npx tsc --noEmit`, `npm run lint`, `python3 tools/checks/check_claims.py`, `python3 tools/checks/check_public_safe.py`, then `npm run build` and grep `out/` for removed claims.
6. **Record** in the finding doc what changed, how it was verified and which surfaces still wait.

## Hard stops
- No client, internal-project or repository name in a tracked file; use industry descriptors. Evidence that names them goes to `docs/private/`.
- No invented number, date, self-rating or testimonial. No placeholder date.
- A removed claim goes into `tools/checks/banned_claims.txt` with the reason.
- Tone: professional, outcome-led, American spelling, no adjectives that need proof, no dramatic phrasing.

## Case-study shape (see `docs/CASE_STUDIES.md`)
Hook (outcome, one sentence) → role (one line, on the ladder) → industry context → insight (what was learned, grounded in what was built) → contribution (what the owner did, on the ladder) → metrics (each in the ledger and in `src/data/claims.ts` so it gets a footnote) → technologies (only those evidenced in the work) → dates (first commit or publisher record).
