-- =====================================================
-- Create Admin User: andreavonflue@gmail.com
-- Password: andreavf222222
-- =====================================================

DO $$
DECLARE
    v_user_id UUID;
    v_user_email TEXT := 'andreavonflue@gmail.com';
    v_user_password TEXT := 'andreavf222222';
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
        -- Update existing user's password
        UPDATE public.users 
        SET password_hash = crypt(v_user_password, gen_salt('bf')),
            email_verified = TRUE,
            email_verified_at = NOW(),
            updated_at = NOW()
        WHERE id = v_user_id;
        
        RAISE NOTICE 'Updated existing user with ID: %', v_user_id;
    END IF;
    
    -- Create/update profile with admin privileges
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
        email = v_user_email,
        updated_at = NOW();
    
    -- Create user limits entry
    INSERT INTO public.user_limits (user_id, messages_today, last_reset_date)
    VALUES (
        v_user_id,
        0,
        CURRENT_DATE
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RAISE NOTICE 'Admin user created/updated successfully!';
    RAISE NOTICE 'Email: %', v_user_email;
    RAISE NOTICE 'Password: %', v_user_password;
    RAISE NOTICE 'Admin: TRUE';
END $$;




