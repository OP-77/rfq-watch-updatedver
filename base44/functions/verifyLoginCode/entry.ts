import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const email = (body.email || "").toLowerCase().trim();
    const code = (body.code || "").trim();
    if (!email || !code) return Response.json({ error: "Email and code are required" }, { status: 400 });

    const codes = await base44.asServiceRole.entities.LoginCode.filter({ email, code, used: false });
    if (!codes || codes.length === 0) {
      return Response.json({ error: "Invalid verification code" }, { status: 400 });
    }

    const loginCode = codes[0];
    if (new Date(loginCode.expires_at) < new Date()) {
      return Response.json({ error: "Code has expired. Please request a new one." }, { status: 400 });
    }

    await base44.asServiceRole.entities.LoginCode.update(loginCode.id, { used: true });

    return Response.json({ verified: true, email });
  } catch (error) {
    console.error("verifyLoginCode error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}