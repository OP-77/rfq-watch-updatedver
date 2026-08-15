import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CreditCard, LockKeyhole, Mail } from "lucide-react";
import FlowLayout from "@/components/rfq/FlowLayout";

export default function Payment() {
  const navigate = useNavigate();
  const setup = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const userCount = Number(setup.amountUsers || 1);
  const fee = 50 + Math.max(0, userCount - 1) * 10;
  const feeLabel = `$${fee.toFixed(2)}`;
  const back = userCount === 1 ? "/create-account" : "/company-details";
  return <FlowLayout step={3} title="Activate Your Account" subtitle="Complete the one-time activation payment to begin receiving RFQ alerts.">
    <div className="fee-card"><span>One-Time Activation Fee</span><strong>{feeLabel}</strong></div>
    <h3 className="section-title">Payment Details</h3>
    <div className="payment-box"><div className="secure-row"><span><LockKeyhole size={16} /> Secure payment</span><b>VISA&nbsp;&nbsp; MC&nbsp;&nbsp; AMEX</b></div><button type="button" className="card-placeholder"><CreditCard /><span><strong>Card details</strong><small>Card number, expiry date, and CVV</small></span></button><p><LockKeyhole size={14} /> Your payment information is encrypted and secure.</p></div>
    <div className="confirmation-box"><Mail /><div><h3>Payment Confirmation</h3><p>A receipt will be sent to {setup.email || "your email address"} after payment.</p></div></div>
    <div className="form-divider" /><div className="form-actions"><button className="back-button" onClick={() => navigate(back)}><ArrowLeft size={18} /> Back</button><button className="continue-button" type="button">Pay {feeLabel} and Activate <ArrowRight size={18} /></button></div>
  </FlowLayout>;
}