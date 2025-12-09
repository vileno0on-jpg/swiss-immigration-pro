# Swiss Immigration Pro - Infomaniak Deployment Script
# This script automates the deployment process to Infomaniak VPS

param(
    [Parameter(Mandatory=$true)]
    [string]$VpsIp,
    
    [Parameter(Mandatory=$false)]
    [string]$SshUser = "deploy",
    
    [Parameter(Mandatory=$false)]
    [string]$SshKey = "$env:USERPROFILE\.ssh\infomaniak_key1",
    
    [Parameter(Mandatory=$false)]
    [string]$Domain = ""
)

Write-Host "🚀 Starting Infomaniak Deployment..." -ForegroundColor Cyan
Write-Host ""

# Configuration
$PROJECT_DIR = "swiss-immigration-pro"
$REMOTE_DIR = "/home/$SshUser/swiss-immigration-pro"

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Project directory found" -ForegroundColor Green

# Step 1: Build the application
Write-Host ""
Write-Host "📦 Step 1: Building application..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful" -ForegroundColor Green

# Step 2: Create deployment package (excluding node_modules, .git, etc.)
Write-Host ""
Write-Host "📦 Step 2: Preparing deployment package..." -ForegroundColor Cyan

# Create temporary deployment directory
$TEMP_DIR = "deploy-temp"
if (Test-Path $TEMP_DIR) {
    Remove-Item -Recurse -Force $TEMP_DIR
}
New-Item -ItemType Directory -Path $TEMP_DIR | Out-Null

# Copy necessary files
Write-Host "Copying files..." -ForegroundColor Yellow
$FILES_TO_COPY = @(
    ".next",
    "app",
    "components",
    "lib",
    "public",
    "scripts",
    "types",
    "middleware.ts",
    "next.config.ts",
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "tailwind.config.ts",
    "postcss.config.mjs",
    "ecosystem.config.js"
)

foreach ($file in $FILES_TO_COPY) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination $TEMP_DIR -Recurse -Force
        Write-Host "  ✓ $file" -ForegroundColor Gray
    }
}

Write-Host "✅ Files prepared" -ForegroundColor Green

# Step 3: Upload files to server
Write-Host ""
Write-Host "📤 Step 3: Uploading files to server..." -ForegroundColor Cyan
Write-Host "Server: $SshUser@$VpsIp" -ForegroundColor Yellow
Write-Host ""

# Check SSH key exists
if (-not (Test-Path $SshKey)) {
    Write-Host "❌ SSH key not found at: $SshKey" -ForegroundColor Red
    Write-Host "Please ensure your SSH key is set up. See INFOMANIAK_SSH_SETUP.md" -ForegroundColor Yellow
    exit 1
}

# Create remote directory
Write-Host "Creating remote directory..." -ForegroundColor Yellow
ssh -i $SshKey "$SshUser@$VpsIp" "mkdir -p $REMOTE_DIR && mkdir -p ~/logs"

# Upload files using rsync if available, otherwise scp
Write-Host "Uploading files..." -ForegroundColor Yellow
if (Get-Command rsync -ErrorAction SilentlyContinue) {
    rsync -avz --delete -e "ssh -i $SshKey" "$TEMP_DIR/" "$SshUser@$VpsIp`:$REMOTE_DIR/"
} else {
    # Fallback to scp
    scp -i $SshKey -r "$TEMP_DIR/*" "$SshUser@$VpsIp`:$REMOTE_DIR/"
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    Remove-Item -Recurse -Force $TEMP_DIR
    exit 1
}

Write-Host "✅ Files uploaded" -ForegroundColor Green

# Step 4: Install dependencies and restart on server
Write-Host ""
Write-Host "🔄 Step 4: Installing dependencies and restarting application..." -ForegroundColor Cyan

$deployCommands = @"
cd $REMOTE_DIR
npm install --production
pm2 delete swiss-immigration-pro 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
"@

ssh -i $SshKey "$SshUser@$VpsIp" $deployCommands

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Warning: Some commands may have failed. Check server logs." -ForegroundColor Yellow
}

Write-Host "✅ Deployment commands executed" -ForegroundColor Green

# Step 5: Check application status
Write-Host ""
Write-Host "📊 Step 5: Checking application status..." -ForegroundColor Cyan

ssh -i $SshKey "$SshUser@$VpsIp" "pm2 status"

# Cleanup
Write-Host ""
Write-Host "🧹 Cleaning up temporary files..." -ForegroundColor Cyan
Remove-Item -Recurse -Force $TEMP_DIR

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Check application logs: ssh -i $SshKey $SshUser@$VpsIp 'pm2 logs swiss-immigration-pro'" -ForegroundColor White
Write-Host "  2. Monitor application: ssh -i $SshKey $SshUser@$VpsIp 'pm2 monit'" -ForegroundColor White
if ($Domain) {
    Write-Host "  3. Visit your site: https://$Domain" -ForegroundColor White
} else {
    Write-Host "  3. Configure domain DNS to point to $VpsIp" -ForegroundColor White
}
Write-Host ""






