# PowerShell Deployment Script for Swiss Immigration Pro

Write-Host "🚀 Starting deployment to production server..." -ForegroundColor Cyan

# Check if OpenSSH is available
$sshPath = Get-Command ssh -ErrorAction SilentlyContinue

if (-not $sshPath) {
    Write-Host "❌ SSH client not found. Please install OpenSSH or use PuTTY/plink." -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Install OpenSSH Client" -ForegroundColor Yellow
    Write-Host "  Run in PowerShell as Administrator:" -ForegroundColor Yellow
    Write-Host "  Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Use the deploy.sh script with Git Bash or WSL" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "📡 Connecting to server and deploying..." -ForegroundColor Cyan

$deployCommand = @"
cd swiss-immigration-pro && 
echo '📥 Pulling latest changes from GitHub...' && 
git pull origin main && 
echo '📦 Installing dependencies...' && 
npm install && 
echo '🔨 Building application...' && 
npm run build && 
echo '🔄 Restarting application with PM2...' && 
pm2 restart swiss-immigration-pro && 
echo '✅ Deployment completed successfully!' && 
pm2 status
"@

ssh ubuntu@83.228.215.185 $deployCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Deployment finished successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}


