# 🔐 Admin Credentials for Local Database

This document contains all the admin credentials and configuration for the local PostgreSQL database setup.

## 📋 Current Configuration

### Database Connection (from `env.local.txt`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=Terminateur08a21aaaqqqeee
```

### Admin Credentials (Default)

The `scripts/create-admin-local.js` script uses these defaults if not set in `.env.local`:

```env
ADMIN_EMAIL=admin@swissimmigrationpro.com
ADMIN_PASSWORD=Admin123!
ADMIN_NAME=Admin User
```

### App Configuration

```env
NEXT_PUBLIC_ADMIN_EMAIL=admin@swissimmigrationpro.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:5050
NEXTAUTH_SECRET=OnWM2hyya2bw7hGAifFMoObTVlDK0KwbBbdp2WEeslM=
```

---

## 🚀 Setting Up Admin Credentials

### Option 1: Add to `.env.local` (Recommended)

Create or edit `.env.local` file in the project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=Terminateur08a21aaaqqqeee

# Admin User Credentials (Optional - will use defaults if not set)
ADMIN_EMAIL=admin@swissimmigrationpro.com
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_NAME=Admin User

# App Configuration
NEXT_PUBLIC_ADMIN_EMAIL=admin@swissimmigrationpro.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:5050
NEXTAUTH_SECRET=OnWM2hyya2bw7hGAifFMoObTVlDK0KwbBbdp2WEeslM=
```

### Option 2: Use the Script with Defaults

The script `scripts/create-admin-local.js` will use these defaults if environment variables are not set:
- **Email**: `admin@swissimmigrationpro.com`
- **Password**: `Admin123!`
- **Name**: `Admin User`

---

## 📝 Creating Admin User

### Method 1: Run the Script

```bash
cd swiss-immigration-pro
node scripts/create-admin-local.js
```

This will:
1. Read credentials from `.env.local` (or use defaults)
2. Connect to local PostgreSQL database
3. Create admin user with hashed password
4. Create admin profile with `is_admin = TRUE`
5. Set up user limits
6. Display login credentials

### Method 2: Direct SQL

Connect to your database and run:

```sql
DO $$
DECLARE
    v_user_id UUID;
    v_user_email TEXT := 'admin@swissimmigrationpro.com';
    v_user_password TEXT := 'Admin123!';
    v_user_name TEXT := 'Admin User';
BEGIN
    -- Create user
    INSERT INTO public.users (email, password_hash, email_verified, email_verified_at)
    VALUES (v_user_email, crypt(v_user_password, gen_salt('bf')), TRUE, NOW())
    RETURNING id INTO v_user_id;
    
    -- Create profile with admin privileges
    INSERT INTO public.profiles (id, email, full_name, pack_id, is_admin, created_at, updated_at)
    VALUES (v_user_id, v_user_email, v_user_name, 'free', TRUE, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;
    
    -- Create user limits
    INSERT INTO public.user_limits (user_id, messages_today, last_reset_date)
    VALUES (v_user_id, 0, CURRENT_DATE)
    ON CONFLICT (user_id) DO NOTHING;
    
    RAISE NOTICE 'Admin user created: %', v_user_email;
END $$;
```

---

## 🔍 Verifying Admin User

After creating the admin user, you can verify it:

```sql
-- Check if admin exists
SELECT id, email, full_name, is_admin, pack_id 
FROM profiles 
WHERE is_admin = TRUE;

-- Check user details
SELECT id, email, email_verified 
FROM users 
WHERE email = 'admin@swissimmigrationpro.com';
```

---

## 🎯 Logging In

Once the admin user is created:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Go to login page:**
   - URL: `http://localhost:3000/auth/login` (or the port configured in `NEXT_PUBLIC_APP_URL`)

3. **Login with credentials:**
   - Email: `admin@swissimmigrationpro.com` (or your custom ADMIN_EMAIL)
   - Password: `Admin123!` (or your custom ADMIN_PASSWORD)

4. **Access admin dashboard:**
   - URL: `http://localhost:3000/admin`
   - You should see "Admin" link in the header

---

## 🔒 Security Notes

1. **Change Default Password**: If using the default `Admin123!`, change it after first login
2. **Keep `.env.local` Private**: Never commit this file to git (it's already in `.gitignore`)
3. **Strong Passwords**: Use a strong password for production
4. **Database Password**: Keep `DB_PASSWORD` secure and never share it

---

## 📚 Related Files

- `scripts/create-admin-local.js` - Script to create admin user
- `env.local.txt` - Template for `.env.local` file
- `LOCAL_DATABASE_SETUP.md` - Complete local database setup guide
- `CREATE_ADMIN_USER.md` - General admin user creation guide

---

## 🐛 Troubleshooting

### "Connection refused" error
- Make sure PostgreSQL is running
- Verify `DB_HOST` and `DB_PORT` in `.env.local`

### "Password authentication failed"
- Check `DB_PASSWORD` matches your PostgreSQL password
- Default from `env.local.txt`: `Terminateur08a21aaaqqqeee`

### "Database does not exist"
- Create database: `psql -U postgres -c "CREATE DATABASE swiss_immigration;"`
- Import schema: `psql -U postgres -d swiss_immigration -f lib/database/schema.sql`

### Admin user not showing admin privileges
- Verify `is_admin = TRUE` in profiles table
- Check user ID matches between `users` and `profiles` tables

---

## 📝 Quick Reference

| Setting | Value | Location |
|---------|-------|----------|
| Database Host | `localhost` | `.env.local` → `DB_HOST` |
| Database Port | `5432` | `.env.local` → `DB_PORT` |
| Database Name | `swiss_immigration` | `.env.local` → `DB_NAME` |
| Database User | `postgres` | `.env.local` → `DB_USER` |
| Database Password | `Terminateur08a21aaaqqqeee` | `.env.local` → `DB_PASSWORD` |
| Admin Email | `admin@swissimmigrationpro.com` | `.env.local` → `ADMIN_EMAIL` |
| Admin Password | `Admin123!` (default) | `.env.local` → `ADMIN_PASSWORD` |
| Admin Name | `Admin User` (default) | `.env.local` → `ADMIN_NAME` |

