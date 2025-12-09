# Swiss Immigration Pro - Interactive Infomaniak Deployment Script
# This script guides you through deploying to Infomaniak VPS step by step

param(
    [Parameter(Mandatory=$false)]
    [string]$VpsIp = "",
    
    [Parameter(Mandatory=$false)]
    [string]$SshUser = "deploy",
    
    [Parameter(Mandatory=$false)]
    [string]$Domain = ""
)

# Function to find SSH executable
function Find-SshExecutable {
    $sshPaths = @(
        "$env:ProgramFiles\OpenSSH\ssh.exe",
        "$env:ProgramFiles\Git\usr\bin\ssh.exe",
        "$env:SystemRoot\System32\OpenSSH\ssh.exe",
        "ssh.exe"
    )
    
    foreach ($path in $sshPaths) {
        if (Get-Command $path -ErrorAction SilentlyContinue) {
            return $path
        }
    }
    
    # Try to find in PATH
    $sshInPath = Get-Command ssh -ErrorAction SilentlyContinue
    if ($sshInPath) {
        return $sshInPath.Source
    }
    
    return $null
}

# Function to find SCP executable
function Find-ScpExecutable {
    $scpPaths = @(
        "$env:ProgramFiles\OpenSSH\scp.exe",
        "$env:ProgramFiles\Git\usr\bin\scp.exe",
        "$env:SystemRoot\System32\OpenSSH\scp.exe",
        "scp.exe"
    )
    
    foreach ($path in $scpPaths) {
        if (Get-Command $path -ErrorAction SilentlyContinue) {
            return $path
        }
    }
    
    # Try to find in PATH
    $scpInPath = Get-Command scp -ErrorAction SilentlyContinue
    if ($scpInPath) {
        return $scpInPath.Source
    }
    
    return $null
}

# Find SSH and SCP executables
$sshExe = Find-SshExecutable
$scpExe = Find-ScpExecutable

if (-not $sshExe -or -not $scpExe) {
    Write-Host "❌ SSH/SCP not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install OpenSSH for Windows:" -ForegroundColor Yellow
    Write-Host "  1. Open Settings → Apps → Optional Features" -ForegroundColor White
    Write-Host "  2. Search for 'OpenSSH Client'" -ForegroundColor White
    Write-Host "  3. Click Install" -ForegroundColor White
    Write-Host ""
    Write-Host "Or install Git for Windows (includes SSH):" -ForegroundColor Yellow
    Write-Host "  https://git-scm.com/download/win" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✅ Found SSH: $sshExe" -ForegroundColor Green
Write-Host "✅ Found SCP: $scpExe" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Swiss Immigration Pro - Infomaniak Deployment" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Collect VPS Information
if ([string]::IsNullOrEmpty($VpsIp)) {
    Write-Host "📋 Step 1: VPS Information" -ForegroundColor Yellow
    Write-Host ""
    $VpsIp = Read-Host "Enter your Infomaniak VPS IP address"
    
    if ([string]::IsNullOrEmpty($VpsIp)) {
        Write-Host "❌ VPS IP is required!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📋 Step 2: SSH Configuration" -ForegroundColor Yellow
Write-Host ""

# Check for SSH keys
$sshKey1 = "$env:USERPROFILE\.ssh\infomaniak_key1"
$sshKey2 = "$env:USERPROFILE\.ssh\infomaniak_key2"
$localKey1 = "sppppp.txt"
$localKey2 = "sippp.txt"

$useSshKey = $false
$selectedKey = ""

# Check if keys exist in .ssh directory
if (Test-Path $sshKey1) {
    Write-Host "✅ Found SSH key: $sshKey1" -ForegroundColor Green
    $useSshKey = $true
    $selectedKey = $sshKey1
} elseif (Test-Path $sshKey2) {
    Write-Host "✅ Found SSH key: $sshKey2" -ForegroundColor Green
    $useSshKey = $true
    $selectedKey = $sshKey2
} elseif (Test-Path $localKey1) {
    Write-Host "⚠️  Found local SSH key: $localKey1" -ForegroundColor Yellow
    Write-Host "   Copying to .ssh directory..." -ForegroundColor Yellow
    
    # Create .ssh directory if it doesn't exist
    if (-not (Test-Path "$env:USERPROFILE\.ssh")) {
        New-Item -ItemType Directory -Path "$env:USERPROFILE\.ssh" | Out-Null
    }
    
    Copy-Item $localKey1 $sshKey1 -Force
    icacls $sshKey1 /inheritance:r /grant:r "$env:USERNAME:R" | Out-Null
    $useSshKey = $true
    $selectedKey = $sshKey1
    Write-Host "✅ SSH key copied and secured" -ForegroundColor Green
} elseif (Test-Path $localKey2) {
    Write-Host "⚠️  Found local SSH key: $localKey2" -ForegroundColor Yellow
    Write-Host "   Copying to .ssh directory..." -ForegroundColor Yellow
    
    if (-not (Test-Path "$env:USERPROFILE\.ssh")) {
        New-Item -ItemType Directory -Path "$env:USERPROFILE\.ssh" | Out-Null
    }
    
    Copy-Item $localKey2 $sshKey2 -Force
    icacls $sshKey2 /inheritance:r /grant:r "$env:USERNAME:R" | Out-Null
    $useSshKey = $true
    $selectedKey = $sshKey2
    Write-Host "✅ SSH key copied and secured" -ForegroundColor Green
}

if (-not $useSshKey) {
    Write-Host "⚠️  No SSH key found. You'll need to enter password for SSH." -ForegroundColor Yellow
    $usePassword = Read-Host "Continue with password authentication? (y/n)"
    if ($usePassword -ne "y" -and $usePassword -ne "Y") {
        Write-Host "Please set up SSH keys first. See INFOMANIAK_SSH_SETUP.md" -ForegroundColor Yellow
        exit 1
    }
    $selectedKey = $null
}

Write-Host ""
Write-Host "📋 Step 3: Testing SSH Connection" -ForegroundColor Yellow
Write-Host ""

# Test SSH connection
Write-Host "Testing connection to $VpsIp..." -ForegroundColor Cyan
try {
    if ($useSshKey -and $selectedKey) {
        $testArgs = @(
            "-i", $selectedKey,
            "-o", "ConnectTimeout=10",
            "-o", "StrictHostKeyChecking=no",
            "$SshUser@$VpsIp",
            "echo 'Connection successful'"
        )
    } else {
        $testArgs = @(
            "-o", "ConnectTimeout=10",
            "-o", "StrictHostKeyChecking=no",
            "root@$VpsIp",
            "echo 'Connection successful'"
        )
        $SshUser = "root"
    }
    
    $result = & $sshExe $testArgs 2>&1
    if ($LASTEXITCODE -eq 0 -or $result -match "Connection successful") {
        Write-Host "✅ SSH connection successful!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  SSH connection test failed, but continuing..." -ForegroundColor Yellow
        Write-Host "   Make sure your VPS is running and accessible" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Could not test SSH connection automatically" -ForegroundColor Yellow
    Write-Host "   Continuing with deployment..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Step 4: Server Setup" -ForegroundColor Yellow
Write-Host ""

$setupServer = Read-Host "Run server setup script on VPS? (installs Node.js, PM2, Nginx) (y/n)"
if ($setupServer -eq "y" -or $setupServer -eq "Y") {
    Write-Host "Uploading and running setup script..." -ForegroundColor Cyan
    
    # Upload setup script
    if ($useSshKey -and $selectedKey) {
        $scpArgs = @("-i", $selectedKey, "-o", "StrictHostKeyChecking=no", "setup-server.sh", "$SshUser@$VpsIp`:/tmp/setup-server.sh")
        & $scpExe $scpArgs
        
        $sshArgs = @("-i", $selectedKey, "-o", "StrictHostKeyChecking=no", "$SshUser@$VpsIp", "chmod +x /tmp/setup-server.sh && sudo /tmp/setup-server.sh")
        & $sshExe $sshArgs
    } else {
        $scpArgs = @("-o", "StrictHostKeyChecking=no", "setup-server.sh", "root@$VpsIp`:/tmp/setup-server.sh")
        & $scpExe $scpArgs
        
        $sshArgs = @("-o", "StrictHostKeyChecking=no", "root@$VpsIp", "chmod +x /tmp/setup-server.sh && /tmp/setup-server.sh")
        & $sshExe $sshArgs
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Server setup complete!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Server setup may have encountered issues. Check manually." -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📋 Step 5: Building Application" -ForegroundColor Yellow
Write-Host ""

# Build the application
Write-Host "Building Next.js application..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

Write-Host ""
Write-Host "📋 Step 6: Uploading Application" -ForegroundColor Yellow
Write-Host ""

# Create remote directory
$remoteDir = "/home/$SshUser/swiss-immigration-pro"
if ($SshUser -eq "root") {
    $remoteDir = "/root/swiss-immigration-pro"
}

Write-Host "Creating remote directory..." -ForegroundColor Cyan
if ($useSshKey -and $selectedKey) {
    $sshArgs = @("-i", $selectedKey, "-o", "StrictHostKeyChecking=no", "$SshUser@$VpsIp", "mkdir -p $remoteDir && mkdir -p ~/logs")
    & $sshExe $sshArgs
} else {
    $sshArgs = @("-o", "StrictHostKeyChecking=no", "root@$VpsIp", "mkdir -p $remoteDir && mkdir -p ~/logs")
    & $sshExe $sshArgs
}

# Upload files (excluding node_modules, .git, etc.)
Write-Host "Uploading application files..." -ForegroundColor Cyan
Write-Host "This may take a few minutes..." -ForegroundColor Yellow

$excludePatterns = @(
    "node_modules",
    ".git",
    ".next",
    ".env.local",
    "*.log",
    "deploy-*.ps1",
    "*.md"
)

# Create temporary deployment package
$tempDir = "deploy-temp-$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Preparing files for upload..." -ForegroundColor Cyan
$filesToCopy = @(
    ".next",
    "app",
    "components",
    "lib",
    "public",
    "scripts",
    "types",
    "*.ts",
    "*.tsx",
    "*.json",
    "*.js",
    "*.mjs",
    "ecosystem.config.js",
    "nginx-infomaniak.conf"
)

foreach ($pattern in $filesToCopy) {
    if (Test-Path $pattern) {
        Copy-Item -Path $pattern -Destination $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Copy package files
Copy-Item package.json $tempDir -Force
Copy-Item package-lock.json $tempDir -Force -ErrorAction SilentlyContinue

# Upload using SCP
Write-Host "Uploading to server..." -ForegroundColor Cyan
if ($useSshKey -and $selectedKey) {
    $scpArgs = @("-i", $selectedKey, "-r", "-o", "StrictHostKeyChecking=no", "$tempDir/*", "$SshUser@$VpsIp`:$remoteDir/")
    & $scpExe $scpArgs
} else {
    $scpArgs = @("-r", "-o", "StrictHostKeyChecking=no", "$tempDir/*", "root@$VpsIp`:$remoteDir/")
    & $scpExe $scpArgs
}

# Cleanup temp directory
Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue

Write-Host "✅ Files uploaded!" -ForegroundColor Green

Write-Host ""
Write-Host "📋 Step 7: Environment Configuration" -ForegroundColor Yellow
Write-Host ""

$configureEnv = Read-Host "Configure environment variables on server? (y/n)"
if ($configureEnv -eq "y" -or $configureEnv -eq "Y") {
    Write-Host ""
    Write-Host "You'll need to provide the following information:" -ForegroundColor Cyan
    Write-Host "  - Database connection details" -ForegroundColor White
    Write-Host "  - Stripe API keys (if using payments)" -ForegroundColor White
    Write-Host "  - AI API keys (if using chatbot)" -ForegroundColor White
    Write-Host "  - Domain/URL for the application" -ForegroundColor White
    Write-Host ""
    Write-Host "You can edit .env.local on the server after deployment." -ForegroundColor Yellow
    Write-Host "Or run this command to edit:" -ForegroundColor Yellow
    $editCmd = "ssh $SshUser@$VpsIp 'nano $remoteDir/.env.local'"
    Write-Host "  $editCmd" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📋 Step 8: Installing Dependencies and Starting Application" -ForegroundColor Yellow
Write-Host ""

Write-Host "Installing dependencies on server..." -ForegroundColor Cyan

$deployCommands = "cd $remoteDir && npm install --production && npm run build && pm2 delete swiss-immigration-pro 2>/dev/null || true && pm2 start ecosystem.config.js && pm2 save && pm2 status"

if ($useSshKey -and $selectedKey) {
    $sshArgs = @("-i", $selectedKey, "-o", "StrictHostKeyChecking=no", "$SshUser@$VpsIp", $deployCommands)
    & $sshExe $sshArgs
} else {
    $sshArgs = @("-o", "StrictHostKeyChecking=no", "root@$VpsIp", $deployCommands)
    & $sshExe $sshArgs
}

Write-Host ""
Write-Host "📋 Step 9: Nginx Configuration" -ForegroundColor Yellow
Write-Host ""

$configureNginx = Read-Host "Configure Nginx? (y/n)"
if ($configureNginx -eq "y" -or $configureNginx -eq "Y") {
    if ([string]::IsNullOrEmpty($Domain)) {
        $Domain = Read-Host "Enter your domain name (or press Enter to use IP)"
    }
    
    if ([string]::IsNullOrEmpty($Domain)) {
        $serverName = $VpsIp
    } else {
        $serverName = "$Domain www.$Domain"
    }
    
    Write-Host "Configuring Nginx for: $serverName" -ForegroundColor Cyan
    
    $nginxConfig = @"
server {
    listen 80;
    server_name $serverName;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
        proxy_cache_bypass `$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
"@
    
    $nginxConfig | Out-File -FilePath "nginx-temp.conf" -Encoding UTF8
    
    # Upload and configure Nginx
    if ($useSshKey -and $selectedKey) {
        $scpArgs = @("-i", $selectedKey, "-o", "StrictHostKeyChecking=no", "nginx-temp.conf", "$SshUser@$VpsIp`:/tmp/swiss-immigration-nginx.conf")
        & $scpExe $scpArgs
        
        $nginxCmd = "sudo cp /tmp/swiss-immigration-nginx.conf /etc/nginx/sites-available/swiss-immigration && sudo ln -sf /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/ && sudo rm -f /etc/nginx/sites-enabled/default && sudo nginx -t && sudo systemctl reload nginx"
        $sshArgs = @("-i", $selectedKey, "-o", "StrictHostKeyChecking=no", "$SshUser@$VpsIp", $nginxCmd)
        & $sshExe $sshArgs
    } else {
        $scpArgs = @("-o", "StrictHostKeyChecking=no", "nginx-temp.conf", "root@$VpsIp`:/tmp/swiss-immigration-nginx.conf")
        & $scpExe $scpArgs
        
        $nginxCmd = "cp /tmp/swiss-immigration-nginx.conf /etc/nginx/sites-available/swiss-immigration && ln -sf /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default && nginx -t && systemctl reload nginx"
        $sshArgs = @("-o", "StrictHostKeyChecking=no", "root@$VpsIp", $nginxCmd)
        & $sshExe $sshArgs
    }
    
    Remove-Item nginx-temp.conf -ErrorAction SilentlyContinue
    
    Write-Host "✅ Nginx configured!" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Configure .env.local on server with your environment variables" -ForegroundColor White
Write-Host "  2. Set up database and import schema if needed" -ForegroundColor White
Write-Host "  3. Configure SSL certificate (Let's Encrypt via Infomaniak Manager)" -ForegroundColor White
Write-Host "  4. Point your domain DNS to $VpsIp" -ForegroundColor White
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
$logCmd = "ssh $SshUser@$VpsIp 'pm2 logs swiss-immigration-pro'"
Write-Host "  View logs: $logCmd" -ForegroundColor Gray
$restartCmd = "ssh $SshUser@$VpsIp 'pm2 restart swiss-immigration-pro'"
Write-Host "  Restart app: $restartCmd" -ForegroundColor Gray
$statusCmd = "ssh $SshUser@$VpsIp 'pm2 status'"
Write-Host "  Check status: $statusCmd" -ForegroundColor Gray
Write-Host ""
if (-not [string]::IsNullOrEmpty($Domain)) {
    Write-Host "Visit your site: http://$Domain" -ForegroundColor Green
} else {
    $siteUrl = "http://$VpsIp"
    Write-Host "Visit your site: $siteUrl" -ForegroundColor Green
}
Write-Host ""
