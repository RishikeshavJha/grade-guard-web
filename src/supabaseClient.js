// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hggqrozynnhktrclrhze.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZ3Fyb3p5bm5oa3RyY2xyaHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MjA4MjMsImV4cCI6MjA3NDQ5NjgyM30.DHU99LWYNg0EMvM2uYHtp34XKsEeMjjWvUQ-puQNcAg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

