-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON public.site_settings;
CREATE POLICY "Allow public read access on site_settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin full access on site_settings" ON public.site_settings;
CREATE POLICY "Allow admin full access on site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS handle_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER handle_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default settings for Blog Section
INSERT INTO public.site_settings (key, value, description)
VALUES 
    ('blog_section', '{"enabled": true, "title": "Latest from Our Blog", "subtitle": "Stay updated with travel tips, bus reviews, and industry news.", "limit": 3}'::jsonb, 'Configuration for the homepage blog section')
ON CONFLICT (key) DO NOTHING;
