#!/bin/bash
# Quick deployment script - adds key if needed and deploys

SERVER="ubuntu@83.228.215.185"
PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key"

echo "🚀 Quick Deployment Setup"
echo "========================"
echo ""

# Step 1: Add key to server (if not already added)
echo "Step 1: Setting up SSH key on server..."
echo "You'll need to enter your server password once..."

ssh "$SERVER" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && grep -q 'phpseclib-generated-key' ~/.ssh/authorized_keys 2>/dev/null || echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

if [ $? -eq 0 ]; then
    echo "✅ SSH key configured on server"
else
    echo "❌ Failed to add SSH key. Please check MANUAL_SSH_SETUP.md"
    exit 1
fi

echo ""
echo "Step 2: Deploying application..."
echo ""

# Step 2: Deploy
ssh "$SERVER" "cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro && pm2 status"

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment completed successfully!"
else
    echo ""
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi



