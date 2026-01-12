import { createClient } from '@supabase/supabase-js'

// WARNING: Keys should be in .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.warn('DEBUG: Supabase Config', {
    url: supabaseUrl ? 'Found' : 'MISSING',
    key: supabaseKey ? 'Found' : 'MISSING',
    rawUrl: supabaseUrl // Temporary debug
});

export const supabase = createClient(supabaseUrl, supabaseKey)
