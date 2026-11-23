# U-03 — Hero does not fit one screen and carries most of the template tells

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done (uncommitted) | ui | UI agent; Sahil (approve the rework against a mock-up) | 2026-10-26 | 2026-11-23 |

## Finding

The hero is 1,462 px tall on desktop (viewport 900) and 2,292 px on a phone, so the primary calls to action are below the fold. It stacks: an availability badge with a shimmer and sparkle icon, a gradient-filled name with an animated background, a gradient typing animation with a blinking cursor, two blurred animated blobs, two long positioning paragraphs, eight stat cards with emoji icons in two rows, three CTAs of different intent, six social icon buttons and a bouncing scroll arrow. The centred layout and the 'Hi, I'm' opening are the generic default.

## Evidence

Measured on the 2026-10-26 build, headless Chromium at 1440x900 and 375x812, before any UI change. Source: `HeroEnhanced.tsx` (443 lines). Eight emoji icons, a hand-drawn LeetCode SVG, five infinite animations. The typing role list includes 'National Footballer' (F-23).

## Done so far

Recorded only.

**2026-11-23:** Impeccable `detect` (2026-11-23) reports three gradient-text hits, all in `HeroEnhanced.tsx`. Live hero: 1,462 px desktop, 2,263 px phone.

**2026-11-23:** Hero rebuilt: poster claim, identity line, one-sentence thesis, three actions (Selected work, Email, Resume), frontispiece; no blobs, typing, gradient text, emoji, stat cards or scroll arrow. Fits 1440×900 and 375×812.

## Next action

Targeted rework (not a redesign): left-aligned statement with the name as plain text, one 20-word positioning line, two CTAs (view work, contact) with the resume as a text link, a single proof strip of three or four ledger-backed numbers, no blobs, no typing or gradient text, no scroll arrow, no emoji; the second positioning paragraph moves to About. Hero must fit 900 px.

**Owner:** UI agent; Sahil (approve the rework against a mock-up)  
**Done when:** Hero height at most one viewport at 1440x900 and 375x812; at most four text elements; every number in the strip has a ledger row.

---
*Single source of truth for U-03. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
