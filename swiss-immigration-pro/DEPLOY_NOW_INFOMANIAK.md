# 🚀 Quick Deploy to Infomaniak VPS - RIGHT NOW

## Prerequisites

Before starting, make sure you have:
- ✅ Infomaniak VPS IP address
- ✅ SSH access to your VPS (password or SSH key)
- ✅ Domain name (optional - can use IP initially)

## Quick Deployment (5 minutes)

### Option 1: Interactive Script (Recommended)

Run the interactive deployment script:

```powershell
cd swiss-immigration-pro
.\deploy-infomaniak-interactive.ps1
```

The script will:
1. ✅ Ask for your VPS IP address
2. ✅ Set up SSH keys automatically
3. ✅ Test SSH connection
4. ✅ Install Node.js, PM2, Nginx on server
5. ✅ Build your application
6. ✅ Upload files to server
7. ✅ Install dependencies
8. ✅ Start application with PM2
9. ✅ Configure Nginx

### Option 2: Manual Deployment

If you prefer manual control:

```powershell
# 1. Build application
cd swiss-immigration-pro
npm run build

# 2. Deploy using the automated script
.\deploy-infomaniak.ps1 -VpsIp "YOUR_VPS_IP"
```

## After Deployment

### 1. Configure Environment Variables

SSH to your server and edit `.env.local`:

```bash
ssh deploy@YOUR_VPS_IP
# Or: ssh root@YOUR_VPS_IP

cd ~/swiss-immigration-pro
nano .env.local
```

Update with your values:
```env
DB_HOST=postgresql-XXXXX.infomaniak.com
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=your_db_user
DB_PASSWORD=your_db_password

NEXT_PUBLIC_APP_URL=http://YOUR_VPS_IP
# Or: NEXT_PUBLIC_APP_URL=https://yourdomain.com

NODE_ENV=production
PORT=5000
```

### 2. Restart Application

```bash
pm2 restart swiss-immigration-pro
pm2 logs swiss-immigration-pro
```

### 3. Configure SSL (HTTPS)

**Option A: Via Infomaniak Manager (Easiest)**
1. Log in to [Infomaniak Manager](https://manager.infomaniak.com)
2. Go to **SSL Certificates**
3. Click **Order SSL Certificate**
4. Choose **Let's Encrypt** (free)
5. Select your domain
6. Follow wizard

**Option B: Via Certbot**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 4. Configure Domain DNS

In Infomaniak Manager → **Domains** → **DNS**:
- Add **A Record**: `@` → `YOUR_VPS_IP`
- Add **A Record**: `www` → `YOUR_VPS_IP`

## Verify Deployment

1. **Check Application Status:**
   ```bash
   ssh deploy@YOUR_VPS_IP
   pm2 status
   pm2 logs swiss-immigration-pro
   ```

2. **Check Nginx:**
   ```bash
   sudo systemctl status nginx
   sudo nginx -t
   ```

3. **Visit Your Site:**
   - HTTP: `http://YOUR_VPS_IP`
   - HTTPS: `https://yourdomain.com` (after SSL setup)

## Troubleshooting

### Application Not Starting
```bash
pm2 logs swiss-immigration-pro --lines 100
pm2 restart swiss-immigration-pro
```

### Nginx Errors
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
sudo systemctl restart nginx
```

### Database Connection Issues
```bash
# Test connection
psql -h YOUR_DB_HOST -U YOUR_DB_USER -d swiss_immigration
```

## Useful Commands

```bash
# Application
pm2 restart swiss-immigration-pro
pm2 stop swiss-immigration-pro
pm2 logs swiss-immigration-pro
pm2 monit

# Nginx
sudo systemctl restart nginx
sudo nginx -t

# System
sudo apt update && sudo apt upgrade -y
```

## Need Help?

- See `INFOMANIAK_DEPLOYMENT.md` for detailed guide
- See `INFOMANIAK_SSH_SETUP.md` for SSH setup
- See `DEPLOY_INFOMANIAK_QUICK.md` for quick reference

---

**🎉 Your application will be live in minutes!**

