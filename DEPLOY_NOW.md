# Quick Deployment Guide

## You have a public SSH key. To deploy, follow these steps:

### Option 1: Quick Setup (if you have password access to server)

Run this command in Git Bash (you'll enter your password once):

```bash
ssh ubuntu@83.228.215.185 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

Then deploy:
```bash
ssh ubuntu@83.228.215.185 "cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro"
```

### Option 2: Using the Quick Deploy Script

1. Make script executable:
   ```bash
   chmod +x quick-deploy.sh
   ```

2. Run it:
   ```bash
   ./quick-deploy.sh
   ```

### Option 3: Manual Setup

1. **Add the public key to your server:**
   - SSH to server: `ssh ubuntu@83.228.215.185` (use password)
   - Run:
     ```bash
     mkdir -p ~/.ssh
     chmod 700 ~/.ssh
     nano ~/.ssh/authorized_keys
     ```
   - Paste this key:
     ```
     ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key
     ```
   - Save (Ctrl+X, Y, Enter)
   - Set permissions: `chmod 600 ~/.ssh/authorized_keys`
   - Exit: `exit`

2. **Ensure you have the private key:**
   - You need the **private key** that matches this public key
   - It should be in `~/.ssh/id_rsa` or a similar location
   - If you don't have it, you'll need to get it or generate a new pair

3. **Test connection:**
   ```bash
   ssh ubuntu@83.228.215.185
   ```
   Should connect without password if everything is set up correctly.

4. **Deploy:**
   ```bash
   ssh ubuntu@83.228.215.185 "cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro && pm2 status"
   ```

## Important Notes

- **You need the PRIVATE KEY** that corresponds to this public key for authentication to work
- The private key should be in `~/.ssh/id_rsa` or specify it with `-i /path/to/key`
- If you don't have the private key, you'll need to either:
  - Generate a new SSH key pair
  - Obtain the private key from whoever created this key pair



