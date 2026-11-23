# U-06 — Statistics repeat across sections and one label is ambiguous

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Done (released 2026-11-24) | ui | UI agent; Sahil | 2026-10-26 | 2026-11-23 |

## Finding

Eight hero stat cards (experience, projects, publications, CGPA, users, 'AI Accuracy', technologies, customers) repeat in About (certifications, hackathons), Publications (publications, conferences, first author, latest), Achievements (six category counts) and Experience (positions, companies, years). The hero card 'AI Accuracy 93%+' is the forecasting figure but reads as a general claim; 'Users Served 2M+' and 'Customers 125K+' are different grains (platform users and customers of different products) shown side by side without saying so.

## Evidence

`HeroEnhanced.tsx` lines 300-314, `About.tsx` 133-154, `Publications.tsx` 119-144, `Achievements.tsx` 158-171, `Experience.tsx` 105-125; `docs/CLAIMS_LEDGER.md` grain column.

## Done so far

Ledger rows exist for every figure; display not changed.

**2026-11-23:** Stat cards removed everywhere; each number appears once with its label and a footnote. The ambiguous 'AI Accuracy 93%+' card is retired (`tools/checks/content_retired.json`).

## Next action

Show each number once, with its unit and context ('2M+ users on the FinTech platform I build data pipelines for'), and drop counters and card chrome. Rename or drop 'AI Accuracy'.

**Owner:** UI agent; Sahil  
**Done when:** No statistic appears in more than one place; every displayed number carries its unit and context.

---
*Single source of truth for U-06. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
