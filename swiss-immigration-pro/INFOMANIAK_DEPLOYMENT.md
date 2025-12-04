# 🚀 Infomaniak Deployment Guide - Swiss Immigration Pro

Complete step-by-step guide to deploy your Next.js application on Infomaniak hosting.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Infomaniak Account Setup](#infomaniak-account-setup)
3. [VPS Configuration](#vps-configuration)
4. [Database Setup](#database-setup)
5. [Server Preparation](#server-preparation)
6. [Application Deployment](#application-deployment)
7. [Nginx Configuration](#nginx-configuration)
8. [SSL Certificate Setup](#ssl-certificate-setup)
9. [Domain Configuration](#domain-configuration)
10. [Process Management with PM2](#process-management-with-pm2)
11. [Environment Variables](#environment-variables)
12. [Post-Deployment Setup](#post-deployment-setup)
13. [Monitoring & Maintenance](#monitoring--maintenance)
14. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- ✅ Infomaniak account (create at [infomaniak.com](https://www.infomaniak.com))
- ✅ Domain name (or use Infomaniak's free subdomain)
- ✅ SSH access to your VPS
- ✅ GitHub account (for code deployment)
- ✅ Stripe account (for payments)
- ✅ Groq API key (for AI chatbot)
- ✅ Basic knowledge of Linux commands

---

## Infomaniak Account Setup

### Step 1: Choose Hosting Type

Infomaniak offers several options. For Next.js applications, choose:

**Recommended: VPS (Virtual Private Server)**
- Full control over server
- Better performance
- Supports Node.js applications
- Starting from ~CHF 5/month

**Alternative: Cloud Hosting**
- Managed platform
- Automatic scaling
- Higher cost but easier management

### Step 2: Order VPS

1. Log in to [Infomaniak Manager](https://manager.infomaniak.com)
2. Navigate to **Cloud** → **VPS**
3. Click **Order a VPS**
4. Choose configuration:
   - **Minimum recommended**: 2 vCPU, 4GB RAM, 50GB SSD
   - **OS**: Ubuntu 22.04 LTS or Debian 12
5. Complete purchase and wait for provisioning (~5-10 minutes)

### Step 3: Get Server Credentials

1. In Infomaniak Manager, go to your VPS
2. Note down:
   - **IP Address**
   - **Root password** (or SSH key)
   - **SSH Port** (usually 22)

---

## SSH Key Setup (Recommended)

> **📘 For detailed step-by-step SSH setup instructions, see: [`INFOMANIAK_SSH_SETUP.md`](./INFOMANIAK_SSH_SETUP.md)**

### Step 1: Extract Public Key from Private Key

You have two private keys: `sppppp.txt` and `sippp.txt`. To extract the public key:

**On Windows (PowerShell):**
```powershell
# Extract public key from first key
openssl rsa -in sppppp.txt -pubout -out sppppp_public_key.txt

# Extract public key from second key
openssl rsa -in sippp.txt -pubout -out sippp_public_key.txt

# View the public keys
Get-Content sppppp_public_key.txt
Get-Content sippp_public_key.txt
```

**On Windows (using Git Bash or WSL):**
```bash
# Extract public key from private key
ssh-keygen -y -f sppppp.txt > sppppp_public_key.txt
ssh-keygen -y -f sippp.txt > sippp_public_key.txt

# View the public keys
cat sppppp_public_key.txt
cat sippp_public_key.txt
```

**On Linux/Mac:**
```bash
ssh-keygen -y -f sppppp.txt > sppppp_public_key.txt
ssh-keygen -y -f sippp.txt > sippp_public_key.txt
cat sppppp_public_key.txt
cat sippp_public_key.txt
```

**Alternative: Using OpenSSL (if ssh-keygen not available):**
```bash
openssl rsa -in sppppp.txt -pubout -out sppppp_public_key.txt
openssl rsa -in sippp.txt -pubout -out sippp_public_key.txt
```

### Step 2: Add Public Key to Infomaniak VPS

**Option A: During VPS Creation**
1. In Infomaniak Manager → VPS Order
2. When configuring, paste your public key (from `sppppp_public_key.txt` or `sippp_public_key.txt`)
3. This will be automatically added to `~/.ssh/authorized_keys`

**Option B: Add After Creation**
1. Connect to VPS with password first:
   ```bash
   ssh root@YOUR_VPS_IP
   ```
2. Add your public key:
   ```bash
   # Create .ssh directory if it doesn't exist
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   
   # Add your public key
   echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

### Step 3: Configure SSH Client (Local Machine)

**On Windows (PowerShell):**
```powershell
# Copy private keys to .ssh directory
$sshDir = "$env:USERPROFILE\.ssh"
if (-not (Test-Path $sshDir)) { New-Item -ItemType Directory -Path $sshDir }

Copy-Item "sppppp.txt" "$sshDir\infomaniak_key1"
Copy-Item "sippp.txt" "$sshDir\infomaniak_key2"

# Set secure permissions
icacls "$sshDir\infomaniak_key1" /inheritance:r /grant:r "$env:USERNAME:R"
icacls "$sshDir\infomaniak_key2" /inheritance:r /grant:r "$env:USERNAME:R"

# Create SSH config
$configPath = "$sshDir\config"
$configContent = @"
Host infomaniak
    HostName YOUR_VPS_IP
    User root
    IdentityFile $sshDir\infomaniak_key1
    IdentitiesOnly yes
"@
Set-Content -Path $configPath -Value $configContent
```

**On Windows (Git Bash/WSL):**
```bash
# Copy private key to .ssh directory
mkdir -p ~/.ssh
cp sppppp.txt ~/.ssh/infomaniak_key1
cp sippp.txt ~/.ssh/infomaniak_key2
chmod 600 ~/.ssh/infomaniak_key1
chmod 600 ~/.ssh/infomaniak_key2

# Create SSH config
nano ~/.ssh/config
```

Add to SSH config:
```
Host infomaniak
    HostName YOUR_VPS_IP
    User root
    IdentityFile ~/.ssh/infomaniak_key1
    IdentitiesOnly yes
```

**On Linux/Mac:**
```bash
# Copy private keys
cp sppppp.txt ~/.ssh/infomaniak_key1
cp sippp.txt ~/.ssh/infomaniak_key2
chmod 600 ~/.ssh/infomaniak_key1
chmod 600 ~/.ssh/infomaniak_key2

# Create SSH config
nano ~/.ssh/config
```

Add the same config as above.

### Step 4: Connect Using SSH Key

```bash
# Connect using key
ssh -i ~/.ssh/infomaniak_key1 root@YOUR_VPS_IP

# Or if using SSH config:
ssh infomaniak
```

### ⚠️ Security Warning

**IMPORTANT**: Your private keys (`sppppp.txt` and `sippp.txt`) are sensitive:
- ✅ Keep them secure and never share them
- ✅ Use file permissions: `chmod 600` (Linux/Mac) or restrict access (Windows)
- ✅ Add to `.gitignore` to prevent committing to git
- ✅ Consider using a password-protected key for extra security
- ❌ Never commit private keys to version control
- ❌ Never share private keys via email or chat

---

## VPS Configuration

### Step 1: Connect to Server

**Using SSH Key (Recommended):**
```bash
# Using SSH key
ssh -i ~/.ssh/infomaniak_key1 root@YOUR_VPS_IP

# Or if configured in SSH config:
ssh infomaniak
```

**Using Password:**
```bash
# Connect via SSH with password
ssh root@YOUR_VPS_IP
# Enter password when prompted
```

### Step 2: Update System

```bash
# Update package list
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git build-essential
```

### Step 3: Create Non-Root User (Recommended)

```bash
# Create new user
adduser deploy
usermod -aG sudo deploy

# Add your SSH public key to new user
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
# Copy your public key content here
nano /home/deploy/.ssh/authorized_keys
# Paste public key from sppppp_public_key.txt or sippp_public_key.txt
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh

# Switch to new user
su - deploy
```

**Update SSH config to use deploy user:**
```
Host infomaniak
    HostName YOUR_VPS_IP
    User deploy
    IdentityFile ~/.ssh/infomaniak_key1
    IdentitiesOnly yes
```

---

## Database Setup

You have two options for PostgreSQL:

### Option A: Infomaniak Managed Database (Recommended)

1. **Order Database**:
   - In Infomaniak Manager → **Databases** → **PostgreSQL**
   - Choose plan (minimum: 1GB storage)
   - Note connection details

2. **Get Connection Info**:
   - Host: `postgresql-XXXXX.infomaniak.com`
   - Port: `5432`
   - Database name: `swiss_immigration`
   - Username: Provided by Infomaniak
   - Password: Set during creation

### Option B: Install PostgreSQL on VPS

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE swiss_immigration;
CREATE USER swiss_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE swiss_immigration TO swiss_user;
\q
```

### Step 3: Import Database Schema

```bash
# On your local machine, export schema
cd swiss-immigration-pro
cat lib/database/schema.sql

# Copy schema.sql to server
scp lib/database/schema.sql deploy@YOUR_VPS_IP:/home/deploy/

# On server, import schema
psql -h YOUR_DB_HOST -U swiss_user -d swiss_immigration -f schema.sql
# Or if using local PostgreSQL:
psql -U swiss_user -d swiss_immigration -f schema.sql
```

---

## Server Preparation

### Step 1: Install Node.js

```bash
# Install Node.js 20 (required by package.json)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

### Step 2: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 to start on boot
pm2 startup systemd
# Follow the command it outputs
```

### Step 3: Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Step 4: Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Application Deployment

### Step 1: Clone Repository

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/YOUR_USERNAME/swiss-immigration-pro.git
# Or upload files via SCP/SFTP

cd swiss-immigration-pro
```

### Step 2: Install Dependencies

```bash
# Install npm packages
npm install

# Build the application
npm run build
```

### Step 3: Create Environment File

```bash
# Create .env.local file
nano .env.local
```

Add the following content (adjust values):

```env
# Database Configuration
DB_HOST=postgresql-XXXXX.infomaniak.com
# Or for local: DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=swiss_user
DB_PASSWORD=your_secure_password

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI Configuration
GROQ_API_KEY=gsk_...
OPENAI_API_KEY=sk-...  # Optional

# Application Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production

# NextAuth Configuration (if using)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_random_secret_here
# Generate secret: openssl rand -base64 32
```

Save and exit (Ctrl+X, then Y, then Enter).

### Step 4: Secure Environment File

```bash
# Set proper permissions
chmod 600 .env.local

# Verify it's not tracked by git
echo ".env.local" >> .gitignore
```

---

## Nginx Configuration

### Step 1: Create Nginx Configuration

```bash
# Create site configuration
sudo nano /etc/nginx/sites-available/swiss-immigration
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    # Uncomment after SSL certificate is installed:
    # return 301 https://$server_name$request_uri;

    # For now, proxy to Next.js
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Increase timeouts for long-running requests
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

Save and exit.

### Step 2: Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## SSL Certificate Setup

### Option A: Infomaniak SSL (Easiest)

1. In Infomaniak Manager → **SSL Certificates**
2. Click **Order SSL Certificate**
3. Choose **Let's Encrypt** (free)
4. Select your domain
5. Follow wizard to complete setup
6. Certificate auto-installs on server

### Option B: Certbot (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 3: Update Nginx for HTTPS

After SSL is installed, update Nginx config:

```bash
sudo nano /etc/nginx/sites-available/swiss-immigration
```

Uncomment the redirect line and add HTTPS block:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Domain Configuration

### Step 1: DNS Configuration

In Infomaniak Manager → **Domains** → **DNS**:

1. **A Record**:
   - Name: `@` (or blank)
   - Type: `A`
   - Value: `YOUR_VPS_IP`
   - TTL: `3600`

2. **A Record for WWW**:
   - Name: `www`
   - Type: `A`
   - Value: `YOUR_VPS_IP`
   - TTL: `3600`

3. **Wait for DNS Propagation** (5 minutes to 48 hours)

### Step 2: Verify DNS

```bash
# Check DNS resolution
nslookup yourdomain.com
dig yourdomain.com
```

---

## Process Management with PM2

### Step 1: Create PM2 Ecosystem File

```bash
# Create ecosystem file
nano ecosystem.config.js
```

Add configuration:

```javascript
module.exports = {
  apps: [{
    name: 'swiss-immigration-pro',
    script: 'npm',
    args: 'start',
    cwd: '/home/deploy/swiss-immigration-pro',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/home/deploy/logs/err.log',
    out_file: '/home/deploy/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

### Step 2: Create Logs Directory

```bash
mkdir -p ~/logs
```

### Step 3: Start Application with PM2

```bash
# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Check status
pm2 status

# View logs
pm2 logs swiss-immigration-pro

# Monitor resources
pm2 monit
```

### Step 4: PM2 Useful Commands

```bash
# Restart application
pm2 restart swiss-immigration-pro

# Stop application
pm2 stop swiss-immigration-pro

# Delete from PM2
pm2 delete swiss-immigration-pro

# View logs
pm2 logs swiss-immigration-pro --lines 100

# View real-time logs
pm2 logs swiss-immigration-pro --lines 0
```

---

## Environment Variables

### Required Variables Checklist

Ensure all these are set in `.env.local`:

- [ ] `DB_HOST` - Database hostname
- [ ] `DB_PORT` - Database port (usually 5432)
- [ ] `DB_NAME` - Database name
- [ ] `DB_USER` - Database username
- [ ] `DB_PASSWORD` - Database password
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- [ ] `GROQ_API_KEY` - Groq API key
- [ ] `NEXT_PUBLIC_APP_URL` - Your domain URL
- [ ] `NEXT_PUBLIC_ADMIN_EMAIL` - Admin email
- [ ] `NODE_ENV=production`
- [ ] `NEXTAUTH_URL` - Your domain URL (if using NextAuth)
- [ ] `NEXTAUTH_SECRET` - Random secret (generate with `openssl rand -base64 32`)

---

## Post-Deployment Setup

### Step 1: Create Admin User

Connect to your database and run:

```sql
-- Connect to database
psql -h YOUR_DB_HOST -U swiss_user -d swiss_immigration

-- Create admin user (adjust email/password)
INSERT INTO public.users (id, email, password_hash, email_verified, email_verified_at, created_at)
VALUES (
  gen_random_uuid(),
  'admin@yourdomain.com',
  crypt('your_secure_password', gen_salt('bf')),
  true,
  now(),
  now()
);

-- Get the user ID from above, then:
-- Replace USER_ID_HERE with the UUID from above
INSERT INTO public.profiles (id, email, full_name, is_admin, pack_id)
VALUES (
  'USER_ID_HERE',
  'admin@yourdomain.com',
  'Admin User',
  true,
  'free'
);
```

### Step 2: Configure Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **Webhooks**
3. Click **Add endpoint**
4. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
5. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
6. Copy **Signing secret** and add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### Step 3: Test Application

1. **Homepage**: Visit `https://yourdomain.com`
2. **Login**: Test admin login
3. **AI Chat**: Test chatbot functionality
4. **Stripe**: Test checkout flow (use test mode first)
5. **Database**: Verify data is being saved

### Step 4: Setup Auto-Deployment (Optional)

Create a deployment script:

```bash
# Create deploy script
nano ~/deploy.sh
```

Add:

```bash
#!/bin/bash
cd /home/deploy/swiss-immigration-pro
git pull origin main
npm install
npm run build
pm2 restart swiss-immigration-pro
echo "Deployment complete!"
```

Make executable:

```bash
chmod +x ~/deploy.sh
```

---

## Monitoring & Maintenance

### Daily Tasks

```bash
# Check application status
pm2 status

# Check logs for errors
pm2 logs swiss-immigration-pro --err

# Check server resources
htop
# Or
free -h
df -h
```

### Weekly Tasks

1. **Check Stripe Dashboard** for payments
2. **Review application logs** for errors
3. **Monitor database size** and performance
4. **Check SSL certificate** expiration (auto-renews with Certbot)

### Monthly Tasks

1. **Update dependencies**:
   ```bash
   npm update
   npm audit fix
   npm run build
   pm2 restart swiss-immigration-pro
   ```

2. **Backup database**:
   ```bash
   pg_dump -h YOUR_DB_HOST -U swiss_user swiss_immigration > backup_$(date +%Y%m%d).sql
   ```

3. **Review server resources** and upgrade if needed

### Backup Strategy

```bash
# Create backup script
nano ~/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/deploy/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
pg_dump -h YOUR_DB_HOST -U swiss_user swiss_immigration > $BACKUP_DIR/db_$DATE.sql

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /home/deploy/swiss-immigration-pro

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

Make executable and add to crontab:

```bash
chmod +x ~/backup.sh
crontab -e
# Add: 0 2 * * * /home/deploy/backup.sh
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs swiss-immigration-pro

# Check if port is in use
sudo netstat -tulpn | grep 5000

# Check environment variables
cat .env.local

# Test build locally
npm run build
```

### Database Connection Errors

```bash
# Test database connection
psql -h YOUR_DB_HOST -U swiss_user -d swiss_immigration

# Check firewall rules
sudo ufw status

# Verify credentials in .env.local
```

### Nginx Errors

```bash
# Check Nginx status
sudo systemctl status nginx

# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# Check Nginx SSL configuration
sudo nginx -t
```

### High Memory Usage

```bash
# Check memory usage
pm2 monit

# Restart application
pm2 restart swiss-immigration-pro

# Check for memory leaks in logs
pm2 logs swiss-immigration-pro --err
```

### Application Crashes

```bash
# Check PM2 logs
pm2 logs swiss-immigration-pro --lines 200

# Check system logs
sudo journalctl -u nginx -n 50

# Restart services
pm2 restart swiss-immigration-pro
sudo systemctl restart nginx
```

---

## Performance Optimization

### Enable Gzip Compression

Add to Nginx config:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### Enable Caching

Add to Nginx config:

```nginx
location /_next/static {
    proxy_cache_valid 200 60m;
    add_header Cache-Control "public, immutable";
}
```

### Optimize Node.js

In `ecosystem.config.js`, adjust:

```javascript
max_memory_restart: '1G',  // Adjust based on VPS RAM
instances: 1,  // Increase if multi-core CPU
```

---

## Security Best Practices

1. **Keep system updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords** for database and admin accounts

3. **Enable firewall** (already done):
   ```bash
   sudo ufw status
   ```

4. **Regular backups** (setup cron job)

5. **Monitor logs** for suspicious activity

6. **Keep dependencies updated**:
   ```bash
   npm audit
   npm audit fix
   ```

7. **Use HTTPS only** (SSL certificate)

8. **Restrict SSH access** (optional):
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Change: PermitRootLogin no
   # Add: AllowUsers deploy
   sudo systemctl restart sshd
   ```

---

## Support & Resources

### Infomaniak Support
- **Documentation**: [infomaniak.com/support](https://www.infomaniak.com/support)
- **Support Ticket**: Available in Infomaniak Manager
- **Community**: [community.infomaniak.com](https://community.infomaniak.com)

### Application Resources
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **PM2 Docs**: [pm2.keymetrics.io/docs](https://pm2.keymetrics.io/docs)
- **Nginx Docs**: [nginx.org/en/docs](https://nginx.org/en/docs)

### Database Resources
- **PostgreSQL Docs**: [postgresql.org/docs](https://www.postgresql.org/docs)

---

## Quick Reference Commands

```bash
# Application
pm2 start ecosystem.config.js
pm2 restart swiss-immigration-pro
pm2 stop swiss-immigration-pro
pm2 logs swiss-immigration-pro

# Nginx
sudo systemctl restart nginx
sudo nginx -t
sudo tail -f /var/log/nginx/error.log

# Database
psql -h HOST -U USER -d DATABASE
pg_dump -h HOST -U USER DATABASE > backup.sql

# System
sudo apt update && sudo apt upgrade -y
sudo systemctl status nginx
free -h
df -h
```

---

## ✅ Deployment Checklist

- [ ] VPS ordered and configured
- [ ] Database created and schema imported
- [ ] Node.js 20 installed
- [ ] Application cloned and built
- [ ] Environment variables configured
- [ ] PM2 process manager installed and configured
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Firewall rules set
- [ ] Admin user created
- [ ] Stripe webhooks configured
- [ ] Application tested and working
- [ ] Backups configured
- [ ] Monitoring setup

---

**🎉 Congratulations! Your application is now live on Infomaniak!**

For questions or issues, refer to the troubleshooting section or contact Infomaniak support.

