# PowerShell script to create .env.local from template
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Creating .env.local file" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (Test-Path ".env.local") {
    Write-Host "[WARNING] .env.local already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Overwrite? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit
    }
}

if (Test-Path ".env.local.template") {
    Copy-Item ".env.local.template" ".env.local" -Force
    Write-Host "[OK] Created .env.local from template" -ForegroundColor Green
    Write-Host ""
    Write-Host "[IMPORTANT] Please edit .env.local and set:" -ForegroundColor Yellow
    Write-Host "  - DB_PASSWORD (your PostgreSQL password)" -ForegroundColor Yellow
    Write-Host "  - AI API keys (if you have them)" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "[ERROR] .env.local.template not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Opening .env.local in notepad..." -ForegroundColor Cyan
Start-Process notepad ".env.local"

