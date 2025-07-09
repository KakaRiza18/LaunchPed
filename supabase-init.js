const supabaseUrl = "https://ldwqxyravgndzcoswmoh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkd3F4eXJhdmduZHpjb3N3bW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDUyODEsImV4cCI6MjA2NzYyMTI4MX0._QH4BipfHJadGRv-qkcqY2jvPlzlz1ecWO1d6Ux_bmo";
window.supabase = window.supabase || window.supabase?.createClient ? window.supabase.createClient(supabaseUrl, supabaseKey) : supabase.createClient(supabaseUrl, supabaseKey);
