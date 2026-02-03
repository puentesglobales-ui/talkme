-- GDPR & Roles Compliance Schema

-- 1. Consent Logging
CREATE TABLE IF NOT EXISTS public.opt_in_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL, 
    status BOOLEAN NOT NULL, 
    ip_address TEXT, 
    source TEXT DEFAULT 'web_onboarding_v1',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enhanced Profile Fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user',
ADD COLUMN IF NOT EXISTS credits_remaining INT DEFAULT 1, 
ADD COLUMN IF NOT EXISTS tos_accepted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_interaction_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Secure View for Recruiters (Only shows opted-in users)
CREATE OR REPLACE VIEW public.available_candidates AS
SELECT 
    p.id,
    p.email,
    p.level,
    p.last_active
FROM public.profiles p
JOIN (
    SELECT DISTINCT ON (user_id) user_id, status
    FROM public.opt_in_logs
    WHERE consent_type = 'future_matching'
    ORDER BY user_id, created_at DESC
) consent ON p.id = consent.user_id
WHERE consent.status = TRUE;

-- 4. Helper Function to Log Consent via RPC (Optional, but good for security)
CREATE OR REPLACE FUNCTION log_consent(
    p_user_id UUID, 
    p_consent_type TEXT, 
    p_status BOOLEAN,
    p_ip TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.opt_in_logs (user_id, consent_type, status, ip_address)
    VALUES (p_user_id, p_consent_type, p_status, p_ip);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
