# 🚀 Deploy Online from Scratch - Complete Guide

Deploy your Swiss Immigration Pro site to your own server/VPS **without using Vercel, Netlify, or any hosting platforms**.

---

## 📋 What You Need

1. **A VPS/Server** (any provider):
   - DigitalOcean, Linode, Hetzner, AWS EC2, Google Cloud, Azure, or any Linux VPS
   - Minimum: 2GB RAM, 1 vCPU, 20GB storage
   - Recommended: 4GB RAM, 2 vCPU, 50GB storage
   - OS: Ubuntu 22.04 LTS or Debian 12

2. **Domain name** (optional - you can use IP address initially)

3. **SSH access** to your server

---

## 🎯 Step 1: Get a VPS Server

### Option A: DigitalOcean (Recommended - $6/month)

1. Go to: https://www.digitalocean.com
2. Sign up
3. Create Droplet:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic - $6/month (1GB RAM) or $12/month (2GB RAM)
   - **Region**: Choose closest to your users
   - **Authentication**: SSH keys (recommended) or password
4. Click **Create Droplet**
5. **Save your IP address**: e.g., `123.456.78.90`

### Option B: Linode ($5/month)

1. Go to: https://www.linode.com
2. Create Linode:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Nanode 1GB ($5/month)
   - **Region**: Choose closest
3. Create and save IP address

### Option C: Any Other Provider

Use any VPS provider you prefer. Just make sure you have:
- Ubuntu 22.04 or Debian 12
- Root/SSH access
- Public IP address

---

## 🔐 Step 2: Connect to Your Server

**On Windows (PowerShell):**

```powershell
# Connect via SSH
ssh root@YOUR_SERVER_IP

# Or if you have SSH keys
ssh -i C:\Users\vilen\.ssh\your_key root@YOUR_SERVER_IP
```

**On Windows (PuTTY):**
- Download PuTTY: https://www.putty.org
- Enter IP address
- Port: 22
- Click "Open"
- Login: `root` (or your username)
- Enter password when prompted

---

## 🛠️ Step 3: Initial Server Setup

Once connected to your server, run these commands:

```bash
# Update system
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git build-essential

# Create a non-root user (recommended)
adduser deploy
usermod -aG sudo deploy

# Switch to new user
su - deploy
```

---

## 📦 Step 4: Install Node.js 20

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

---

## 🗄️ Step 5: Install PostgreSQL Database

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt, run:
CREATE DATABASE swiss_immigration;
CREATE USER swiss_user WITH ENCRYPTED PASSWORD 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON DATABASE swiss_immigration TO swiss_user;
\q

# Exit PostgreSQL
```

**Save your database password!**

---

## 📝 Step 6: Upload Your Application Code

### Option A: Using Git (Recommended)

```bash
# On your server
cd ~
git clone https://github.com/vileno0on-jpg/swiss-immigration-pro.git
cd swiss-immigration-pro
```

### Option B: Using SCP (from your local Windows machine)

```powershell
# In PowerShell on your local machine
cd "C:\Users\vilen\Downloads\New folder"
scp -r swiss-immigration-pro root@YOUR_SERVER_IP:/home/deploy/
```

### Option C: Using SFTP Client (WinSCP)

1. Download WinSCP: https://winscp.net
2. Connect to your server
3. Upload the `swiss-immigration-pro` folder to `/home/deploy/`

---

## ⚙️ Step 7: Configure Environment Variables

```bash
# On your server
cd ~/swiss-immigration-pro

# Create .env.local file
nano .env.local
```

Add this content (replace with your values):

```env
# Database (use your PostgreSQL settings)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=swiss_user
DB_PASSWORD=YourSecurePassword123!

# Stripe (get from stripe.com/dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI (get from console.groq.com)
GROQ_API_KEY=gsk_...
OPENAI_API_KEY=sk-...

# App Configuration
NEXT_PUBLIC_APP_URL=http://YOUR_SERVER_IP
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production

# NextAuth
NEXTAUTH_URL=http://YOUR_SERVER_IP
NEXTAUTH_SECRET=generate_random_secret_here
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Save file: `Ctrl + X`, then `Y`, then `Enter`

---

## 📊 Step 8: Setup Database Schema

```bash
# On your server
cd ~/swiss-immigration-pro

# Check if you have schema.sql file
ls lib/database/

# If schema exists, import it
psql -U swiss_user -d swiss_immigration -f lib/database/schema.sql

# Or create tables manually (if no schema file)
# Check CREATE_DATABASE.sql file if it exists
```

---

## 📦 Step 9: Install Dependencies and Build

```bash
# On your server
cd ~/swiss-immigration-pro

# Install npm packages
npm install

# Build the application
npm run build

# This will create .next folder with production build
```

---

## 🚀 Step 10: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Create ecosystem config (if not exists)
cat > ecosystem.config.js << 'EOF'
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
EOF

# Create logs directory
mkdir -p ~/logs

# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration (survives reboots)
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs (usually involves sudo)

# Check status
pm2 status
pm2 logs swiss-immigration-pro
```

---

## 🌐 Step 11: Install and Configure Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/swiss-immigration
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_SERVER_IP;  # Or your domain name

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

Save: `Ctrl + X`, `Y`, `Enter`

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 Step 12: Configure Firewall

```bash
# Install UFW firewall
sudo apt install -y ufw

# Allow SSH (important - don't lock yourself out!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## ✅ Step 13: Test Your Site

**Open in browser:**
```
http://YOUR_SERVER_IP
```

Your site should now be live! 🎉

---

## 🔐 Step 14: Setup SSL Certificate (HTTPS) - Optional but Recommended

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# If you have a domain name, get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

**Update Nginx config for HTTPS:**

```bash
sudo nano /etc/nginx/sites-available/swiss-immigration
```

Replace with:

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

## 🎯 Step 15: Create Admin User

```bash
# Connect to database
psql -U swiss_user -d swiss_immigration

# Create admin user (replace email/password)
INSERT INTO public.users (id, email, password_hash, email_verified, created_at)
VALUES (
  gen_random_uuid(),
  'admin@yourdomain.com',
  crypt('YourSecurePassword123!', gen_salt('bf')),
  true,
  now()
);

# Get the user ID, then create profile
# Replace USER_ID with UUID from above
INSERT INTO public.profiles (id, email, full_name, is_admin, pack_id)
VALUES (
  'USER_ID_FROM_ABOVE',
  'admin@yourdomain.com',
  'Admin User',
  true,
  'free'
);

\q
```

---

## 📊 Step 16: Useful Commands

### Application Management

```bash
# View application logs
pm2 logs swiss-immigration-pro

# Restart application
pm2 restart swiss-immigration-pro

# Stop application
pm2 stop swiss-immigration-pro

# View application status
pm2 status

# Monitor resources
pm2 monit
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

### Database Management

```bash
# Connect to database
psql -U swiss_user -d swiss_immigration

# Backup database
pg_dump -U swiss_user swiss_immigration > backup_$(date +%Y%m%d).sql

# Restore database
psql -U swiss_user -d swiss_immigration < backup_file.sql
```

---

## 🔄 Updating Your Application

When you make changes and push to GitHub:

```bash
# On your server
cd ~/swiss-immigration-pro

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Restart application
pm2 restart swiss-immigration-pro
```

---

## 🆘 Troubleshooting

### Application Not Loading

```bash
# Check if PM2 is running
pm2 status

# Check application logs
pm2 logs swiss-immigration-pro

# Check if port 5000 is listening
sudo netstat -tulpn | grep 5000

# Restart application
pm2 restart swiss-immigration-pro
```

### Nginx Errors

```bash
# Check Nginx status
sudo systemctl status nginx

# Test configuration
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### Database Connection Errors

```bash
# Test database connection
psql -U swiss_user -d swiss_immigration

# Check PostgreSQL status
sudo systemctl status postgresql

# View PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

---

## ✅ Deployment Checklist

- [ ] VPS server created and running
- [ ] SSH access working
- [ ] Node.js 20 installed
- [ ] PostgreSQL installed and database created
- [ ] Application code uploaded
- [ ] Environment variables configured
- [ ] Database schema imported
- [ ] Dependencies installed
- [ ] Application built successfully
- [ ] PM2 installed and application running
- [ ] Nginx installed and configured
- [ ] Firewall configured
- [ ] Site accessible via HTTP
- [ ] SSL certificate installed (optional)
- [ ] Admin user created
- [ ] Site fully functional

---

## 🌍 Your Site is Now Live!

**Access your site at:**
- HTTP: `http://YOUR_SERVER_IP`
- HTTPS: `https://YOUR_SERVER_IP` (if SSL configured)
- Domain: `https://yourdomain.com` (if domain configured)

**Congratulations! Your site is now online! 🎉**

---

## 💰 Cost Estimate

- **VPS**: $5-12/month (DigitalOcean, Linode, etc.)
- **Domain**: $10-15/year (optional)
- **SSL**: Free (Let's Encrypt)
- **Total**: ~$5-12/month

---

**Questions? Check the troubleshooting section or server logs!**





