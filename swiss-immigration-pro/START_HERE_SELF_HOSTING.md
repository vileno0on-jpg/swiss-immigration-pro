# 🚀 START HERE - Self-Hosting Setup

## ✅ What's Already Done

1. ✅ PostgreSQL client packages installed (`pg`, `@types/pg`)
2. ✅ Database client files created (`lib/db.ts`, `lib/db-client.ts`)
3. ✅ Code updated to auto-detect local database
4. ✅ Environment template created (`.env.local.template`)
5. ✅ Setup scripts created

## 📋 Quick Setup (3 Steps)

### Step 1: Install PostgreSQL (if not installed)

1. Download: https://www.postgresql.org/download/windows/
2. Install with default settings
3. **Remember your postgres user password!**

### Step 2: Configure Environment

**Option A: Use PowerShell script**
```powershell
powershell -ExecutionPolicy Bypass -File setup-env.ps1
```

**Option B: Manual**
1. Copy `.env.local.template` to `.env.local`
2. Edit `.env.local` and set:
   - `DB_PASSWORD` = your PostgreSQL password
   - Add your AI API keys (if you have them)

### Step 3: Run Complete Setup

**Option A: Automated (Recommended)**
```batch
COMPLETE_SETUP.bat
```

**Option B: Manual Steps**
```powershell
# 1. Create database
psql -U postgres -c "CREATE DATABASE swiss_immigration;"

# 2. Import schema
psql -U postgres -d swiss_immigration -f lib\database\schema.sql

# 3. Test connection
node test-db-connection.js

# 4. Build
npm run build

# 5. Start
npm start
```

## 🎯 Your Site Will Be At

- **Local**: http://localhost:5000
- **Network**: http://YOUR_PC_IP:5000

## 🌐 Make It Public (Optional)

### ngrok (Easiest - 2 minutes)
1. Download: https://ngrok.com/download
2. Run: `ngrok http 5000`
3. Get your public URL

### Port Forwarding
1. Forward port 5000 in your router
2. Access via: `http://YOUR_PUBLIC_IP:5000`

## 🧪 Test Database Connection

```powershell
node test-db-connection.js
```

This will verify:
- ✅ Database connection works
- ✅ Tables are created
- ✅ Everything is configured correctly

## 📁 Files Created

- `lib/db.ts` - PostgreSQL connection pool
- `lib/db-client.ts` - Database client (Supabase-compatible)
- `lib/supabase/server.ts` - Updated to auto-fallback to local DB
- `.env.local.template` - Environment template
- `setup-env.ps1` - PowerShell setup script
- `COMPLETE_SETUP.bat` - Complete automated setup
- `SETUP_SELF_HOSTING.bat` - Basic setup check
- `START_LOCAL_SERVER.bat` - Start production server
- `test-db-connection.js` - Test database connection

## 🐛 Troubleshooting

### PostgreSQL Not Found
```powershell
# Check if installed
where psql

# If not found, install from:
# https://www.postgresql.org/download/windows/
```

### Database Connection Failed
```powershell
# Test connection
node test-db-connection.js

# Check PostgreSQL is running
Get-Service -Name "*postgres*"

# Start PostgreSQL service
net start postgresql-x64-16
```

### Port 5000 Already in Use
```powershell
# Find what's using it
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F
```

## 📚 Full Documentation

- **Quick Guide**: `QUICK_LOCAL_HOSTING.md`
- **Complete Guide**: `SELF_HOSTING_GUIDE.md`

## ✅ Checklist

- [ ] PostgreSQL installed
- [ ] `.env.local` created and configured
- [ ] Database `swiss_immigration` created
- [ ] Schema imported
- [ ] Database connection tested (`node test-db-connection.js`)
- [ ] Application built (`npm run build`)
- [ ] Server started (`npm start`)
- [ ] Site accessible at http://localhost:5000

---

**Ready to go!** Run `COMPLETE_SETUP.bat` to get started! 🚀

