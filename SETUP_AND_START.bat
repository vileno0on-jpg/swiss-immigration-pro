@echo off
echo ================================================
echo Swiss Immigration Pro - Setup and Start
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] Creating .env.local file...
if not exist .env.local (
    copy env.local.txt .env.local
    echo Created .env.local
) else (
    echo .env.local already exists
)
echo.

echo [2/3] Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    npm install
) else (
    echo Dependencies already installed
)
echo.

echo [3/3] Starting development server on port 3009...
echo.
echo ================================================
echo Server will start at: http://localhost:3009
echo ================================================
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev -- -p 3009

pause

