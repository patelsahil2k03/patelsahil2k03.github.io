# Session start prompts

Paste one block into a new session. The close-out block is the one exception: it is pasted in addition, after the work block.

These prompts are the read order, not a second copy of the rules. `nextprompt.md` is the brief. A file longer than one read returns
(about 700 lines) is read with `offset` and `limit` until its last line; stopping at the first chunk counts as not having read it.

## Portfolio (every job: content, UI, resume, release, orchestrator)

```
Read these files in this order. The first tool calls are these reads. Do not search, edit, or run anything else until this read is finished.

1. nextprompt.md (repo root)
   Read it through §14. Do not summarise it. Then follow it for your job, the surface you will touch, and the gates.
2. AGENTS.md
   Find your job in the table; you will read its skill in step 6.
3. CLAUDE.md
4. docs/PENDING_TASKS.md
   Read the "Start here" block first (what needs the owner, what can start now), then the index. It is the only task list.
5. The finding documents your task names, in docs/findings/ (and docs/private/findings/ if it exists on this machine).
6. The skill for your job under .cursor/skills/ (portfolio-content, portfolio-ui-review, portfolio-resume or portfolio-release).
7. ai_guidelines/UNIVERSAL_AI_RULES.md, UNIVERSAL_GIT_RULES.md, UNIVERSAL_CLEANUP_REORGANIZATION_RULES.md

When the reads are finished, reply with one line: your job and the surfaces you expect to touch. Do not start work until the task is given.
```

## Close-out check (any agent, after a work session)

```
Close out the work you did in this session.

1. Re-read docs/PENDING_TASKS.md. Make sure every finding you touched has its own document updated in place: status, what was done, how it was
   verified, what is left, next action, owner, done-when. Add a finding doc for anything new you found, with its evidence. Do not create session notes.
2. For every public figure or claim you changed, check docs/CLAIMS_LEDGER.md has the row and the status is honest.
3. Run: npx tsc --noEmit; npm run lint; python3 tools/checks/check_claims.py; python3 tools/checks/check_public_safe.py. State which you ran and the result.
4. Check the other docs your work touches (design docs, CASE_STUDIES, DEPLOYMENT, nextprompt.md, the skill files). Change a doc only where it is now
   wrong, stale or missing something the next agent needs. Do not add entries that only record that you did work.
5. Report: ✅ COMPLETED · 📊 STATS · ⚠️ ISSUES · ➡️ NEXT, including what was not verified, and only the owner decisions that block the next step.
```
