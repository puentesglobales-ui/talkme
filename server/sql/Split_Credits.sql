-- Separate Credit Counters for ATS and Roleplay

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS credits_ats INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS credits_roleplay INT DEFAULT 20;

-- Optional: Migrate old general credits to ats credits if desired, 
-- but simpler to just start fresh with new columns defaults.
UPDATE public.profiles SET credits_ats = 1 WHERE credits_ats IS NULL;
UPDATE public.profiles SET credits_roleplay = 20 WHERE credits_roleplay IS NULL;

-- Function to decrement specific credit
CREATE OR REPLACE FUNCTION decrement_credit(p_user_id UUID, p_type TEXT) 
RETURNS VOID AS $$
BEGIN
    IF p_type = 'ats' THEN
        UPDATE public.profiles 
        SET credits_ats = credits_ats - 1,
            usage_count = usage_count + 1 -- General usage tracking
        WHERE id = p_user_id;
    ELSIF p_type = 'roleplay' THEN
        UPDATE public.profiles 
        SET credits_roleplay = credits_roleplay - 1,
            usage_count = usage_count + 1
        WHERE id = p_user_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
