# F-31 — LinkedIn and Scholar had facts the site lacked or contradicted

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done on the site (released 2026-11-24); two details need the owner (A9) | content | Content agent; Sahil | 2026-11-23 | 2026-11-23 |

## Finding

The 2026-11-19 profile capture differed from the site: the Motorola Solutions role is a web development internship from May to December 2022 (the site said an internship trainee until November, typed as training); the 2023 L&T Technology Services role is "C# Developer Intern" (site: web development intern); the 2022 machine-learning internship is at L&T Power (site: "Larson & Toubro Energy-Power", with the company name misspelled); two 2026 hackathons were missing (Odoo Hackathon 2026 finalist, 857 of 20,000+ teams; Kanad S.H.I.E.L.D. 2026); the hackathon count was 3. Scholar shows 2 citations and an h-index of 1, which the site does not mention (not needed).

## Evidence

`docs/private/profile/02-linkedin/` and `03-google-scholar/` (2026-11-19). Only the opening lines of the two hackathon posts were captured.

## Done so far

`experience.ts` titles, dates and names corrected (Larsen spelled correctly); two hackathon entries added to `achievements.ts`; hackathon count 5; ledger rows added for each. This also resolves F-06 and F-21 (the 2022 overlap is real).

## Next action

Owner supplies A9 (Kanad result, exact months). Propagate the internship titles to `resume/main.tex` and the Word resume.

**Owner:** Content agent; Sahil  
**Done when:** Site, LaTeX and Word match the LinkedIn capture; A9 answered.

---
*Single source of truth for F-31. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
