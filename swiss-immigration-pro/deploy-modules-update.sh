#!/bin/bash
# Quick deployment script to update modules on server
# This pulls latest code, rebuilds, and restarts the application

set -e

echo "🚀 Deploying updated modules to server..."
echo ""

# Navigate to project directory
cd ~/swiss-immigration-pro/swiss-immigration-pro || cd /root/swiss-immigration-pro || cd /home/deploy/swiss-immigration-pro || {
    echo "Project directory not found. Cloning repository..."
    git clone https://github.com/vileno0on-jpg/swiss-immigration-pro.git
    cd swiss-immigration-pro
}

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

echo "🔄 Restarting application with PM2..."
pm2 delete swiss-immigration-pro 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo "✅ Deployment complete!"
echo "🌐 Your site is live at: http://83.228.215.185"
pm2 status


