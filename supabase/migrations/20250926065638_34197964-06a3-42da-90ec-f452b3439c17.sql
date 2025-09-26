-- Enable Row Level Security on the system_info table
ALTER TABLE public.system_info ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access to system info (this is public information)
CREATE POLICY "System info is publicly readable" 
ON public.system_info 
FOR SELECT 
USING (true);