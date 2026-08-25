import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from "base44:runtime";

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const returnUrl = body.returnUrl || "https://rfq-watch-flow.base44.app/dashboard";
    const email = user.email;

    const stripeKey = secrets.get("STRIPE_SECRET_KEY");
    const headers = {
      "Authorization": `Bearer ${stripeKey}`,
      "Stripe-Version": "2025-10-29.clover"
    };

    const custRes = await fetch(`https://api.stripe.com/v1/customers?email=${encodeURIComponent(email)}&limit=1`, { headers });
    const custData = await custRes.json();
    const customerId = custData.data && custData.data.length > 0 ? custData.data[0].id : null;

    if (!customerId) {
      return Response.json({ error: "No active subscription found. Please complete checkout first." }, { status: 404 });
    }

    const params = new URLSearchParams();
    params.append("customer", customerId);
    params.append("return_url", returnUrl);

    const portalRes = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": crypto.randomUUID() },
      body: params
    });

    const portalData = await portalRes.json();

    if (!portalRes.ok) {
      console.error("Stripe portal error:", portalData.error?.message);
      return Response.json({ error: portalData.error?.message || "Failed to create portal session" }, { status: 500 });
    }

    return Response.json({ url: portalData.url });
  } catch (error) {
    console.error("createStripePortalSession error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}