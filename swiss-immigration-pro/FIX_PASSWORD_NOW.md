# 🔐 Quick Fix: PostgreSQL Password Authentication Failed

## The Problem
You're getting: `FATAL: password authentication failed for user "postgres"`

This means the password in your `.env.local` doesn't match your PostgreSQL installation.

## ✅ Solution: Reset PostgreSQL Password (2 minutes)

### Step 1: Run the Batch File as Administrator

1. **Navigate to the project folder:**
   ```
   C:\Users\vilen\Downloads\New folder\swiss-immigration-pro
   ```

2. **Right-click on `reset-password-trust.bat`**
   - Select **"Run as administrator"**
   - Click **"Yes"** when Windows asks for permission

3. **The script will:**
   - Stop PostgreSQL
   - Temporarily allow trust authentication
   - Reset password to: `Terminateur08a21aaaqqqeee`
   - Restore security settings
   - Start PostgreSQL again

4. **Wait for completion** - You'll see "Password Reset Complete!"

### Step 2: Verify .env.local Has Database Config

Make sure your `.env.local` file has these lines:

```env
# Local PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=Terminateur08a21aaaqqqeee
```

### Step 3: Test Connection

```powershell
cd swiss-immigration-pro
node test-db-connection.js
```

You should see: ✅ Database connection successful!

## 🎯 Alternative: If Batch File Doesn't Work

### Manual Method (if you know your current password):

1. Open PowerShell as Administrator
2. Run:
   ```powershell
   $env:PGPASSWORD = "your_current_password"
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';"
   ```

### If You Don't Know Your Password:

Follow the manual steps in `RESET_PASSWORD_GUIDE.md` (Method 3: Trust Method)

## ✅ After Fixing

1. Test connection: `node test-db-connection.js`
2. If database doesn't exist, create it:
   ```powershell
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE swiss_immigration;"
   ```
3. Import schema (if needed):
   ```powershell
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d swiss_immigration -f lib\database\schema.sql
   ```

## 🚀 Next Steps

Once the password is fixed and connection works:
- Run `npm run build`
- Run `npm start`
- Access your site at http://localhost:5000



