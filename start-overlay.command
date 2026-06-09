#!/bin/bash
# Mac launcher — double-click this file in Finder to start the overlay suite.

# Change to the folder this script lives in (so node server.js finds the files)
cd "$(dirname "$0")"

echo ""
echo " ============================================================"
echo "  OVERLAY SUITE — Startup"
echo " ============================================================"
echo ""

# ── Check Node.js ─────────────────────────────────────────────────────────────
if ! command -v node &> /dev/null; then
    echo " ERROR: Node.js is not installed."
    echo ""
    echo " To fix this:"
    echo "   1. Open your browser and go to:  https://nodejs.org/en/download"
    echo "   2. Download the LTS version (recommended) and run the installer."
    echo "   3. After installation, double-click start-overlay.command again."
    echo ""
    read -p " Press Enter to close..."
    exit 1
fi

# ── Install dependencies if node_modules is missing ───────────────────────────
if [ ! -d "node_modules" ]; then
    echo " Installing dependencies for the first time — this only happens once..."
    echo ""
    npm install
    echo ""
fi

# ── Open browser after 2-second delay (background) ────────────────────────────
(sleep 2 && open "http://localhost:3001") &

# ── Start the server (keeps this terminal open) ───────────────────────────────
echo " ============================================================"
echo "  Server is RUNNING at http://localhost:3001"
echo ""
echo "  Your browser should open automatically."
echo "  If it does not, manually open:  http://localhost:3001"
echo ""
echo "  Keep this window open while streaming."
echo "  Press Ctrl+C to stop the server."
echo " ============================================================"
echo ""

node server.js

echo ""
echo " Server stopped."
read -p " Press Enter to close..."
