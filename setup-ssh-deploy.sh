#!/bin/bash
# SSH Deployment Setup Script for Swiss Immigration Pro

echo "🔐 SSH Deployment Setup"
echo "========================"
echo ""

SERVER="ubuntu@83.228.215.185"
SSH_KEY_PATH="$HOME/.ssh/id_rsa"
SSH_KEY_PUB_PATH="$HOME/.ssh/id_rsa.pub"

# Check if SSH directory exists
if [ ! -d "$HOME/.ssh" ]; then
    echo "📁 Creating .ssh directory..."
    mkdir -p "$HOME/.ssh"
    chmod 700 "$HOME/.ssh"
fi

# Check if SSH key exists
if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "🔑 No SSH key found. Generating new key..."
    echo ""
    read -p "Enter your email address for the SSH key: " EMAIL
    ssh-keygen -t rsa -b 4096 -C "$EMAIL" -f "$SSH_KEY_PATH" -N ""
    echo ""
    echo "✅ SSH key generated!"
else
    echo "✅ SSH key found at $SSH_KEY_PATH"
fi

echo ""
echo "📋 Your public SSH key is:"
echo "----------------------------------------"
cat "$SSH_KEY_PUB_PATH"
echo "----------------------------------------"
echo ""

echo "⚠️  IMPORTANT: You need to add this SSH key to your server."
echo ""
echo "Option 1: Manual copy (recommended if you have password access)"
echo "  Run this command and enter your server password when prompted:"
echo ""
echo "  ssh-copy-id -i $SSH_KEY_PUB_PATH $SERVER"
echo ""
echo "Option 2: Manual setup on server"
echo "  1. SSH to your server with password: ssh $SERVER"
echo "  2. Run: mkdir -p ~/.ssh && chmod 700 ~/.ssh"
echo "  3. Run: nano ~/.ssh/authorized_keys"
echo "  4. Paste the public key above into the file"
echo "  5. Save and run: chmod 600 ~/.ssh/authorized_keys"
echo ""

read -p "Do you want to try automatic key copy now? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Attempting to copy SSH key to server..."
    ssh-copy-id -i "$SSH_KEY_PUB_PATH" "$SERVER"
    
    if [ $? -eq 0 ]; then
        echo "✅ SSH key copied successfully!"
        echo ""
        echo "🚀 Testing connection..."
        ssh -o BatchMode=yes "$SERVER" "echo 'Connection successful!'"
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ SSH connection works! You can now deploy."
            echo ""
            echo "To deploy, run:"
            echo "  ./deploy.sh"
            echo ""
            echo "Or manually:"
            echo "  ssh $SERVER 'cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro'"
        fi
    else
        echo "❌ Automatic copy failed. Please use Option 2 (manual setup) above."
    fi
fi


