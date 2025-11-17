# Quick Admin Access Guide

## Option 1: Create Admin via SQL (Supabase Dashboard)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click **SQL Editor** in the left sidebar
3. Paste and run this SQL:

```sql
-- Create admin user quickly
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@test.com',
    crypt('Admin123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Admin User"}',
    NOW(),
    NOW()
) RETURNING id;

-- Create admin profile (replace USER_ID with the ID returned above)
INSERT INTO public.profiles (id, email, full_name, pack_id, is_admin, created_at, updated_at)
VALUES (
    'REPLACE_WITH_USER_ID_FROM_ABOVE',
    'admin@test.com',
    'Admin User',
    'free',
    TRUE,
    NOW(),
    NOW()
)
ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;

-- Create user limits
INSERT INTO public.user_limits (user_id, messages_today, last_reset_date)
VALUES (
    'REPLACE_WITH_USER_ID_FROM_ABOVE',
    0,
    CURRENT_DATE
)
ON CONFLICT (user_id) DO NOTHING;
```

4. Login with:
   - **Email:** admin@test.com
   - **Password:** Admin123!

## Option 2: Register as Regular User

1. Go to: http://localhost:3001/auth/register
2. Create account with any email/password
3. You'll see the free dashboard

## Option 3: Use Dev Mode (Temporary)

For quick testing without Supabase:
1. Comment out auth checks temporarily
2. Or use mock user data for development

---

**Note:** If Supabase isn't configured yet, the registration page will error. You need to set up Supabase first.

