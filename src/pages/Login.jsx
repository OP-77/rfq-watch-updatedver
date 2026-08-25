import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { safeReturnTo } from "@/lib/authReturnTo";
import BrandHeader from "@/components/rfq/BrandHeader";
import { ArrowRight, Mail, ShieldCheck, Loader2 } from "lucide-react";

const FIXED_PASSWORD = "RFQWatch2024!";

export default function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      try {
        await base44.auth.register({ email, password: FIXED_PASSWORD });
      } catch {
        await base44.auth.resendOtp(email);
      }
      setStep(2);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode: otp });
      const token = result.access_token || result.data?.access_token;
      if (token) localStorage.setItem("base44_access_token", token);
      window.location.href = safeReturnTo();
    } catch {
      setError("Invalid OTP code. Check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <BrandHeader />
      <main className="min-h-[calc(100vh-82px)] flex items-center justify-center px-5 py-12">
        <div className="setup-card max-w-md w-full">
          <p className="rfq-eyebrow">Secure Access</p>
          <h2 className="text-2xl font-semibold mt-2">Sign In to RFQ Watch Lite</h2>
          <div className="gold-rule" />
          {error && <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>}

          {step === 1 && (
            <form className="rfq-form" onSubmit={sendOtp}>
              <label>Email Address <span>*</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required autoFocus />
              </label>
              <p className="text-xs text-slate-500 mt-3">A one-time verification code will be sent to your email.</p>
              <div className="form-actions mt-6">
                <button className="continue-button" type="submit" disabled={loading}>
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Mail size={18} /> Send Code <ArrowRight size={18} /></>}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="rfq-form" onSubmit={verifyOtpCode}>
              <label>Verification Code <span>*</span>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" maxLength={6} required autoFocus />
              </label>
              <p className="text-xs text-slate-500 mt-3">Enter the code sent to {email}.</p>
              <div className="form-actions mt-6">
                <button type="button" className="back-button" onClick={() => setStep(1)} disabled={loading}>Back</button>
                <button className="continue-button" type="submit" disabled={loading}>
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : <><ShieldCheck size={18} /> Sign In</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}