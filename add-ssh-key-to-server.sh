#!/bin/bash
# Script to add SSH public key to server and configure deployment

SERVER="ubuntu@83.228.215.185"
PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key"

echo "🔐 Adding SSH public key to server..."
echo ""
echo "⚠️  This will attempt to add your public key to the server."
echo "You'll need to enter your server password once."
echo ""

# Try to add the key using ssh-copy-id or manual method
echo "Attempting to add key to server..."

# Create a temporary file with the public key
TEMP_KEY_FILE=$(mktemp)
echo "$PUBLIC_KEY" > "$TEMP_KEY_FILE"

# Try method 1: ssh-copy-id with the key file
if command -v ssh-copy-id &> /dev/null; then
    echo "Using ssh-copy-id..."
    ssh-copy-id -i "$TEMP_KEY_FILE" "$SERVER" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Key added successfully using ssh-copy-id!"
        rm "$TEMP_KEY_FILE"
    else
        echo "⚠️  ssh-copy-id failed, trying manual method..."
        # Manual method
        ssh "$SERVER" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
        
        if [ $? -eq 0 ]; then
            echo "✅ Key added successfully using manual method!"
        else
            echo "❌ Failed to add key automatically."
            echo ""
            echo "Please add this key manually:"
            echo "1. SSH to your server: ssh $SERVER"
            echo "2. Run these commands:"
            echo "   mkdir -p ~/.ssh"
            echo "   chmod 700 ~/.ssh"
            echo "   nano ~/.ssh/authorized_keys"
            echo "3. Paste this key into the file:"
            echo "$PUBLIC_KEY"
            echo "4. Save and run: chmod 600 ~/.ssh/authorized_keys"
            rm "$TEMP_KEY_FILE"
            exit 1
        fi
    fi
else
    # Manual method
    echo "Using manual method to add key..."
    ssh "$SERVER" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
    
    if [ $? -eq 0 ]; then
        echo "✅ Key added successfully!"
    else
        echo "❌ Failed to add key automatically."
        echo ""
        echo "Please add this key manually:"
        echo "1. SSH to your server: ssh $SERVER"
        echo "2. Run these commands:"
        echo "   mkdir -p ~/.ssh"
        echo "   chmod 700 ~/.ssh"
        echo "   nano ~/.ssh/authorized_keys"
        echo "3. Paste this key into the file:"
        echo "$PUBLIC_KEY"
        echo "4. Save and run: chmod 600 ~/.ssh/authorized_keys"
        rm "$TEMP_KEY_FILE"
        exit 1
    fi
fi

rm "$TEMP_KEY_FILE"

echo ""
echo "✅ SSH key setup complete!"
echo ""
echo "🧪 Testing connection..."
ssh -o BatchMode=yes -o ConnectTimeout=5 "$SERVER" "echo 'Connection successful!'" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ SSH connection works! You can now deploy."
    echo ""
    echo "To deploy, run:"
    echo "  ./deploy.sh"
else
    echo "⚠️  Key-based authentication not working yet."
    echo "You may need to:"
    echo "1. Ensure you have the corresponding private key"
    echo "2. Check that the key is in ~/.ssh/id_rsa or specify it with -i flag"
    echo "3. Verify the key was added correctly to the server"
fi



