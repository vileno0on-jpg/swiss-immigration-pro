# Swiss Immigration Pro - Interactive Infomaniak Deployment
# This script guides you through deploying to Infomaniak VPS step by step

Write-Host "🚀 Swiss Immigration Pro - Infomaniak VPS Deployment" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Get VPS Information
Write-Host "📋 Step 1: VPS Information" -ForegroundColor Yellow
Write-Host ""

$VPS_IP = Read-Host "Enter your Infomaniak VPS IP address"
if ([string]::IsNullOrWhiteSpace($VPS_IP)) {
    Write-Host "❌ VPS IP is required!" -ForegroundColor Red
    exit 1
}

$SSH_USER = Read-Host "Enter SSH username (default: root)" 
if ([string]::IsNullOrWhiteSpace($SSH_USER)) {
    $SSH_USER = "root"
}

$SSH_KEY_PATH = "$env:USERPROFILE\.ssh\infomaniak_key1"
if (-not (Test-Path $SSH_KEY_PATH)) {
    Write-Host "⚠️  SSH key not found at: $SSH_KEY_PATH" -ForegroundColor Yellow
    $SSH_KEY_PATH = Read-Host "Enter path to your SSH private key"
    if (-not (Test-Path $SSH_KEY_PATH)) {
        Write-Host "❌ SSH key not found!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ VPS Information:" -ForegroundColor Green
Write-Host "   IP: $VPS_IP"
Write-Host "   User: $SSH_USER"
Write-Host "   SSH Key: $SSH_KEY_PATH"
Write-Host ""

# Step 2: Test SSH Connection
Write-Host "🔐 Step 2: Testing SSH Connection" -ForegroundColor Yellow
Write-Host ""

$testConnection = Read-Host "Test SSH connection now? (Y/N)"
if ($testConnection -eq "Y" -or $testConnection -eq "y") {
    Write-Host "Testing connection to $SSH_USER@$VPS_IP..." -ForegroundColor Yellow
    
    $testResult = ssh -i $SSH_KEY_PATH -o ConnectTimeout=5 -o BatchMode=yes "$SSH_USER@$VPS_IP" "echo 'Connection successful'" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ SSH connection successful!" -ForegroundColor Green
    } else {
        Write-Host "❌ SSH connection failed!" -ForegroundColor Red
        Write-Host "Error: $testResult" -ForegroundColor Red
        $continue = Read-Host "Continue anyway? (Y/N)"
        if ($continue -ne "Y" -and $continue -ne "y") {
            exit 1
        }
    }
    Write-Host ""
}

# Step 3: Build Application
Write-Host "📦 Step 3: Building Application" -ForegroundColor Yellow
Write-Host ""

$buildApp = Read-Host "Build the application now? (Y/N)"
if ($buildApp -eq "Y" -or $buildApp -eq "y") {
    Write-Host "Building application..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
}

# Step 4: Upload Application
Write-Host "📤 Step 4: Upload Application to Server" -ForegroundColor Yellow
Write-Host ""

$uploadMethod = Read-Host "Upload method: (1) Git clone on server, (2) SCP upload from here, (3) Skip"

if ($uploadMethod -eq "1") {
    Write-Host ""
    Write-Host "📝 To upload via Git, run these commands on your server:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "ssh -i $SSH_KEY_PATH $SSH_USER@$VPS_IP" -ForegroundColor White
    Write-Host "cd ~" -ForegroundColor White
    Write-Host "git clone https://github.com/vileno0on-jpg/swiss-immigration-pro.git" -ForegroundColor White
    Write-Host "cd swiss-immigration-pro" -ForegroundColor White
    Write-Host ""
    
} elseif ($uploadMethod -eq "2") {
    Write-Host "Uploading files via SCP..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes..." -ForegroundColor Yellow
    
    # Create remote directory first
    ssh -i $SSH_KEY_PATH "$SSH_USER@$VPS_IP" "mkdir -p ~/swiss-immigration-pro"
    
    # Upload files (excluding node_modules, .git, etc.)
    $exclude = @("node_modules", ".git", ".next", "deploy-*", "*.md", "*.txt", ".env.local")
    
    Write-Host "Creating deployment package..." -ForegroundColor Yellow
    $tempDir = "deploy-temp-$(Get-Date -Format 'yyyyMMddHHmmss')"
    New-Item -ItemType Directory -Path $tempDir | Out-Null
    
    # Copy essential files
    $files = Get-ChildItem -Path . -Exclude $exclude
    foreach ($file in $files) {
        if ($file.PSIsContainer) {
            Copy-Item -Path $file.FullName -Destination "$tempDir\$($file.Name)" -Recurse -Force
        } else {
            Copy-Item -Path $file.FullName -Destination "$tempDir\$($file.Name)" -Force
        }
    }
    
    Write-Host "Uploading to server..." -ForegroundColor Yellow
    scp -i $SSH_KEY_PATH -r $tempDir/* "$SSH_USER@$VPS_IP:~/swiss-immigration-pro/"
    
    # Cleanup
    Remove-Item -Recurse -Force $tempDir
    
    Write-Host "✅ Upload complete!" -ForegroundColor Green
    Write-Host ""
}

# Step 5: Server Setup Commands
Write-Host "🛠️  Step 5: Server Setup Commands" -ForegroundColor Yellow
Write-Host ""
Write-Host "Run these commands on your server to complete setup:" -ForegroundColor Cyan
Write-Host ""

$setupCommands = @"
# 1. Connect to server
ssh -i $SSH_KEY_PATH $SSH_USER@$VPS_IP

# 2. Update system and install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential

# 3. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Install PostgreSQL (if not using Infomaniak managed DB)
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 5. Navigate to project
cd ~/swiss-immigration-pro

# 6. Install dependencies
npm install

# 7. Create .env.local file
nano .env.local
# Add your environment variables (see env.local.txt for template)

# 8. Build application
npm run build

# 9. Install PM2
sudo npm install -g pm2

# 10. Install Nginx
sudo apt install -y nginx

# 11. Configure Nginx (see nginx-infomaniak.conf)
sudo nano /etc/nginx/sites-available/swiss-immigration
# Copy content from nginx-infomaniak.conf

# 12. Enable site
sudo ln -s /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# 13. Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
# Follow the command it outputs

# 14. Configure firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
"@

Write-Host $setupCommands -ForegroundColor White
Write-Host ""

# Step 6: Generate deployment script for server
Write-Host "📝 Step 6: Creating server setup script" -ForegroundColor Yellow
Write-Host ""

$createScript = Read-Host "Create automated setup script to upload to server? (Y/N)"
if ($createScript -eq "Y" -or $createScript -eq "y") {
    Write-Host "Creating setup script..." -ForegroundColor Yellow
    
    # Read the existing setup-server.sh
    if (Test-Path "setup-server.sh") {
        Write-Host "✅ Setup script exists (setup-server.sh)" -ForegroundColor Green
        Write-Host ""
        Write-Host "To upload and run it on server:" -ForegroundColor Cyan
        Write-Host "scp -i $SSH_KEY_PATH setup-server.sh $SSH_USER@$VPS_IP:~/"
        Write-Host "ssh -i $SSH_KEY_PATH $SSH_USER@$VPS_IP"
        Write-Host "chmod +x setup-server.sh"
        Write-Host "./setup-server.sh"
        Write-Host ""
    }
}

# Summary
Write-Host "📋 Deployment Summary" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""
Write-Host "VPS IP: $VPS_IP" -ForegroundColor White
Write-Host "SSH User: $SSH_USER" -ForegroundColor White
Write-Host "SSH Key: $SSH_KEY_PATH" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Connect to your server using the SSH command above" -ForegroundColor White
Write-Host "2. Run the setup commands or use the automated script" -ForegroundColor White
Write-Host "3. Configure environment variables (.env.local)" -ForegroundColor White
Write-Host "4. Build and start the application" -ForegroundColor White
Write-Host "5. Configure Nginx and firewall" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see: DEPLOY_INFOMANIAK_FROM_SCRATCH.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Ready to deploy! Good luck! 🚀" -ForegroundColor Green

