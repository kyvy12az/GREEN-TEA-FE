// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";
async function hmacSha256(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Need service role to bypass RLS
    );

    const bodyText = await req.text();
    const payload = JSON.parse(bodyText);

    if (!payload || !payload.data || !payload.mac) {
      return new Response(JSON.stringify({ return_code: -1, return_message: "Invalid body" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const key2 = Deno.env.get('ZLP_KEY2') || 'kLtgPl8YESYV3I5IOP18M7wz1yN1sE18';

    // Verify MAC
    const expectedMac = await hmacSha256(key2, payload.data);

    if (expectedMac !== payload.mac) {
      console.error("Invalid MAC");
      return new Response(JSON.stringify({ return_code: -1, return_message: "Invalid MAC" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = JSON.parse(payload.data);
    const appTransId = data.app_trans_id;

    // Update payment transaction
    const { data: transaction, error: txError } = await supabase
      .from('payment_transactions')
      .select('*')
      .eq('provider_transaction_id', appTransId)
      .single();

    if (txError || !transaction) {
      console.error("Transaction not found", appTransId);
      return new Response(JSON.stringify({ return_code: 1, return_message: "Order not found" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // ZaloPay always sends success callback if callback is called, but check if type is 1
    const isSuccess = payload.type === 1;
    const newStatus = isSuccess ? 'success' : 'failed';

    // Update Transaction
    await supabase
      .from('payment_transactions')
      .update({
        status: newStatus,
        webhook_data: data,
        updated_at: new Date().toISOString()
      })
      .eq('id', transaction.id);

    // If success, update Order status
    if (isSuccess) {
      await supabase
        .from('orders')
        .update({
          status: 'processing',
          updated_at: new Date().toISOString()
        })
        .eq('id', transaction.order_id);
    }

    return new Response(JSON.stringify({ return_code: 1, return_message: "OK" }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Zalopay Callback error:", error);
    return new Response(JSON.stringify({ return_code: 0, return_message: error instanceof Error ? error.message : "Unknown error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
});
