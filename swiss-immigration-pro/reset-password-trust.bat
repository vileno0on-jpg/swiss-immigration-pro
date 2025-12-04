@echo off
echo ========================================
echo Reset PostgreSQL Password (Trust Method)
echo ========================================
echo.
echo This script will:
echo 1. Stop PostgreSQL
echo 2. Modify pg_hba.conf to allow trust authentication
echo 3. Start PostgreSQL
echo 4. Reset password
echo 5. Restore security settings
echo.
echo IMPORTANT: Run this as Administrator!
echo.
pause

echo.
echo [Step 1/5] Stopping PostgreSQL service...
net stop postgresql-x64-18 2>nul
if errorlevel 1 (
    echo [INFO] Service may already be stopped or not found. Continuing...
) else (
    echo [OK] Service stopped
)

echo.
echo [Step 2/5] Modifying pg_hba.conf...
set PG_DATA=C:\Program Files\PostgreSQL\18\data
set PG_HBA=%PG_DATA%\pg_hba.conf

if not exist "%PG_HBA%" (
    echo [ERROR] pg_hba.conf not found at: %PG_HBA%
    echo Please find it manually and edit it.
    pause
    exit /b 1
)

echo Creating backup...
copy "%PG_HBA%" "%PG_HBA%.backup" >nul

echo Modifying authentication method...
powershell -Command "$file = \"%PG_HBA%\"; $content = Get-Content $file -Raw; $content = $content -replace 'scram-sha-256', 'trust' -replace 'md5', 'trust'; Set-Content $file -Value $content -NoNewline"
if errorlevel 1 (
    echo [ERROR] Failed to modify pg_hba.conf
    pause
    exit /b 1
)
echo [OK] Modified pg_hba.conf

echo.
echo [Step 3/5] Starting PostgreSQL...
net start postgresql-x64-18
if errorlevel 1 (
    echo [ERROR] Could not start service
    pause
    exit /b 1
)
echo [OK] Service started
timeout /t 3 >nul

echo.
echo [Step 4/5] Resetting password...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';"
if errorlevel 1 (
    echo [ERROR] Failed to reset password
    echo Restoring pg_hba.conf...
    copy "%PG_HBA%.backup" "%PG_HBA%" >nul
    net start postgresql-x64-18
    pause
    exit /b 1
)
echo [OK] Password reset successfully!

echo.
echo [Step 5/5] Restoring security settings...
net stop postgresql-x64-18
if errorlevel 1 (
    echo [WARNING] Could not stop service for security restore
)
powershell -Command "$file = \"%PG_HBA%\"; $content = Get-Content $file -Raw; $content = $content -replace 'trust', 'scram-sha-256'; Set-Content $file -Value $content -NoNewline"
if errorlevel 1 (
    echo [ERROR] Failed to restore security settings
    pause
    exit /b 1
)
net start postgresql-x64-18
if errorlevel 1 (
    echo [ERROR] Could not start service after security restore
    pause
    exit /b 1
)
echo [OK] Security restored

echo.
echo ========================================
echo Password Reset Complete!
echo ========================================
echo.
echo The password is now: Terminateur08a21aaaqqqeee
echo This matches your .env.local file.
echo.
echo Test connection: node test-db-connection.js
echo.
pause