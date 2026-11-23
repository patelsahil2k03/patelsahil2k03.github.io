# F-29 — Facts hard-coded in components contradict the data and the ledger

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P0 | Done (released 2026-11-24) | content | Content agent; Sahil (24-hour promise, football wording) | 2026-10-26 | 2026-11-23 |

## Finding

Several statements live in component files, not in `src/data/`, so the earlier data fixes never reached them: the About highlights say the Team Star Award was in 2024 (it was March 2025) and call the owner a 'hackathon winner' (Top 10 finalist among 70+ teams); the Publications stats card shows 'Latest 2024' (the AIP paper is 2025); the Contact card promises 'Typically responds within 24 hours' (no source); the About text says '100+ LeetCode problems solved' while the data records a 100-day streak badge; the Experience section labels three employers 'Top Companies'; the About highlight 'National Athlete' repeats the unverifiable football claim (F-23).

## Evidence

`src/components/sections/About.tsx` (lines 32, 37, 115), `Publications.tsx` (line 141), `Contact.tsx` (line 82), `Experience.tsx` (line 116); compared with `src/data/achievements.ts` and `docs/CLAIMS_LEDGER.md`. Hard-coded copy also bypasses `check_claims.py`, which only scans `src/data/`.

## Done so far

Recorded only.

**2026-11-23:** Corrected in place: Team Star dated March 2025; "hackathon winner" replaced by Top 10 at AI-Manthan and Odoo 2026 finalist; LeetCode claim worded as the 100-day badge; "National Athlete" now "University Footballer"; Publications "Latest" 2025; the 24-hour reply promise removed; "Top Companies" now "Employers", and both experience counts are derived from the data.

**2026-11-23 (redesign):** the components named under Evidence were removed with the redesign (U-15). The new components in `src/components/home/` hold no facts: every figure, date and claim comes from `src/data/`, which `check_claims.py` scans.

## Next action

Extend `check_claims.py` to scan `src/components/` for figures and years, or move the remaining hard-coded copy into `src/data/` during the redesign (U-15).

**Owner:** Content agent; Sahil (24-hour promise, football wording)  
**Done when:** No factual statement in a component disagrees with the data or the ledger; the claims check scans components too.

---
*Single source of truth for F-29. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
