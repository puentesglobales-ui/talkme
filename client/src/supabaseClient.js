import { createClient } from '@supabase/supabase-js'

// WARNING: Keys should be in .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Supabase keys are missing!', { supabaseUrl, supabaseKey });
    // Alert the user on the screen so they know why it's white/broken
    if (typeof window !== 'undefined') {
        alert("ERROR DE CONFIGURACIÓN: Faltan las variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Revisa la consola.");
    }
}

// Create client only if keys exist to avoid "supabaseUrl is required" crash
// If missing, we export a null client which will fail later but allow checking logs
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;
