# Quick deployment script to update modules on server 83.228.215.185
# This script connects to server, pulls latest code, rebuilds, and restarts

param(
    [string]$SshUser = "ubuntu",
    [string]$VpsIp = "83.228.215.185",
    [string]$SshKey = "$env:USERPROFILE\.ssh\infomaniak_key1"
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

# Check for SSH keys
$useSshKey = $false
$selectedKey = $null

# Check common key locations
$keyPaths = @(
    "$env:USERPROFILE\.ssh\infomaniak_key1",
    "$env:USERPROFILE\.ssh\infomaniak_key2",
    "$PSScriptRoot\sppppp.txt",
    "$PSScriptRoot\sippp.txt"
)

foreach ($keyPath in $keyPaths) {
    if (Test-Path $keyPath) {
        $useSshKey = $true
        $selectedKey = $keyPath
        Write-Host "✅ Found SSH key: $selectedKey" -ForegroundColor Green
        break
    }
}

if (-not $useSshKey) {
    Write-Host "⚠️  No SSH key found. Will try password authentication." -ForegroundColor Yellow
    Write-Host "   Key locations checked:" -ForegroundColor Gray
    foreach ($keyPath in $keyPaths) {
        Write-Host "     - $keyPath" -ForegroundColor Gray
    }
}

Write-Host ""

# Deployment commands - handling local changes and pulling latest code
$deployCommands = "cd ~/swiss-immigration-pro 2>/dev/null || cd ~/swiss-immigration-pro/swiss-immigration-pro 2>/dev/null || cd /root/swiss-immigration-pro 2>/dev/null || (cd ~ && git clone https://github.com/vileno0on-jpg/swiss-immigration-pro.git && cd swiss-immigration-pro) && pwd && echo '📥 Stashing local changes and pulling latest code...' && git stash 2>/dev/null || true && git fetch origin && git reset --hard origin/main 2>/dev/null || git reset --hard origin/master 2>/dev/null || git pull origin main || git pull origin master && echo '📦 Installing dependencies...' && npm install && echo '🔨 Building application...' && npm run build && echo '🔄 Restarting application...' && pm2 delete swiss-immigration-pro 2>/dev/null || true && ([ -f ecosystem.config.js ] && pm2 start ecosystem.config.js || pm2 start npm --name swiss-immigration-pro -- start) && pm2 save && echo '✅ Deployment complete!' && echo '🌐 Site live at: http://$VpsIp' && pm2 status"

Write-Host "Connecting to server and deploying..." -ForegroundColor Yellow
Write-Host ""

# Execute deployment
try {
    if ($useSshKey -and $selectedKey) {
        Write-Host "Using SSH key authentication..." -ForegroundColor Cyan
        $sshArgs = @("-i", $selectedKey, "-o", "StrictHostKeyChecking=no", "$SshUser@$VpsIp", $deployCommands)
    } else {
        Write-Host "Using password authentication (you may be prompted for password)..." -ForegroundColor Cyan
        $sshArgs = @("-o", "StrictHostKeyChecking=no", "$SshUser@$VpsIp", $deployCommands)
    }
    
    & $sshPath $sshArgs
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Deployment complete!" -ForegroundColor Green
        Write-Host "🌐 Visit your site at: http://$VpsIp" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "⚠️  Deployment command completed with exit code: $LASTEXITCODE" -ForegroundColor Yellow
        Write-Host "Please check the output above for any errors." -ForegroundColor Yellow
    }
} catch {
    Write-Host ""
    Write-Host "❌ Deployment failed. Please check:" -ForegroundColor Red
    Write-Host "  1. SSH connection: ssh $SshUser@$VpsIp" -ForegroundColor Yellow
    Write-Host "  2. SSH key is configured correctly" -ForegroundColor Yellow
    Write-Host "  3. Repository exists on server" -ForegroundColor Yellow
    Write-Host "  4. Run commands manually on server if needed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Manual deployment commands:" -ForegroundColor Cyan
    Write-Host "  ssh $SshUser@$VpsIp" -ForegroundColor White
    Write-Host "  cd ~/swiss-immigration-pro/swiss-immigration-pro" -ForegroundColor White
    Write-Host "  git pull origin main" -ForegroundColor White
    Write-Host "  npm install && npm run build" -ForegroundColor White
    Write-Host "  pm2 restart swiss-immigration-pro" -ForegroundColor White
}

