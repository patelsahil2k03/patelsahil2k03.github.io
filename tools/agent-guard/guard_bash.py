#!/usr/bin/env python3
"""PreToolUse hook for Bash: turns the written gates of nextprompt.md into real prompts and refusals.

Reads the hook JSON on stdin (tool_input.command). Prints nothing and exits 0 to allow; prints a JSON "ask" decision to make the
harness prompt the owner; prints a reason on stderr and exits 2 to refuse. Pure text matching: it is a second lock on top of the
written rules, not a replacement for them.
"""
import json
import re
import sys

# `git` followed by any global options (-C <dir>, -c key=value, --git-dir=..., --no-pager) before the subcommand, so
# `git -C . push --force` matches the same rules as `git push --force`.
GIT = r"\bgit(?:\s+(?:-[Cc]\s+\S+|--[\w-]+(?:=\S+)?|-[a-zA-Z]))*\s+"

# Refused outright (rule: never).
DENY = [
    (r"\brm\s+-[a-zA-Z]*[rR][a-zA-Z]*f|\brm\s+-[a-zA-Z]*f[a-zA-Z]*[rR]|\brm\s+--recursive\b.*--force"
     r"|\brm\s+(?:-\S+\s+)*-[a-zA-Z]*[rR][a-zA-Z]*\s+(?:-\S+\s+)*-[a-zA-Z]*f|\brm\s+(?:-\S+\s+)*-[a-zA-Z]*f[a-zA-Z]*\s+(?:-\S+\s+)*-[a-zA-Z]*[rR]",
     "rm -rf is forbidden. Use `gio trash`, or `git rm` for a tracked file."),
    (GIT + r"push\b[^\n;&|]*(--force\b|-f\b|--force-with-lease|\s\+\S)", "A force push is never allowed."),
]

# Text that must never reach a commit message or a PR body (UNIVERSAL_GIT_RULES: no trailers, no mention of AI tools).
FORBIDDEN_IN_COMMIT = r"co-authored-by\s*:|generated\s+with\s+\[?claude|noreply@anthropic\.com|\bclaude\s+code\b"

# Reading these files is refused (they hold credentials; the owner opens them, not an agent).
CREDENTIAL_FILE = r"(_accessKeys[^\s/]*\.csv|_credentials[^\s/]*\.csv|_creds[^\s/]*\.txt|\.pem\b|id_rsa|id_ed25519|\.aws/credentials)"
READ_VERBS = r"\b(cat|head|tail|less|more|bat|grep|egrep|rg|sed|awk|cut|sort|uniq|strings|xxd|od|base64|source|cp|mv|scp|rsync|curl|wget|python3?|node)\b"

# The owner is asked every time.
ASK = [
    (GIT + r"push\b", "git push needs its own yes every time (main deploys to GitHub Pages)."),
    (GIT + r"commit\b", "Commit only when the owner asked for it in this turn."),
    (r"\bgh\s+(pr\s+(create|merge)|release\s+create|repo\s+(delete|edit)|api\s+[^\n]*(-X|--method)\s+(POST|PUT|PATCH|DELETE))",
     "This changes something on GitHub: needs its own yes."),
    (GIT + r"(add\s+(-A|--all|\.)(\s|$)|stash\b|reset\s+--hard|clean\b|checkout\s+--|restore\b|rebase\b|branch\s+-D)",
     "Tree-wide or history-rewriting git operation: the tree may hold uncommitted work that is not yours."),
    (r"\b(npm|pnpm|yarn)\s+(install|i|add|update|up|upgrade|uninstall|remove|rm|dedupe|audit\s+fix)\b(?!\s+--help)",
     "Dependency change: needs approval (`npm ci` is allowed; it installs exactly what the lockfile says)."),
    (r"\bnpx\s+(npm-check-updates|ncu)\b", "Dependency upgrade tool: needs approval."),
    (r"\b(npm\s+run\s+(dev|start|preview)|next\s+(dev|start)|npx\s+(serve|http-server|next\s+(dev|start))|python3?\s+-m\s+http\.server|vite\b)",
     "Starting a server: check the port and any terminal already open first, get a yes, and stop only what you started."),
    (r">>?\s*\.env", "This writes to an .env file. Approve only a plain, non-secret line you can read in the command."),
    (r"\b(gio\s+trash|git\s+rm)\b", "A deletion: needs approval unless the owner already approved this exact removal."),
    (r"(^|[;&|]\s*)rm\s", "Use `gio trash` instead of rm (and ask first)."),
]


def _code_view(cmd):
    """The command with text that is only data removed: heredoc bodies and quoted strings. A commit message or a grep pattern that
    names `rm -rf` is not the command. A shell run through -c / eval keeps its quoted payload, because that does execute."""
    no_heredoc = re.sub(r"<<-?\s*(['\"]?)(\w+)\1[^\n]*\n.*?\n\s*\2\b", "<<HEREDOC", cmd, flags=re.S)
    no_quotes = re.sub(r'"(?:[^"\\]|\\.)*"', '""', re.sub(r"'[^']*'", "''", no_heredoc))
    if re.search(r"\b(?:ba|z|da)?sh\s+-\w*c\b|\beval\b", no_quotes):
        return no_heredoc
    return no_quotes


def decide(cmd):
    """Return ('allow'|'ask'|'deny', reason)."""
    code = _code_view(cmd)
    for pattern, reason in DENY:
        if re.search(pattern, code):
            return "deny", reason
    if re.search(GIT + r"commit\b|\bgh\s+pr\s+(create|edit)\b|\bgh\s+release\b", code) and re.search(FORBIDDEN_IN_COMMIT, cmd, re.I):
        return "deny", ("A commit message or PR body may carry no Co-Authored-By trailer and no mention of AI tools "
                        "(UNIVERSAL_GIT_RULES.md). A repo rule ranks above a harness default.")
    if re.search(READ_VERBS, code) and re.search(CREDENTIAL_FILE, cmd):
        return "deny", "Credential files are not opened by agents. Ask the owner to run the step, or use the environment."
    for pattern, reason in ASK:
        if re.search(pattern, code):
            return "ask", reason
    return "allow", ""


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return 0  # never block on a malformed hook input
    cmd = str((data.get("tool_input") or {}).get("command") or "")
    verdict, reason = decide(cmd)
    if verdict == "deny":
        sys.stderr.write(f"Blocked by agent-guard: {reason}\n")
        return 2
    if verdict == "ask":
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "ask",
                                                 "permissionDecisionReason": reason}}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
