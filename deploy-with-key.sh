#!/bin/bash
# Deployment script that uses SSH key authentication

SERVER="ubuntu@83.228.215.185"

# Check if a specific key file exists, otherwise use default
KEY_FILE=""
if [ -f "$HOME/.ssh/id_rsa" ]; then
    KEY_FILE="-i $HOME/.ssh/id_rsa"
elif [ -f "$HOME/.ssh/id_ed25519" ]; then
    KEY_FILE="-i $HOME/.ssh/id_ed25519"
fi

echo "🚀 Deploying Swiss Immigration Pro to production..."
echo ""

# Deploy command
DEPLOY_CMD="cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro && pm2 status"

if [ -n "$KEY_FILE" ]; then
    echo "Using SSH key: $KEY_FILE"
    ssh $KEY_FILE "$SERVER" "$DEPLOY_CMD"
else
    echo "No SSH key found, using default authentication..."
    ssh "$SERVER" "$DEPLOY_CMD"
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment completed successfully!"
else
    echo ""
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi





