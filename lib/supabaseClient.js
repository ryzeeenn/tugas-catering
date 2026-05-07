// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tbxayjnukdegqmrqvzpk.supabase.co'
const supabaseKey = 'sb_publishable_xtMZuCznplkBAdtzed1XvQ_oOmwNMP6'

export const supabase = createClient(supabaseUrl, supabaseKey)