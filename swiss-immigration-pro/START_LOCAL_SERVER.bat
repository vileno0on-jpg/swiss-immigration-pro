@echo off
echo ========================================
echo Swiss Immigration Pro - Local Server
echo ========================================
echo.

REM Check if PostgreSQL is running
echo Checking PostgreSQL service...
sc query postgresql-x64-16 2>nul | find "RUNNING" >nul
if errorlevel 1 (
    echo [ERROR] PostgreSQL is not running!
    echo.
    echo Please start PostgreSQL service:
    echo   1. Open Services (services.msc)
    echo   2. Find "postgresql-x64-16" or "PostgreSQL"
    echo   3. Right-click -^> Start
    echo.
    echo Or run: net start postgresql-x64-16
    echo.
    pause
    exit /b 1
)

echo [OK] PostgreSQL is running
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo [WARNING] .env.local not found!
    echo Please create .env.local with your database credentials.
    echo See SELF_HOSTING_GUIDE.md for details.
    echo.
    pause
)

REM Build if needed
if not exist .next (
    echo Building application...
    call npm run build
    if errorlevel 1 (
        echo [ERROR] Build failed!
        pause
        exit /b 1
    )
    echo.
)

echo Starting production server...
echo.
echo ========================================
echo Site will be available at:
echo   http://localhost:5000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

