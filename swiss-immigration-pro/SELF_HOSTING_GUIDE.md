# 🖥️ Complete Self-Hosting Guide - Host from Your PC

This guide shows you how to host and deploy your Swiss Immigration Pro site **entirely from your PC** without using Neon, Supabase, Vercel, or any external services.

## ✅ What You'll Need

1. **Windows PC** (you're already on Windows)
2. **Node.js 20** (already installed)
3. **PostgreSQL** (we'll install locally)
4. **Optional**: Domain name or use your public IP

---

## 📦 Step 1: Install PostgreSQL Locally

### Option A: Using PostgreSQL Installer (Recommended)

1. **Download PostgreSQL**:
   - Go to: https://www.postgresql.org/download/windows/
   - Download the installer (latest version, ~200MB)
   - Or use: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

2. **Install PostgreSQL**:
   - Run the installer
   - **Port**: Keep default `5432`
   - **Password**: Create a strong password (save it!)
     - Example: `SwissImm2025!LocalDB`
   - **Locale**: Default (English, United States)
   - Complete the installation

3. **Verify Installation**:
   ```powershell
   # Open PowerShell and test
   psql --version
   ```

### Option B: Using Docker (Alternative)

If you have Docker installed:

```powershell
docker run --name swiss-immigration-db `
  -e POSTGRES_PASSWORD=SwissImm2025!LocalDB `
  -e POSTGRES_DB=swiss_immigration `
  -p 5432:5432 `
  -d postgres:16
```

---

## 🗄️ Step 2: Create Local Database

1. **Open pgAdmin** (installed with PostgreSQL) or use command line:

```powershell
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE swiss_immigration;

# Create user (optional, or use postgres user)
CREATE USER swiss_user WITH PASSWORD 'SwissImm2025!LocalDB';
GRANT ALL PRIVILEGES ON DATABASE swiss_immigration TO swiss_user;

# Exit
\q
```

---

## 📝 Step 3: Set Up Database Schema

1. **Find your SQL schema file**:
   - Look for `scripts/*.sql` files
   - Or check `FREE_DATABASE_SETUP.md` for the schema

2. **Run the schema**:
   ```powershell
   # Using psql
   psql -U postgres -d swiss_immigration -f scripts\your-schema-file.sql
   ```

   Or manually in pgAdmin:
   - Open pgAdmin
   - Right-click `swiss_immigration` database → Query Tool
   - Paste your SQL schema
   - Execute (F5)

---

## 🔧 Step 4: Install PostgreSQL Client for Node.js

```powershell
cd "C:\Users\vilen\Downloads\New folder\swiss-immigration-pro"
npm install pg @types/pg
```

---

## 🔄 Step 5: Replace Supabase with Direct PostgreSQL

We'll create a new database client that uses PostgreSQL directly instead of Supabase.

### Create New Database Client

Create file: `lib/db.ts`

```typescript
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'swiss_immigration',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Database query error', { text, error })
    throw error
  }
}

export async function getClient() {
  const client = await pool.connect()
  const query = client.query
  const release = client.release
  
  // Set a timeout of 5 seconds
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!')
  }, 5000)
  
  // Monkey patch the query method to log the queries
  client.query = (...args: any[]) => {
    client.lastQuery = args
    return query.apply(client, args)
  }
  
  client.release = () => {
    clearTimeout(timeout)
    return release.apply(client)
  }
  
  return client
}

export default pool
```

### Create Supabase-Compatible Wrapper

Create file: `lib/db-client.ts`

```typescript
import { query } from './db'

// This creates a Supabase-like interface for easy migration
export class LocalDBClient {
  from(table: string) {
    return {
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            const result = await query(
              `SELECT ${columns} FROM ${table} WHERE ${column} = $1 LIMIT 1`,
              [value]
            )
            return { data: result.rows[0] || null, error: null }
          },
          async execute() {
            const result = await query(
              `SELECT ${columns} FROM ${table} WHERE ${column} = $1`,
              [value]
            )
            return { data: result.rows, error: null }
          }
        }),
        async execute() {
          const result = await query(`SELECT ${columns} FROM ${table}`)
          return { data: result.rows, error: null }
        }
      }),
      insert: (data: any) => ({
        async execute() {
          const columns = Object.keys(data).join(', ')
          const values = Object.values(data)
          const placeholders = values.map((_, i) => `$${i + 1}`).join(', ')
          const result = await query(
            `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
            values
          )
          return { data: result.rows[0], error: null }
        }
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          async execute() {
            const columns = Object.keys(data)
            const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(', ')
            const values = [...Object.values(data), value]
            const result = await query(
              `UPDATE ${table} SET ${setClause} WHERE ${column} = $${values.length} RETURNING *`,
              values
            )
            return { data: result.rows[0], error: null }
          }
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          async execute() {
            const result = await query(
              `DELETE FROM ${table} WHERE ${column} = $1 RETURNING *`,
              [value]
            )
            return { data: result.rows, error: null }
          }
        })
      })
    }
  }
}

export function createClient() {
  return new LocalDBClient()
}
```

---

## ⚙️ Step 6: Update Environment Variables

Create/update `.env.local`:

```env
# Database (Local PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=SwissImm2025!LocalDB

# Next.js
NEXTAUTH_URL=http://localhost:5000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:5000

# Remove or comment out Supabase variables
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=

# AI Keys (keep your existing ones)
# XAI_API_KEY=your-key
# OPENAI_API_KEY=your-key
# etc...
```

**Generate NEXTAUTH_SECRET**:
```powershell
# In PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

---

## 🔄 Step 7: Update Code to Use Local Database

### Update `lib/supabase/server.ts`:

```typescript
// Replace Supabase with local DB
import { createClient } from '@/lib/db-client'

export async function createClient() {
  return createClient() // Returns LocalDBClient instead of Supabase
}
```

**OR** create a new file `lib/database/server.ts` and update imports.

---

## 🚀 Step 8: Build and Run Production Server

### Build the Application:

```powershell
npm run build
```

### Start Production Server:

```powershell
npm start
```

Your site will be available at: **http://localhost:5000**

---

## 🌐 Step 9: Make It Accessible from Internet (Optional)

### Option A: Port Forwarding (For Home Network)

1. **Find your PC's local IP**:
   ```powershell
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. **Configure Router**:
   - Access router admin (usually 192.168.1.1)
   - Port Forwarding → Add Rule:
     - External Port: 80 or 5000
     - Internal IP: Your PC's IP (192.168.1.100)
     - Internal Port: 5000
     - Protocol: TCP

3. **Find your public IP**:
   - Visit: https://whatismyipaddress.com
   - Share: `http://YOUR_PUBLIC_IP:5000`

### Option B: Use ngrok (Easiest, No Router Config)

1. **Install ngrok**:
   - Download: https://ngrok.com/download
   - Extract to a folder

2. **Run ngrok**:
   ```powershell
   # In ngrok folder
   .\ngrok.exe http 5000
   ```

3. **Get your public URL**:
   - ngrok will show: `https://abc123.ngrok.io`
   - This is your public URL!

### Option C: Use Cloudflare Tunnel (Free, Permanent)

1. **Install cloudflared**:
   - Download: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

2. **Run tunnel**:
   ```powershell
   cloudflared tunnel --url http://localhost:5000
   ```

---

## 🔒 Step 10: Security Considerations

### For Production Self-Hosting:

1. **Use HTTPS**:
   - Install Caddy or nginx as reverse proxy
   - Get free SSL from Let's Encrypt

2. **Firewall Rules**:
   ```powershell
   # Allow port 5000 in Windows Firewall
   New-NetFirewallRule -DisplayName "Swiss Immigration App" -Direction Inbound -LocalPort 5000 -Protocol TCP -Action Allow
   ```

3. **Keep PostgreSQL Secure**:
   - Don't expose port 5432 to internet
   - Use strong passwords
   - Only allow localhost connections

---

## 📋 Quick Start Script

Create `START_LOCAL_SERVER.bat`:

```batch
@echo off
echo Starting Swiss Immigration Pro (Local Hosting)...
echo.

REM Check if PostgreSQL is running
sc query postgresql-x64-16 | find "RUNNING" >nul
if errorlevel 1 (
    echo ERROR: PostgreSQL is not running!
    echo Please start PostgreSQL service first.
    pause
    exit
)

echo PostgreSQL is running ✓
echo.

REM Load environment variables
if exist .env.local (
    echo Loading environment variables...
)

REM Build if needed
if not exist .next (
    echo Building application...
    call npm run build
)

echo Starting production server...
echo Site will be available at: http://localhost:5000
echo.
call npm start
```

---

## 🐛 Troubleshooting

### PostgreSQL Connection Failed:
```powershell
# Check if PostgreSQL is running
Get-Service postgresql*

# Start PostgreSQL service
Start-Service postgresql-x64-16
```

### Port Already in Use:
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Database Schema Errors:
- Make sure you ran the SQL schema
- Check table names match your code
- Verify user has proper permissions

---

## 📊 Performance Tips

1. **Use PM2 for Process Management** (keeps server running):
   ```powershell
   npm install -g pm2
   pm2 start npm --name "swiss-immigration" -- start
   pm2 save
   pm2 startup
   ```

2. **Enable PostgreSQL Connection Pooling** (already in db.ts)

3. **Use nginx as Reverse Proxy** (for better performance):
   - Handles static files
   - SSL termination
   - Load balancing (if multiple instances)

---

## ✅ Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `swiss_immigration` created
- [ ] Database schema imported
- [ ] `pg` package installed
- [ ] New database client files created
- [ ] Environment variables updated
- [ ] Code updated to use local DB
- [ ] Application built (`npm run build`)
- [ ] Server started (`npm start`)
- [ ] Site accessible at http://localhost:5000
- [ ] (Optional) Port forwarding or ngrok configured

---

## 🎉 You're Done!

Your site is now **100% self-hosted** on your PC! No external services needed.

**Next Steps**:
- Test all features (login, database operations)
- Set up automatic backups for PostgreSQL
- Consider using PM2 to keep server running
- Set up monitoring/alerting if needed

---

## 📚 Additional Resources

- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **PM2 Docs**: https://pm2.keymetrics.io/
- **Caddy (Reverse Proxy)**: https://caddyserver.com/

---

**Questions?** Check the troubleshooting section or review your error logs!

