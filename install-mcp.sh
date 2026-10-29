#!/usr/bin/env bash
echo "Running WebDNA MCP Auto-Installer..."
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
node "$DIR/mcp-server/setup-mcp.mjs"
