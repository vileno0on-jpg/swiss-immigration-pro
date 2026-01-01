#!/bin/bash
# Script to kill existing process and restart the site on the server

SERVER="ubuntu@83.228.215.185"

echo "🔄 Restarting Swiss Immigration Pro on server..."
echo ""

# Commands to run on server:
# 1. Stop any existing PM2 process
# 2. Kill any processes using port 3000 (or your app port)
# 3. Restart with PM2

DEPLOY_COMMANDS="cd swiss-immigration-pro && \
pm2 stop swiss-immigration-pro 2>/dev/null || true && \
pm2 delete swiss-immigration-pro 2>/dev/null || true && \
pkill -f 'next-server' 2>/dev/null || true && \
cd swiss-immigration-pro && \
git pull origin main && \
npm install && \
npm run build && \
pm2 start npm --name 'swiss-immigration-pro' -- start && \
pm2 save && \
pm2 status"

echo "Connecting to server and restarting..."
ssh "$SERVER" "$DEPLOY_COMMANDS"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Server restarted successfully!"
else
    echo ""
    echo "❌ Failed to restart. Please check SSH connection."
    echo ""
    echo "If SSH is not working, you can run these commands manually on the server:"
    echo "  cd swiss-immigration-pro"
    echo "  pm2 stop swiss-immigration-pro"
    echo "  pm2 delete swiss-immigration-pro"
    echo "  git pull origin main"
    echo "  npm install"
    echo "  npm run build"
    echo "  pm2 start npm --name 'swiss-immigration-pro' -- start"
    echo "  pm2 save"
    echo "  pm2 status"
fi





