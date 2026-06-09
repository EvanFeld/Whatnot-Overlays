@echo off
title Overlay Suite — Starting...

echo.
echo  ============================================================
echo   OVERLAY SUITE — Startup
echo  ============================================================
echo.

:: ── Check Node.js ────────────────────────────────────────────────────────────
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  ERROR: Node.js is not installed.
    echo.
    echo  To fix this:
    echo    1. Open your browser and go to:  https://nodejs.org/en/download
    echo    2. Download the LTS version ^(recommended^) and run the installer.
    echo    3. After installation, double-click start-overlay.bat again.
    echo.
    pause
    exit /b 1
)

:: ── Install dependencies if node_modules is missing ──────────────────────────
if not exist "node_modules" (
    echo  Installing dependencies for the first time — this only happens once...
    echo.
    npm install
    echo.
)

:: ── Open browser after a 2-second delay (in background) ─────────────────────
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3001"

:: ── Start the server (keeps this window open) ────────────────────────────────
title Overlay Suite — Running on http://localhost:3001
echo  ============================================================
echo   Server is RUNNING at http://localhost:3001
echo.
echo   Your browser should open automatically.
echo   If it does not, manually open:  http://localhost:3001
echo.
echo   Keep this window open while streaming.
echo   Press Ctrl+C to stop the server.
echo  ============================================================
echo.

node server.js

echo.
echo  Server stopped. Press any key to close.
pause >nul
