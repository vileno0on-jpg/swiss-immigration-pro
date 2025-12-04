# 🚀 Manual Deployment Steps - Infomaniak VPS

**Your VPS IP:** `83.228.215.185`

## Step 1: Connect to Your Server

**Option A: Using PuTTY (Windows)**
1. Download PuTTY: https://www.putty.org
2. Open PuTTY
3. Enter:
   - Host: `83.228.215.185`
   - Port: `22`
   - Connection type: SSH
4. Click "Open"
5. Login: `root`
6. Enter password

**Option B: Using PowerShell/Command Prompt**
```powershell
ssh root@83.228.215.185
```

---

## Step 2: Initial Server Setup (One-Time)

Once connected, run these commands:

```bash
# Update system
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git build-essential

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install PostgreSQL (if not using Infomaniak managed DB)
apt install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql
```

---

## Step 3: Clone Your Repository

```bash
cd ~
git clone https://github.com/vileno0on-jpg/swiss-immigration-pro.git
cd swiss-immigration-pro
```

---

## Step 4: Setup Database

**If using local PostgreSQL:**

```bash
# Create database
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE swiss_immigration;
CREATE USER swiss_user WITH ENCRYPTED PASSWORD 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON DATABASE swiss_immigration TO swiss_user;
\q
```

**If using Infomaniak Managed PostgreSQL:**
- Get connection details from Infomaniak Manager
- Note: Host, Port, Database name, User, Password

---

## Step 5: Configure Environment Variables

```bash
cd ~/swiss-immigration-pro
nano .env.local
```

**Add your environment variables:**

```env
# Database
DB_HOST=localhost
# Or for Infomaniak: DB_HOST=postgresql-XXXXX.infomaniak.com
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=swiss_user
DB_PASSWORD=YourSecurePassword123!

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
GROQ_API_KEY=gsk_...
OPENAI_API_KEY=sk-...

# App
NEXT_PUBLIC_APP_URL=http://83.228.215.185
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production

# NextAuth
NEXTAUTH_URL=http://83.228.215.185
NEXTAUTH_SECRET=OnWM2hyya2bw7hGAifFMoObTVlDK0KwbBbdp2WEeslM=
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

---

## Step 6: Install Dependencies and Build

```bash
cd ~/swiss-immigration-pro
npm install
npm run build
```

---

## Step 7: Configure PM2

```bash
# Check ecosystem.config.js exists
cat ecosystem.config.js

# Create logs directory
mkdir -p ~/logs

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs (copy and run it)
```

---

## Step 8: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/swiss-immigration
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name 83.228.215.185;

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

**Save and enable:**

```bash
sudo ln -s /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 9: Configure Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## Step 10: Test Your Site

**Visit in browser:**
```
http://83.228.215.185
```

**Your site should now be live! 🎉**

---

## Useful Commands

```bash
# View application logs
pm2 logs swiss-immigration-pro

# Restart application
pm2 restart swiss-immigration-pro

# Check status
pm2 status

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## Next Steps

1. **Setup SSL Certificate** (for HTTPS)
2. **Configure Domain** (point DNS to your IP)
3. **Create Admin User** (in database)

---

**Need help? Check the logs or see DEPLOY_INFOMANIAK_FROM_SCRATCH.md for detailed instructions!**

