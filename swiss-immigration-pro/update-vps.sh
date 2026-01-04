#!/bin/bash
# Simple VPS update script
# Pulls latest code, rebuilds, and restarts the application

set -e

echo "🚀 Updating VPS with latest changes..."
echo ""

# Navigate to project directory
cd ~/swiss-immigration-pro/swiss-immigration-pro

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "🔨 Building application..."
npm run build

echo "🔄 Restarting application with PM2..."
pm2 restart swiss-immigration-pro --update-env

echo ""
echo "✅ Update complete!"
echo "🌐 Your site is live at: http://83.228.215.185"
pm2 status
