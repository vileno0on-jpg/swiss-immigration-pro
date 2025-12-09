197# 🚀 Quick Deploy to Infomaniak - Step by Step

This is a simplified guide to deploy Swiss Immigration Pro to Infomaniak VPS.

---

## 📋 Prerequisites Checklist

- [ ] Infomaniak VPS ordered and running
- [ ] VPS IP address noted
- [ ] SSH keys set up (see `INFOMANIAK_SSH_SETUP.md`)
- [ ] Domain name ready (optional, can use IP initially)
- [ ] Database ready (PostgreSQL on Infomaniak or VPS)

---

## 🎯 Quick Deployment (30 minutes)

### **Step 1: Initial Server Setup (10 min)**

Connect to your VPS and run the setup script:

```bash
# Connect to your VPS
ssh infomaniak
# Or: ssh -i ~/.ssh/infomaniak_key1 deploy@YOUR_VPS_IP

# Download and run setup script
curl -o setup-server.sh https://raw.githubusercontent.com/YOUR_REPO/setup-server.sh
# Or upload setup-server.sh from your local machine

chmod +x setup-server.sh
./setup-server.sh
```

This installs:
- ✅ Node.js 20
- ✅ PM2 process manager
- ✅ Nginx web server
- ✅ Firewall configuration

---

### **Step 2: Upload Application Code (5 min)**

**Option A: Using Git (Recommended)**

```bash
# On server
cd ~
git clone YOUR_GITHUB_REPO_URL swiss-immigration-pro
cd swiss-immigration-pro
```

**Option B: Using PowerShell Script (Windows)**

```powershell
# On your local Windows machine
cd swiss-immigration-pro
.\deploy-infomaniak.ps1 -VpsIp "YOUR_VPS_IP"
```

**Option C: Manual Upload**

```bash
# On your local machine
scp -r -i ~/.ssh/infomaniak_key1 swiss-immigration-pro deploy@YOUR_VPS_IP:~/
```

---

### **Step 3: Configure Environment Variables (5 min)**

On the server:

```bash
cd ~/swiss-immigration-pro
nano .env.local
```

Add your environment variables:

```env
# Database Configuration
DB_HOST=postgresql-XXXXX.infomaniak.com
# Or: DB_HOST=localhost (if PostgreSQL is on VPS)
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI Configuration
GROQ_API_KEY=gsk_...

# Application Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production
PORT=5000
```

Save: `Ctrl+X`, then `Y`, then `Enter`

Set secure permissions:
```bash
chmod 600 .env.local
```

---

### **Step 4: Install Dependencies & Build (5 min)**

```bash
cd ~/swiss-immigration-pro

# Install dependencies
npm install

# Build the application
npm run build
```

---

### **Step 5: Start Application with PM2 (2 min)**

```bash
# Create logs directory
mkdir -p ~/logs

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Check status
pm2 status
pm2 logs swiss-immigration-pro
```

---

### **Step 6: Configure Nginx (5 min)**

```bash
# Copy nginx configuration
sudo cp nginx-infomaniak.conf /etc/nginx/sites-available/swiss-immigration

# Edit configuration (replace yourdomain.com with your actual domain)
sudo nano /etc/nginx/sites-available/swiss-immigration

# Create symlink to enable site
sudo ln -s /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

**Update the configuration:**
- Replace `yourdomain.com` with your actual domain
- Replace `www.yourdomain.com` with your www subdomain (or remove if not needed)

---

### **Step 7: Setup SSL Certificate (5 min)**

**Option A: Using Infomaniak Manager (Easiest)**

1. Log in to [Infomaniak Manager](https://manager.infomaniak.com)
2. Go to **SSL Certificates**
3. Click **Order SSL Certificate**
4. Choose **Let's Encrypt** (free)
5. Select your domain
6. Follow wizard - certificate auto-installs

**Option B: Using Certbot**

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)
```

After SSL is installed, update Nginx config to uncomment HTTPS block and comment HTTP block.

---

### **Step 8: Configure DNS (5 min)**

In Infomaniak Manager → **Domains** → **DNS**:

1. **A Record for Root Domain:**
   - Name: `@` (or blank)
   - Type: `A`
   - Value: `YOUR_VPS_IP`
   - TTL: `3600`

2. **A Record for WWW:**
   - Name: `www`
   - Type: `A`
   - Value: `YOUR_VPS_IP`
   - TTL: `3600`

Wait 5-60 minutes for DNS propagation.

---

## ✅ Verify Deployment

1. **Check Application Status:**
   ```bash
   ssh infomaniak
   pm2 status
   pm2 logs swiss-immigration-pro
   ```

2. **Check Nginx:**
   ```bash
   sudo systemctl status nginx
   ```

3. **Visit Your Site:**
   - HTTP: `http://yourdomain.com`
   - HTTPS: `https://yourdomain.com` (after SSL setup)

---

## 🔧 Useful Commands

### Application Management

```bash
# View logs
pm2 logs swiss-immigration-pro

# Restart application
pm2 restart swiss-immigration-pro

# Stop application
pm2 stop swiss-immigration-pro

# Monitor resources
pm2 monit

# View status
pm2 status
```

### Nginx Management

```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### Database Setup

If using PostgreSQL on VPS:

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE swiss_immigration;
CREATE USER swiss_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE swiss_immigration TO swiss_user;
\q

# Import schema
psql -U swiss_user -d swiss_immigration -f lib/database/schema.sql
```

---

## 🆘 Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs swiss-immigration-pro --lines 100

# Check if port is in use
sudo netstat -tulpn | grep 5000

# Verify environment variables
cat .env.local

# Rebuild
npm run build
pm2 restart swiss-immigration-pro
```

### Nginx Errors

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Database Connection Issues

```bash
# Test database connection
psql -h YOUR_DB_HOST -U YOUR_DB_USER -d swiss_immigration

# Check firewall
sudo ufw status
```

---

## 📚 Additional Resources

- **Full Deployment Guide**: `INFOMANIAK_DEPLOYMENT.md`
- **SSH Setup**: `INFOMANIAK_SSH_SETUP.md`
- **Server Setup Script**: `setup-server.sh`
- **Deployment Script**: `deploy-infomaniak.ps1`

---

## ✅ Deployment Checklist

- [ ] Server setup script run successfully
- [ ] Application code uploaded/cloned
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Application built successfully
- [ ] PM2 process running
- [ ] Nginx configured and running
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] Domain resolving correctly
- [ ] Application accessible via HTTPS
- [ ] Database connected
- [ ] Admin user created

---

**🎉 Congratulations! Your application is now live on Infomaniak!**

For detailed troubleshooting, see `INFOMANIAK_DEPLOYMENT.md` → Troubleshooting section.






