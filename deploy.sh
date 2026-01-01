#!/bin/bash
# Deployment script for Swiss Immigration Pro

echo "🚀 Starting deployment to production server..."

ssh ubuntu@83.228.215.185 << 'EOF'
cd swiss-immigration-pro

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

echo "🔄 Restarting application with PM2..."
pm2 restart swiss-immigration-pro

echo "✅ Deployment completed successfully!"
pm2 status
EOF

echo "🎉 Deployment finished!"





