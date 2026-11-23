# F-04 — Published resume PDF is stale and its LaTeX source still has overstated wording

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P0 | Done 2026-11-24 (uncommitted): PDF rebuilt from the corrected source, one page | resume | Resume agent; Sahil (rebuild machine) | 2026-10-26 | 2026-11-24 |

## Finding

`public/resume.pdf` (built from `resume/main.tex`) has the wrong Team Star and AI-Manthan dates, lacks the 2026 recognition, the marketplace platform and the fitness platform, and merges the internship and full-time dates. Edits made on 2026-10-26 fixed the dates but one fitness bullet was written too strongly (see F-19).

## Evidence

The former resume review notes, items 1-11 (all applied to the source on 2026-10-26 and retired on 2026-11-23); `resume/main.tex` diff; the live PDF was last modified 2026-08-31. No LaTeX is installed on this machine, so the PDF cannot be rebuilt here.

## Done so far

Dates, AI Catalyst entry, marketplace and fitness bullets and AWS wording edited in the source; on 2026-10-26 every experience bullet was also corrected to the evidence ladder (F-19) and the claims check passes on the source (uncommitted).

**2026-11-23:** independent content review found the served PDF and `main.tex` still wrong (fruit 88%, Team Star date, ASE start, no SDE II, 20+ APIs without a ledger row, Web of Science indexing). `main.tex` corrected to match the site and ledger; the PDF must be rebuilt from it (OWNER_INPUTS C10).

**2026-11-24:** built in a throwaway TeX Live container (no LaTeX installed on the machine): 0 errors, one page. To stay on one page with the SDE II role added, duplicates were merged, not facts removed: the internship forecasting line joined the 'joined as an intern' bullet, the two SDE II search and orchestrator bullets became one, paper author positions and DOI links moved into the two project entries, achievements became one line per group, the generic Specialties line went, and the second AI Catalyst mention (already in the role heading) was dropped. Installed as `public/resume.pdf`. The phone number stays on the résumé by the owner's choice (the site is email-only).

## Next action

Rebuild the PDF on a machine with LaTeX and verify every page against the ledger.

**Owner:** Resume agent; Sahil (rebuild machine)  
**Done when:** `public/resume.pdf` is rebuilt from a corrected `main.tex` and matches the ledger.

## Surfaces (propagation)

LaTeX source: partly edited · PDF: stale

---
*Single source of truth for F-04. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
