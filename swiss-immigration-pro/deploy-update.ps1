# Quick deployment script to update modules on server 83.228.215.185
# This script connects to server, pulls latest code, rebuilds, and restarts

param(
    [string]$SshUser = "root",
    [string]$VpsIp = "83.228.215.185"
)

Write-Host "🚀 Deploying updated modules to $VpsIp" -ForegroundColor Cyan
Write-Host ""

# Find SSH executable
$sshPath = "C:\Windows\System32\OpenSSH\ssh.exe"
if (-not (Test-Path $sshPath)) {
    $sshPath = "C:\Program Files\Git\usr\bin\ssh.exe"
}
if (-not (Test-Path $sshPath)) {
    $sshPath = Get-Command ssh -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
}

if (-not $sshPath) {
    Write-Host "❌ SSH not found. Please install OpenSSH for Windows." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Using SSH: $sshPath" -ForegroundColor Green
Write-Host ""

# Deployment commands
$deployCommands = @"
cd ~/swiss-immigration-pro/swiss-immigration-pro || cd /root/swiss-immigration-pro || cd /home/deploy/swiss-immigration-pro
echo '📥 Pulling latest changes from GitHub...'
git pull origin main
echo '📦 Installing dependencies...'
npm install
echo '🔨 Building application...'
npm run build
echo '🔄 Restarting application with PM2...'
pm2 delete swiss-immigration-pro 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
echo '✅ Deployment complete!'
echo '🌐 Your site is live at: http://$VpsIp'
pm2 status
"@

Write-Host "Connecting to server and deploying..." -ForegroundColor Yellow
Write-Host ""

# Execute deployment
try {
    $sshArgs = @("-o", "StrictHostKeyChecking=no", "$SshUser@$VpsIp", $deployCommands)
    & $sshPath $sshArgs
    
    Write-Host ""
    Write-Host "✅ Deployment complete!" -ForegroundColor Green
    Write-Host "🌐 Visit your site at: http://$VpsIp" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Deployment failed. Please check:" -ForegroundColor Red
    Write-Host "  1. SSH connection: ssh $SshUser@$VpsIp" -ForegroundColor Yellow
    Write-Host "  2. Repository exists on server" -ForegroundColor Yellow
    Write-Host "  3. Run commands manually on server" -ForegroundColor Yellow
}

