# PowerShell script to help find or reset PostgreSQL password

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PostgreSQL Password Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL service is running
$service = Get-Service -Name "*postgres*" -ErrorAction SilentlyContinue | Where-Object { $_.Status -eq 'Running' } | Select-Object -First 1

if (-not $service) {
    Write-Host "[ERROR] PostgreSQL service is not running!" -ForegroundColor Red
    Write-Host "Please start it first: net start postgresql-x64-18" -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] PostgreSQL service is running: $($service.Name)" -ForegroundColor Green
Write-Host ""

# Check pg_hba.conf location
$pgDataPath = "C:\Program Files\PostgreSQL\18\data"
$pgHbaPath = Join-Path $pgDataPath "pg_hba.conf"

if (-not (Test-Path $pgHbaPath)) {
    Write-Host "[WARNING] pg_hba.conf not found at: $pgHbaPath" -ForegroundColor Yellow
    Write-Host "Trying to find it..." -ForegroundColor Yellow
    
    $possiblePaths = @(
        "C:\Program Files\PostgreSQL\18\data\pg_hba.conf",
        "C:\Program Files (x86)\PostgreSQL\18\data\pg_hba.conf",
        "$env:ProgramFiles\PostgreSQL\18\data\pg_hba.conf"
    )
    
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            $pgHbaPath = $path
            $pgDataPath = Split-Path $path
            break
        }
    }
}

if (Test-Path $pgHbaPath) {
    Write-Host "[OK] Found pg_hba.conf at: $pgHbaPath" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Could not find pg_hba.conf" -ForegroundColor Red
    Write-Host "Please find it manually and note the path." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Choose an option:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. I know my PostgreSQL password - update .env.local" -ForegroundColor Yellow
Write-Host "2. Reset PostgreSQL password to match .env.local (requires admin)" -ForegroundColor Yellow
Write-Host "3. Use trust method to reset (requires admin, temporarily less secure)" -ForegroundColor Yellow
Write-Host "4. Exit" -ForegroundColor Yellow
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Enter your PostgreSQL password:" -ForegroundColor Cyan
        $actualPassword = Read-Host -AsSecureString
        $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($actualPassword)
        $plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
        
        # Update .env.local
        $envFile = ".env.local"
        if (Test-Path $envFile) {
            $content = Get-Content $envFile -Raw
            $content = $content -replace "DB_PASSWORD=.*", "DB_PASSWORD=$plainPassword"
            Set-Content $envFile $content
            Write-Host "[OK] Updated .env.local with your password" -ForegroundColor Green
            Write-Host "Test connection: node test-db-connection.js" -ForegroundColor Cyan
        } else {
            Write-Host "[ERROR] .env.local not found" -ForegroundColor Red
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "This will reset PostgreSQL password to: Terminateur08a21aaaqqqeee" -ForegroundColor Yellow
        Write-Host "You need to know your CURRENT password to do this." -ForegroundColor Yellow
        Write-Host ""
        $currentPassword = Read-Host "Enter your CURRENT PostgreSQL password" -AsSecureString
        $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($currentPassword)
        $plainCurrentPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
        
        $env:PGPASSWORD = $plainCurrentPassword
        $psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
        
        if (Test-Path $psqlPath) {
            Write-Host "Resetting password..." -ForegroundColor Cyan
            & $psqlPath -U postgres -c "ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';" 2>&1 | Out-Null
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[OK] Password reset successfully!" -ForegroundColor Green
                Write-Host "Test connection: node test-db-connection.js" -ForegroundColor Cyan
            } else {
                Write-Host "[ERROR] Failed to reset password. Current password may be incorrect." -ForegroundColor Red
            }
        } else {
            Write-Host "[ERROR] psql.exe not found at: $psqlPath" -ForegroundColor Red
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "This method will:" -ForegroundColor Yellow
        Write-Host "1. Stop PostgreSQL" -ForegroundColor Yellow
        Write-Host "2. Temporarily allow trust authentication" -ForegroundColor Yellow
        Write-Host "3. Reset password" -ForegroundColor Yellow
        Write-Host "4. Restore security" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "⚠️  Requires Administrator privileges!" -ForegroundColor Red
        $confirm = Read-Host "Continue? (y/n)"
        
        if ($confirm -ne "y") {
            Write-Host "Cancelled." -ForegroundColor Yellow
            exit 0
        }
        
        # Check if running as admin
        $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
        
        if (-not $isAdmin) {
            Write-Host "[ERROR] This script must be run as Administrator!" -ForegroundColor Red
            Write-Host "Right-click PowerShell → Run as Administrator" -ForegroundColor Yellow
            exit 1
        }
        
        Write-Host ""
        Write-Host "[Step 1/5] Stopping PostgreSQL..." -ForegroundColor Cyan
        Stop-Service -Name $service.Name -Force
        Start-Sleep -Seconds 2
        
        Write-Host "[Step 2/5] Modifying pg_hba.conf..." -ForegroundColor Cyan
        Copy-Item $pgHbaPath "$pgHbaPath.backup" -Force
        $content = Get-Content $pgHbaPath -Raw
        $content = $content -replace 'scram-sha-256', 'trust' -replace 'md5', 'trust'
        Set-Content $pgHbaPath $content -NoNewline
        
        Write-Host "[Step 3/5] Starting PostgreSQL..." -ForegroundColor Cyan
        Start-Service -Name $service.Name
        Start-Sleep -Seconds 3
        
        Write-Host "[Step 4/5] Resetting password..." -ForegroundColor Cyan
        $psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
        & $psqlPath -U postgres -c "ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';" 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[Step 5/5] Restoring security..." -ForegroundColor Cyan
            Stop-Service -Name $service.Name -Force
            Start-Sleep -Seconds 2
            $content = Get-Content $pgHbaPath -Raw
            $content = $content -replace 'trust', 'scram-sha-256'
            Set-Content $pgHbaPath $content -NoNewline
            Start-Service -Name $service.Name
            
            Write-Host ""
            Write-Host "[OK] Password reset successfully!" -ForegroundColor Green
            Write-Host "Test connection: node test-db-connection.js" -ForegroundColor Cyan
        } else {
            Write-Host "[ERROR] Failed to reset password" -ForegroundColor Red
            Write-Host "Restoring backup..." -ForegroundColor Yellow
            Copy-Item "$pgHbaPath.backup" $pgHbaPath -Force
            Start-Service -Name $service.Name
        }
    }
    
    "4" {
        Write-Host "Exiting..." -ForegroundColor Yellow
        exit 0
    }
    
    default {
        Write-Host "Invalid choice" -ForegroundColor Red
    }
}

Write-Host ""




