import { createClient } from "@supabase/supabase-js";
const supabaseURL = "https://ehdqwtwtyofhjtxmqizo.supabase.co"
const supabaseAnonPublic = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZHF3dHd0eW9maGp0eG1xaXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2MjQ4MTUsImV4cCI6MTk5OTIwMDgxNX0.6XvUTIAc7npJwp66gvEtrJNb6KenwnCA2dWTbVh8rkc"
export default createClient(supabaseURL, supabaseAnonPublic);