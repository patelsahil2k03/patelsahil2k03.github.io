# U-05 — Skills section: self-rating bars, emoji icons, hover-only detail

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Done (released 2026-11-24) | ui | UI agent; Sahil (ratings decision) | 2026-10-26 | 2026-11-23 |

## Finding

Skills are shown as 57 badges in six cards with a percentage legend (Expert 90%+ and so on). The percentages are the owner's self-ratings, appear only in a hover tooltip (invisible to keyboard and touch users), and the card sizes alternate by index rather than by content. Category icons are emoji.

## Evidence

Source: `Skills.tsx` (156 lines): tooltip `opacity-0 group-hover/skill:opacity-100`, `getCategoryIcon` returns emoji, legend colours do not match the badge variants. 'Tech Stack' subtitle claims 50+ technologies (ledger row exists).

## Done so far

Skill data updated (F-24); component not touched.

**2026-11-23:** Skills shown as grouped plain lists; self-ratings and the legend dropped (owner input C3 default); no emoji, no hover-only detail. The ratings stay in `skills.ts` until the owner decides.

## Next action

Owner decides whether numeric ratings stay. Recommended: remove ratings and the legend; group by what the owner uses in production (lead with Python, TypeScript, FastAPI, gRPC, Gemini/OpenAI, LangChain, Pinecone, AWS, MongoDB, PostgreSQL) and show the rest as a plain list; no emoji; no hover-only information.

**Owner:** UI agent; Sahil (ratings decision)  
**Done when:** No information is hover-only; no self-rating shown without the owner's explicit decision; no emoji.

---
*Single source of truth for U-05. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
