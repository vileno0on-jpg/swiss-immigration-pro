# 🚀 Start Deployment to Infomaniak VPS - RIGHT NOW

## Quick Start - Deploy in 10 Minutes

### What You Need First:
1. **Infomaniak VPS IP address** (e.g., `123.456.78.90`)
2. **SSH key** located at: `C:\Users\vilen\.ssh\infomaniak_key1`

---

## Step-by-Step Deployment

### Step 1: Build the Application

Open PowerShell in your project directory and run:

```powershell
cd "C:\Users\vilen\Downloads\New folder\swiss-immigration-pro"
npm run build
```

Wait for build to complete (2-3 minutes).

---

### Step 2: Deploy Using the Script

**Replace `YOUR_VPS_IP` with your actual Infomaniak VPS IP address:**

```powershell
.\deploy-infomaniak.ps1 -VpsIp "YOUR_VPS_IP" -SshUser "root"
```

**Example:**
```powershell
.\deploy-infomaniak.ps1 -VpsIp "123.456.78.90" -SshUser "root"
```

This script will:
- ✅ Build the application
- ✅ Upload files to your server
- ✅ Install dependencies
- ✅ Start the application with PM2

---

### Step 3: Initial Server Setup (One-Time Only)

If this is your first deployment, connect to your server and run:

```powershell
# Connect to server
ssh -i "$env:USERPROFILE\.ssh\infomaniak_key1" root@YOUR_VPS_IP

# On the server, run:
./setup-server.sh
```

**Or manually install:**

```bash
# On your server
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
sudo apt install -y nginx
```

---

### Step 4: Configure Environment Variables

On your server:

```bash
cd ~/swiss-immigration-pro
nano .env.local
```

**Add your environment variables** (copy from `env.local.txt` and update values):

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=your_password_here
NEXT_PUBLIC_APP_URL=http://YOUR_VPS_IP
# ... (add all other variables)
```

Save: `Ctrl+X`, then `Y`, then `Enter`

---

### Step 5: Configure Nginx

On your server:

```bash
sudo nano /etc/nginx/sites-available/swiss-immigration
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name YOUR_VPS_IP;

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

### Step 6: Start Application

On your server:

```bash
cd ~/swiss-immigration-pro
npm install
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
# Follow the command it outputs
```

---

### Step 7: Configure Firewall

On your server:

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## ✅ Your Site is Now Live!

Visit: **http://YOUR_VPS_IP**

---

## 🆘 Need Help?

**Check your VPS IP:**
- Log in to Infomaniak Manager
- Go to Cloud → VPS → Your VPS
- Copy the IP address

**Can't connect via SSH?**
- See: `INFOMANIAK_SSH_SETUP.md`

**Need detailed instructions?**
- See: `DEPLOY_INFOMANIAK_FROM_SCRATCH.md`

---

**Ready? Start with Step 1 above! 🚀**


