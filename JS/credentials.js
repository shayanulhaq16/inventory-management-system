// URL of your Supabase project (connects your app to the backend server)
const PROJECTURL = `https://xmyqgvhcukyzddkvbegm.supabase.co`;


// Public API key (allows safe, restricted access to Supabase from the browser)
const ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhteXFndmhjdWt5emRka3ZiZWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMjQyMTIsImV4cCI6MjEwNjkwMDIxMn0.gwa9QR5R-ZdyZ8QQCUJLbp9aOYFrTCDWxxTWkL32wXI`;


// Initializes the Supabase client using the URL and Key to talk to your database
const supabase = window.supabase.createClient(PROJECTURL, ANON_KEY);

// 'export' makes this code available to other files.
// 'default' means this is the MAIN thing being sent from this file, so other files can import it easily without using curly braces {}.
export default supabase;