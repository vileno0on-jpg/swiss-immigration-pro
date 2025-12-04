# 🚀 Deploy to Infomaniak VPS - Complete Guide from Scratch

Deploy your Swiss Immigration Pro site to Infomaniak VPS **without using Vercel, Netlify, or any hosting platforms**.

---

## 📋 Prerequisites Checklist

- [ ] Infomaniak account (sign up at https://www.infomaniak.com)
- [ ] VPS ordered from Infomaniak
- [ ] VPS IP address noted
- [ ] SSH keys ready (see Step 2)
- [ ] Domain name (optional - can use IP initially)

---

## 🎯 Step 1: Order Infomaniak VPS

### Create Infomaniak Account

1. Go to: https://www.infomaniak.com
2. Click **"Sign Up"** or **"Log In"**
3. Complete registration

### Order VPS

1. In Infomaniak Manager, go to **Cloud** → **VPS**
2. Click **"Order a VPS"**
3. Choose configuration:
   - **Minimum**: 2 vCPU, 4GB RAM, 50GB SSD (~CHF 5-10/month)
   - **Recommended**: 4 vCPU, 8GB RAM, 100GB SSD (~CHF 15-20/month)
   - **OS**: Ubuntu 22.04 LTS or Debian 12
4. **Region**: Choose closest to your users
5. **SSH Key**: We'll set this up in next step
6. Complete purchase

**Wait 5-10 minutes for VPS to be provisioned**

### Get Your VPS Details

1. In Infomaniak Manager → **Cloud** → **VPS** → Your VPS
2. Note down:
   - **IP Address**: e.g., `123.456.78.90`
   - **Root Password** (if using password auth)
   - **SSH Port**: Usually `22`

---

## 🔐 Step 2: Setup SSH Keys

### Option A: If You Already Have SSH Keys

If you have `sppppp.txt` and `sippp.txt` files:

**On Windows (PowerShell):**

```powershell
# Create .ssh directory
if (-not (Test-Path "$env:USERPROFILE\.ssh")) { 
    New-Item -ItemType Directory -Path "$env:USERPROFILE\.ssh" 
}

# Copy keys to .ssh directory
Copy-Item "C:\Users\vilen\Downloads\sppppp.txt" "$env:USERPROFILE\.ssh\infomaniak_key1"
Copy-Item "C:\Users\vilen\Downloads\sippp.txt" "$env:USERPROFILE\.ssh\infomaniak_key2"

# Set secure permissions
icacls "$env:USERPROFILE\.ssh\infomaniak_key1" /inheritance:r /grant:r "$env:USERNAME:R"
icacls "$env:USERPROFILE\.ssh\infomaniak_key2" /inheritance:r /grant:r "$env:USERNAME:R"
```

### Option B: Generate New SSH Keys

**On Windows (PowerShell with OpenSSH):**

```powershell
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -f "$env:USERPROFILE\.ssh\infomaniak_key" -N '""'

# This creates:
# - infomaniak_key (private key)
# - infomaniak_key.pub (public key)

# View public key
Get-Content "$env:USERPROFILE\.ssh\infomaniak_key.pub"
```

### Add Public Key to Infomaniak VPS

**Method 1: During VPS Creation**
- In Infomaniak Manager, when ordering VPS
- Paste your public key in the SSH key field

**Method 2: After VPS Creation**

1. **First, connect with password:**
   ```powershell
   ssh root@YOUR_VPS_IP
   # Enter root password when prompted
   ```

2. **On the server, add your public key:**
   ```bash
   # Create .ssh directory
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   
   # Add your public key (paste the content)
   nano ~/.ssh/authorized_keys
   # Paste your public key content
   # Save: Ctrl+X, Y, Enter
   
   chmod 600 ~/.ssh/authorized_keys
   ```

3. **Test SSH key connection:**
   ```powershell
   # From your local machine
   ssh -i "$env:USERPROFILE\.ssh\infomaniak_key1" root@YOUR_VPS_IP
   ```

### Create SSH Config (Optional - Makes connection easier)

**On Windows, create SSH config:**

```powershell
# Create SSH config file
$configPath = "$env:USERPROFILE\.ssh\config"
$configContent = @"
Host infomaniak
    HostName YOUR_VPS_IP
    User root
    IdentityFile $env:USERPROFILE\.ssh\infomaniak_key1
    IdentitiesOnly yes
"@

Set-Content -Path $configPath -Value $configContent
```

**Now you can connect simply with:**
```powershell
ssh infomaniak
```

---

## 🖥️ Step 3: Initial Server Setup

Connect to your VPS:

```powershell
# Using SSH key
ssh -i "$env:USERPROFILE\.ssh\infomaniak_key1" root@YOUR_VPS_IP

# Or if config is set up
ssh infomaniak
```

**On the server, run:**

```bash
# Update system
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git build-essential

# Create non-root user (recommended for security)
adduser deploy
usermod -aG sudo deploy

# Copy SSH key to new user
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Switch to deploy user
su - deploy
```

---

## 📦 Step 4: Install Node.js 20

```bash
# On your VPS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

---

## 🗄️ Step 5: Install PostgreSQL Database

### Option A: Infomaniak Managed PostgreSQL (Recommended)

1. In Infomaniak Manager → **Databases** → **PostgreSQL**
2. Click **"Order Database"**
3. Choose plan (minimum: 1GB storage)
4. Note connection details:
   - **Host**: `postgresql-XXXXX.infomaniak.com`
   - **Port**: `5432`
   - **Database**: Create one (e.g., `swiss_immigration`)
   - **User**: Provided by Infomaniak
   - **Password**: Set during creation

### Option B: Install PostgreSQL on VPS

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE swiss_immigration;
CREATE USER swiss_user WITH ENCRYPTED PASSWORD 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON DATABASE swiss_immigration TO swiss_user;
\q
```

**Save your database credentials!**

---

## 📝 Step 6: Upload Application Code

### Option A: Using Git (Recommended)

```bash
# On your VPS
cd ~
git clone https://github.com/vileno0on-jpg/swiss-immigration-pro.git
cd swiss-immigration-pro
```

### Option B: Using Automated Deployment Script

**On your local Windows machine:**

```powershell
# Make sure you're in project directory
cd "C:\Users\vilen\Downloads\New folder\swiss-immigration-pro"

# Run deployment script
.\deploy-infomaniak.ps1 -VpsIp "YOUR_VPS_IP"
```

### Option C: Using SCP (Manual Upload)

**On your local Windows machine:**

```powershell
# Upload entire project
scp -i "$env:USERPROFILE\.ssh\infomaniak_key1" -r swiss-immigration-pro deploy@YOUR_VPS_IP:~/ 
```

---

## ⚙️ Step 7: Configure Environment Variables

```bash
# On your VPS
cd ~/swiss-immigration-pro

# Copy environment template
cp env.local.txt .env.local

# Edit environment variables
nano .env.local
```

**Update with your values:**

```env
# Database Configuration
DB_HOST=postgresql-XXXXX.infomaniak.com
# Or if local: DB_HOST=localhost
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
NEXT_PUBLIC_APP_URL=http://YOUR_VPS_IP
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production

# NextAuth
NEXTAUTH_URL=http://YOUR_VPS_IP
NEXTAUTH_SECRET=OnWM2hyya2bw7hGAifFMoObTVlDK0KwbBbdp2WEeslM=
```

**To generate new NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Save file:** `Ctrl + X`, then `Y`, then `Enter`

**Secure the file:**
```bash
chmod 600 .env.local
```

---

## 📊 Step 8: Setup Database Schema

```bash
# On your VPS
cd ~/swiss-immigration-pro

# Check if schema file exists
ls lib/database/schema.sql

# If schema exists, import it
psql -h YOUR_DB_HOST -U swiss_user -d swiss_immigration -f lib/database/schema.sql

# Or if using local PostgreSQL
psql -U swiss_user -d swiss_immigration -f lib/database/schema.sql
```

**Or use the setup script if available:**
```bash
node setup-database.js
```

---

## 🚀 Step 9: Run Server Setup Script

```bash
# On your VPS
cd ~/swiss-immigration-pro

# Make setup script executable
chmod +x setup-server.sh

# Run setup script (installs PM2, Nginx, firewall)
./setup-server.sh
```

**This script installs:**
- ✅ PM2 process manager
- ✅ Nginx web server
- ✅ Firewall configuration

---

## 📦 Step 10: Install Dependencies and Build

```bash
# On your VPS
cd ~/swiss-immigration-pro

# Install npm packages
npm install

# Build the application for production
npm run build

# This creates .next folder with production build
```

---

## 🔧 Step 11: Configure PM2 (Process Manager)

```bash
# On your VPS
cd ~/swiss-immigration-pro

# Check ecosystem.config.js exists
cat ecosystem.config.js

# If it doesn't exist, create it:
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
# Follow the command it outputs (copy and run it)

# Check status
pm2 status
pm2 logs swiss-immigration-pro --lines 50
```

---

## 🌐 Step 12: Configure Nginx

```bash
# On your VPS
sudo nano /etc/nginx/sites-available/swiss-immigration
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name YOUR_VPS_IP;  # Or your domain name

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
        
        # Increase timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

**Save:** `Ctrl + X`, `Y`, `Enter`

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

## 🔒 Step 13: Configure Firewall

```bash
# Install UFW firewall (if not installed)
sudo apt install -y ufw

# Allow SSH (important!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
echo "y" | sudo ufw enable

# Check status
sudo ufw status
```

---

## ✅ Step 14: Test Your Site

**Open in browser:**
```
http://YOUR_VPS_IP
```

**Your site should now be live! 🎉**

---

## 🔐 Step 15: Setup SSL Certificate (HTTPS)

### Using Infomaniak SSL (Easiest)

1. In Infomaniak Manager → **SSL Certificates**
2. Click **"Order SSL Certificate"**
3. Choose **Let's Encrypt** (free)
4. Select your domain
5. Follow wizard - certificate auto-installs

### Using Certbot (Alternative)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# If you have domain name, get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 👤 Step 16: Create Admin User

```bash
# Connect to database
psql -h YOUR_DB_HOST -U swiss_user -d swiss_immigration

# Create admin user
INSERT INTO public.users (id, email, password_hash, email_verified, created_at)
VALUES (
  gen_random_uuid(),
  'admin@yourdomain.com',
  crypt('YourSecurePassword123!', gen_salt('bf')),
  true,
  now()
);

# Get the user ID from above, then create profile
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

## 🎯 Step 17: Configure Domain (Optional)

### In Infomaniak Manager

1. Go to **Domains** → Your domain
2. Click **DNS**
3. Add **A Record**:
   - **Name**: `@` (or blank)
   - **Type**: `A`
   - **Value**: `YOUR_VPS_IP`
   - **TTL**: `3600`
4. Add **A Record for WWW**:
   - **Name**: `www`
   - **Type**: `A`
   - **Value**: `YOUR_VPS_IP`
   - **TTL**: `3600`

**Wait 5 minutes to 48 hours for DNS propagation**

---

## 📊 Useful Commands

### Application Management

```bash
# View application logs
pm2 logs swiss-immigration-pro

# Restart application
pm2 restart swiss-immigration-pro

# Stop application
pm2 stop swiss-immigration-pro

# View status
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

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### Database Management

```bash
# Connect to database
psql -h YOUR_DB_HOST -U swiss_user -d swiss_immigration

# Backup database
pg_dump -h YOUR_DB_HOST -U swiss_user swiss_immigration > backup_$(date +%Y%m%d).sql
```

---

## 🔄 Updating Your Application

When you make changes:

```bash
# On your VPS
cd ~/swiss-immigration-pro

# Pull latest changes from GitHub
git pull origin main

# Install new dependencies
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
# Check PM2 status
pm2 status

# Check logs
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

### Database Connection

```bash
# Test database connection
psql -h YOUR_DB_HOST -U swiss_user -d swiss_immigration

# Check PostgreSQL status (if local)
sudo systemctl status postgresql
```

---

## ✅ Deployment Checklist

- [ ] Infomaniak VPS ordered and running
- [ ] SSH keys set up and working
- [ ] Server updated and tools installed
- [ ] Node.js 20 installed
- [ ] PostgreSQL database ready (Infomaniak or local)
- [ ] Application code uploaded
- [ ] Environment variables configured
- [ ] Database schema imported
- [ ] Dependencies installed
- [ ] Application built successfully
- [ ] PM2 installed and application running
- [ ] Nginx installed and configured
- [ ] Firewall configured
- [ ] Site accessible via HTTP
- [ ] SSL certificate installed
- [ ] Admin user created
- [ ] Domain configured (optional)
- [ ] Site fully functional

---

## 🌍 Your Site is Now Live!

**Access your site at:**
- HTTP: `http://YOUR_VPS_IP`
- HTTPS: `https://YOUR_VPS_IP` (if SSL configured)
- Domain: `https://yourdomain.com` (if domain configured)

**Congratulations! Your site is now online on Infomaniak VPS! 🎉**

---

## 💰 Cost Estimate

- **Infomaniak VPS**: CHF 5-20/month (depending on plan)
- **Infomaniak PostgreSQL**: CHF 3-10/month (optional - can use local)
- **Domain**: CHF 10-15/year (optional)
- **SSL**: Free (Let's Encrypt)
- **Total**: ~CHF 5-30/month

---

**Questions? Check INFOMANIAK_DEPLOYMENT.md for detailed troubleshooting!**

