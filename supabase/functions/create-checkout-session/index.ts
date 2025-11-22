// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { items, order_id, paymentMethod } = await req.json();

    if (!STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Payment method requested:", paymentMethod);

    // Determine currency and payment method based on type
    let currency = "php";
    let paymentMethodTypes = ["card"]; // Default to card

    if (paymentMethod === "gcash") {
      currency = "php";
      paymentMethodTypes = ["paymaya"]; // GCash uses PayMaya in Stripe
    } else if (paymentMethod === "grabpay") {
      currency = "myr";
      paymentMethodTypes = ["grabpay"];
    } else if (paymentMethod === "card") {
      currency = "php";
      paymentMethodTypes = ["card"];
    }

    console.log("Using currency:", currency);
    console.log("Payment method types:", paymentMethodTypes);

    // Create Stripe Checkout Session
    const body = new URLSearchParams({
      mode: "payment",
      success_url: `${req.headers.get("origin") || "http://localhost:5173"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin") || "http://localhost:5173"}/cancel`,
      "metadata[order_id]": order_id,
    });

    // Add payment method types
    paymentMethodTypes.forEach((method) => {
      body.append("payment_method_types[]", method);
    });

    // Add line items
    items.forEach((item: any, index: number) => {
      body.append(`line_items[${index}][price_data][currency]`, currency);
      body.append(`line_items[${index}][price_data][product_data][name]`, item.name);
      
      // Convert price to cents/smallest currency unit
      const amount = Math.round(item.price * 100);
      body.append(`line_items[${index}][price_data][unit_amount]`, amount.toString());
      body.append(`line_items[${index}][quantity]`, item.quantity.toString());
    });

    console.log("Creating Stripe session with body:", body.toString());

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const session = await response.json();

    console.log("Stripe response:", session);

    if (!response.ok) {
      console.error("Stripe error:", session.error);
      throw new Error(session.error?.message || "Failed to create Stripe session");
    }

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-checkout-session' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
