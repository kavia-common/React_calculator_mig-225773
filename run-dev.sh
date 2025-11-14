#!/usr/bin/env bash
# Simple helper to run the CRA dev server with expected HOST/PORT.
set -euo pipefail
export HOST="${HOST:-0.0.0.0}"
export PORT="${PORT:-3000}"
npm start
