# U-17 — Features and motion the redesign dropped: what to restore, what stays dropped

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done 2026-11-24 (uncommitted): motion shipped after three review rounds (verdict: ship); Paper details fold still open | UI, motion | UI agent | 2026-11-23 | 2026-11-24 |

## Finding

The Evidence redesign (U-15) kept every data string (the content check), but the check could not see copy hard-coded in the old
components, and its baseline was taken mid-redesign. A read-only audit compared every old component at commit `a9c7549` (the live
site) with the new tree: 72 features, each judged keep, restore adapted, or drop. The owner asked for good features to be preserved
and for purposeful motion.

## Evidence

Old code: `git show a9c7549:src/components/sections/<name>.tsx`, `src/lib/animations.ts`, `src/components/ui/*`. Notable facts: the
old hero stagger never played (`initial` equalled `animate`), scroll reveal ran only in About, `getMotionProps` (reduced motion) was
never called, and the toast library was mounted but never used.

## Done so far

**Restored before release (2026-11-23):** profile links (GitHub, LinkedIn, Google Scholar, Email) in the footer of every page, so a
shared case-study link has a route to them; the active-section marker in the nav (IntersectionObserver on a 40% line,
`aria-current="location"`, no motion), reusing the one `useActiveSection` hook; "All repositories on GitHub" closing Projects;
research interests and a Google Scholar link under the papers (interests now in `src/data/personal.ts`, so the content check covers
them). Dead config removed: unused Tailwind keyframes and the `contact-form-submit` event constant.

**Rightly dropped (no restore):** typing role rotator, gradient name, pulsing blobs, shimmer badge, bouncing arrow, count-up stat
cards, card lift and glow, nav slide-in and spring pill, filters on four short lists, skill self-ratings (C3), the mailto "form",
toast, phone (C2), stat blocks and duplicate highlight cards, the About list that carried unsupported claims, emoji and colored badges.

**2026-11-24:** motion verified with frame captures in normal and reduced motion and reviewed by a fresh reviewer in three rounds (fix, recapture, ship). Fixes from review: the header no longer fades through grey when the menu opens or closes (solid band color, instant switch); the arrow nudge is scoped to its own link; fold icons finish with their content (200 ms); the figure build starts at 15% in view; reduced motion uses no transitions at all. `DESIGN.md` has a Motion section. Captures are in the git-ignored `.impeccable/review/motion/`.

## Next action

Owner decisions, both optional: a "Paper details" fold per publication with ledger-checked facts only (method, dataset, venue;
F-05), and a static footnoted scale line in the hero (conflicts with the type-only decision, U-15). Neither blocks a release.

## Done when

The five motions ship, look right at 1440 and 375 px in both themes, are absent under reduced motion, and `DESIGN.md` matches.
