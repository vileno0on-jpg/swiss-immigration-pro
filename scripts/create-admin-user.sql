-- =====================================================
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
    SELECT id INTO v_user_id FROM auth.users WHERE email = v_user_email;
    
    IF v_user_id IS NULL THEN
        -- Create new user
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            v_user_email,
            crypt(v_user_password, gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider":"email","providers":["email"]}',
            '{"name":"' || v_user_name || '"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
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

