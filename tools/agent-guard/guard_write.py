#!/usr/bin/env python3
"""PreToolUse hook for Write and Edit: keeps files where they belong, keeps secrets out, keeps this PUBLIC repo free of private names.

Reads the hook JSON on stdin (tool_input.file_path, content or new_string; cwd; scratchpad_dir when provided).
Exit 0 and no output = allow. A JSON "ask" prints a prompt for the owner. Exit 2 with a reason on stderr = refuse.

  * secrets: no connection string with a real password, no private key, no cloud or API token, in any file;
  * public repo: text naming a term from docs/private/PRIVATE_TERMS.txt (clients, internal projects, credential files) may only be
    written under git-ignored areas; in src/ and public/ it is refused, elsewhere the owner is asked;
  * scratch files: one-off scripts, probes and notes go to the session scratchpad, not into the repo;
  * junk names: Untitled*, tmp_*, *.tmp, *.bak, *.orig, *_old.* are never created in the repo;
  * the repo root is for entry docs and config: a NEW file there needs a decision;
  * the guard, the hooks and env files are not edited without the owner.
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402

JUNK_NAME = re.compile(r"(^|/)(Untitled[^/]*|tmp[_-][^/]*|[^/]*\.(tmp|bak|orig|swp)|[^/]*_old(\.[^/]*)?)$", re.I)
GUARD_FILES = (".claude/settings.json", ".claude/hooks/", "tools/agent-guard/", ".cursor/permissions.json")
PUBLIC_STRICT = ("src/", "public/")


def decide(path, content, project_dir, scratch_dir, exists, terms=None):
    """Return ('allow'|'ask'|'deny', reason)."""
    path = os.path.normpath(path)
    project_dir = os.path.normpath(project_dir)
    what = common.find_secret(content or "")
    if what:
        return "deny", f"The text you are writing contains {what}. Credentials come from the environment, never from a file."
    if scratch_dir and os.path.commonpath([path, os.path.normpath(scratch_dir)]) == os.path.normpath(scratch_dir):
        return "allow", ""
    if re.match(r"^/tmp/claude-\d+/.+/scratchpad(/|$)", path):
        return "allow", ""
    if "/.claude/projects/" in path and "/memory/" in path:
        return "allow", ""
    if not (path == project_dir or path.startswith(project_dir + os.sep)):
        hint = f" Use the session scratchpad: {scratch_dir}" if scratch_dir else " Use the session scratchpad."
        return "deny", f"{path} is outside the repo and the scratchpad.{hint}"
    rel = os.path.relpath(path, project_dir).replace(os.sep, "/")
    if JUNK_NAME.search(rel):
        return "deny", f"{rel}: scratch or junk file name. One-off scripts and notes belong in the session scratchpad."
    if not common.is_private_area(rel):
        hit = common.find_private_term(content or "", common.private_terms() if terms is None else terms)
        if hit:
            msg = (f"{rel} is tracked in a PUBLIC repo and the text names '{hit}' (a client, internal project or credential file). "
                   "Use an industry descriptor, or put this in docs/private/ (git-ignored).")
            return ("deny" if rel.startswith(PUBLIC_STRICT) else "ask"), msg
    if any(rel == g or rel.startswith(g) for g in GUARD_FILES) or os.path.basename(rel).startswith(".env"):
        return "ask", f"{rel} is a guard, hook or credentials file: changing it changes what every agent may do."
    if "/" not in rel and not exists:
        return "ask", f"New file at the repo root ({rel}). The root is for entry docs and config; say where this belongs or confirm it."
    return "allow", ""


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return 0
    tool_input = data.get("tool_input") or {}
    # Write/Edit carry file_path; NotebookEdit carries notebook_path.
    path = str(tool_input.get("file_path") or tool_input.get("notebook_path") or "")
    if not path:
        return 0
    content = tool_input.get("content") if tool_input.get("content") is not None else tool_input.get("new_string")
    if content is None and isinstance(tool_input.get("edits"), list):  # MultiEdit: check every replacement
        content = "\n".join(str(e.get("new_string") or "") for e in tool_input["edits"] if isinstance(e, dict))
    if content is None:
        content = tool_input.get("new_source")  # NotebookEdit
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    verdict, reason = decide(path, content or "", project_dir, data.get("scratchpad_dir"), os.path.exists(path))
    if verdict == "deny":
        sys.stderr.write(f"Blocked by agent-guard: {reason}\n")
        return 2
    if verdict == "ask":
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "ask",
                                                 "permissionDecisionReason": reason}}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
