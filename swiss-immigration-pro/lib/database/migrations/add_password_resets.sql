-- Password reset tokens table
CREATE TABLE IF NOT EXISTS public.password_resets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_resets_token ON public.password_resets(token);
CREATE INDEX IF NOT EXISTS idx_password_resets_user_id ON public.password_resets(user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_expires_at ON public.password_resets(expires_at) WHERE used = FALSE;





