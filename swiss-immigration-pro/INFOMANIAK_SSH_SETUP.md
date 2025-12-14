# 🔐 Infomaniak SSH Key Setup - Step by Step

Complete guide to set up SSH access to Infomaniak VPS using your RSA private keys.

---

## 📋 Prerequisites

- ✅ Two RSA private keys: `sppppp.txt` and `sippp.txt` (both identical)
- ✅ Infomaniak VPS account
- ✅ VPS IP address
- ✅ Windows PowerShell or Git Bash

---

## 🚀 Step-by-Step Instructions

### **STEP 1: Copy Keys to Secure Location**

**On Windows (PowerShell):**

```powershell
# Navigate to your user directory
cd $env:USERPROFILE

# Create .ssh directory if it doesn't exist
if (-not (Test-Path .ssh)) { New-Item -ItemType Directory -Path .ssh }

# Copy keys to .ssh directory
Copy-Item "C:\Users\vilen\Downloads\sppppp.txt" "$env:USERPROFILE\.ssh\infomaniak_key1"
Copy-Item "C:\Users\vilen\Downloads\sippp.txt" "$env:USERPROFILE\.ssh\infomaniak_key2"

# Set secure permissions (Windows)
icacls "$env:USERPROFILE\.ssh\infomaniak_key1" /inheritance:r /grant:r "$env:USERNAME:R"
icacls "$env:USERPROFILE\.ssh\infomaniak_key2" /inheritance:r /grant:r "$env:USERNAME:R"
```

**Or manually:**
1. Open File Explorer
2. Navigate to `C:\Users\vilen\.ssh` (create folder if it doesn't exist)
3. Copy `sppppp.txt` → rename to `infomaniak_key1`
4. Copy `sippp.txt` → rename to `infomaniak_key2`
5. Right-click each file → Properties → Security → Remove all users except yourself → Give yourself "Read" only

---

### **STEP 2: Extract Public Keys from Private Keys**

You need to extract the public key from your private key to add it to the Infomaniak server.

**Option A: Using OpenSSL (if installed):**

```powershell
# Extract public key from first key
openssl rsa -in "$env:USERPROFILE\.ssh\infomaniak_key1" -pubout -out "$env:USERPROFILE\.ssh\infomaniak_key1.pub"

# Extract public key from second key
openssl rsa -in "$env:USERPROFILE\.ssh\infomaniak_key2" -pubout -out "$env:USERPROFILE\.ssh\infomaniak_key2.pub"

# View the public keys
Get-Content "$env:USERPROFILE\.ssh\infomaniak_key1.pub"
Get-Content "$env:USERPROFILE\.ssh\infomaniak_key2.pub"
```

**Option B: Using Git Bash (if you have Git installed):**

```bash
# Open Git Bash
cd ~/.ssh

# Extract public keys
ssh-keygen -y -f infomaniak_key1 > infomaniak_key1.pub
ssh-keygen -y -f infomaniak_key2 > infomaniak_key2.pub

# View public keys
cat infomaniak_key1.pub
cat infomaniak_key2.pub
```

**Option C: Using WSL (Windows Subsystem for Linux):**

```bash
# Open WSL
cd ~/.ssh

# Extract public keys
ssh-keygen -y -f infomaniak_key1 > infomaniak_key1.pub
ssh-keygen -y -f infomaniak_key2 > infomaniak_key2.pub

# View public keys
cat infomaniak_key1.pub
cat infomaniak_key2.pub
```

**The public key will look like:**
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ... (long string)
```

---

### **STEP 3: Add Public Key to Infomaniak VPS**

**Method A: During VPS Creation (Easiest)**

1. Log in to [Infomaniak Manager](https://manager.infomaniak.com)
2. Go to **Cloud** → **VPS** → **Order a VPS**
3. During configuration, find **SSH Key** section
4. Paste your public key (from `infomaniak_key1.pub`)
5. Complete VPS order
6. The key will be automatically added to `~/.ssh/authorized_keys`

**Method B: Add to Existing VPS**

1. **First, connect with password:**
   ```powershell
   # Connect to VPS (replace YOUR_VPS_IP with actual IP)
   ssh root@YOUR_VPS_IP
   # Enter password when prompted
   ```

2. **On the VPS server, add your public key:**
   ```bash
   # Create .ssh directory if it doesn't exist
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   
   # Add your public key (paste the content from infomaniak_key1.pub)
   nano ~/.ssh/authorized_keys
   # Paste the public key content, save (Ctrl+X, Y, Enter)
   
   # Set correct permissions
   chmod 600 ~/.ssh/authorized_keys
   ```

3. **Exit the server:**
   ```bash
   exit
   ```

---

### **STEP 4: Configure SSH Config File**

Create an SSH config file to make connecting easier.

**On Windows (PowerShell):**

```powershell
# Create SSH config file
$configPath = "$env:USERPROFILE\.ssh\config"

# Create config content
$configContent = @"
Host infomaniak
    HostName YOUR_VPS_IP
    User root
    IdentityFile $env:USERPROFILE\.ssh\infomaniak_key1
    IdentitiesOnly yes
    StrictHostKeyChecking no

Host infomaniak2
    HostName YOUR_VPS_IP
    User root
    IdentityFile $env:USERPROFILE\.ssh\infomaniak_key2
    IdentitiesOnly yes
    StrictHostKeyChecking no
"@

# Write config file
Set-Content -Path $configPath -Value $configContent

# Set permissions
icacls $configPath /inheritance:r /grant:r "$env:USERNAME:R"
```

**Or manually:**
1. Navigate to `C:\Users\vilen\.ssh`
2. Create a new file named `config` (no extension)
3. Add this content (replace `YOUR_VPS_IP` with your actual VPS IP):

```
Host infomaniak
    HostName YOUR_VPS_IP
    User root
    IdentityFile C:\Users\vilen\.ssh\infomaniak_key1
    IdentitiesOnly yes
    StrictHostKeyChecking no

Host infomaniak2
    HostName YOUR_VPS_IP
    User root
    IdentityFile C:\Users\vilen\.ssh\infomaniak_key2
    IdentitiesOnly yes
    StrictHostKeyChecking no
```

---

### **STEP 5: Test SSH Connection**

**Test connection using the key:**

```powershell
# Method 1: Using SSH config (easiest)
ssh infomaniak

# Method 2: Direct connection with key
ssh -i "$env:USERPROFILE\.ssh\infomaniak_key1" root@YOUR_VPS_IP

# Method 3: Using second key
ssh -i "$env:USERPROFILE\.ssh\infomaniak_key2" root@YOUR_VPS_IP
```

**If connection succeeds, you'll see:**
```
Welcome to Ubuntu...
root@your-server:~#
```

**If you get "Permission denied":**
- Check that public key is correctly added to server
- Verify key file permissions (should be 600)
- Make sure you're using the correct IP address

---

### **STEP 6: Create Non-Root User (Recommended for Security)**

Once connected, create a dedicated user for deployment:

```bash
# Create new user
adduser deploy
# Enter password when prompted (or press Enter to skip)

# Add user to sudo group
usermod -aG sudo deploy

# Switch to new user
su - deploy

# Create .ssh directory for new user
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key
nano ~/.ssh/authorized_keys
# Paste your public key content here
# Save: Ctrl+X, Y, Enter

# Set permissions
chmod 600 ~/.ssh/authorized_keys

# Exit back to root
exit
```

**Update SSH config to use deploy user:**

Edit `C:\Users\vilen\.ssh\config`:

```
Host infomaniak
    HostName YOUR_VPS_IP
    User deploy
    IdentityFile C:\Users\vilen\.ssh\infomaniak_key1
    IdentitiesOnly yes
    StrictHostKeyChecking no
```

---

### **STEP 7: Verify Everything Works**

```powershell
# Test connection
ssh infomaniak

# Once connected, test sudo access
sudo whoami
# Should output: root

# Test file creation
touch ~/test.txt
ls ~/test.txt
# Should show the file

# Clean up
rm ~/test.txt

# Exit
exit
```

---

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Keep private keys secure (never share)
- ✅ Use file permissions (600) on private keys
- ✅ Use non-root user for daily operations
- ✅ Add keys to `.gitignore` if in project directory
- ✅ Use different keys for different servers
- ✅ Regularly rotate keys

### ❌ DON'T:
- ❌ Commit private keys to Git
- ❌ Share private keys via email/chat
- ❌ Use root user for daily tasks
- ❌ Leave keys with default permissions
- ❌ Store keys in public locations

---

## 🛠️ Troubleshooting

### **Error: "Permission denied (publickey)"**

**Solution:**
1. Verify public key is in `~/.ssh/authorized_keys` on server
2. Check file permissions on server:
   ```bash
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```
3. Verify private key permissions on Windows:
   ```powershell
   icacls "$env:USERPROFILE\.ssh\infomaniak_key1"
   ```

### **Error: "Bad permissions"**

**Solution:**
```powershell
# Fix permissions on Windows
icacls "$env:USERPROFILE\.ssh\infomaniak_key1" /inheritance:r /grant:r "$env:USERNAME:R"
```

### **Error: "Connection refused"**

**Solution:**
1. Check VPS IP address is correct
2. Verify VPS is running in Infomaniak Manager
3. Check firewall allows SSH (port 22)
4. Verify SSH service is running on server:
   ```bash
   sudo systemctl status ssh
   ```

### **Error: "Host key verification failed"**

**Solution:**
```powershell
# Remove old host key
ssh-keygen -R YOUR_VPS_IP

# Or add to SSH config:
# StrictHostKeyChecking no
```

---

## 📝 Quick Reference

### **Key Locations:**
- Private Key 1: `C:\Users\vilen\.ssh\infomaniak_key1`
- Private Key 2: `C:\Users\vilen\.ssh\infomaniak_key2`
- Public Key 1: `C:\Users\vilen\.ssh\infomaniak_key1.pub`
- Public Key 2: `C:\Users\vilen\.ssh\infomaniak_key2.pub`
- SSH Config: `C:\Users\vilen\.ssh\config`

### **Common Commands:**

```powershell
# Connect to server
ssh infomaniak

# Connect with specific key
ssh -i "$env:USERPROFILE\.ssh\infomaniak_key1" root@YOUR_VPS_IP

# Copy file to server
scp -i "$env:USERPROFILE\.ssh\infomaniak_key1" file.txt root@YOUR_VPS_IP:/home/

# Copy file from server
scp -i "$env:USERPROFILE\.ssh\infomaniak_key1" root@YOUR_VPS_IP:/path/to/file.txt ./

# View SSH config
Get-Content "$env:USERPROFILE\.ssh\config"
```

---

## ✅ Checklist

- [ ] Keys copied to `~/.ssh` directory
- [ ] Public keys extracted
- [ ] Public key added to Infomaniak VPS
- [ ] SSH config file created
- [ ] Connection tested successfully
- [ ] Non-root user created (optional but recommended)
- [ ] File permissions set correctly
- [ ] Ready to deploy application!

---

## 🎯 Next Steps

Once SSH is working, proceed with:
1. **Server Setup** - Install Node.js, PM2, Nginx
2. **Database Setup** - Configure PostgreSQL
3. **Application Deployment** - Clone repo and deploy
4. **SSL Certificate** - Set up HTTPS
5. **Domain Configuration** - Point domain to VPS

See `INFOMANIAK_DEPLOYMENT.md` for complete deployment guide.

---

**🎉 You're all set! Your SSH keys are configured and ready to use with Infomaniak!**









