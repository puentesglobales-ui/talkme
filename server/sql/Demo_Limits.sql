-- TalkMe Demo Limits: 5 Minutes Timer

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS demo_started_at TIMESTAMPTZ;

-- Function to check demo time
CREATE OR REPLACE FUNCTION check_demo_status(p_user_id UUID) 
RETURNS TEXT AS $$
DECLARE
    v_started_at TIMESTAMPTZ;
    v_is_premium BOOLEAN;
    v_role TEXT;
BEGIN
    SELECT demo_started_at, is_premium, role INTO v_started_at, v_is_premium, v_role
    FROM public.profiles WHERE id = p_user_id;

    -- Admin or Premium = Unlimited
    IF v_role = 'admin' OR v_is_premium THEN
        RETURN 'allowed';
    END IF;

    -- If never started, start now
    IF v_started_at IS NULL THEN
        UPDATE public.profiles SET demo_started_at = NOW() WHERE id = p_user_id;
        RETURN 'started';
    END IF;

    -- Check 5 minute limit
    IF NOW() > v_started_at + INTERVAL '5 minutes' THEN
        RETURN 'expired';
    END IF;

    RETURN 'allowed';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
