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
    Write-Host "Please run this command manually:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "ssh $User@$HostName" -ForegroundColor Cyan
    Write-Host "Then run:" -ForegroundColor Cyan
    Write-Host $commands -ForegroundColor White
    exit 1
}

try {
    Write-Host "📡 Connecting to $User@$HostName..." -ForegroundColor Yellow
    $sshTarget = "$User@$HostName"
    ssh $sshTarget $commands
    
    Write-Host ""
    Write-Host "✅ VPS update complete!" -ForegroundColor Green
    Write-Host "🌐 Site: http://$HostName" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run this command manually:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "ssh $User@$HostName" -ForegroundColor Cyan
    Write-Host "Then run:" -ForegroundColor Cyan
    Write-Host $commands -ForegroundColor White
}
