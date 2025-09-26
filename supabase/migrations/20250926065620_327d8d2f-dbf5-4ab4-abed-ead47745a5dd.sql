-- Initialize the database with a simple table to generate types
-- This will ensure the Supabase types file is created properly

CREATE TABLE IF NOT EXISTS public.system_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version TEXT NOT NULL DEFAULT '1.0.0',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial system info
INSERT INTO public.system_info (version) VALUES ('1.0.0') ON CONFLICT DO NOTHING;