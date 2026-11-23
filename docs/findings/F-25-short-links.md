# F-25 — Outbound links to verify

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P3 | Done 2026-11-24 (released 2026-11-24): direct certificate URLs; link check in the release gate | content | Content agent | 2026-10-26 | 2026-11-24 |

## Finding

Two cloud-training certificate links are third-party short links whose targets were not verified. The publication links were replaced with DOI links.

## Evidence

`src/data/achievements.ts`.

## Done so far

Publication links fixed.

**2026-11-24:** both short links resolved to the owner's Google Cloud Skills public profiles (confirmed in a browser: name and badges shown) and replaced with those URLs. New `tools/checks/check_links.py`: all 10 outbound links pass (3 needed a browser; the AIP DOI is confirmed at Crossref because the publisher challenges headless browsers). Added to the release skill, `docs/DEPLOYMENT.md` and the tools table in `nextprompt.md`.

## Next action

Resolve the two short links and replace with the certificate URLs; add a link check to the release gate.

**Owner:** Content agent  
**Done when:** Every outbound link answers 200 and points where its label says.

---
*Single source of truth for F-25. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
