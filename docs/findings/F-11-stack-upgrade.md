# F-11 — Framework versions lag by one to two majors

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Research done; not started - needs approval | stack | Sahil (approval); UI agent | 2026-10-26 | 2026-10-26 |

## Finding

Next.js 14.2 (latest 16.4), React 18.2 (19.3), Tailwind 3.4 (4.3), react-three-fiber 8 (9), framer-motion 10 (14), lucide-react 0.303 (1.x). CI and deploy ran Node 20, whose security support ended 30 April 2026.

## Evidence

`npm outdated`; `.github/workflows/*.yml`; Node release schedule.

## Done so far

Workflows moved to Node 22 and `npm ci` (uncommitted).

## Next action

Plan the upgrade on its own branch (Next first, then React, Tailwind, R3F); each step gated by build, a11y and visual checks.

**Owner:** Sahil (approval); UI agent  
**Done when:** The site builds and passes the gates on the target versions with no regression in the screenshots.

---
*Single source of truth for F-11. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
