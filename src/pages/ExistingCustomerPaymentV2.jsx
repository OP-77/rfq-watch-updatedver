import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard, Loader2, LockKeyhole, Mail } from "lucide-react";
import BrandHeader from "@/components/rfq/BrandHeader";
import InfoPanel from "@/components/rfq/InfoPanel";

export default function ExistingCustomerPaymentV2() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const baseFee = 50;
  const total = baseFee;
  const [email, setEmail] = useState(saved.email || "");
  const [cageCode, setCageCode] = useState(saved.cageCode || "");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePay = () => {
    if (!email || !cageCode) { setError("Please complete your email and CAGE code."); return; }
    setProcessing(true);
    localStorage.setItem("rfqWatchSetup", JSON.stringify({ ...saved, email, cageCode }));
    // Replace with your Stripe Payment Link
    window.location.href = "https://buy.stripe.com/your-payment-link";
  };

  return (
    <div className="rfq-page">
      <BrandHeader />
      <main className="rfq-layout">
        <InfoPanel copy="Don't let your alerts stop — stay ahead of your competition by activating your monthly subscription today." />
        <section className="flow-card">
          <div className="flow-heading"><h2>Continue Your Subscription</h2><p>Activate your monthly plan to keep your RFQ alerts coming.</p></div>

          <div className="rfq-form">
            <fieldset className="user-box">
              <legend>Details</legend>
              <div className="grid sm:grid-cols-2 gap-6">
                <label>Email Address <span>*</span>
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
                  <small>RFQ alerts and receipts will be sent to this address.</small>
                </label>
                <label>CAGE Code <span>*</span>
                  <input name="cageCode" value={cageCode} onChange={(e) => setCageCode(e.target.value.toUpperCase().slice(0, 5))} placeholder="e.g. 7AB12" pattern="[A-Za-z0-9]{5}" title="Enter a valid 5-character CAGE code" required />
                  <small>Enter your 5-character CAGE code.</small>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="form-divider" />

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
              <span><strong>Card details</strong><small>You'll be redirected to Stripe's secure checkout to enter your card information and keep your alerts active.</small></span>
            </button>
            <p><LockKeyhole size={14} /> Your payment information is encrypted and secure.</p>
          </div>

          <div className="confirmation-box">
            <Mail />
            <div>
              <h3>Keep Your Alerts Active</h3>
              <p>Once activated, your RFQ alerts will continue without interruption. A receipt will be sent to {email || "your email address"} each billing cycle.</p>
              <div className="h-px bg-slate-200 my-3" />
              <p>Additional recipients can be added in account management dashboard.</p>
            </div>
          </div>

          {error && <p className="payment-error">{error}</p>}

          <div className="form-divider" />
          <div className="form-actions">
            <button className="continue-button ml-auto" type="button" onClick={handlePay} disabled={processing}>
              {processing ?
              <><Loader2 className="animate-spin" size={18} /> Redirecting to Stripe...</> :
              <>Continue ${total.toFixed(2)}/mo <ArrowRight size={18} /></>
              }
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}