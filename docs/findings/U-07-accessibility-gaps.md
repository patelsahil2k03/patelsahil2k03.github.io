# U-07 — Accessibility gaps found by code review

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done 2026-11-24 (uncommitted): keyboard walk, contrast and reduced motion verified | ui | UI agent | 2026-10-26 | 2026-11-24 |

## Finding

(1) Twelve calls to `window.open` on buttons act as links, so they cannot be opened in a new tab, copied or crawled and are announced as buttons. (2) Filter pills in Experience, Skills, Projects and Achievements have no `aria-pressed`. (3) Skill proficiency is hover-only. (4) Framer Motion animations are not gated by reduced motion: the global CSS override covers only CSS animations, and no `useReducedMotion` or `MotionConfig` exists, so the typing effect, counters, infinite blobs and hover scales still run. (5) One link or button without an accessible name at 375 px (not yet identified). (6) Clickable-looking badges use `cursor-pointer` without being controls. (7) Two scroll listeners run on every scroll event.

## Evidence

Greps over `src/`: 12 `window.open(` calls (Hero 1, Contact 4, Achievements 1, Projects 4, Publications 2); 0 `aria-pressed`; 0 `useReducedMotion`/`MotionConfig`; scroll listeners in `src/lib/hooks.ts:73` and `Navigation.tsx:56`. Measured on the 2026-10-26 build, headless Chromium at 1440x900 and 375x812, before any UI change. One unnamed control at 375 px.

## Done so far

Recorded only.

**2026-11-23:** Done: every navigating button is now a real link; filter buttons carry `aria-pressed`; the navigation scroll listener is an IntersectionObserver; framer-motion no longer runs on any page, and the only motion is CSS gated by reduced motion; touch targets 44-48 px. The three 'unnamed controls' the capture reports are named links folded inside closed disclosures (false positive).

**2026-11-24:** keyboard-only walk of the homepage (86 stops), case-study index (46) and an article (31) in both themes: every stop shows a focus ring, no unnamed controls, no traps. Lighthouse accessibility 100 on all three. Contrast and reduced motion verified in the full-site check (U-16) and the motion review (U-17).

## Next action

Run a keyboard walk and a WCAG 2.1 AA contrast check in both themes; the avatar's scroll listener remains while it is off.

**Owner:** UI agent  
**Done when:** Keyboard-only walk of the homepage and a case study passes; zero unnamed controls; reduced-motion verified by emulation; audit result recorded.

---
*Single source of truth for U-07. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
