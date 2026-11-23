# Agent instructions (patelsahil2k03.github.io)

This is a **public** repository. Read the rule in `nextprompt.md` §3 before writing any file.

**`.cursor/skills/` is the one home of the project skills for EVERY harness; the folder name is historical, not Cursor-only.** Claude Code
reads the same skills through `.claude/skills/` and Antigravity through `.agents/skills/` (relative links to that one copy, tracked in
git). Never copy a skill into either.

## Which agent are you? (read the row, then only the files it names)

| You were asked to | You are | Start here |
|---|---|---|
| Change facts, wording, case studies, achievements, skills, stats; verify a claim | content agent | `docs/SESSION_START_PROMPTS.md` (portfolio block), then `.cursor/skills/portfolio-content/SKILL.md` |
| Change layout, sections, styling, motion, accessibility, performance; review the UI | UI agent | `docs/SESSION_START_PROMPTS.md` (portfolio block), then `.cursor/skills/portfolio-ui-review/SKILL.md` and `docs/design/UI_STANDARDS.md` |
| Edit the LaTeX or Word resume, or the profile README | resume agent | `docs/SESSION_START_PROMPTS.md` (portfolio block), then `.cursor/skills/portfolio-resume/SKILL.md` |
| Build, check links, prepare `dev` → `main`, deploy | release agent | `docs/SESSION_START_PROMPTS.md` (portfolio block), then `.cursor/skills/portfolio-release/SKILL.md` |
| Run an audit pass or work the finding list across several areas | orchestrator | `docs/SESSION_START_PROMPTS.md` (portfolio block), then `nextprompt.md` §10–§11 |
| Close out a session | any agent | `docs/SESSION_START_PROMPTS.md` (close-out check), after your own start block |

**Where is the work?** `docs/PENDING_TASKS.md` ("Start here", then the index). One finding, one document in `docs/findings/`.
**Is this claim true?** `docs/CLAIMS_LEDGER.md`. **What was decided about the design?** `docs/design/`.

## Standing gates (the card, `docs/AGENT_CARD.md`, repeats the expensive ones at every session start)

- Propose, then wait for a yes, before: commit, push, deletion, dependency or config change, starting a server, any write to an external account.
- A push to `main` deploys the live site: its own yes, every time.
- Private names and credentials never go into a tracked file (`docs/private/` is git-ignored and holds them).
- Commits are Conventional, stage files by name, carry no trailer and no mention of AI tools.

See `CLAUDE.md` for the rule summary and `ai_guidelines/` for the full universal rules.
