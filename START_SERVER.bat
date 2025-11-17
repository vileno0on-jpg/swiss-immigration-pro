@echo off
cd /d "%~dp0"
echo Starting Swiss Immigration Pro on port 3009...
echo.
npm run dev -- -p 3009
pause

