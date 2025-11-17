# How to Create an Admin User

There are **two methods** to create an admin user for your Swiss Immigration Pro platform.

---

## Method 1: Using SQL Script (Recommended)

### Steps:

1. **Open Supabase Dashboard**
   - Go to your Supabase project
   - Click on "SQL Editor" in the left sidebar

2. **Run the SQL Script**
   - Open `scripts/create-admin-user.sql`
   - Copy the entire contents
   - Paste into SQL Editor

3. **Update Credentials**
   - Find these lines and update with your credentials:
   ```sql
   v_user_email TEXT := 'admin@swissimmigrationpro.com'; -- CHANGE THIS
   v_user_password TEXT := 'YourSecurePassword123!'; -- CHANGE THIS
   v_user_name TEXT := 'Admin User';
   ```

4. **Execute the Script**
   - Click "Run" button
   - You should see: "Admin user created successfully!"

5. **Verify**
   - The script will show you the created admin user
   - Copy the user ID shown

6. **Test Login**
   - Go to your app's login page
   - Use the email and password you set
   - You should see "Admin" link in the header

---

## Method 2: Using Supabase Dashboard (Alternative)

### Steps:

1. **Create Auth User**
   - Go to Authentication → Users
   - Click "Add User" → "Create New User"
   - Enter email and password
   - Click "Create User"
   - **Copy the User ID** (UUID)

2. **Create Profile**
   - Go to Table Editor → `profiles`
   - Click "Insert" → "Insert Row"
   - Fill in:
     - `id`: Paste the User ID from step 1
     - `email`: Same as auth email
     - `full_name`: Your name
     - `pack_id`: `free`
     - `is_admin`: `true` (toggle or enter `true`)
   - Click "Insert"

3. **Create User Limits**
   - Go to Table Editor → `user_limits`
   - Click "Insert" → "Insert Row"
   - Fill in:
     - `user_id`: Same User ID
     - `messages_today`: `0`
     - `last_reset_date`: Today's date
   - Click "Insert"

4. **Verify**
   - Go back to Authentication → Users
   - Find your admin user
   - Should show "is_admin: true"

---

## Troubleshooting

### Issue: "ERROR: relation auth.users does not exist"
- **Solution**: You're using Supabase local development. The script is for production Supabase.
- **Workaround**: Use Method 2 or create user via your app's registration page, then manually update in Supabase dashboard.

### Issue: "ERROR: function crypt does not exist"
- **Solution**: Enable pgcrypto extension in Supabase
- **Fix**: Run this first:
```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Issue: Can't login with credentials
- **Solution**: Check that:
  1. Email matches exactly (case-sensitive)
  2. Password has at least 6 characters
  3. User exists in both `auth.users` and `profiles` tables
  4. `is_admin` is set to `true` in profiles

### Issue: No "Admin" link showing
- **Solution**: 
  1. Logout and login again
  2. Check browser console for errors
  3. Verify `is_admin` is `true` in database
  4. Clear browser cache

---

## Security Best Practices

### ✅ DO:
- Use a strong password (min 12 characters, mixed case, numbers, symbols)
- Use a dedicated admin email address
- Enable 2FA on your Supabase account
- Rotate admin password every 90 days
- Keep admin credentials secure

### ❌ DON'T:
- Share admin credentials
- Use admin account for regular browsing
- Store passwords in code or config files
- Use the same password for multiple accounts

---

## What Can Admins Do?

Once you're logged in as admin, you can:

1. **Access Admin Dashboard** (`/admin`)
   - View all users
   - See sales analytics
   - Check revenue stats
   - Monitor AI usage

2. **Manage Content**
   - Edit live statistics
   - Upload videos/templates
   - Manage cantonal data

3. **View Reports**
   - User signups
   - Conversion rates
   - Popular content
   - System health

---

## Additional Admin Users

To create more admins:

1. Repeat Method 1 or 2
2. Set `is_admin = true` in profiles table
3. Any user with `is_admin = true` gets admin access

---

## Quick Test Script

Run this to verify your admin setup:

```sql
-- Check admin users
SELECT 
    p.email,
    p.full_name,
    p.is_admin,
    p.pack_id,
    au.email_confirmed_at,
    au.created_at as auth_created
FROM public.profiles p
JOIN auth.users au ON p.id = au.id
WHERE p.is_admin = TRUE;
```

Should show your admin user details.

---

**Need Help?** Check:
- `README.md` - General setup
- `DEPLOYMENT.md` - Production deployment
- Supabase docs: supabase.com/docs

