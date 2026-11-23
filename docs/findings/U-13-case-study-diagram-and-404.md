# U-13 — Case-study diagram text is small on phones; 404 canonical

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P3 | Done 2026-11-23 (styled site 404; diagram themed, natural size, keyboard-scrollable) | ui | UI agent | 2026-10-26 | 2026-11-23 |

## Finding

The architecture diagram on the marketplace case study renders its labels too small to read at phone width, and the 404 page's canonical URL resolves to the internal `/_not-found/` path.

## Evidence

Earlier visual check of the static build (diagram) and page metadata (404).

## Done so far

Recorded only.

**2026-11-23:** Diagram readable on phones (horizontal scroll at a 640 px minimum).

## Next action

Fix the 404 page canonical.

**Owner:** UI agent  
**Done when:** Diagram labels are at least 12 px effective at 375 px; the 404 page emits no misleading canonical.

---
*Single source of truth for U-13. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
