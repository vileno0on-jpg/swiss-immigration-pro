# Manual SSH Key Setup Guide

## Step 1: Add Public Key to Server

You need to add your public key to the server's `authorized_keys` file.

### Option A: Using Password Authentication (One-time setup)

1. Connect to your server with password:
   ```bash
   ssh ubuntu@83.228.215.185
   ```

2. Once connected, run these commands:
   ```bash
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   nano ~/.ssh/authorized_keys
   ```

3. Paste this public key into the file:
   ```
   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key
   ```

4. Save the file (Ctrl+X, then Y, then Enter)

5. Set correct permissions:
   ```bash
   chmod 600 ~/.ssh/authorized_keys
   exit
   ```

### Option B: Using One-Line Command

If you can SSH with password, you can add the key in one command:

```bash
ssh ubuntu@83.228.215.185 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC80JOiLG/4X0IjrfryWpYnzD/ijMapD8+eBG1a/cwAgfvZC5hBUu2nOSNA/IGvewfjLbuQmRB9P7He+HV8fn63V24YMQcQ1Z6xUF1qCU8+AATYUx3vJHKkwpIJOB+cOQCb78kWfWxJvNfSfNRGRcQewYvtbYBRpAqiDSh1Cat9J3SRIR+L64h4vBpQS/ROOl9Wu+7/EKFDQ7Y9z+k+JsSvCpm65+kDLU9GQlgd0XkE8GqW2Ce/uWPEcVmRAhywyppvX3w/IiVgXXG0B7n17ltIS+XJ6vzvlE/PEc5z4K/er545ZGXOo4Q2wqQI+ou+CNNpFsalJ1faGdig/YAyd1Mb phpseclib-generated-key' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

## Step 2: Ensure You Have the Private Key

You need the **private key** that corresponds to this public key. The private key should be:

- Located in `~/.ssh/id_rsa` (or similar)
- Have permissions set to `600`: `chmod 600 ~/.ssh/id_rsa`

If you don't have the private key, you'll need to either:
1. Generate a new key pair, or
2. Obtain the private key from whoever generated this key pair

## Step 3: Test Connection

Test your SSH connection:

```bash
ssh ubuntu@83.228.215.185
```

If it works without asking for a password, you're all set!

## Step 4: Deploy

Once SSH key authentication is working, you can deploy using:

```bash
./deploy-with-key.sh
```

Or manually:

```bash
ssh ubuntu@83.228.215.185 "cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 restart swiss-immigration-pro"
```

## Troubleshooting

### "Permission denied (publickey)" Error

- Make sure the public key is correctly added to `~/.ssh/authorized_keys` on the server
- Check file permissions: `chmod 600 ~/.ssh/authorized_keys` on the server
- Verify you have the correct private key locally
- Check server SSH config allows key authentication

### "No such file or directory" for .ssh

- Run: `mkdir -p ~/.ssh && chmod 700 ~/.ssh` on the server

### Need to use a specific private key file

```bash
ssh -i /path/to/your/private/key ubuntu@83.228.215.185
```



