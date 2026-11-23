# F-02 — Seven links on the site and resume led to private or non-existent repositories

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P0 | Done on the site; LaTeX resume still to check | content | Content agent | 2026-10-26 | 2026-10-26 |

## Finding

Project and case-study cards linked to repositories that are private or do not exist, so a visitor clicking through hit a 404.

## Evidence

Compared every `github.com/patelsahil2k03/...` link in `src/data/` and `resume/main.tex` against `gh repo list` (authenticated as the owner).

Private evidence (names a client or a credential location, so it is not in this tracked file): `docs/private/evidence/F-02.md`.

## Done so far

Dead links removed from `projects.ts` and `caseStudies.ts`; the lip-reading project now points at the public fruit-detection repository.

## Next action

Run the same comparison for `resume/main.tex`; add a link check to the release gate.

**Owner:** Content agent  
**Done when:** Every outbound repository link in site data and the LaTeX resume answers 200 for an anonymous visitor.

## Surfaces (propagation)

Site: done · LaTeX: waiting

---
*Single source of truth for F-02. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
