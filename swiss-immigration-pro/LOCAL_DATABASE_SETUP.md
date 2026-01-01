# 🗄️ Local Database Setup Guide

Your application is already configured to use a **local PostgreSQL database**! Follow these steps to get it running.

## ✅ What's Already Done

- ✅ PostgreSQL client (`pg`) installed
- ✅ Database connection code (`lib/db.ts`) ready
- ✅ Supabase-compatible wrapper (`lib/db-client.ts`) ready
- ✅ Database schema file (`lib/database/schema.sql`) ready

## 🚀 Quick Setup (3 Steps)

### Step 1: Install PostgreSQL (if not installed)

**Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Use default settings
4. **Remember the password you set for the `postgres` user!**

**macOS:**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create `.env.local` File

Create a file named `.env.local` in the project root with:

```env
# ============================================
# LOCAL DATABASE CONFIGURATION
# ============================================
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE

# ============================================
# NEXT.JS CONFIGURATION
# ============================================
NEXTAUTH_URL=http://localhost:5000
NEXTAUTH_SECRET=OnWM2hyya2bw7hGAifFMoObTVlDK0KwbBbdp2WEeslM=
NEXT_PUBLIC_SITE_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:5000

# ============================================
# APP CONFIGURATION
# ============================================
NEXT_PUBLIC_ADMIN_EMAIL=admin@swissimmigrationpro.com
```

**Important:** Replace `YOUR_POSTGRES_PASSWORD_HERE` with your actual PostgreSQL password!

### Step 3: Create Database and Import Schema

**Windows (PowerShell):**
```powershell
# Create database
psql -U postgres -c "CREATE DATABASE swiss_immigration;"

# Import schema
psql -U postgres -d swiss_immigration -f lib\database\schema.sql
```

**macOS/Linux:**
```bash
# Create database
psql -U postgres -c "CREATE DATABASE swiss_immigration;"

# Import schema
psql -U postgres -d swiss_immigration -f lib/database/schema.sql
```

**Or use pgAdmin:**
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click "Databases" → Create → Database
4. Name: `swiss_immigration`
5. Right-click the new database → Query Tool
6. Open `lib/database/schema.sql` and execute it

## 🧪 Test Connection

Create a test file `test-connection.js`:

```javascript
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'swiss_immigration',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function test() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful!');
    console.log('Current time:', result.rows[0].now);
    await pool.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

test();
```

Run it:
```bash
node test-connection.js
```

## 🎯 Create Admin User

After the database is set up, create an admin user:

**Option 1: SQL Script**
```sql
-- Run in psql or pgAdmin Query Tool
DO $$
DECLARE
    v_user_id UUID;
    v_user_email TEXT := 'admin@test.com';
    v_user_password TEXT := 'Admin123!';
    v_user_name TEXT := 'Admin User';
BEGIN
    -- Create user
    INSERT INTO public.users (email, password_hash, email_verified, email_verified_at)
    VALUES (v_user_email, crypt(v_user_password, gen_salt('bf')), TRUE, NOW())
    RETURNING id INTO v_user_id;
    
    -- Create profile with admin privileges
    INSERT INTO public.profiles (id, email, full_name, pack_id, is_admin)
    VALUES (v_user_id, v_user_email, v_user_name, 'free', TRUE)
    ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;
    
    -- Create user limits
    INSERT INTO public.user_limits (user_id, messages_today, last_reset_date)
    VALUES (v_user_id, 0, CURRENT_DATE)
    ON CONFLICT (user_id) DO NOTHING;
    
    RAISE NOTICE 'Admin user created: %', v_user_email;
END $$;
```

**Option 2: Use the existing script**
```bash
# Edit scripts/create-admin-user.sql with your credentials
# Then run:
psql -U postgres -d swiss_immigration -f scripts/create-admin-user.sql
```

## 🚀 Start the Application

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

Your app will be available at: **http://localhost:5000**

## ✅ Verify Everything Works

1. **Check database connection:**
   - Look for "Executed query" logs in the console
   - No connection errors

2. **Test login:**
   - Go to http://localhost:5000/auth/login
   - Use your admin credentials
   - You should see "Admin" link in the header

3. **Check admin dashboard:**
   - Go to http://localhost:5000/admin
   - Should see the admin dashboard

## 🔧 Troubleshooting

### "Connection refused" error
- Make sure PostgreSQL service is running
- Check `DB_HOST` and `DB_PORT` in `.env.local`
- Verify PostgreSQL is listening on port 5432

### "Database does not exist" error
- Run: `psql -U postgres -c "CREATE DATABASE swiss_immigration;"`
- Then import the schema again

### "Password authentication failed"
- Check `DB_PASSWORD` in `.env.local`
- Make sure it matches your PostgreSQL password
- Try resetting: `psql -U postgres -c "ALTER USER postgres PASSWORD 'newpassword';"`

### "Relation does not exist" error
- The schema wasn't imported correctly
- Re-run: `psql -U postgres -d swiss_immigration -f lib/database/schema.sql`

## 📝 Notes

- The application automatically uses the local database when `DB_HOST` is set
- All Supabase calls are routed through the local database client
- No Supabase account needed!
- Your data stays on your machine

## 🎉 You're Done!

Your application is now using a local PostgreSQL database. All data is stored locally on your machine.

