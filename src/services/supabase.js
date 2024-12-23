import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dpjcvwsfaozsucyeeqgf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwamN2d3NmYW96c3VjeWVlcWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MzQ3MjMsImV4cCI6MjA1MDUxMDcyM30.KGQAXUbMUU3_Qek-Xn1UG6NJoEiJoEclqikx8kOaA2A'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;