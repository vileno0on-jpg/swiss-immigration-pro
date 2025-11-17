-- Quick Database Verification Script
-- Run this in Supabase SQL Editor to verify your database setup

-- Check if all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Expected tables:
-- admin_logs
-- cantonal_data
-- chat_messages
-- cv_templates
-- masterclass_progress
-- payments
-- profiles
-- quiz_results
-- subscriptions
-- user_cvs
-- user_limits
-- live_stats

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'profiles', 'subscriptions', 'payments', 'chat_messages',
    'user_limits', 'masterclass_progress', 'quiz_results',
    'user_cvs', 'cantonal_data', 'admin_logs'
  );

-- All should show rowsecurity = true

-- Check initial data
SELECT COUNT(*) as stats_count FROM live_stats;
-- Should return 3

SELECT COUNT(*) as cantons_count FROM cantonal_data;
-- Should return 5

-- Check policies exist
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verify UUID extension
SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';
-- Should return 1 row

-- Verify triggers exist
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- Expected triggers:
-- update_profiles_updated_at
-- update_subscriptions_updated_at
-- update_masterclass_progress_updated_at
-- update_user_cvs_updated_at

-- Check foreign key constraints
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
ORDER BY tc.table_name;

