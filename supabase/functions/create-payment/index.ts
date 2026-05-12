// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function hmacSha256(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId, method, amount, orderNumber, momoReturnUrl, zalopayReturnUrl } = await req.json();

    if (!orderId || !method || !amount) {
      throw new Error("Missing required parameters");
    }

    let payUrl = '';
    let providerTransactionId = '';

    if (method === 'momo') {
      // ===== MOMO SANDBOX (Official test credentials from MoMo Developer Docs) =====
      const partnerCode = Deno.env.get('MOMO_PARTNER_CODE') ?? 'MOMO';
      const accessKey   = Deno.env.get('MOMO_ACCESS_KEY')   ?? 'F8BBA842ECF85';
      const secretKey   = Deno.env.get('MOMO_SECRET_KEY')   ?? 'K951B6PE1waPeI2BCEe8PbbY2tXlT7bF';
      const endpoint    = Deno.env.get('MOMO_ENDPOINT')     ?? 'https://test-payment.momo.vn/v2/gateway/api/create';
      const returnUrl   = momoReturnUrl ?? Deno.env.get('MOMO_RETURN_URL') ?? 'http://localhost:8080/payment/momo-return';
      const ipnUrl      = Deno.env.get('MOMO_IPN_URL')      ?? 'https://jyledbngkrnzskamzngw.supabase.co/functions/v1/momo-ipn';

      const safeRef     = (orderNumber ?? orderId).replace(/[^a-zA-Z0-9]/g, '');
      const orderIdMoMo = `MM_${safeRef}_${Date.now()}`;
      providerTransactionId = orderIdMoMo;
      const requestId   = `${partnerCode}${Date.now()}`;
      const orderInfo   = `Thanh toan don hang ${orderNumber ?? orderId}`;
      const requestType = 'captureWallet';

      const rawSignature =
        `accessKey=${accessKey}` +
        `&amount=${amount}` +
        `&extraData=` +
        `&ipnUrl=${ipnUrl}` +
        `&orderId=${orderIdMoMo}` +
        `&orderInfo=${orderInfo}` +
        `&partnerCode=${partnerCode}` +
        `&redirectUrl=${returnUrl}` +
        `&requestId=${requestId}` +
        `&requestType=${requestType}`;

      const signature = await hmacSha256(secretKey, rawSignature);

      const payload = {
        partnerCode, accessKey, requestId,
        amount: String(amount),
        orderId: orderIdMoMo,
        orderInfo,
        redirectUrl: returnUrl,
        ipnUrl,
        extraData: '',
        requestType,
        signature,
        lang: 'vi'
      };

      console.log('MoMo request to:', endpoint);
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();
      console.log('MoMo response:', JSON.stringify(data));

      if (data.resultCode !== 0) {
        throw new Error(`MoMo: ${data.message} (code: ${data.resultCode})`);
      }
      payUrl = data.payUrl;

    } else if (method === 'zalopay') {
      // ===== ZALOPAY SANDBOX (Official test credentials) =====
      const appId       = Deno.env.get('ZLP_APP_ID')      ?? '2553';
      const key1        = Deno.env.get('ZLP_KEY1')         ?? 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL';
      const endpoint    = Deno.env.get('ZLP_CREATE_URL')   ?? 'https://sb-openapi.zalopay.vn/v2/create';
      const rawReturnZlp = zalopayReturnUrl ?? Deno.env.get('ZLP_RETURN_URL') ?? '';
      const returnUrl   = rawReturnZlp || 'http://localhost:8080/payment/zalopay-return';
      const callbackUrl = Deno.env.get('ZLP_CALLBACK_URL') ?? 'https://jyledbngkrnzskamzngw.supabase.co/functions/v1/zalopay-callback';

      const d = new Date();
      const dateStr = `${String(d.getFullYear()).slice(2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
      const appTransId = `${dateStr}_${Math.floor(Math.random()*1000000).toString().padStart(6,'0')}`;
      providerTransactionId = appTransId;

      const appTime  = Date.now();
      const embedData = JSON.stringify({ redirecturl: returnUrl });
      const itemData  = JSON.stringify([{
        itemid: orderId,
        itemname: `Don hang ${orderNumber ?? orderId}`,
        itemprice: amount,
        itemquantity: 1
      }]);

      const rawHash = `${appId}|${appTransId}|guest|${amount}|${appTime}|${embedData}|${itemData}`;
      const mac = await hmacSha256(key1, rawHash);

      const payloadZlp = new URLSearchParams({
        app_id: appId,
        app_trans_id: appTransId,
        app_user: 'guest',
        app_time: String(appTime),
        amount: String(amount),
        item: itemData,
        embed_data: embedData,
        description: `Thanh toan don hang ${orderNumber ?? orderId}`,
        callback_url: callbackUrl,
        mac
      });

      console.log('ZaloPay request to:', endpoint);
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payloadZlp.toString()
      });

      const data = await resp.json();
      console.log('ZaloPay response:', JSON.stringify(data));

      if (data.return_code !== 1) {
        throw new Error(`ZaloPay: ${data.return_message} (sub: ${data.sub_return_message ?? ''})`);
      }
      payUrl = data.order_url;

    } else {
      throw new Error("Invalid payment method. Use 'momo' or 'zalopay'.");
    }

    // Lưu giao dịch vào DB (best effort)
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );
      await supabase.from('payment_transactions').insert({
        order_id: orderId,
        payment_method: method,
        provider_transaction_id: providerTransactionId,
        amount: amount,
        status: 'pending'
      });
    } catch (dbErr) {
      console.warn('Could not save payment transaction:', dbErr);
    }

    return new Response(JSON.stringify({ payUrl, success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Payment error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
