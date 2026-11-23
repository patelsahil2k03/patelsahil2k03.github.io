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
OWN-WORLD: Two grounds: a deep plot-ink band (#0E1526) for the opening and the close, then cool paper (#FBFBF9) with ink text (#14161A). One accent, the matplotlib tab:blue hue deepened to #1C6BA3 (5.51:1 on paper), on footnote markers, links and figure strokes; tab:orange (#FF7F0E) only inside figures. Bricolage Grotesque at condensed width for display, Literata for reading, JetBrains Mono only for numbers and figure labels. Hairline rules and captions instead of cards.
STORY: The visitor learns in one screen that Sahil ships production AI systems, sees four systems as captioned figures with role and scale, opens a footnote to check a number, skims experience and papers, and emails.
FIRST VIEWPORT: Full-width ink band. A two-line poster headline, "Systems that make it / to production.", set at about 9.4vw. Below it, one line: "Sahil Patel · Software Development Engineer II · AI/ML & Full Stack", a one-sentence thesis, then the actions "Selected work" (primary), "Email" and "Resume (PDF)" (owner request, 2026-11-23). Type only, by owner decision (2026-11-23): a portrait plate and a pipeline drawing behind the headline were both tried and rejected; the calm space is intentional and the owner's real photo lives in About. Under the fold edge, the paper begins with Selected work, then Experience, Research, Projects, Skills, About, Sources and Contact (the page ends on the ask). On phones the headline is about 15vw on three lines.
FORM: Research publication (paper with figures, captions, margin footnotes), owner-pinned option C of docs/design/DESIGN_DIRECTION.md. seed: none (pinned): "Dark poster-type hero band, then calm research-paper reading: serif text, figures with captions, the figures that make the case footnoted to their source." (D-16: ten KEY_FIGURES carry footnotes; every figure keeps a ledger row.) Signature interaction: the figure and its number are one button that opens an inline source card (what it counts, source, status). Motion grammar (DESIGN.md, Motion; D-15): the headline entrance, a system figure building in pipeline order the first time it is seen, notes, folds and the menu settling in 180-200 ms, link arrows nudging; nothing loops; reduced motion shows everything at rest.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment
Opening a footnote on "500K+" and seeing where the number comes from, how it was counted and whether it is verified.

## Unresolved
Football wording (OWNER_INPUTS C4); skill self-ratings (C3, default: drop); owner screenshots (B1), until then figures are diagrams drawn from the real systems.
