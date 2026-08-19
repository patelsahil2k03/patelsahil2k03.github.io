## Phase 2 Debugging Notes – Issues & Testing

This file preserves the detailed debugging and testing notes that used to live
in `ISSUES_FOUND_AND_FIXES.md` and `FIXES_APPLIED_TEST_NOW.md`.

It captures:

- The initial list of issues (navigation clickability, hero CTAs, social links,
  empty space after the scroll indicator, layout width, achievements filters)
- Root-cause analysis for each problem (z-index, `pointer-events`, legacy text, etc.)
- The concrete code-level fixes applied in the components
- A full manual testing checklist used to verify the production deployment

These notes are historical – they are useful when investigating regressions or
understanding why certain patterns (z-index layering, `pointer-events-none` on
backgrounds, etc.) were chosen.

For a high-level view of what is currently live and how to deploy, see:

- `../DEPLOYMENT.md` – current deployment guide  
- `../README.md` – project overview and status  
- `../../TESTING_COMMANDS.md` – up-to-date manual test commands

