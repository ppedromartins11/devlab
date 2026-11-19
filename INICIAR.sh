#!/usr/bin/env sh
# Inicie o DevLab com seu navegador padrao (Linux)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
xdg-open "$SCRIPT_DIR/offline/index.html"
