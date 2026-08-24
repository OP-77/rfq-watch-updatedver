import { secrets } from "base44:runtime";

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const returnUrl = body.returnUrl || "https://rfq-watch-flow.base44.app/dashboard";
    const email = body.email;

    const stripeKey = secrets.get("STRIPE_SECRET_KEY");
    const headers = {
      "Authorization": `Bearer ${stripeKey}`,
      "Stripe-Version": "2025-10-29.clover"
    };

    let customerId;

    if (email) {
      const custRes = await fetch(`https://api.stripe.com/v1/customers?email=${encodeURIComponent(email)}&limit=1`, { headers });
      const custData = await custRes.json();
      if (custData.data && custData.data.length > 0) {
        customerId = custData.data[0].id;
      }
    }

    if (!customerId) {
      return Response.json({ error: "No active subscription found." }, { status: 404 });
    }

    // Find active subscriptions for this customer
    const subRes = await fetch(`https://api.stripe.com/v1/subscriptions?customer=${customerId}&status=active&limit=10`, { headers });
    const subData = await subRes.json();

    if (!subData.data || subData.data.length === 0) {
      return Response.json({ error: "No active subscription to cancel." }, { status: 404 });
    }

    // Cancel all active subscriptions (cancel at period end)
    const cancelled = [];
    for (const sub of subData.data) {
      const cancelRes = await fetch(`https://api.stripe.com/v1/subscriptions/${sub.id}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": crypto.randomUUID() },
        body: new URLSearchParams({ cancel_at_period_end: "true" })
      });
      const cancelData = await cancelRes.json();
      cancelled.push({ id: sub.id, status: cancelData.status, cancel_at_period_end: cancelData.cancel_at_period_end });
    }

    // Create a portal session so the user can confirm
    const params = new URLSearchParams();
    params.append("customer", customerId);
    params.append("return_url", returnUrl);

    const portalRes = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": crypto.randomUUID() },
      body: params
    });
    const portalData = await portalRes.json();

    return Response.json({ cancelled, url: portalRes.ok ? portalData.url : null });
  } catch (error) {
    console.error("cancelSubscription error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}