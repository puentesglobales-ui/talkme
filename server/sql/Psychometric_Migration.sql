-- NEW TABLE FOR PSYCHOMETRIC EVALUATIONS
-- Linked to 'profiles' via user_id

CREATE TABLE IF NOT EXISTS psychometric_evaluations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- METADATA
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    job_title TEXT, -- The target job for the analysis
    
    -- RAW SCORES (JSONB for flexibility)
    dass_scores JSONB, -- { stress: 10, anxiety: 5, depression: 2 }
    flow_scores JSONB, -- { average: 3.5, dimensions: {...} }
    big5_scores JSONB, -- { openness: 3.2, conscientiousness: 4.5, ... }
    
    -- AI ANALYSIS
    match_score INTEGER, -- 0-100
    ai_analysis JSONB -- Full JSON report from the prompt
);

-- INDEX FOR FAST LOOKUP
CREATE INDEX IF NOT EXISTS idx_psychometric_user ON psychometric_evaluations(user_id);
