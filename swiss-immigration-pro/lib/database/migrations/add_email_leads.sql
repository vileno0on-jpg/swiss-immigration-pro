-- Migration: Add email_leads table for marketing/lead generation
-- Run this if the table doesn't exist in your database

CREATE TABLE IF NOT EXISTS public.email_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  lead_magnet VARCHAR(255),
  source VARCHAR(100) DEFAULT 'website',
  subscribed BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email)
);

CREATE INDEX IF NOT EXISTS idx_email_leads_email ON public.email_leads(email);
CREATE INDEX IF NOT EXISTS idx_email_leads_created_at ON public.email_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_email_leads_subscribed ON public.email_leads(subscribed) WHERE subscribed = true;

-- Grant permissions (adjust based on your setup)
-- GRANT SELECT, INSERT, UPDATE ON public.email_leads TO authenticated;
-- GRANT SELECT ON public.email_leads TO anon;





