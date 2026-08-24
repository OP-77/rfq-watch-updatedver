import { Link } from "react-router-dom";
import { ArrowRight, BellRing, CircleCheck, Mail } from "lucide-react";
import BrandHeader from "@/components/rfq/BrandHeader";

export default function FreeTrialHome() {
  return <div className="landing-page">
    <BrandHeader />
    <main className="landing-hero">
      <section className="hero-copy">
        <div className="info-shadow-box">
          <p className="rfq-eyebrow">Your Free Trial Is Ending</p>
          <h1>Don't Let Your <span>RFQ Alerts</span> Go Quiet.</h1>
          <div className="gold-rule" />
          <p>You've seen the value of relevant government RFQs delivered straight to your inbox.</p>
          <p className="mt-4">Stay ahead of your competition by activating your monthly subscription before your trial ends.</p>
          <small><CircleCheck size={15} /> Rapid. Reliable. Relevant.</small>
        </div>
      </section>
      <section className="setup-card">
        <p className="rfq-eyebrow">3 Simple Steps</p><h2>Keep Your Alerts Coming</h2>
        <div className="gold-rule" />
        {[[BellRing, "Confirm Your Account", "Verify your CAGE code and contact details."], [Mail, "Manage Recipients", "Choose who should keep receiving RFQ alerts."], [CircleCheck, "Activate Your Plan", "Complete your monthly subscription and stay ahead."]].map(([Icon, title, copy], i) => <div className="landing-step" key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}
        <Link className="navy-button" to="/existing-customer-payment">Continue Receiving RFQ Alerts <ArrowRight size={18} /></Link>
      </section>
    </main>
  </div>;
}