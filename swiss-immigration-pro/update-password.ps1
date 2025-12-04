# Quick script to update PostgreSQL password in .env.local

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Update PostgreSQL Password in .env.local" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Enter the password that WORKS when you connect in pgAdmin:" -ForegroundColor Yellow
Write-Host "(This will update .env.local with the correct password)" -ForegroundColor Gray
Write-Host ""

$password = Read-Host "PostgreSQL Password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "Updating .env.local..." -ForegroundColor Cyan

$envFile = ".env.local"
if (Test-Path $envFile) {
    $content = Get-Content $envFile -Raw
    $content = $content -replace "DB_PASSWORD=.*", "DB_PASSWORD=$plainPassword"
    Set-Content $envFile $content -NoNewline
    Write-Host "✅ Updated .env.local" -ForegroundColor Green
    Write-Host ""
    Write-Host "Testing connection..." -ForegroundColor Cyan
    
    # Test connection
    node -e "require('dotenv').config({path:'.env.local'});const {Pool}=require('pg');const p=new Pool({host:'localhost',port:5432,database:'postgres',user:'postgres',password:process.env.DB_PASSWORD});p.query('SELECT 1').then(()=>{console.log('✅ Connection successful!');process.exit(0)}).catch(e=>{console.error('❌ Failed:',e.message);process.exit(1)});"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ SUCCESS! Password is correct and connection works!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Create database: swiss_immigration (in pgAdmin)" -ForegroundColor Yellow
        Write-Host "2. Import schema: lib\database\schema.sql" -ForegroundColor Yellow
        Write-Host "3. Test: node test-db-connection.js" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ .env.local not found!" -ForegroundColor Red
}

Write-Host ""




