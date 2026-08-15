import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CreditCard, Loader2, LockKeyhole, Mail } from "lucide-react";
import FlowLayout from "@/components/rfq/FlowLayout";

export default function Payment() {
  const navigate = useNavigate();
  const setup = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const userCount = Number(setup.amountUsers || 1);
  const additionalUsers = Math.max(0, userCount - 1);
  const activationFee = 50;
  const additionalFee = additionalUsers * 10;
  const total = activationFee + additionalFee;
  const back = userCount === 1 ? "/create-account" : "/company-details";
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePay = () => {
    setProcessing(true);
    // Replace with your Stripe Payment Link
    window.location.href = "https://buy.stripe.com/your-payment-link";
  };

  return (
    <FlowLayout step={3} title="Activate Your Account" subtitle="Complete the one-time activation payment to begin receiving RFQ alerts." infoProps={{ copy: "Get started now and stay ahead of your competition with RFQ alerts for one simple, one-time fee." }}>
      <div className="pricing-breakdown">
        <div className="pricing-row">
          <div><strong>Activation Fee</strong><small>First user — one-time</small></div>
          <span>${activationFee.toFixed(2)}</span>
        </div>
        {additionalUsers > 0 && (
          <div className="pricing-row">
            <div><strong>Additional Recipients</strong><small>{additionalUsers} {additionalUsers === 1 ? "recipient" : "recipients"} × $10.00</small></div>
            <span>${additionalFee.toFixed(2)}</span>
          </div>
        )}
        <div className="pricing-divider" />
        <div className="pricing-total">
          <div><strong>Total Due Today</strong><small>One-time payment</small></div>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <h3 className="section-title">Payment Details</h3>
      <div className="payment-box">
        <div className="secure-row">
          <span><LockKeyhole size={16} /> Secure payment powered by Stripe</span>
          <b>VISA&nbsp;&nbsp; MC&nbsp;&nbsp; AMEX</b>
        </div>
        <button type="button" className="card-placeholder" disabled>
          <CreditCard />
          <span><strong>Card details</strong><small>You'll be redirected to Stripe's secure checkout to enter your card information.</small></span>
        </button>
        <p><LockKeyhole size={14} /> Your payment information is encrypted and secure.</p>
      </div>

      <div className="confirmation-box">
        <Mail />
        <div>
          <h3>Payment Confirmation</h3>
          <p>A receipt will be sent to {setup.email || "your email address"} after payment.</p>
        </div>
      </div>

      {error && <p className="payment-error">{error}</p>}

      <div className="form-divider" />
      <div className="form-actions">
        <button className="back-button" onClick={() => navigate(back)} disabled={processing}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="continue-button" type="button" onClick={handlePay} disabled={processing}>
          {processing ? (
            <><Loader2 className="animate-spin" size={18} /> Redirecting to Stripe...</>
          ) : (
            <>Pay ${total.toFixed(2)} and Activate <ArrowRight size={18} /></>
          )}
        </button>
      </div>
    </FlowLayout>
  );
}