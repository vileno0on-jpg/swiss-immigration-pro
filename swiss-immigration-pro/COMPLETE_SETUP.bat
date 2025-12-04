@echo off
echo ========================================
echo Swiss Immigration Pro - Complete Self-Hosting Setup
echo ========================================
echo.

REM Step 1: Check .env.local
echo [Step 1/6] Checking environment configuration...
if not exist .env.local (
    echo [ERROR] .env.local not found!
    echo.
    echo Please run: powershell -ExecutionPolicy Bypass -File setup-env.ps1
    echo Or manually copy .env.local.template to .env.local
    pause
    exit /b 1
)
echo [OK] .env.local exists
echo.

REM Step 2: Check npm packages
echo [Step 2/6] Checking npm packages...
if not exist node_modules\pg (
    echo Installing PostgreSQL client packages...
    call npm install pg @types/pg
    if errorlevel 1 (
        echo [ERROR] Failed to install packages
        pause
        exit /b 1
    )
)
echo [OK] PostgreSQL client packages installed
echo.

REM Step 3: Check PostgreSQL
echo [Step 3/6] Checking PostgreSQL installation...
where psql >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PostgreSQL is not installed or not in PATH!
    echo.
    echo Please install PostgreSQL:
    echo   1. Download: https://www.postgresql.org/download/windows/
    echo   2. Install with default settings
    echo   3. Remember your postgres user password!
    echo   4. Run this script again
    echo.
    pause
    exit /b 1
)
echo [OK] PostgreSQL is installed
echo.

REM Step 4: Check database
echo [Step 4/6] Checking database...
echo Please enter your PostgreSQL password when prompted:
psql -U postgres -c "\l" | findstr /C:"swiss_immigration" >nul 2>&1
if errorlevel 1 (
    echo Database 'swiss_immigration' does not exist.
    echo.
    set /p CREATE_DB="Create database now? (y/n): "
    if /i "%CREATE_DB%"=="y" (
        echo Creating database...
        psql -U postgres -c "CREATE DATABASE swiss_immigration;"
        if errorlevel 1 (
            echo [ERROR] Failed to create database
            echo Make sure PostgreSQL is running and password is correct
            pause
            exit /b 1
        )
        echo [OK] Database created
    ) else (
        echo Skipping database creation
    )
) else (
    echo [OK] Database 'swiss_immigration' exists
)
echo.

REM Step 5: Check schema
echo [Step 5/6] Checking database schema...
if exist lib\database\schema.sql (
    echo Schema file found: lib\database\schema.sql
    echo.
    set /p IMPORT_SCHEMA="Import schema now? (y/n): "
    if /i "%IMPORT_SCHEMA%"=="y" (
        echo Importing schema...
        psql -U postgres -d swiss_immigration -f lib\database\schema.sql
        if errorlevel 1 (
            echo [WARNING] Schema import had errors (may already be imported)
        ) else (
            echo [OK] Schema imported
        )
    )
) else (
    echo [WARNING] Schema file not found: lib\database\schema.sql
)
echo.

REM Step 6: Build application
echo [Step 6/6] Building application...
echo This may take a few minutes...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed!
    echo Check the error messages above
    pause
    exit /b 1
)
echo [OK] Build successful!
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your site is ready to run!
echo.
echo To start the server:
echo   npm start
echo.
echo Or run: START_LOCAL_SERVER.bat
echo.
echo Your site will be available at:
echo   http://localhost:5000
echo.
pause

