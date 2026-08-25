import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CreditCard, Loader2, LockKeyhole, Mail } from "lucide-react";
import FlowLayout from "@/components/rfq/FlowLayout";

export default function NewCustomerPayment() {
  const navigate = useNavigate();
  const setup = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const userCount = Number(setup.amountUsers || 1);
  const baseFee = 50;
  const total = baseFee;
  const back = userCount === 1 ? "/create-account-new" : "/recipients-new";
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePay = () => {
    setProcessing(true);
    // Replace with your Stripe Payment Link
    window.location.href = "https://buy.stripe.com/your-payment-link";
  };

  return (
    <FlowLayout step={3} title="Activate Your Account" subtitle="Complete your monthly subscription to begin receiving RFQ alerts." infoProps={{ copy: "Get started now and stay ahead of your competition with RFQ alerts for a simple monthly fee." }}>
      <div className="pricing-breakdown">
        <div className="pricing-row">
          <div><strong>Base Subscription</strong><small>All recipients included</small></div>
          <span>${baseFee.toFixed(2)}/mo</span>
        </div>
        <div className="pricing-divider" />
        <div className="pricing-total">
          <div><strong>Monthly Total</strong></div>
          <span>${total.toFixed(2)}/mo</span>
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
          <p>A receipt will be sent to {setup.email || "your email address"} each billing cycle.</p>
        </div>
      </div>

      {error && <p className="payment-error">{error}</p>}

      <div className="form-divider" />
      <div className="form-actions">
        <button className="back-button" onClick={() => navigate(back)} disabled={processing}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="continue-button" type="button" onClick={handlePay} disabled={processing}>
          {processing ?
          <><Loader2 className="animate-spin" size={18} /> Redirecting to Stripe...</> :

          <>Subscribe ${total.toFixed(2)}/mo <ArrowRight size={18} /></>
          }
        </button>
      </div>
    </FlowLayout>);

}