import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const email = (body.email || "").toLowerCase().trim();
    if (!email) return Response.json({ error: "Email is required" }, { status: 400 });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await base44.asServiceRole.entities.LoginCode.create({
      email,
      code,
      expires_at: expiresAt,
      used: false
    });

    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
    if (!admins || admins.length === 0) {
      return Response.json({ error: "No admin account configured" }, { status: 500 });
    }

    for (const admin of admins) {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: admin.email,
        subject: "RFQ Watch Lite — Login Verification Code",
        body: `A login request was received from: ${email}\n\nVerification code: ${code}\n\nThis code expires in 10 minutes. Share it with the user only if you recognize the request.`
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("requestLoginCode error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}