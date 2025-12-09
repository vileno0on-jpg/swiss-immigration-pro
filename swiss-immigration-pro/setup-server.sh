#!/bin/bash
# Swiss Immigration Pro - Server Setup Script for Infomaniak VPS
# Run this script on your VPS after initial SSH setup

set -e

echo "🚀 Swiss Immigration Pro - Server Setup"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo -e "${RED}⚠️  Running as root. Consider using a non-root user for security.${NC}"
    USER_HOME="/root"
else
    USER_HOME="$HOME"
fi

echo -e "${CYAN}Step 1: Updating system packages...${NC}"
apt update && apt upgrade -y

echo -e "${CYAN}Step 2: Installing essential tools...${NC}"
apt install -y curl wget git build-essential

echo -e "${CYAN}Step 3: Installing Node.js 20...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    echo -e "${GREEN}✅ Node.js installed: $(node --version)${NC}"
else
    echo -e "${YELLOW}Node.js already installed: $(node --version)${NC}"
fi

echo -e "${CYAN}Step 4: Installing PM2 process manager...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo -e "${GREEN}✅ PM2 installed${NC}"
else
    echo -e "${YELLOW}PM2 already installed${NC}"
fi

echo -e "${CYAN}Step 5: Setting up PM2 startup...${NC}"
pm2 startup systemd || true

echo -e "${CYAN}Step 6: Installing Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
    echo -e "${GREEN}✅ Nginx installed and started${NC}"
else
    echo -e "${YELLOW}Nginx already installed${NC}"
fi

echo -e "${CYAN}Step 7: Configuring firewall...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    echo "y" | ufw enable || true
    echo -e "${GREEN}✅ Firewall configured${NC}"
else
    echo -e "${YELLOW}UFW not installed, skipping firewall setup${NC}"
fi

echo -e "${CYAN}Step 8: Creating application directory...${NC}"
mkdir -p $USER_HOME/swiss-immigration-pro
mkdir -p $USER_HOME/logs
echo -e "${GREEN}✅ Directories created${NC}"

echo ""
echo -e "${GREEN}✅ Server setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Clone your repository: cd $USER_HOME && git clone YOUR_REPO_URL swiss-immigration-pro"
echo "  2. Or upload files using SCP/SFTP"
echo "  3. Create .env.local file with your environment variables"
echo "  4. Run: cd $USER_HOME/swiss-immigration-pro && npm install"
echo "  5. Run: npm run build"
echo "  6. Start with PM2: pm2 start ecosystem.config.js"
echo ""
echo "For detailed instructions, see INFOMANIAK_DEPLOYMENT.md"
echo ""






