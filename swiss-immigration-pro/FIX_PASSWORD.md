# 🔐 Fix PostgreSQL Password Authentication

## Problem
Password authentication failed - the password in `.env.local` doesn't match your PostgreSQL password.

## Solution: Reset Password in pgAdmin

### Method 1: Using pgAdmin (Easiest)

1. **Open pgAdmin** and connect to your PostgreSQL server
   - If you can't connect, you may need to use Windows authentication or find your current password

2. **Navigate to Users:**
   - Expand "Login/Group Roles" in the left sidebar
   - Right-click on "postgres"
   - Select "Properties"

3. **Change Password:**
   - Go to the "Definition" tab
   - Enter new password: `Terminateur08a21aaaqqqeee`
   - Click "Save"

4. **Test Connection:**
   ```powershell
   node test-db-connection.js
   ```

### Method 2: Using SQL Query

If you can connect to PostgreSQL (with current password):

1. Open **Query Tool** in pgAdmin
2. Run this SQL:
   ```sql
   ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';
   ```
3. Click Execute (F5)

### Method 3: Update .env.local with Correct Password

If you know your current PostgreSQL password:

1. Open `.env.local`
2. Update this line:
   ```
   DB_PASSWORD=your_actual_postgres_password
   ```
3. Save and test:
   ```powershell
   node test-db-connection.js
   ```

## After Fixing Password

Once the password matches, you can:

1. **Create the database:**
   - In pgAdmin: Right-click "Databases" → Create → Database
   - Name: `swiss_immigration`

2. **Import schema:**
   - Right-click `swiss_immigration` → Query Tool
   - Open file: `lib/database/schema.sql`
   - Execute (F5)

3. **Test:**
   ```powershell
   node test-db-connection.js
   ```

## Troubleshooting

If you can't connect to PostgreSQL at all:

1. **Check if service is running:**
   ```powershell
   Get-Service -Name "*postgres*"
   ```

2. **Start the service:**
   ```powershell
   net start postgresql-x64-18
   ```

3. **Try Windows Authentication:**
   - In pgAdmin connection, try using Windows authentication instead of password
   - Then change the password once connected

