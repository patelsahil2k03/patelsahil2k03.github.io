#!/usr/bin/env python3
"""SessionStart hook: puts the invariants card into context on startup, resume, clear and compact.

Prints to stdout (the harness adds it to the conversation). It cannot make the model read a file, so it carries the few rules whose
violation is expensive and tells the agent what to read first. The card text lives in ONE place, docs/AGENT_CARD.md, generated from
marked blocks of nextprompt.md; this script only reads it. If the card does not exist yet, it prints a short pointer instead.
"""
import json
import os
import sys

POINTER = (
    "This is a PUBLIC repo: nothing tracked may name a client, an internal project or a credential file (use industry descriptors; "
    "private notes go to docs/private/, git-ignored). Propose and wait for approval before commits, pushes, deletions, dependency or "
    "config changes and before starting a server. Commits carry no trailers and no mention of AI tools. Read nextprompt.md, then "
    "docs/PENDING_TASKS.md. The full card: docs/AGENT_CARD.md."
)

START = ("New session: before anything else read the block of docs/SESSION_START_PROMPTS.md that matches your job and do exactly its reads, "
         "in order. AGENTS.md says which job you have.")


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        data = {}
    source = data.get("source") or "startup"
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    card = os.path.join(project_dir, "docs", "AGENT_CARD.md")
    text = open(card, encoding="utf-8").read() if os.path.isfile(card) else POINTER
    head = {
        "startup": START,
        "clear": START,
        "compact": ("Your context was just compacted. A summary is a hint, not the truth: re-read nextprompt.md, the 'Start here' block of "
                    "docs/PENDING_TASKS.md and the live files your next step depends on before continuing."),
        "resume": "This session was resumed. Confirm the shared docs still hold your last edit before building on them.",
    }.get(source, "")
    scratch = data.get("scratchpad_dir")
    tail = f"Session scratchpad (the only place for temp files): {scratch}" if scratch else ""
    print("\n\n".join(p for p in (head, text.strip(), tail) if p))
    return 0


if __name__ == "__main__":
    sys.exit(main())
