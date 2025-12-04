@echo off
echo ========================================
echo Reset PostgreSQL Password
echo ========================================
echo.
echo This script will help you reset the PostgreSQL password.
echo.
echo IMPORTANT: You need to know your CURRENT PostgreSQL password
echo to run this script, OR you need to temporarily modify pg_hba.conf
echo.
echo Option 1: If you know your current password
echo -------------------------------------------
echo 1. Enter your CURRENT PostgreSQL password when prompted
echo 2. The script will change it to: Terminateur08a21aaaqqqeee
echo.
echo Option 2: If you DON'T know the password
echo -------------------------------------------
echo 1. Stop PostgreSQL service: net stop postgresql-x64-18
echo 2. Edit pg_hba.conf (usually in C:\Program Files\PostgreSQL\18\data\)
echo 3. Change authentication method to 'trust' for local connections
echo 4. Start PostgreSQL: net start postgresql-x64-18
echo 5. Run this script (it will work without password)
echo 6. Change pg_hba.conf back to 'md5' or 'scram-sha-256'
echo 7. Restart PostgreSQL again
echo.
pause

set /p CURRENT_PASS="Enter your CURRENT PostgreSQL password (or press Enter if using trust method): "

echo.
echo Resetting password to: Terminateur08a21aaaqqqeee
echo.

if "%CURRENT_PASS%"=="" (
    set PGPASSWORD=
    "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';"
) else (
    set PGPASSWORD=%CURRENT_PASS%
    "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';"
)

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to reset password
    echo.
    echo Try the manual method:
    echo 1. Open pgAdmin
    echo 2. Connect to PostgreSQL (if you can)
    echo 3. Right-click server -^> Query Tool
    echo 4. Run: ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';
    echo.
) else (
    echo.
    echo [SUCCESS] Password reset successfully!
    echo.
    echo The password is now: Terminateur08a21aaaqqqeee
    echo This matches your .env.local file.
    echo.
    echo Test connection: node test-db-connection.js
    echo.
)

pause
