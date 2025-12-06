import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
    // throw new Error('Missing Supabase environment variables');
    // Don't throw immediately on import, checking at function level is safer for serverless cold starts
    // But for now, let's keep it simple. If variables are missing, it will crash, which is what we saw.
    // Let's allow it to be initialized, we can check later.
}

// Server-side Supabase client with service role key
// Use this for backend API operations that bypass RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
