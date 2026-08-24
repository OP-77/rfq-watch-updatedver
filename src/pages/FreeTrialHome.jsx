import { Link } from "react-router-dom";
import { ArrowRight, BellRing, CircleCheck, Mail } from "lucide-react";
import BrandHeader from "@/components/rfq/BrandHeader";

export default function FreeTrialHome() {
  return <div className="landing-page">
    <BrandHeader />
    <main className="landing-hero">
      <section className="hero-copy">
        <div className="info-shadow-box">
          <p className="rfq-eyebrow">Free Trial Active</p>
          <h1>Experience <span>RFQ Watch Lite</span> Risk-Free.</h1>
          <div className="gold-rule" />
          <p>Your free trial is live. Add your CAGE code, choose who receives alerts, and get matching government RFQs delivered directly to your inbox — no payment required to start.</p>
          <small><CircleCheck size={15} /> Rapid. Reliable. Relevant.</small>
        </div>
      </section>
      <section className="setup-card">
        <p className="rfq-eyebrow">3 Simple Steps</p><h2>Activate Your Free Trial Alerts</h2>
        <div className="gold-rule" />
        {[[BellRing, "Create Your Account", "Enter your CAGE code and contact details."], [Mail, "Add Your Recipients", "Choose who should receive RFQ alerts."], [CircleCheck, "Start Your Trial", "Complete setup and begin receiving alerts — free."]].map(([Icon, title, copy], i) => <div className="landing-step" key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}
        <Link className="navy-button" to="/create-account">Start Free Trial <ArrowRight size={18} /></Link>
      </section>
    </main>
  </div>;
}