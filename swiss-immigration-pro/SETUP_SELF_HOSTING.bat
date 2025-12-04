@echo off
echo ========================================
echo Swiss Immigration Pro - Self-Hosting Setup
echo ========================================
echo.

REM Check if .env.local exists
if exist .env.local (
    echo [OK] .env.local already exists
    echo.
) else (
    echo Creating .env.local from template...
    copy .env.local.template .env.local >nul 2>&1
    if errorlevel 1 (
        echo [ERROR] Could not create .env.local
        echo Please manually copy .env.local.template to .env.local
        pause
        exit /b 1
    )
    echo [OK] Created .env.local
    echo [IMPORTANT] Please edit .env.local and set your PostgreSQL password!
    echo.
)

REM Check if PostgreSQL packages are installed
echo Checking npm packages...
if exist node_modules\pg (
    echo [OK] PostgreSQL client (pg) is installed
) else (
    echo Installing PostgreSQL client packages...
    call npm install pg @types/pg
    if errorlevel 1 (
        echo [ERROR] Failed to install packages
        pause
        exit /b 1
    )
    echo [OK] Packages installed
)
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>&1
if errorlevel 1 (
    echo ========================================
    echo [WARNING] PostgreSQL is not installed!
    echo ========================================
    echo.
    echo Please install PostgreSQL:
    echo   1. Download from: https://www.postgresql.org/download/windows/
    echo   2. Install with default settings
    echo   3. Remember your postgres user password!
    echo   4. Run this script again after installation
    echo.
    pause
    exit /b 1
)

echo [OK] PostgreSQL is installed
echo.

REM Check if PostgreSQL service is running
echo Checking PostgreSQL service...
Get-Service -Name "*postgres*" -ErrorAction SilentlyContinue | Where-Object { $_.Status -eq 'Running' } | Select-Object -First 1 | Out-Null
if errorlevel 1 (
    echo [WARNING] PostgreSQL service may not be running
    echo Try starting it with: net start postgresql-x64-16
    echo.
) else (
    echo [OK] PostgreSQL service is running
    echo.
)

echo ========================================
echo Setup Summary
echo ========================================
echo.
echo [OK] Database client files ready
echo [OK] npm packages installed
echo.
echo Next steps:
echo   1. Edit .env.local and set DB_PASSWORD
echo   2. Create database: psql -U postgres -c "CREATE DATABASE swiss_immigration;"
echo   3. Import schema: psql -U postgres -d swiss_immigration -f lib\database\schema.sql
echo   4. Build: npm run build
echo   5. Start: npm start
echo.
echo Or run: START_LOCAL_SERVER.bat
echo.
pause

