# 🚀 Quick Start: Infomaniak Deployment with Your SSH Keys

## 📋 What You Have

- ✅ Two RSA private keys: `sppppp.txt` and `sippp.txt` (both identical)
- ✅ These keys are now in your project directory

## 🎯 Quick Steps Overview

1. **Extract Public Keys** → Get public keys from your private keys
2. **Add Public Key to Infomaniak** → Add to VPS during creation or after
3. **Configure Local SSH** → Set up keys on your Windows machine
4. **Test Connection** → Verify SSH works
5. **Deploy Application** → Follow full deployment guide

---

## ⚡ Fast Track (5 Minutes)

### Step 1: Extract Public Key (2 min)

**Using PowerShell:**
```powershell
# Navigate to project directory
cd "C:\Users\vilen\Downloads\New folder\swiss-immigration-pro"

# Extract public keys (requires OpenSSL)
openssl rsa -in sppppp.txt -pubout -out sppppp_public_key.txt
openssl rsa -in sippp.txt -pubout -out sippp_public_key.txt

# View public key (copy this!)
Get-Content sppppp_public_key.txt
```

**Or using Git Bash:**
```bash
cd "C:/Users/vilen/Downloads/New folder/swiss-immigration-pro"
ssh-keygen -y -f sppppp.txt > sppppp_public_key.txt
cat sppppp_public_key.txt
```

### Step 2: Add to Infomaniak (1 min)

1. Log in to [Infomaniak Manager](https://manager.infomaniak.com)
2. Go to **Cloud** → **VPS**
3. If creating new VPS: Paste public key during setup
4. If VPS exists: Connect with password and add key (see detailed guide)

### Step 3: Configure Local SSH (2 min)

**PowerShell:**
```powershell
# Create .ssh directory
$sshDir = "$env:USERPROFILE\.ssh"
if (-not (Test-Path $sshDir)) { New-Item -ItemType Directory -Path $sshDir }

# Copy keys
Copy-Item "sppppp.txt" "$sshDir\infomaniak_key1"
Copy-Item "sippp.txt" "$sshDir\infomaniak_key2"

# Set permissions
icacls "$sshDir\infomaniak_key1" /inheritance:r /grant:r "$env:USERNAME:R"
icacls "$sshDir\infomaniak_key2" /inheritance:r /grant:r "$env:USERNAME:R"

# Create SSH config (replace YOUR_VPS_IP)
$config = @"
Host infomaniak
    HostName YOUR_VPS_IP
    User root
    IdentityFile $sshDir\infomaniak_key1
    IdentitiesOnly yes
"@
Set-Content -Path "$sshDir\config" -Value $config
```

### Step 4: Test Connection

```powershell
# Replace YOUR_VPS_IP with actual IP
ssh infomaniak
```

**Success?** You'll see: `root@your-server:~#`

---

## 📚 Detailed Guides

For complete step-by-step instructions:

1. **SSH Setup**: [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md)
   - Complete SSH key setup
   - Troubleshooting
   - Security best practices

2. **Full Deployment**: [`INFOMANIAK_DEPLOYMENT.md`](./INFOMANIAK_DEPLOYMENT.md)
   - Server configuration
   - Database setup
   - Application deployment
   - SSL certificates
   - Domain configuration

---

## 🔑 Key Files Reference

| File | Location | Purpose |
|------|----------|---------|
| `sppppp.txt` | Project root | Private key #1 |
| `sippp.txt` | Project root | Private key #2 |
| `infomaniak_key1` | `C:\Users\vilen\.ssh\` | SSH key for connection |
| `infomaniak_key2` | `C:\Users\vilen\.ssh\` | Backup SSH key |
| `config` | `C:\Users\vilen\.ssh\` | SSH configuration |

---

## ✅ Checklist

- [ ] Public keys extracted from private keys
- [ ] Public key added to Infomaniak VPS
- [ ] Private keys copied to `~/.ssh` directory
- [ ] SSH config file created
- [ ] SSH connection tested successfully
- [ ] Ready to proceed with deployment!

---

## 🆘 Need Help?

1. **SSH Issues?** → See [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md) troubleshooting section
2. **Deployment Questions?** → See [`INFOMANIAK_DEPLOYMENT.md`](./INFOMANIAK_DEPLOYMENT.md)
3. **Infomaniak Support** → [infomaniak.com/support](https://www.infomaniak.com/support)

---

**🎉 Ready to deploy! Start with SSH setup, then move to full deployment guide.**







