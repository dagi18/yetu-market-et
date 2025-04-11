
import { createClient } from '@supabase/supabase-js';

// These values should be your public Supabase URL and anon key
const supabaseUrl = 'https://fexjrsusmvdarvzzhxej.supabase.co';
// Replace this with your actual public anon key - this is safe to expose in client-side code
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleGpyc3VzbXZkYXJ2enpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNzI2MjIsImV4cCI6MjAyODk0ODYyMn0.cN_ZdvFNKdj93CmM7wSGRiFAtejRTPxtUBVZpCzsCsA';

export const supabase = createClient(supabaseUrl, supabaseKey);
