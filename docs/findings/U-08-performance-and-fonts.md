# U-08 — Performance: heavy first load, infinite animations, three font families

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Local Lighthouse done 2026-11-24 (before/after below); live re-measure after deploy | ui | UI agent | 2026-10-26 | 2026-11-24 |

## Finding

The build reports 415 kB First Load JS for the homepage (250 kB page chunk) against 178 kB quoted in the README. Nine infinite animation or pulse usages keep the compositor busy. Three font families load (Inter, Space Grotesk, JetBrains Mono) although the mono face appears only in hero stat numbers.

## Evidence

`npm run build` route table (2026-10-26); `grep` for `animate-pulse|repeat: Infinity` returns 9 usages; `src/app/layout.tsx` loads three families; `README.md` still quotes '17.5 kB main page, 178 kB First Load JS'. The static server used for measurements does not compress, so transferred-byte counts are not quoted.

## Done so far

Recorded only.

**2026-11-23:** Homepage First Load JS 415 kB to 360 kB; Inter and Space Grotesk dropped; no infinite animations. Now unused dependencies (framer-motion, react-intersection-observer, react-hot-toast) remain in package.json pending a dependency change.

**2026-11-24 Lighthouse (mobile unless noted; local static server sends files uncompressed, so local LCP is pessimistic):** live site before: performance 53, TBT 3,600 ms, LCP 4.1 s (desktop 91). New build: homepage performance 67–71, TBT 260–350 ms, accessibility 100, SEO 100 (desktop 99, TBT 0 ms); architecture article TBT 920 to 100 ms (performance 60 to 81); case-study index 79. Changes: Clarity injected after load and idle with its call queue created at once (no events lost); the Mermaid library loads only when the diagram nears view; the hero claim no longer fades from invisible (it was holding back LCP). Remaining: best-practices 79 is Clarity's third-party cookies (owner choice); local mobile LCP about 5–6 s is mostly uncompressed transfer and must be re-measured on the live, compressed site.

## Next action

Run Lighthouse (mobile) on the built site; remove the unused dependencies with the owner's yes (F-11).

**Owner:** UI agent  
**Done when:** Lighthouse mobile performance and accessibility results recorded before and after; First Load JS reduced and the README figure matches the build.

---
*Single source of truth for U-08. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
