# Fix 502 Bad Gateway - Check and Restart VPS Services
# This script helps diagnose and fix the 502 error

param(
    [Parameter(Mandatory=$true)]
    [string]$VpsIp,
    
    [Parameter(Mandatory=$false)]
    [string]$SshUser = "deploy"
)

Write-Host "🔧 Fixing 502 Bad Gateway Error" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Find SSH executable
function Find-SshExecutable {
    $sshPaths = @(
        "$env:ProgramFiles\OpenSSH\ssh.exe",
        "$env:ProgramFiles\Git\usr\bin\ssh.exe",
        "$env:SystemRoot\System32\OpenSSH\ssh.exe"
    )
    
    foreach ($path in $sshPaths) {
        if (Test-Path $path) {
            return $path
        }
    }
    
    $sshInPath = Get-Command ssh -ErrorAction SilentlyContinue
    if ($sshInPath) {
        return $sshInPath.Source
    }
    
    return $null
}

$sshExe = Find-SshExecutable
if (-not $sshExe) {
    Write-Host "❌ SSH not found. Please install OpenSSH or Git for Windows." -ForegroundColor Red
    exit 1
}

Write-Host "📡 Connecting to VPS: $VpsIp" -ForegroundColor Yellow
Write-Host ""

# Commands to run on VPS
$fixCommands = @"
echo '🔍 Step 1: Checking PM2 status...'
pm2 list

echo ''
echo '🔍 Step 2: Checking if app is running on port 5000...'
netstat -tuln | grep :5000 || echo '❌ Nothing listening on port 5000'

echo ''
echo '🔍 Step 3: Checking PM2 logs...'
pm2 logs swiss-immigration-pro --lines 20 --nostream || echo '❌ App not found in PM2'

echo ''
echo '🔧 Step 4: Restarting application...'
cd ~/swiss-immigration-pro || cd /root/swiss-immigration-pro || cd /home/deploy/swiss-immigration-pro
pwd

echo ''
echo '📦 Installing dependencies if needed...'
npm install --production

echo ''
echo '🏗️ Building application...'
npm run build

echo ''
echo '🔄 Restarting with PM2...'
pm2 delete swiss-immigration-pro 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo ''
echo '⏳ Waiting 5 seconds for app to start...'
sleep 5

echo ''
echo '🔍 Step 5: Verifying app is running...'
pm2 list
netstat -tuln | grep :5000 && echo '✅ App is listening on port 5000!' || echo '❌ App still not on port 5000'

echo ''
echo '🔍 Step 6: Checking nginx configuration...'
sudo nginx -t

echo ''
echo '🔄 Restarting nginx...'
sudo systemctl restart nginx
sudo systemctl status nginx --no-pager | head -10

echo ''
echo '✅ Done! Check if 502 error is fixed.'
"@

# Execute commands
Write-Host "Executing fix commands on VPS..." -ForegroundColor Yellow
Write-Host ""

$sshArgs = @("-o", "StrictHostKeyChecking=no", "$SshUser@$VpsIp", $fixCommands)
& $sshExe $sshArgs

Write-Host ""
Write-Host "✅ Fix commands executed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Check your website: http://$VpsIp" -ForegroundColor White
Write-Host "2. If still 502, check PM2 logs: ssh $SshUser@$VpsIp 'pm2 logs swiss-immigration-pro'" -ForegroundColor White
Write-Host "3. Check nginx logs: ssh $SshUser@$VpsIp 'sudo tail -f /var/log/nginx/error.log'" -ForegroundColor White

