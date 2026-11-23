---
name: portfolio-ui-review
description: Review and improve the portfolio UI without a revamp - information order, anti-template design, accessibility, performance, responsive checks. Use for any change to src/components, src/app or styles, and for UI audits.
---

# portfolio-ui-review

Read `nextprompt.md` §7, `PRODUCT.md`, `DESIGN.md` (when written) and `docs/design/DESIGN_DIRECTION.md` first. Improve what exists; a redesign is a separate approved project.

## Skills to load (they carry the detailed rules; this file is the routing)
- `impeccable` - primary design skill: `critique`, `audit`, `polish`, `typeset`, `layout`, `animate`, and new-work for a replacement visual world. It reads `PRODUCT.md` and `DESIGN.md` at the repo root; run its mechanical `detect` over changed UI before calling it done.
- `design-taste-frontend` - anti-template pass: hierarchy, spacing, type, colour, what makes a page read as generated.
- `web-design-guidelines` - interface guideline audit (labels, focus, forms, motion, contrast).
- `emil-design-eng` - polish and motion decisions (only when touching animation or interaction).
- `vercel-react-best-practices` - bundle, rendering and data-loading performance for Next.js/React.
- `design:accessibility-review` - WCAG 2.1 AA audit. `webapp-testing` or `agent-browser` - drive the page and take screenshots.
If a skill is not installed, say so and apply the checklist below by hand.

## Review loop (each finding is recorded as its own `U-xx` document before it is fixed)
1. **Inventory** the sections in render order (`src/app/page.tsx`) and what each one is for. Ask of each: does it serve the one-minute case? What would the reader miss if it vanished?
2. **Look.** With the owner's yes start a static server on `out/` (check the port first), capture desktop (1440) and phone (375) screenshots of every section, read the console. Stop what you started.
3. **Score against the checklist** below. Record every flaw as a finding: what, where (file:line), evidence (screenshot name or measurement), severity, proposed fix.
4. **Fix one finding at a time**, smallest change that solves it, then re-check the same view. Do not batch unrelated fixes.
5. **Verify:** `npx tsc --noEmit`, `npm run lint`, `npm run build`, rerun the screenshots, compare First Load JS (before/after in the finding).

## Checklist
- **Order and focus:** who/what in the first screen; proof next; depth after; one idea and at most one call to action per section; no section that repeats another.
- **Anti-template:** no uniform card grid for everything; no gradient text, glow, blob or emoji-as-icon decoration; real hierarchy (size, weight, space) before colour; at most one accent; copy specific to the work, not generic.
- **Type and space:** a defined scale; measure 60-75 characters for prose; consistent spacing rhythm; nothing under 14 px for body text (diagram labels included).
- **Accessibility:** landmarks, heading order, visible focus, keyboard path, contrast AA, alt text or `aria-hidden`, reduced motion, touch targets 44 px.
- **Performance:** lazy-load below the fold and 3D/animation code; sized images; no layout shift; report First Load JS.
- **Responsive:** 375, 768, 1440; no horizontal scroll; tap targets; content order on mobile.
- **Truth:** every number on the screen is in `docs/CLAIMS_LEDGER.md`.

## Hard stops
Flags over deletion for hidden features; no new dependency without a measured reason and the owner's yes; keep `DESIGN.md` current when tokens change.
