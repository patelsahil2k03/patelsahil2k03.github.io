#!/bin/bash
# Launcher only: the logic lives in tools/agent-guard/ (one home, tested).
exec python3 "$CLAUDE_PROJECT_DIR/tools/agent-guard/guard_read.py"
