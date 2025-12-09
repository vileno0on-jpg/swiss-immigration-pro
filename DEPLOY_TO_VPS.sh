#!/bin/bash
# Complete deployment script to push changes to VPS

SERVER="ubuntu@83.228.215.185"

echo "🚀 Deploying Swiss Immigration Pro to VPS"
echo "=========================================="
echo ""

# Complete deployment command
DEPLOY_CMD="cd swiss-immigration-pro && \
echo '📥 Pulling latest changes from GitHub...' && \
git pull origin main && \
echo '📦 Installing dependencies...' && \
npm install && \
echo '🔨 Building application...' && \
npm run build && \
echo '🛑 Stopping existing process...' && \
pm2 stop swiss-immigration-pro 2>/dev/null || true && \
pm2 delete swiss-immigration-pro 2>/dev/null || true && \
echo '🚀 Starting application...' && \
pm2 start npm --name 'swiss-immigration-pro' -- start && \
pm2 save && \
echo '✅ Deployment complete!' && \
pm2 status"

echo "Attempting to deploy via SSH..."
echo ""
echo "If SSH authentication fails, use the Infomaniak Control Panel web console"
echo "and run the commands from PUSH_TO_VPS.md"
echo ""

ssh "$SERVER" "$DEPLOY_CMD"

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Successfully deployed to VPS!"
else
    echo ""
    echo "❌ SSH deployment failed."
    echo ""
    echo "Please use Infomaniak Control Panel web console and run:"
    echo ""
    echo "cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 stop swiss-immigration-pro 2>/dev/null; pm2 delete swiss-immigration-pro 2>/dev/null; pm2 start npm --name 'swiss-immigration-pro' -- start && pm2 save && pm2 status"
    exit 1
fi


