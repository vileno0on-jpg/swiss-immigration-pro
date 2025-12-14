# 🚀 Infomaniak Deployment - Quick Start

Deploy Swiss Immigration Pro to Infomaniak VPS in **30 minutes**!

---

## 📚 Choose Your Path

### **🚀 Quick Start (30 min)**
👉 **Read:** [`DEPLOY_INFOMANIAK_QUICK.md`](./DEPLOY_INFOMANIAK_QUICK.md)  
Step-by-step guide for fast deployment using automated scripts.

### **📖 Detailed Guide (1-2 hours)**
👉 **Read:** [`INFOMANIAK_DEPLOYMENT.md`](./INFOMANIAK_DEPLOYMENT.md)  
Complete guide with all options, troubleshooting, and best practices.

### **🔐 SSH Setup First**
👉 **Read:** [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md)  
Set up SSH keys before deployment (required).

---

## ⚡ Fast Track (3 Steps)

### **1. Setup SSH Keys** (5 min)
```powershell
# Follow: INFOMANIAK_SSH_SETUP.md
```

### **2. Setup Server** (10 min)
```bash
# Connect to VPS
ssh infomaniak

# Run setup script
./setup-server.sh
```

### **3. Deploy Application** (15 min)
```powershell
# On Windows (local machine)
cd swiss-immigration-pro
.\deploy-infomaniak.ps1 -VpsIp "YOUR_VPS_IP"
```

**Or manually:**
```bash
# On server
git clone YOUR_REPO_URL ~/swiss-immigration-pro
cd ~/swiss-immigration-pro
# Configure .env.local
npm install && npm run build
pm2 start ecosystem.config.js
```

---

## 📁 Deployment Files

| File | Purpose |
|------|---------|
| `DEPLOY_INFOMANIAK_QUICK.md` | Quick start guide (30 min) |
| `INFOMANIAK_DEPLOYMENT.md` | Complete deployment guide |
| `INFOMANIAK_SSH_SETUP.md` | SSH key setup instructions |
| `deploy-infomaniak.ps1` | PowerShell deployment script |
| `setup-server.sh` | Server setup automation script |
| `ecosystem.config.js` | PM2 process manager config |
| `nginx-infomaniak.conf` | Nginx reverse proxy config |

---

## ✅ Prerequisites

- [ ] Infomaniak VPS account
- [ ] VPS ordered and running
- [ ] SSH keys set up
- [ ] Domain name (optional initially)
- [ ] Database ready (PostgreSQL)

---

## 🎯 Typical Deployment Timeline

| Step | Time | Task |
|------|------|------|
| 1 | 5 min | SSH key setup |
| 2 | 10 min | Server setup (Node.js, PM2, Nginx) |
| 3 | 5 min | Upload/clone application |
| 4 | 5 min | Configure environment variables |
| 5 | 5 min | Install dependencies & build |
| 6 | 5 min | Start with PM2 |
| 7 | 5 min | Configure Nginx |
| 8 | 5 min | Setup SSL certificate |
| **Total** | **45 min** | **Live!** 🎉 |

---

## 🔧 Quick Commands Reference

### **Connect to Server**
```bash
ssh infomaniak
# Or: ssh -i ~/.ssh/infomaniak_key1 deploy@YOUR_VPS_IP
```

### **Application Management**
```bash
pm2 status                    # Check status
pm2 logs swiss-immigration-pro # View logs
pm2 restart swiss-immigration-pro # Restart
pm2 monit                     # Monitor resources
```

### **Nginx Management**
```bash
sudo nginx -t                 # Test config
sudo systemctl reload nginx   # Reload
sudo tail -f /var/log/nginx/error.log # View errors
```

---

## 🆘 Need Help?

1. **Quick Start Issues?** → See [`DEPLOY_INFOMANIAK_QUICK.md`](./DEPLOY_INFOMANIAK_QUICK.md) troubleshooting
2. **Detailed Problems?** → See [`INFOMANIAK_DEPLOYMENT.md`](./INFOMANIAK_DEPLOYMENT.md) troubleshooting section
3. **SSH Connection Issues?** → See [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md) troubleshooting
4. **Infomaniak Support** → [infomaniak.com/support](https://www.infomaniak.com/support)

---

## 📋 Deployment Checklist

- [ ] VPS ordered and running
- [ ] SSH keys configured
- [ ] Server setup script executed
- [ ] Application code uploaded/cloned
- [ ] Environment variables configured (`.env.local`)
- [ ] Dependencies installed (`npm install`)
- [ ] Application built (`npm run build`)
- [ ] PM2 process running
- [ ] Nginx configured and running
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] Application accessible via HTTPS
- [ ] Database connected
- [ ] Admin user created
- [ ] Stripe webhooks configured
- [ ] Tested all features

---

## 🎉 Ready to Deploy?

**Start here:** [`DEPLOY_INFOMANIAK_QUICK.md`](./DEPLOY_INFOMANIAK_QUICK.md)

---

**Questions?** Check the detailed guides or Infomaniak support documentation.







