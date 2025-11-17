# 👑 Create Admin User

Quick guide to create an admin user for Swiss Immigration Pro.

## 🚀 Method 1: Using Script (Easiest)

### Step 1: Run the Script

```bash
cd swiss-immigration-pro
node scripts/create-admin-neon.js
```

### Step 2: Enter Details

The script will ask you for:
- **Email**: Your admin email (e.g., `admin@swissimmigrationpro.com`)
- **Password**: Your admin password (min 8 characters)
- **Full Name**: Your name (optional, defaults to "Admin User")

### Step 3: Done!

The script will:
- ✅ Create user account with hashed password
- ✅ Create admin profile with `is_admin = TRUE`
- ✅ Set up user limits
- ✅ Verify admin access

You can then log in at: **http://localhost:3003/auth/login**

---

## 🔧 Method 2: Manual SQL (Neon Dashboard)

### Step 1: Open Neon Dashboard

1. Go to https://console.neon.tech
2. Select your project
3. Click "SQL Editor"

### Step 2: Run SQL

Replace the values below with your admin credentials:

```sql
-- Step 1: Create user (replace email and password)
DO $$
DECLARE
    v_user_id UUID;
    v_email TEXT := 'admin@swissimmigrationpro.com'; -- CHANGE THIS
    v_password_hash TEXT; -- Will be set below
    v_full_name TEXT := 'Admin User';
BEGIN
    -- Hash password (you'll need to hash it first - see below)
    -- For now, we'll use a placeholder - you need to hash your password
    
    -- Generate UUID for user
    v_user_id := gen_random_uuid();
    
    -- Insert user
    INSERT INTO users (id, email, password_hash, email_verified)
    VALUES (
        v_user_id,
        v_email,
        crypt('YourPassword123!', gen_salt('bf')), -- CHANGE PASSWORD HERE
        TRUE
    );
    
    -- Insert admin profile
    INSERT INTO profiles (id, email, full_name, pack_id, is_admin)
    VALUES (
        v_user_id,
        v_email,
        v_full_name,
        'free',
        TRUE
    )
    ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;
    
    -- Insert user limits
    INSERT INTO user_limits (user_id, messages_today, last_reset_date)
    VALUES (
        v_user_id,
        0,
        CURRENT_DATE
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RAISE NOTICE 'Admin user created! Email: %, ID: %', v_email, v_user_id;
END $$;

-- Step 2: Verify admin was created
SELECT id, email, full_name, is_admin, pack_id
FROM profiles
WHERE is_admin = TRUE;
```

**Note:** The SQL method requires password hashing. It's easier to use the Node.js script above.

---

## 🔧 Method 3: Convert Existing User to Admin

If you already have a user account and want to make it admin:

### Option A: Using Script
```bash
node scripts/create-admin-neon.js
```
Enter your existing email and password - it will update the user to admin.

### Option B: Using SQL
```sql
-- Replace EMAIL with your user's email
UPDATE profiles
SET is_admin = TRUE
WHERE email = 'your-email@example.com';

-- Verify
SELECT id, email, full_name, is_admin
FROM profiles
WHERE email = 'your-email@example.com';
```

---

## ✅ Verify Admin Access

After creating the admin user:

1. **Log in** at: http://localhost:3003/auth/login
2. **Check header** - You should see "Admin" link
3. **Access admin panel** at: http://localhost:3003/admin

You should see:
- ✅ Total users count
- ✅ Revenue statistics
- ✅ Active subscriptions
- ✅ Message counts

---

## 🛠️ Troubleshooting

### "User already exists"
- The script will update the existing user to admin
- Or use Method 3 to convert existing user

### "DATABASE_URL not found"
- Make sure `.env.local` exists
- Check that `DATABASE_URL` is set correctly

### "Can't log in"
- Verify password is correct
- Check that email matches exactly
- Make sure `is_admin = TRUE` in profiles table

---

## 📝 Quick Reference

**Script location:** `scripts/create-admin-neon.js`  
**Admin panel:** `/admin`  
**Login page:** `/auth/login`  
**Database:** Neon PostgreSQL

---

**That's it!** You now have admin access. 🎉

