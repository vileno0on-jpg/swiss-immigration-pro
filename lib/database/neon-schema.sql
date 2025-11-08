-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (replaces auth.users from Supabase)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table (extends users)
CREATE TABLE public.profiles (
  id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pack_id TEXT DEFAULT 'free',
  pack_expires_at TIMESTAMP WITH TIME ZONE,
  is_admin BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Sessions table (for NextAuth)
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounts table (for NextAuth OAuth)
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

-- Verification tokens table (for NextAuth email verification)
CREATE TABLE public.verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Stripe subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  pack_id TEXT NOT NULL,
  status TEXT NOT NULL, -- active, canceled, past_due, etc.
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stripe payments/transactions table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE,
  pack_id TEXT NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'chf',
  status TEXT NOT NULL, -- succeeded, failed, pending
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT,
  pack_id TEXT, -- Track which pack enabled this message
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily message limits table
CREATE TABLE public.user_limits (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  messages_today INTEGER DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE
);

-- Live stats table (editable by admin)
CREATE TABLE public.live_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stat_key TEXT UNIQUE NOT NULL,
  stat_label TEXT NOT NULL,
  stat_value TEXT NOT NULL,
  stat_source TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masterclass progress table
CREATE TABLE public.masterclass_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  progress_percent INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Quiz results table
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CV templates table
CREATE TABLE public.cv_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- tech, finance, medicine, etc.
  description TEXT,
  template_data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User CVs table (saved instances)
CREATE TABLE public.user_cvs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.cv_templates(id),
  name TEXT NOT NULL,
  cv_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cantonal data table
CREATE TABLE public.cantonal_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  canton_code TEXT UNIQUE NOT NULL,
  canton_name TEXT NOT NULL,
  language TEXT NOT NULL,
  immigration_info JSONB NOT NULL,
  citizenship_info JSONB NOT NULL,
  embassy_info JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin activity log
CREATE TABLE public.admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES public.profiles(id),
  action_type TEXT NOT NULL,
  action_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance indexes for better query performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_user_id ON profiles(id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_pack_id ON profiles(pack_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = true;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sessions_expires ON sessions(expires);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_accounts_provider ON accounts(provider, provider_account_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_payments_stripe_payment_intent ON payments(stripe_payment_intent_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_limits_user_id ON user_limits(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_live_stats_active ON live_stats(is_active) WHERE is_active = true;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_masterclass_progress_user_module ON masterclass_progress(user_id, module_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_cvs_user_id ON user_cvs(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cantonal_data_active ON cantonal_data(is_active) WHERE is_active = true;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at DESC);

-- Insert default live stats
INSERT INTO public.live_stats (stat_key, stat_label, stat_value, stat_source, display_order) VALUES
  ('permit_updates', 'Permit Monitoring Status', 'Updated Weekly', 'SEM', 1),
  ('processing_time', 'Average Processing Time', '8-12 weeks', 'Cantonal Data', 2),
  ('success_rate', 'Success Rate', '92%', 'Internal Analytics', 3);

-- Insert default cantonal data
INSERT INTO public.cantonal_data (canton_code, canton_name, language, immigration_info, citizenship_info) VALUES
  ('ZH', 'Zürich', 'German', '{"avg_rent": 2200, "tax_rate": 22.0, "approval_rate": 85.0, "processing_weeks": 10, "best_industries": ["Tech", "Finance"]}', '{"requirements": {"years": 10, "language": "B2 German", "integration": true}}'),
  ('GE', 'Geneva', 'French', '{"avg_rent": 2500, "tax_rate": 25.0, "approval_rate": 70.0, "processing_weeks": 12, "best_industries": ["International Orgs", "Finance"]}', '{"requirements": {"years": 10, "language": "B2 French", "integration": true}}'),
  ('BS', 'Basel', 'German', '{"avg_rent": 1900, "tax_rate": 21.0, "approval_rate": 88.0, "processing_weeks": 8, "best_industries": ["Pharma", "Life Sciences"]}', '{"requirements": {"years": 10, "language": "B2 German", "integration": true}}'),
  ('BE', 'Bern', 'German', '{"avg_rent": 1800, "tax_rate": 20.0, "approval_rate": 82.0, "processing_weeks": 9, "best_industries": ["Government", "NGOs"]}', '{"requirements": {"years": 10, "language": "B2 German", "integration": true}}'),
  ('ZG', 'Zug', 'German', '{"avg_rent": 2800, "tax_rate": 15.0, "approval_rate": 75.0, "processing_weeks": 11, "best_industries": ["Finance", "Trading"]}', '{"requirements": {"years": 10, "language": "B2 German", "integration": true}}'),
  ('VD', 'Vaud', 'French', '{"avg_rent": 1700, "tax_rate": 23.0, "approval_rate": 80.0, "processing_weeks": 10, "best_industries": ["Tourism", "Manufacturing"]}', '{"requirements": {"years": 10, "language": "B2 French", "integration": true}}');

-- Success message
SELECT 'Neon database setup complete! ✅' as message;

