-- Database schema update for quiz data storage and lead tracking
-- This adds layer information and improves quiz data structure

-- Add layer column to quiz_results if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'quiz_results' 
        AND column_name = 'layer'
    ) THEN
        ALTER TABLE public.quiz_results 
        ADD COLUMN layer TEXT;
        
        COMMENT ON COLUMN public.quiz_results.layer IS 'User layer classification: europeans, americans, or others';
    END IF;
END $$;

-- Add email column for lead tracking (if not already exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'quiz_results' 
        AND column_name = 'email'
    ) THEN
        ALTER TABLE public.quiz_results 
        ADD COLUMN email TEXT;
        
        COMMENT ON COLUMN public.quiz_results.email IS 'Email address for lead tracking and follow-up';
    END IF;
END $$;

-- Create index on layer for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_results_layer ON public.quiz_results(layer);
CREATE INDEX IF NOT EXISTS idx_quiz_results_email ON public.quiz_results(email);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON public.quiz_results(created_at DESC);

-- Create leads table for marketing (optional, separate from quiz_results)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  country_code TEXT,
  layer TEXT, -- europeans, americans, or others
  immigration_reason TEXT[],
  has_job_offer BOOLEAN,
  quiz_answers JSONB,
  source TEXT DEFAULT 'quiz', -- quiz, form, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- Add indexes for leads table
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_layer ON public.leads(layer);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_contacted ON public.leads(contacted);

-- Update trigger for leads updated_at
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at 
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION update_leads_updated_at();

-- RLS policies for leads (if needed)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view all leads
CREATE POLICY "Admins can view all leads"
  ON public.leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Policy: Anyone can insert leads (for quiz submissions)
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- Comments
COMMENT ON TABLE public.leads IS 'Marketing leads from quiz and other forms';
COMMENT ON COLUMN public.leads.layer IS 'User classification: europeans, americans, or others';
COMMENT ON COLUMN public.leads.quiz_answers IS 'Full quiz answers JSON for reference';


