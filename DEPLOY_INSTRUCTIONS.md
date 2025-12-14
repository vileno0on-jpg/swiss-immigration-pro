# Deployment Instructions - SSH Key Issue

## Problem
The server at `83.228.215.185` is rejecting SSH connections with "Permission denied (publickey)" because:
- The public key isn't added to the server's `authorized_keys` file, OR
- You don't have the matching private key locally

## Solution Options

### Option 1: Add Key via Infomaniak Control Panel (Easiest)

1. **Log into your Infomaniak control panel**
2. **Access your VPS/Server management**
3. **Open the file manager or SSH console**
4. **Navigate to `/home/ubuntu/.ssh/`**
   - If the `.ssh` folder doesn't exist, create it:
     ```bash
     mkdir -p ~/.ssh
     chmod 700 ~/.ssh
     ```
5. **Edit or create `authorized_keys` file:**
   ```bash
   nano ~/.ssh/authorized_keys
   ```
6. **Add this line:**
   ```
   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key
   ```
7. **Set correct permissions:**
   ```bash
   chmod 600 ~/.ssh/authorized_keys
   ```
8. **Verify you have the private key locally** (see Option 3)

### Option 2: Use Password Authentication (If Enabled)

If your server allows password authentication, run:

```bash
ssh ubuntu@83.228.215.185
```

Enter your password, then run:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit
```

### Option 3: Ensure You Have the Private Key

**CRITICAL**: You need the **PRIVATE KEY** that matches this public key.

Check if you have it:

```bash
# Check for common key locations
ls -la ~/.ssh/id_rsa
ls -la ~/.ssh/id_ed25519
ls -la ~/.ssh/id_ecdsa
```

If you don't have the private key:

1. **Generate a new SSH key pair:**
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your-email@example.com" -f ~/.ssh/id_rsa
   ```

2. **Add the NEW public key to the server** (using Option 1 or 2 above)

3. **Use the new private key:**
   ```bash
   ssh -i ~/.ssh/id_rsa ubuntu@83.228.215.185
   ```

## After Key Setup - Deploy

Once SSH authentication is working, deploy with:

```bash
ssh ubuntu@83.228.215.185 "cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro && pm2 status"
```

Or use the deployment script:

```bash
chmod +x setup-and-deploy.sh
./setup-and-deploy.sh
```



