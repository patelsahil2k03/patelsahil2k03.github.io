---
name: Sahil Patel portfolio (Evidence)
description: A portfolio read like a well-made ML paper; a poster-scale claim, then figures and footnotes that prove it.
colors:
  paper: "#FBFBF9"
  figure: "#F3F4F1"
  ink: "#14161A"
  ink-secondary: "#3C4048"
  muted: "#5E6470"
  rule: "#DADCD6"
  band: "#0E1526"
  band-ink: "#F2F1EC"
  band-muted: "#A8B0C0"
  accent: "#1C6BA3"
  accent-on-band: "#6EB0E6"
  figure-mark: "#FF7F0E"
  dark-paper: "#0E1526"
  dark-figure: "#141D33"
  dark-ink: "#ECEBE6"
  dark-ink-secondary: "#C2C5CC"
  dark-muted: "#9AA1AD"
  dark-rule: "#26304A"
  dark-band: "#03050A"
  dark-accent: "#6EB0E6"
typography:
  poster:
    fontFamily: "Bricolage Grotesque (wdth 75, opsz 96), ui-sans-serif, sans-serif"
    fontSize: "clamp(3.1rem, 9.4vw, 10.25rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "Bricolage Grotesque (wdth 85, opsz 48), ui-sans-serif, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  page-title-mobile:
    fontFamily: "Bricolage Grotesque (wdth 85, opsz 48), ui-sans-serif, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.02
  display:
    fontFamily: "Bricolage Grotesque (wdth 85, opsz 48), ui-sans-serif, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  display-mobile:
    fontFamily: "Bricolage Grotesque (wdth 85, opsz 48), ui-sans-serif, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.05
  item:
    fontFamily: "Bricolage Grotesque (wdth 85, opsz 48), ui-sans-serif, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  ui:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
  body:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
rounded:
  none: "0px"
  dot: "9999px"
spacing:
  section: "7rem"
  section-sm: "5rem"
  gutter: "3rem"
  page-x: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.band-ink}"
    textColor: "{colors.band}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-on-paper:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "40px"
  figure:
    backgroundColor: "{colors.figure}"
    rounded: "{rounded.none}"
    padding: "36px 32px"
  figure-step:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
  footnote-marker:
    textColor: "{colors.accent}"
    typography: "{typography.data}"
---

# Design system: Evidence

Built 2026-11-23 from direction C (`docs/design/DESIGN_DIRECTION.md`); the binding contract is `.impeccable/surfaces/src-app-page-tsx.md`. Tokens live as CSS variables in `src/app/globals.css` (`--ev-*`) and Tailwind colours `ev.*` in `tailwind.config.ts`; this file describes them, it does not replace them.

## Overview

The site reads like a carefully set ML paper. It opens and closes on a deep plot-ink band carrying one poster-scale claim; between them is cool paper with reading type, captioned system figures and footnoted numbers. Its one signature is the footnote: every figure on the page opens a note saying what it counts, where it comes from and whether it is verified. Mode: Persuade on the homepage, Read on case-study articles.

## Colors

Restrained strategy: neutrals plus one accent.
- **Paper and ink** carry all reading. Body copy uses `ink-secondary` for long text and `ink` for headings and values.
- **Band** (`#0E1526`) opens and closes the homepage and holds the footer. Text on it uses `band-ink` and `band-muted`; links use `accent-on-band`.
- **Accent** is the matplotlib `tab:blue` hue at a lower lightness (`#1C6BA3`, 5.51:1 on paper, measured): footnote markers, links, list markers, figure connectors. It never fills large areas.
- **Figure mark** is `tab:orange`, used only inside figures, once per figure, on the outcome step.
- Dark mode swaps paper for the band colour and deepens the band; hierarchy stays the same.

## Typography

- **Poster** (Bricolage Grotesque at 75% width, weight 800): only the hero claim and the contact close. Never for body or section headings.
- **Display** (Bricolage Grotesque at 85% width): section and item headings, left-aligned, no label above them.
- **UI** (Bricolage Grotesque at normal width): navigation, metadata lines, buttons, labels.
- **Body** (Literata, weight axis only): all prose; measure 62-70ch; old-style figures in running text.
- **Data** (JetBrains Mono): numbers, dates, figure steps, technology lists. Never as decoration.
- Paper titles are set in Literata semibold (no italic is loaded).

## Layout

- One column width (`max-w-[1200px]`, 20-48 px side padding). Sections separated by a hairline rule and 5-7 rem of space; more space above a heading than below it.
- Records (experience, projects, recognition, case-study index) use a 12-column split: metadata in 3 columns, content in 9. They collapse to one column below 1024 px.
- Selected work pairs a 5-column text block with a 7-column figure.
- The hero fills about 86% of the viewport, content anchored to the bottom.

## Elevation & Depth

Flat. Depth comes from the band versus the paper and from the figure ground, never from shadows. No glass, no glow, no gradients.

## Shapes

Square corners everywhere. The only round shapes are the 10 px dots on figure connectors.

## Components

- **Cite** (`src/components/evidence/Cite.tsx`): the figure and its superscript accent number (at least 11 px) are one button, so the whole "500K+¹" is the tap target; a dotted accent underline says it opens. It opens an inline note with a left accent rule, closed by its own "close" link or Escape; links inside the note are at least 32 px tall. **MetricList** is the same for a results row (counted or measured values only; word values such as stack or venue read as one caption line under the row), with the note opening full width under the row. Running text is marked by **CitedText** against the page's own note order, so hooks, descriptions and article prose are cited like the results rows. Shared classes live in `citeStyles.ts`. Every footnoted value has an entry in `src/data/claims.ts`, mirroring a ledger row.
- **SystemFigure**: the real pipeline as ordered steps joined by a tab:blue line, the outcome marked tab:orange, with a "Figure n." caption. Steps come from the case study's own text, never invented.
- **Page order** (home): Hero, Selected work, Experience, Research (papers, then recognition folded after two per group), Projects (records with a case study folded), Skills, About, Sources (the notes), Contact. The page ends on the ask. Fold to shorten; never delete.
- **Hero**: type only, by decision. A portrait in light and a pipeline drawing were both tried behind the headline (2026-11-23) and rejected: a portrait competes with the claim and a single project's flowchart narrows it. Calm space on the right is intentional; the owner's real photo lives in About.
- **Sources list** (the notes): the page's footnotes, just before Contact, numbered in reading order, each with a short status tag (verified · project records · published paper) whose meaning is stated once above the list, in the first person like the rest of the site. A note reached by its "note n" link is tinted (`:target`).
- **Records**: date or kind in the data face on the left, display heading, body, technologies in the data face.
- **Disclosure** (`details`): for the long tail (certifications, events, project detail). Content stays in the page.
- **Buttons**: square fills, 44-48 px tall; links are underlined accent text with an up-right arrow for external targets.

## Motion

Two authored moments, everything else a short state change (owner decision 2026-11-23, U-17; CSS in `globals.css`):
- **Hero entrance** (`ev-rise`): the claim settles once on load, 900 ms.
- **Figure build** (`BuildOnView`, `[data-build]`): a system figure builds in pipeline order the first time it scrolls into view,
  steps 70 ms apart, the spine drawn down, the orange outcome last, about 0.7 s. It shows order, which is the figure's argument.
- **State changes:** footnote notes, folds and the mobile menu settle in place over 180–200 ms (opacity and a few px); closing is instant.
- **Feedback:** link arrows nudge 2 px toward where the link goes; the link itself never moves.
- Transform, opacity and clip-path only; ease `cubic-bezier(0.16, 1, 0.3, 1)`. Under reduced motion nothing moves and every state change is instant.

## Do's and Don'ts

- Do give every figure a ledger row, and footnote the ones that make the case (`KEY_FIGURES` in `src/data/claims.ts`: production scale and headline accuracy). Small counts (a course score, a dataset size, a CGPA) stay plain; footnoting everything dilutes the figures that matter (critique 2026-11-24). Show a figure once where it is the proof; don't repeat it in every section.
- Do keep the accent to links, markers and figure strokes. Don't add a second accent or fill areas with it.
- Do use the poster face twice per page at most. Don't use it for section headings.
- Don't add eyebrows or labels above headings, emoji, gradient text, card grids, stat-card rows, badges or glow.
- Don't add motion that explains nothing: no loops, parallax, scroll-jacking, hover lifts or section-by-section reveals. Everything is visible at rest, without JavaScript and under reduced motion.
- Don't remove content to shorten a page: fold it (`details`) and keep it in the page; `node tools/checks/content_inventory.mjs` enforces this.
