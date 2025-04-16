import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin access
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_SECRET;

export const supabaseWithAdminRole = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
});

export const adminAuthClient = supabaseWithAdminRole.auth.admin;
