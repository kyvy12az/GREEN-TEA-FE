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
    const data = JSON.parse(bodyText);

    if (!data || !data.signature) {
      return new Response("Invalid payload", { status: 400 });
    }

    const accessKey = Deno.env.get('MOMO_ACCESS_KEY') || 'F8BBA842ECF85';
    const secretKey = Deno.env.get('MOMO_SECRET_KEY') || 'K951B6PE1waPeI2BCEe8PbbY2tXlT7bF';

    // Verify signature
    const rawHash = `accessKey=${accessKey}&amount=${data.amount}&extraData=${data.extraData || ''}&message=${data.message}&orderId=${data.orderId}&orderInfo=${data.orderInfo}&orderType=${data.orderType}&partnerCode=${data.partnerCode}&payType=${data.payType}&requestId=${data.requestId}&responseTime=${data.responseTime}&resultCode=${data.resultCode}&transId=${data.transId}`;
    
    const expectedSignature = await hmacSha256(secretKey, rawHash);

    if (expectedSignature !== data.signature) {
      console.error("Invalid signature");
      return new Response("Invalid signature", { status: 400 });
    }

    // Update payment transaction
    const { data: transaction, error: txError } = await supabase
      .from('payment_transactions')
      .select('*')
      .eq('provider_transaction_id', data.orderId)
      .single();

    if (txError || !transaction) {
      console.error("Transaction not found", data.orderId);
      return new Response("Transaction not found", { status: 404 });
    }

    const isSuccess = data.resultCode === 0;
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

    return new Response(JSON.stringify({ status: "OK" }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Momo IPN error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
