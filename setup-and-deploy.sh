#!/bin/bash
# Complete setup and deployment script for Swiss Immigration Pro

SERVER="ubuntu@83.228.215.185"
PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key"

echo "🔐 Swiss Immigration Pro - SSH Setup & Deployment"
echo "=================================================="
echo ""

# Step 1: Check if we can connect
echo "Step 1: Testing SSH connection..."
ssh -o BatchMode=yes -o ConnectTimeout=5 "$SERVER" "echo 'Connected!'" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ SSH key authentication is working!"
    echo ""
    echo "🚀 Proceeding with deployment..."
    echo ""
    ssh "$SERVER" "cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro && pm2 status"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment completed successfully!"
        exit 0
    else
        echo ""
        echo "❌ Deployment failed. Please check errors above."
        exit 1
    fi
fi

echo "❌ SSH key authentication not working."
echo ""
echo "The server requires SSH key authentication. You have two options:"
echo ""
echo "OPTION 1: Add the public key through server control panel (Recommended)"
echo "---------------------------------------------------"
echo "1. Log into your Infomaniak/VPS control panel"
echo "2. Access your server's file manager or SSH key management"
echo "3. Add this public key to ~/.ssh/authorized_keys:"
echo ""
echo "$PUBLIC_KEY"
echo ""
echo "OPTION 2: Use password authentication (if enabled)"
echo "---------------------------------------------------"
read -p "Do you want to try connecting with password? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Connecting to server with password authentication..."
    echo "You'll be prompted for your password."
    echo ""
    
    # Try to add key using password auth
    ssh "$SERVER" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && echo '✅ SSH key added successfully!'"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ SSH key added! Testing connection..."
        ssh -o BatchMode=yes "$SERVER" "echo 'Connection successful!'" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "✅ Key authentication working! Deploying..."
            echo ""
            ssh "$SERVER" "cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro && pm2 status"
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "🎉 Deployment completed successfully!"
                exit 0
            else
                echo ""
                echo "❌ Deployment failed. Please check errors above."
                exit 1
            fi
        else
            echo ""
            echo "⚠️  Key added but authentication still not working."
            echo "You may need to ensure you have the matching private key."
        fi
    else
        echo ""
        echo "❌ Failed to add key. Please use OPTION 1 (control panel method)."
    fi
else
    echo ""
    echo "Please use OPTION 1 to add the SSH key through your server control panel."
    echo ""
    echo "After adding the key, you can deploy by running:"
    echo "  ssh $SERVER 'cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro'"
fi

echo ""
echo "Your public key to add to the server:"
echo "======================================"
echo "$PUBLIC_KEY"
echo ""





