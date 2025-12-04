# ✅ Infomaniak Deployment - Complete Setup Summary

All files and scripts have been created for deploying to Infomaniak! 🎉

---

## 📁 Files Created

### **Documentation Guides:**

1. **`START_DEPLOY.md`** ⭐
   - **Your starting point** - Overview and navigation
   - Use this to decide which guide to follow

2. **`DEPLOY_README.md`**
   - Quick reference for all deployment options
   - Command cheat sheet

3. **`DEPLOY_INFOMANIAK_QUICK.md`** 🚀
   - **30-minute quick deployment guide**
   - Step-by-step instructions
   - Perfect for first-time deployment

4. **`INFOMANIAK_DEPLOYMENT.md`** (Already existed)
   - Complete detailed guide
   - All options and configurations
   - Extensive troubleshooting

5. **`INFOMANIAK_SSH_SETUP.md`** (Already existed)
   - SSH key setup instructions
   - Required before deployment

### **Automation Scripts:**

6. **`deploy-infomaniak.ps1`** 🪟
   - PowerShell script for Windows
   - Automated deployment from local machine
   - Builds and uploads application

7. **`setup-server.sh`** 🐧
   - Linux bash script for VPS
   - Installs Node.js, PM2, Nginx
   - Configures firewall

### **Configuration Files:**

8. **`ecosystem.config.js`**
   - PM2 process manager configuration
   - Used to run app in production

9. **`nginx-infomaniak.conf`**
   - Nginx reverse proxy configuration
   - SSL/HTTPS ready
   - Copy to `/etc/nginx/sites-available/`

---

## 🚀 How to Deploy (Quick Guide)

### **Step 1: Setup SSH Keys** (5 min)

```powershell
# Follow the guide:
# INFOMANIAK_SSH_SETUP.md
```

You need to:
- Extract public keys from private keys (`sppppp.txt`, `sippp.txt`)
- Add public keys to Infomaniak VPS
- Configure SSH on your local machine

### **Step 2: Setup Server** (10 min)

Connect to your VPS:

```bash
ssh infomaniak
```

Upload and run setup script:

```bash
# Upload setup-server.sh to your VPS first, then:
chmod +x setup-server.sh
./setup-server.sh
```

This installs:
- ✅ Node.js 20
- ✅ PM2 process manager
- ✅ Nginx web server
- ✅ Firewall rules

### **Step 3: Deploy Application** (15 min)

**Option A: Using PowerShell Script (Windows)**

```powershell
cd swiss-immigration-pro
.\deploy-infomaniak.ps1 -VpsIp "YOUR_VPS_IP"
```

**Option B: Manual Deployment**

On your VPS:

```bash
# Clone or upload your code
cd ~
git clone YOUR_REPO_URL swiss-immigration-pro
# Or upload via SCP/SFTP

cd swiss-immigration-pro

# Create .env.local with your environment variables
nano .env.local

# Install and build
npm install
npm run build

# Create logs directory
mkdir -p ~/logs

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
```

### **Step 4: Configure Nginx** (5 min)

```bash
# Copy nginx config
sudo cp nginx-infomaniak.conf /etc/nginx/sites-available/swiss-immigration

# Edit and update domain name
sudo nano /etc/nginx/sites-available/swiss-immigration

# Enable site
sudo ln -s /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### **Step 5: Setup SSL** (5 min)

**Using Infomaniak Manager:**
1. Go to SSL Certificates
2. Order Let's Encrypt certificate
3. Select your domain
4. Certificate auto-installs

**Or using Certbot:**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### **Step 6: Configure DNS** (5 min)

In Infomaniak Manager → Domains → DNS:

- A Record: `@` → `YOUR_VPS_IP`
- A Record: `www` → `YOUR_VPS_IP`

Wait 5-60 minutes for DNS propagation.

---

## 📋 Environment Variables Needed

Create `.env.local` on your server:

```env
# Database
DB_HOST=postgresql-XXXXX.infomaniak.com
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
GROQ_API_KEY=gsk_...

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production
PORT=5000
```

---

## 🔧 Useful Commands

### **Application Management:**

```bash
pm2 status                          # Check status
pm2 logs swiss-immigration-pro      # View logs
pm2 restart swiss-immigration-pro   # Restart
pm2 stop swiss-immigration-pro      # Stop
pm2 monit                           # Monitor resources
pm2 delete swiss-immigration-pro    # Remove from PM2
```

### **Nginx Management:**

```bash
sudo nginx -t                       # Test configuration
sudo systemctl reload nginx         # Reload Nginx
sudo systemctl restart nginx        # Restart Nginx
sudo tail -f /var/log/nginx/error.log  # View errors
```

### **System Management:**

```bash
# Check disk space
df -h

# Check memory
free -h

# Check running processes
htop

# Update system
sudo apt update && sudo apt upgrade -y
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Application is running: `pm2 status`
- [ ] Logs show no errors: `pm2 logs swiss-immigration-pro`
- [ ] Nginx is running: `sudo systemctl status nginx`
- [ ] Site is accessible: Visit `http://yourdomain.com`
- [ ] HTTPS works: Visit `https://yourdomain.com`
- [ ] Database connection works
- [ ] Admin login works
- [ ] Stripe payments work (test mode first)

---

## 🆘 Troubleshooting Quick Reference

### **Application Won't Start**

```bash
# Check logs
pm2 logs swiss-immigration-pro --lines 100

# Check port
sudo netstat -tulpn | grep 5000

# Rebuild
cd ~/swiss-immigration-pro
npm run build
pm2 restart swiss-immigration-pro
```

### **Nginx Errors**

```bash
# Test config
sudo nginx -t

# View errors
sudo tail -f /var/log/nginx/error.log

# Check if Nginx is running
sudo systemctl status nginx
```

### **Database Connection Issues**

```bash
# Test connection
psql -h YOUR_DB_HOST -U YOUR_DB_USER -d swiss_immigration

# Check environment variables
cat ~/swiss-immigration-pro/.env.local
```

---

## 📚 Full Documentation

For detailed information, see:

- **Quick Start:** [`DEPLOY_INFOMANIAK_QUICK.md`](./DEPLOY_INFOMANIAK_QUICK.md)
- **Complete Guide:** [`INFOMANIAK_DEPLOYMENT.md`](./INFOMANIAK_DEPLOYMENT.md)
- **SSH Setup:** [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md)
- **Overview:** [`DEPLOY_README.md`](./DEPLOY_README.md)

---

## 🔒 Security Notes

✅ **What's Protected:**
- SSH private keys added to `.gitignore`
- Environment files excluded from git
- Secure file permissions in scripts

⚠️ **Important:**
- Never commit `.env.local` to git
- Never commit SSH private keys
- Use strong passwords for database
- Keep system updated: `sudo apt update && sudo apt upgrade -y`

---

## 🎉 Next Steps

1. **Read:** [`START_DEPLOY.md`](./START_DEPLOY.md) - Your starting point
2. **Setup SSH:** [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md)
3. **Deploy:** [`DEPLOY_INFOMANIAK_QUICK.md`](./DEPLOY_INFOMANIAK_QUICK.md)
4. **Verify:** Check all items in verification checklist
5. **Monitor:** Use `pm2 monit` to monitor application

---

**Everything is ready for deployment!** 🚀

Start with: [`START_DEPLOY.md`](./START_DEPLOY.md)





