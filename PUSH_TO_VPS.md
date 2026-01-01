# Push Changes to VPS - Quick Guide

## Current Status
✅ Your code is already pushed to GitHub (branch is up to date)
✅ No local changes to commit

## Deploy to VPS - Choose Your Method

### Method 1: Via Infomaniak Control Panel (Easiest)

1. **Log into Infomaniak Control Panel**
2. **Access your VPS Management**
3. **Open Web Console/SSH Terminal**
4. **Run this complete deployment command:**

```bash
cd swiss-immigration-pro && git pull origin main && npm install && npm run build && pm2 stop swiss-immigration-pro 2>/dev/null; pm2 delete swiss-immigration-pro 2>/dev/null; pm2 start npm --name "swiss-immigration-pro" -- start && pm2 save && pm2 status
```

### Method 2: Step-by-Step Deployment

Run these commands one by one in the web console:

```bash
# 1. Navigate to project
cd swiss-immigration-pro

# 2. Pull latest changes from GitHub
git pull origin main

# 3. Install any new dependencies
npm install

# 4. Build the application
npm run build

# 5. Stop existing process
pm2 stop swiss-immigration-pro
pm2 delete swiss-immigration-pro

# 6. Start the application
pm2 start npm --name "swiss-immigration-pro" -- start

# 7. Save PM2 configuration
pm2 save

# 8. Check status
pm2 status
```

### Method 3: If PM2 is not working

```bash
cd swiss-immigration-pro
git pull origin main
npm install
npm run build
pkill -f node
nohup npm start > /dev/null 2>&1 &
```

## What This Does

1. ✅ Pulls latest code from GitHub
2. ✅ Installs/updates dependencies
3. ✅ Builds the Next.js application
4. ✅ Restarts the application with PM2
5. ✅ Saves the PM2 configuration

## Verify Deployment

After running the commands, check:
- `pm2 status` - Should show the app as "online"
- Visit your website URL to confirm it's working
- Check logs: `pm2 logs swiss-immigration-pro`

## Troubleshooting

If build fails:
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

If PM2 process doesn't start:
```bash
pm2 logs swiss-immigration-pro
pm2 restart swiss-immigration-pro
```





