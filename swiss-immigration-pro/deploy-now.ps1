# Quick Deployment Script for Infomaniak VPS
$VPS_IP = "83.228.215.185"
$SSH_USER = "root"

Write-Host "Deploying to Infomaniak VPS: $VPS_IP" -ForegroundColor Cyan

# Check for SSH
$sshPath = "C:\Windows\System32\OpenSSH\ssh.exe"
if (-not (Test-Path $sshPath)) {
    Write-Host "SSH not found. Installing OpenSSH..." -ForegroundColor Yellow
    Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
    $sshPath = "C:\Windows\System32\OpenSSH\ssh.exe"
}

# Build first
Write-Host "Building application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Build successful!" -ForegroundColor Green

# Create deployment commands file
$deployScript = @"
#!/bin/bash
set -e
echo 'Starting deployment...'

# Update system
apt update && apt upgrade -y

# Install Node.js 20 if not installed
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
fi

# Clone or update repository
if [ -d "swiss-immigration-pro" ]; then
    cd swiss-immigration-pro
    git pull origin main
else
    git clone https://github.com/vileno0on-jpg/swiss-immigration-pro.git
    cd swiss-immigration-pro
fi

# Install dependencies
npm install

# Build application
npm run build

# Create .env.local if not exists
if [ ! -f .env.local ]; then
    cp env.local.txt .env.local
    echo 'Please edit .env.local with your configuration'
fi

# Create logs directory
mkdir -p ~/logs

# Start with PM2
pm2 delete swiss-immigration-pro 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup || true

# Configure Nginx
cat > /tmp/swiss-nginx.conf << 'NGINXEOF'
server {
    listen 80;
    server_name $VPS_IP;

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
    }
}
NGINXEOF

sudo cp /tmp/swiss-nginx.conf /etc/nginx/sites-available/swiss-immigration
sudo ln -sf /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Configure firewall
sudo ufw allow 22/tcp 2>/dev/null || true
sudo ufw allow 80/tcp 2>/dev/null || true
sudo ufw allow 443/tcp 2>/dev/null || true
echo "y" | sudo ufw enable 2>/dev/null || true

echo 'Deployment complete!'
echo "Visit: http://$VPS_IP"
pm2 status
"@

# Save deployment script
$deployScript | Out-File -FilePath "deploy-remote.sh" -Encoding utf8

Write-Host "Uploading and running deployment script..." -ForegroundColor Yellow

# Try to connect and deploy
try {
    & $sshPath root@$VPS_IP "bash -s" < deploy-remote.sh
    Write-Host "Deployment complete!" -ForegroundColor Green
    Write-Host "Visit: http://$VPS_IP" -ForegroundColor Cyan
} catch {
    Write-Host "SSH connection failed. Please run manually:" -ForegroundColor Yellow
    Write-Host "1. Connect: ssh root@$VPS_IP" -ForegroundColor White
    Write-Host "2. Copy deploy-remote.sh to server" -ForegroundColor White
    Write-Host "3. Run: bash deploy-remote.sh" -ForegroundColor White
}
