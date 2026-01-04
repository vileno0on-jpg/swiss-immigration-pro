# PowerShell script to update VPS remotely via SSH
# Requires SSH access to your VPS

param(
    [string]$HostName = "83.228.215.185",
    [string]$User = "ubuntu"
)

Write-Host "🚀 Updating VPS..." -ForegroundColor Cyan
Write-Host ""

$commands = "cd ~/swiss-immigration-pro/swiss-immigration-pro && git pull origin main && npm run build && pm2 restart swiss-immigration-pro --update-env && pm2 status"

# Check if ssh command is available
$sshPath = Get-Command ssh -ErrorAction SilentlyContinue

if (-not $sshPath) {
    Write-Host "❌ SSH command not found in PowerShell" -ForegroundColor Red
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Use WSL (Windows Subsystem for Linux)" -ForegroundColor Cyan
    Write-Host "  wsl ssh $User@$HostName `"$commands`"" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Use Git Bash or another terminal with SSH" -ForegroundColor Cyan
    Write-Host "  ssh $User@$HostName `"$commands`"" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Copy and run this command in your SSH client:" -ForegroundColor Cyan
    Write-Host "  $commands" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 4: SSH into VPS manually and run:" -ForegroundColor Cyan
    Write-Host "  ssh $User@$HostName" -ForegroundColor White
    Write-Host "  Then run: $commands" -ForegroundColor White
    exit 1
}

try {
    Write-Host "📡 Connecting to $User@$HostName..." -ForegroundColor Yellow
    & ssh "$User@$HostName" $commands
    
    Write-Host ""
    Write-Host "✅ VPS update complete!" -ForegroundColor Green
    Write-Host "🌐 Site: http://$HostName" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please ensure:" -ForegroundColor Yellow
    Write-Host "1. SSH is configured for $User@$HostName" -ForegroundColor Yellow
    Write-Host "2. You have SSH keys set up or know the password" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Manual command:" -ForegroundColor Cyan
    Write-Host "ssh $User@$HostName `"$commands`"" -ForegroundColor White
}
