@echo off
echo ========================================
echo Swiss Immigration Pro - Local DB Setup
echo ========================================
echo.

echo This script will help you set up local PostgreSQL database.
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PostgreSQL is not installed or not in PATH!
    echo.
    echo Please install PostgreSQL first:
    echo   1. Download from: https://www.postgresql.org/download/windows/
    echo   2. Install with default settings
    echo   3. Remember your postgres user password!
    echo.
    pause
    exit /b 1
)

echo [OK] PostgreSQL is installed
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo Creating .env.local from template...
    (
        echo # Database Configuration (Local PostgreSQL)
        echo DB_HOST=localhost
        echo DB_PORT=5432
        echo DB_NAME=swiss_immigration
        echo DB_USER=postgres
        echo DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
        echo.
        echo # Next.js Configuration
        echo NEXTAUTH_URL=http://localhost:5000
        echo NEXTAUTH_SECRET=CHANGE_THIS_TO_A_RANDOM_SECRET
        echo NEXT_PUBLIC_SITE_URL=http://localhost:5000
        echo.
        echo # AI API Keys (add your keys here)
        echo # XAI_API_KEY=your-key-here
        echo # OPENAI_API_KEY=your-key-here
        echo # GROQ_API_KEY=your-key-here
        echo.
        echo # Stripe (if using payments)
        echo # STRIPE_SECRET_KEY=your-key-here
        echo # NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-key-here
    ) > .env.local
    echo [OK] Created .env.local
    echo.
    echo [IMPORTANT] Please edit .env.local and update:
    echo   - DB_PASSWORD (your PostgreSQL password)
    echo   - NEXTAUTH_SECRET (generate a random secret)
    echo   - Add your AI API keys
    echo.
    pause
)

echo Checking database connection...
echo.

REM Try to connect (this will prompt for password)
echo Please enter your PostgreSQL password when prompted:
psql -U postgres -c "SELECT version();" >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Could not connect to PostgreSQL
    echo Make sure PostgreSQL is running and password is correct
    echo.
) else (
    echo [OK] Connected to PostgreSQL
    echo.
    
    REM Check if database exists
    psql -U postgres -lqt | findstr /C:"swiss_immigration" >nul 2>&1
    if errorlevel 1 (
        echo Database 'swiss_immigration' does not exist.
        echo.
        set /p CREATE_DB="Create database now? (y/n): "
        if /i "%CREATE_DB%"=="y" (
            echo Creating database...
            psql -U postgres -c "CREATE DATABASE swiss_immigration;"
            if errorlevel 1 (
                echo [ERROR] Failed to create database
            ) else (
                echo [OK] Database created
                echo.
                echo Next steps:
                echo   1. Import schema: psql -U postgres -d swiss_immigration -f lib\database\schema.sql
                echo   2. Or use pgAdmin to import the schema file
            )
        )
    ) else (
        echo [OK] Database 'swiss_immigration' already exists
    )
)

echo.
echo ========================================
echo Setup complete!
echo ========================================
echo.
echo Next steps:
echo   1. Edit .env.local with your database password
echo   2. Import database schema (lib\database\schema.sql)
echo   3. Install npm packages: npm install pg @types/pg
echo   4. Build: npm run build
echo   5. Start: npm start
echo.
pause

