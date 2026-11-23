#!/usr/bin/env python3
"""PreToolUse hook for Read: credential files are never opened by an agent (the owner's standing rule)."""
import json
import re
import sys

CREDENTIAL_FILE = r"(_accessKeys[^/]*\.csv|_credentials[^/]*\.csv|_creds[^/]*\.txt|\.pem$|/id_rsa|/id_ed25519|\.aws/credentials|/\.env(\.[a-z]+)?$)"


def decide(path):
    if re.search(CREDENTIAL_FILE, path):
        return "deny", f"{path} holds credentials: agents do not open it. Ask the owner to run the step or provide the value another way."
    return "allow", ""


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return 0
    path = str((data.get("tool_input") or {}).get("file_path") or "")
    verdict, reason = decide(path)
    if verdict == "deny":
        sys.stderr.write(f"Blocked by agent-guard: {reason}\n")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
