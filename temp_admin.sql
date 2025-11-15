-- Admin User Creation Script
-- Run this in Supabase SQL Editor to create an admin user
--
-- ADMIN CREDENTIALS:
-- Email: andrea.vonflue@gmail.com
-- Password: Andreavf0222
-- Name: Andrea Von Flue
-- =====================================================

-- Step 1: Create the auth user (if not exists)
-- Replace the values below with your admin credentials
DO $$
DECLARE
    v_user_id UUID;
    v_user_email TEXT := 'andrea.vonflue@gmail.com'; -- Admin email
    v_user_password TEXT := 'Andreavf0222'; -- Admin password
    v_user_name TEXT := 'Andrea Von Flue';
BEGIN
    -- Check if user already exists
    SELECT id INTO v_user_id FROM public.users WHERE email = v_user_email;

    IF v_user_id IS NULL THEN
        -- Create new user in public.users table
        INSERT INTO public.users (
            email,
            password_hash,
            email_verified,
            email_verified_at
        ) VALUES (
            v_user_email,
            crypt(v_user_password, gen_salt('bf')),
            TRUE,
            NOW()
        ) RETURNING id INTO v_user_id;
        
        RAISE NOTICE 'Created new user with ID: %', v_user_id;
    ELSE
        RAISE NOTICE 'User already exists with ID: %', v_user_id;
    END IF;
    
    -- Step 2: Create/update profile with admin privileges
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        pack_id,
        is_admin,
        created_at,
        updated_at
    ) VALUES (
        v_user_id,
        v_user_email,
        v_user_name,
        'free',
        TRUE,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) 
    DO UPDATE SET 
        is_admin = TRUE,
        full_name = v_user_name,
        updated_at = NOW();
    
    -- Step 3: Create user_limits entry
    INSERT INTO public.user_limits (
        user_id,
        messages_today,
        last_reset_date
    ) VALUES (
        v_user_id,
        0,
        CURRENT_DATE
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RAISE NOTICE 'Admin user created successfully!';
    RAISE NOTICE 'Email: %', v_user_email;
    RAISE NOTICE 'Admin privileges: ENABLED';
END $$;

-- Step 4: Verify the admin user was created
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.is_admin,
    p.pack_id,
    p.created_at
FROM public.profiles p
WHERE p.is_admin = TRUE;

