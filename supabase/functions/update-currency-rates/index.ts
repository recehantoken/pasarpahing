
// Follow Deno runtime server API
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
async function handleRequest(req: Request) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch the currency rate from a public API (using Bank Indonesia API as an example)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch currency rates: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract IDR rate (Indonesian Rupiah)
    const idrRate = data.rates.IDR;
    
    if (!idrRate) {
      throw new Error('IDR rate not found in response');
    }
    
    console.log(`Current IDR rate: ${idrRate}`);

    // Connect to Supabase and update the rate
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase URL or service key not found');
    }

    // Update or insert the rate in the database
    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/currency_rates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        currency_code: 'IDR',
        rate: idrRate,
        last_updated: new Date().toISOString()
      })
    });

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      throw new Error(`Failed to update currency rate: ${errorText}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Currency rate updated successfully',
      rate: idrRate,
      updated_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Error updating currency rate:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
}

// Initialize Deno server
serve(handleRequest);
