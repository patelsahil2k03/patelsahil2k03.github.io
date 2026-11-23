# U-02 — 3D avatar companion: hide for now behind a flag

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Hidden and no longer bundled (2026-11-23) | ui | UI agent; Sahil (confirm hide) | 2026-10-26 | 2026-11-23 |

## Finding

The animated avatar and its speech bubble load a WebGL scene on the homepage. On a phone the bubble sits over body text; headless Chromium logs repeated GPU stall warnings on desktop; and two of its lines make claims that cannot be checked (F-23).

## Evidence

Measured on the 2026-10-26 build, headless Chromium at 1440x900 and 375x812, before any UI change. Phone fold screenshot: the bubble overlaps the second paragraph. Console on desktop: four 'GPU stall due to ReadPixels' warnings; clean on phone. Dynamic import keeps it out of the initial bundle (`src/app/page.tsx`).

## Done so far

Recorded only.

**2026-11-23:** `AVATAR_ENABLED = false` in `src/lib/avatarConfig.ts`; the homepage mount and the nav toggle are gated on it, so the 3D chunk is never requested. All avatar code, models and the spec (`docs/design/avatar-companion-spec.md`) are kept.

**2026-11-23:** the browser audit found the hidden avatar still shipped 668 kB of three.js and fetched 1.3 MB of models on every page, because Next.js bundles any `dynamic()` import a page contains. The homepage no longer imports it (restore steps in a comment in `src/app/page.tsx`), and the model preload moved into a mount effect. Homepage First Load JS 360 kB to 117 kB.

## Next action

Restore only when: the bubble never overlaps content at 375 px; every narration line has a ledger-backed claim (F-23); reduced motion is respected; the cost is measured on a mid-range phone; and it fits the chosen visual direction (U-15).

**Owner:** UI agent; Sahil (confirm hide)  
**Done when:** Flag off by default; no avatar request on the homepage; restore condition written; avatar code untouched.

---
*Single source of truth for U-02. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
