# Design direction

The decision record for the redesign: what the site must do, what the evidence says, the options, and the one chosen. When a direction is approved, its tokens and rules are written to `DESIGN.md` at the repository root (read by the Impeccable skill) and this file keeps only the reasoning. Finding U-15 tracks the work.

**Status (2026-11-23): option C (Evidence) chosen by the owner.** The binding direction contract (thesis, world, first viewport, form, finish) is the Impeccable surface brief `.impeccable/surfaces/src-app-page-tsx.md`. Agent's calls inside the option, recorded so the owner can check them: display face Bricolage Grotesque (condensed width), text face Literata, JetBrains Mono for numbers only; accent matplotlib `tab:blue` #1F77B4 (`tab:orange` only inside figures); ink band #0E1526 and paper #FBFBF9. Faces on Impeccable's default list (Lora, Newsreader, Space Grotesk, Inter as display) were ruled out. Not built yet.

## 1. What the site must do

A hiring manager or technical recruiter for AI/ML and full-stack roles lands on the homepage. In about a minute they should know: who this is (an engineer who ships production AI systems), what the strongest evidence is (three or four systems, with role and scale), and how to go deeper (case studies, papers) or make contact. The site must then survive a skeptical deeper read: every number traceable (`CLAIMS_LEDGER.md`).

The owner's brief (2026-11-23): "exquisite, yet understandable and engaging"; "something crazy good" rather than "very standard"; typography with the presence of a concert poster; less content per page; no revamp of what already works; avatar hidden for now.

## 2. Evidence

**Our site, measured on the live build (2026-11-23):** homepage 17,806 px tall on desktop and 35,634 px on a phone; about 2,870 words; hero 1,462 px against a 900 px viewport; 25 emoji, 12 em dashes; nine identical section-label badges; 16 stat cards; four accent colours (blue, teal, amber, purple) plus gradient text (three detector hits, Impeccable `detect`); Inter for body, Space Grotesk for headings. Screenshots and metrics: `docs/private/ui-audit/before-2026-11-23/`.

**References studied (screenshots in `docs/private/ui-audit/references-2026-11-23/`):** 16 engineer and designer portfolios (Brittany Chiang, Lee Robinson, Paco Coursey, Rauno Freiberg, Emil Kowalski, Josh Comeau, Delba de Oliveira, Maggie Appleton, Sara Soueidan, Jhey Tompkins, Chip Huyen, Andrej Karpathy, Simon Willison, Lilian Weng, Anthony Fu, Cassie Evans) and 8 galleries (Awwwards portfolios, SiteInspire, Recent/Godly, Dark Mode Design, Bento Grids, Lapa Ninja, Design Spells; CSS Design Awards was down). Earlier research covers 41 more (`PORTFOLIO_REFERENCE.md`, `COMPETITIVE_DESIGN_RESEARCH.md`).

**What the strongest engineer portfolios share:**
1. One typeface with character carries the identity (Iowan, Canela, Lora, Söhne, a sharp grotesk); colour is near-monochrome with one accent or none.
2. The first screen says one thing. Detail is one scroll or one click away.
3. Lists and prose, not card grids. No stat cards, no badges, no gradients, no emoji.
4. At most one signature element: Rauno's yellow disc, Lee's illustration, Jhey's hand-drawn signature, Josh's playful header.
5. ML engineers (Karpathy, Chip Huyen, Lilian Weng) earn credibility through writing and specifics, not decoration.

**What 2026 galleries add:** poster-scale display type; monochrome with a single saturated pop; editorial grids with asymmetric whitespace; motion reserved for one moment.

## 3. Options

All three keep the content model, routes, section ids, data files, dark mode and accessibility work; they replace the visual world (palette, type, layout rhythm, motion), cut the homepage to roughly a third of its length, and show every metric once with its unit.

### A. Stage (poster typography, dark)
Near-black stage, warm off-white text, one hot accent (signal vermilion). Hero is a condensed display face at poster scale ("Systems that make it to production") set tight across the width, with a single entrance motion. Work is shown as a numbered set list: each case study a full-width row with role, scale and one diagram. Mono for numbers. *Closest to the owner's "concert" brief; boldest; risk: reads as a creative portfolio if the display face is too loud.*

### B. Dossier (editorial engineering, light)
Paper-white, ink-black, one electric accent (signal blue or acid green). A refined grotesk display paired with a mono for data; asymmetric editorial grid; case studies as dossiers with architecture diagrams as the hero visual and footnoted figures. *Most recruiter-safe; most "understandable"; risk: polished but quieter than the brief.*

### C. Evidence (research-paper voice, light, with a stage hero)
A research-paper reading experience: a serif text face, figures with captions, and **every metric footnoted to its source** (the claims ledger made visible), which no neighbouring portfolio can truthfully copy. The hero borrows A's poster type on a dark band, then the page settles into calm reading. *Most distinctive positioning ("evidence for every claim"); slightly more build work (footnote component).*

**Recommendation: C**, using A's typography for the hero. It answers the "exquisite and crazy good" brief with one bold moment, keeps the rest calm and readable for recruiters, and turns the project's real differentiator (verified claims) into the design itself.

## 4. Decided regardless of the option

- Homepage order: hero → selected work (three or four case studies) → experience (compact timeline) → research and recognition (merged) → skills (one compact block) → about (short) → contact. Section ids and nav labels stay; the order change is in U-01.
- Hero fits one screen at 1440×900 and 375×812, with at most four text elements and two calls to action.
- No emoji, no gradient text, no glow blobs, no section-label badges, no stat-card grids, no em dashes in visible copy, no hover-only information.
- Motion: one entrance in the hero, subtle reveal on scroll, all of it off under reduced motion; no infinite loops.
- Every project and case study gets a visual: an architecture or data-flow diagram drawn from the real system (U-14); screenshots only when the owner supplies clean ones (`OWNER_INPUTS.md` B1).
- Avatar stays off until its restore condition is met (U-02).
- Built with the Impeccable skill (new-work, then critique, audit and polish) and the project UI skill; `DESIGN.md` written from the chosen option.

## 5. Variant comparison (2026-11-23)

Owner asked for evidence behind the colour and type choices. Four variants of the built design were rendered on the same build with CSS overrides only (screenshots, sheets and `metrics.json` in `docs/private/ui-audit/variants-2026-11-23/`). Contrast is computed from rendered colours (WCAG formula); font weight is the bytes of font files downloaded on the homepage.

| | A current (ink band, tab:blue, Bricolage + Literata) | B paper hero (no band) | C alternative type (Archivo condensed + Source Serif 4) | D forest palette (green band and accent) |
|---|---|---|---|---|
| Hero headline contrast | 16.09 | 17.48 | 16.09 | 14.08 |
| Hero thesis contrast | 8.35 | 10.04 | 8.35 | 8.52 |
| Link / footnote marker contrast on paper | 4.65 (AA, at the floor) | 4.65 | 4.65 | 4.79 |
| Muted metadata contrast | 5.74 | 5.74 | 5.74 | 5.74 |
| Font download | 386 KB | 386 KB | 713 KB | 386 KB |
| Headline lines on a phone | 2 | 2 | 3 | 2 |
| Fit to the brief (poster presence, technical, readable) | Strongest | Calm, loses the poster moment | Similar presence, newspaper feel, heavier | Same presence, reads earthy rather than technical |

**Reading:** A stays the recommendation. The evidence adds two corrections inside A: the accent sits at the AA floor on paper (raise it to a deeper tab:blue), and 386 KB of fonts is heavy (trim Literata's italic and optical-size axes). The earlier code comments claiming 4.8:1 and 5.9:1 were not measured; the measured values are 4.65:1 and 5.74:1.
