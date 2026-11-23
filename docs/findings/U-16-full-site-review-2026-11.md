# U-16 — Full-site independent review, 2026-11-23

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done 2026-11-24 (uncommitted): both P1 decisions applied with the owner's yes; all checks clean | UI, code, content | Agent; Sahil for the gated items | 2026-11-23 | 2026-11-24 |

## Finding

Four independent reviewers, each blind to the others, reviewed every page (home, case-study index, all ten articles, 404) after the
Evidence redesign: (A) design critique with the Impeccable rubric, (B) the Impeccable detector plus a Playwright technical audit at
1440, 768 and 375 px in both themes, (C) a code and logic review, (D) a content and fact check against `docs/private/profile/`,
the ledger, `resume/main.tex` and Crossref.

## Evidence

Scores before fixes: design 24/40 (Nielsen), audit 14/20 (accessibility 3, performance 2, theming 3, responsive 3, integrity 3).
Detector on source: 0 findings; on URLs: advisory `straggler` and `undersized-ui-text` (marker numerals at 9.5 px), two false positives
inside the Mermaid SVG. Clean on all pages: no horizontal overflow, no text under 4.5:1, one h1, no duplicate ids, every focus visible.
Working notes and screenshots stayed in the session scratchpad (not tracked).

## Done so far

**Fixed and verified 2026-11-23** (tsc, lint, build, `check_claims` 0, `check_public_safe` 0, guard tests 18/18, content 532 rendered, 0 lost):
- Truth: hero promise narrowed to "every scale and accuracy figure"; Research figures footnoted; RAG work moved to the 2025 role (git
  init 2025-05-09); forecasting labeled a proof of concept; marketplace study under SDE II; football, Azadi, "distinction",
  "enterprise-grade", Adobe title, indexing claims and AI-Manthan grain corrected; American spelling; em dashes out of metadata.
- Bugs: related-row footnote links pointed to missing notes; dates showed the previous month west of UTC; figure matcher could cite
  inside longer tokens; "Builds" had no filter; no site 404 and a wrong canonical on it; Mermaid theme race; value and marker could wrap apart.
- Performance: hidden avatar no longer bundled (home First Load JS 360 kB to 117 kB); Navigation no longer pulls the data barrel.
- Structure: order is now Selected work, Experience, Research, Projects, Skills, About, Contact, Notes (endnotes); Recognition and
  Projects fold what repeats; strongest Experience bullets shown first; index sorted production first with a live result count.
- Accessibility: Escape closes menu and notes, notes focusable, reduced motion respected for scrolling, scroll padding under the header,
  marker numerals at least 11 px, diagram scroller keyboard-reachable.
- Harness: `guard_bash.py` now catches `git -C … push --force`, refspec force pushes and split `rm -r -f` (tests added).
- Résumé source and share image corrected (`resume/main.tex`, `public/preview.png` 1200×630).

**Owner yes 2026-11-23 (C12–C15):** location now "Remote"; four unused dependencies removed; 5.4 MB of unused assets trashed;
CI and the deploy run every project check. A content-check gap found later is recorded in U-17 (hard-coded component copy was not covered).

**2026-11-24 final critique (dual-agent; snapshot `.impeccable/critique/2026-11-23T19-54-20Z__src-app-page-tsx.md`):** round one 22/32 led to fixes: every figure in hooks, descriptions and article prose cited against each page's own note order; figure and number are one button (tap target); results rows hold figures only; first-person note voice; jumped-to note tinted; diagram described for screen readers; no orphan words; hover lift, status wording, LinkedIn-sourced statuses and en dash fixed. Fresh re-score: 25/36 (69%), technical checks clean (104 page loads, 460 footnotes). The two remaining P1s are owner decisions: footnote only the figures that carry the argument, and remove repeated figures from the homepage (repetitions, not facts). Done-when (75% with no P1) waits on those.

**2026-11-24 (owner yes to every recommendation):** footnotes limited to the ten figures that make the case (`KEY_FIGURES` in `src/data/claims.ts`; every other note kept in `allClaims` and the ledger, rendered plain); the hero and index promises reworded to match; results rows show only figures their hook does not already state; About describes the systems without repeating numbers; the notes become Sources, placed before Contact so the page ends on the ask, each note leading with its kind of evidence; a 'Back to where you were reading' control after a note jump; phone hero headline about 15% larger with less empty band; papers on the record grid. Clarity stays and the hero stays type-only (no change recommended). All gates, the full-site check (13 pages x 2 themes x phone, desktop, reduced motion) and the link check pass.

## Next action

Rebuild the résumé PDF (C10). Lighthouse before/after stays with U-08; the motion pass is U-17.

## Done when

The gated items are answered and done, the PDF matches `main.tex`, and a re-run of the critique scores at least 30/40 with no P0 or P1 open.
