# H-01 — Working brief, agent card, hooks and project skills

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Done (released 2026-11-24) | process | Sahil | 2026-10-26 | 2026-10-26 |

## Finding

Adopt the proven structure of the marketplace project's agent setup, sized for a portfolio: one working brief, a generated card injected at every session start, tested guards, one home for skills, one document per finding.

## Evidence

Guard tests pass (`python3 -m unittest discover -s tools/agent-guard/tests`).

## Done so far

`nextprompt.md`, `AGENTS.md`, `docs/AGENT_CARD.md`, `docs/SESSION_START_PROMPTS.md`, `.claude/settings.json` and hooks, `.cursor/skills/portfolio-*` with relative links for `.claude` and `.agents`, `tools/agent-guard/`, `tools/checks/`, `docs/CLAIMS_LEDGER.md`.

## Next action

Owner reviews the brief; commit with a yes. New session to confirm the card loads.

**Owner:** Sahil  
**Done when:** A fresh session prints the card and the first reads match `docs/SESSION_START_PROMPTS.md`.

---
*Single source of truth for H-01. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
