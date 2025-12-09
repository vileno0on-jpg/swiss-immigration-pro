# 🚀 Start Here: Deploy to Infomaniak

Welcome! This is your starting point for deploying Swiss Immigration Pro to Infomaniak.

---

## ⚡ Quick Start (Choose One)

### **Option 1: Automated Deployment** (Recommended - 30 min)
Perfect for first-time deployment with automated scripts.

👉 **Start here:** [`DEPLOY_INFOMANIAK_QUICK.md`](./DEPLOY_INFOMANIAK_QUICK.md)

### **Option 2: Manual Step-by-Step** (1-2 hours)
Full control over every step with detailed explanations.

👉 **Start here:** [`INFOMANIAK_DEPLOYMENT.md`](./INFOMANIAK_DEPLOYMENT.md)

---

## 📋 Before You Begin

Make sure you have:

- [ ] **Infomaniak Account** - Sign up at [infomaniak.com](https://www.infomaniak.com)
- [ ] **VPS Ordered** - Minimum: 2 vCPU, 4GB RAM (see Infomaniak Manager → Cloud → VPS)
- [ ] **Domain Name** - Optional initially, can use IP address for testing
- [ ] **SSH Keys** - Set up first (see below)

---

## 🔐 Step 0: Setup SSH Keys (5 minutes)

**You MUST do this first!**

👉 **Follow:** [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md)

This guide will:
- ✅ Extract your public keys from private keys
- ✅ Add keys to Infomaniak VPS
- ✅ Configure SSH on your local machine
- ✅ Test the connection

**Files you need:**
- `sppppp.txt` or `sippp.txt` (your SSH private keys - already in project)

---

## 🎯 What Happens During Deployment

1. **Server Setup** - Install Node.js, PM2, Nginx
2. **Upload Code** - Transfer application files
3. **Configure** - Set environment variables
4. **Build** - Compile Next.js application
5. **Start** - Launch with PM2 process manager
6. **Proxy** - Configure Nginx reverse proxy
7. **SSL** - Install HTTPS certificate
8. **DNS** - Point domain to server

**Total time: 30-45 minutes**

---

## 📁 Deployment Files Guide

| File | When to Use |
|------|-------------|
| `DEPLOY_README.md` | Overview of all deployment options |
| `DEPLOY_INFOMANIAK_QUICK.md` | ⭐ **Start here for quick deployment** |
| `INFOMANIAK_DEPLOYMENT.md` | Detailed guide with all options |
| `INFOMANIAK_SSH_SETUP.md` | 🔐 **Do this first - SSH setup** |
| `QUICK_START_INFOMANIAK.md` | Quick reference for SSH keys |

---

## 🛠️ Deployment Scripts

### **PowerShell Script (Windows)**
`deploy-infomaniak.ps1` - Automated deployment from Windows

```powershell
.\deploy-infomaniak.ps1 -VpsIp "YOUR_VPS_IP"
```

### **Server Setup Script (Linux)**
`setup-server.sh` - Run on VPS to install dependencies

```bash
./setup-server.sh
```

### **Configuration Files**
- `ecosystem.config.js` - PM2 process manager config
- `nginx-infomaniak.conf` - Nginx reverse proxy config

---

## ✅ Deployment Checklist

### **Before Deployment:**
- [ ] SSH keys configured
- [ ] VPS ordered and running
- [ ] VPS IP address noted
- [ ] Domain name ready (optional)

### **During Deployment:**
- [ ] Server setup script executed
- [ ] Application code uploaded
- [ ] Environment variables configured
- [ ] Application built successfully
- [ ] PM2 process running

### **After Deployment:**
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] Site accessible via HTTPS
- [ ] Database connected
- [ ] Admin user created

---

## 🆘 Need Help?

### **Common Issues:**

**SSH Connection Problems?**
→ See [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md) troubleshooting

**Build Errors?**
→ Check Node.js version (needs 20.x)
→ Verify all dependencies installed
→ Check environment variables

**Application Won't Start?**
→ Check PM2 logs: `pm2 logs swiss-immigration-pro`
→ Verify port 5000 is available
→ Check environment variables

**Nginx Errors?**
→ Test config: `sudo nginx -t`
→ Check logs: `sudo tail -f /var/log/nginx/error.log`

**More Help:**
→ See troubleshooting in [`INFOMANIAK_DEPLOYMENT.md`](./INFOMANIAK_DEPLOYMENT.md)
→ Infomaniak Support: [infomaniak.com/support](https://www.infomaniak.com/support)

---

## 🎉 Ready to Deploy?

### **Step 1: Setup SSH** (5 min)
👉 Read: [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md)

### **Step 2: Deploy Application** (30 min)
👉 Read: [`DEPLOY_INFOMANIAK_QUICK.md`](./DEPLOY_INFOMANIAK_QUICK.md)

---

**Let's get started!** 🚀






