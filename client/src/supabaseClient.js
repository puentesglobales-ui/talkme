import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client = null;

// Simple validation: Key must be present and look like a JWT (start with 'ey') needed for real use,
// or at least be non-empty. The placeholder 'sb_publishable...' is definitely invalid for auth.
if (supabaseUrl && supabaseKey && supabaseKey.startsWith('ey')) {
    try {
        client = createClient(supabaseUrl, supabaseKey)
    } catch (e) {
        console.error("Supabase Init Failed:", e);
    }
} else {
    console.warn("Supabase Config Missing or Invalid. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

export const supabase = client;
