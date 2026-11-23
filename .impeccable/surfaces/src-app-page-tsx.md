---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/case-studies/page.tsx"]
---

## Scope
Homepage (`src/app/page.tsx`) and the case-study routes. Mode: Persuade, with Read for case-study articles. Audience: hiring managers and technical recruiters for AI/ML engineer roles (PRODUCT.md). Action: reach the selected work in the first scroll, then email. Proof: four production systems with role and scale, two papers; every figure footnoted to the claims ledger. Constraints: no invented claims; owner-material figures labelled; email only; avatar off; WCAG 2.1 AA.

## Direction contract
THESIS: A portfolio read like a well-made ML paper: a poster-scale claim, then figures and footnotes that prove it. It refuses the category default of a centred "Hi, I'm" hero over gradient blobs with stat cards and a card grid.
OWN-WORLD: Two grounds: a deep plot-ink band (#0E1526) for the opening and the close, then cool paper (#FBFBF9) with ink text (#14161A). One accent, matplotlib tab:blue (#1F77B4), on footnote markers, links and figure strokes; tab:orange (#FF7F0E) only inside figures. Bricolage Grotesque at condensed width for display, Literata for reading, JetBrains Mono only for numbers and figure labels. Hairline rules and captions instead of cards.
STORY: The visitor learns in one screen that Sahil ships production AI systems, sees four systems as captioned figures with role and scale, opens a footnote to check a number, skims experience and papers, and emails.
FIRST VIEWPORT: Full-width ink band. A two-line poster headline, "Systems that make it / to production.", set at about 9.4vw. Below it, one line: "Sahil Patel · Software Development Engineer II · AI/ML & Full Stack", a one-sentence thesis, then the actions "Selected work" (primary), "Email" and "Resume (PDF)" (owner request, 2026-11-23). Type only, by owner decision (2026-11-23): a portrait plate and a pipeline drawing behind the headline were both tried and rejected; the calm space is intentional and the owner's real photo lives in About. Under the fold edge, the paper begins with Selected work, then Research.
FORM: Research publication (paper with figures, captions, margin footnotes), owner-pinned option C of docs/design/DESIGN_DIRECTION.md. seed: none (pinned): "Dark poster-type hero band, then calm research-paper reading: serif text, figures with captions, every metric footnoted to its source." Signature interaction: footnote markers that open an inline source card (source, date, status). Motion grammar: one staged entrance of the headline, then still pages; footnote cards ease open; nothing loops; reduced motion shows everything at rest.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment
Opening a footnote on "500K+" and seeing where the number comes from, how it was counted and whether it is verified.

## Unresolved
Football wording (OWNER_INPUTS C4); skill self-ratings (C3, default: drop); owner screenshots (B1), until then figures are diagrams drawn from the real systems.
