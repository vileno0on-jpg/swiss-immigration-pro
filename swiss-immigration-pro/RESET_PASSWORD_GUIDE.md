# 🔐 Reset PostgreSQL Password - Step by Step

## Method 1: Using pgAdmin (Easiest - If you can connect)

1. **Open pgAdmin**
2. **Connect to PostgreSQL** (use whatever password currently works)
3. **Right-click on your PostgreSQL server** → **Query Tool**
4. **Run this SQL command:**
   ```sql
   ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';
   ```
5. **Click Execute** (or press F5)
6. **Done!** The password now matches your `.env.local`

## Method 2: Using Command Line (If you know current password)

1. **Open PowerShell as Administrator**
2. **Run:**
   ```powershell
   $env:PGPASSWORD = "your_current_password"
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';"
   ```

## Method 3: Using Trust Method (If you don't know password)

### Step 1: Temporarily Allow Trust Authentication

1. **Stop PostgreSQL service:**
   ```powershell
   net stop postgresql-x64-18
   ```

2. **Find and edit `pg_hba.conf`:**
   - Location: `C:\Program Files\PostgreSQL\18\data\pg_hba.conf`
   - Open with Notepad (as Administrator)

3. **Find these lines:**
   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            scram-sha-256
   # IPv6 local connections:
   host    all             all             ::1/128                 scram-sha-256
   ```

4. **Change `scram-sha-256` to `trust`:**
   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            trust
   # IPv6 local connections:
   host    all             all             ::1/128                 trust
   ```

5. **Save the file**

6. **Start PostgreSQL:**
   ```powershell
   net start postgresql-x64-18
   ```

### Step 2: Reset Password

1. **Run this command (no password needed now):**
   ```powershell
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "ALTER USER postgres WITH PASSWORD 'Terminateur08a21aaaqqqeee';"
   ```

### Step 3: Restore Security

1. **Edit `pg_hba.conf` again**
2. **Change `trust` back to `scram-sha-256`** (or `md5`)
3. **Save the file**
4. **Restart PostgreSQL:**
   ```powershell
   net stop postgresql-x64-18
   net start postgresql-x64-18
   ```

## Method 4: Use the Batch Script

Run the provided `reset-postgres-password.bat` script:
```powershell
.\reset-postgres-password.bat
```

## After Resetting

1. **Test the connection:**
   ```powershell
   node test-db-connection.js
   ```

2. **Create the database** (if not already created):
   - In pgAdmin: Right-click "Databases" → Create → Database
   - Name: `swiss_immigration`

3. **Import schema:**
   - Right-click `swiss_immigration` → Query Tool
   - Open `lib/database/schema.sql`
   - Execute (F5)

## ✅ Done!

Your PostgreSQL password now matches `.env.local` and the app will connect successfully!




