import { Link } from "react-router-dom";
import { ArrowRight, BellRing, CircleCheck, Mail } from "lucide-react";
import BrandHeader from "@/components/rfq/BrandHeader";

export default function Home() {
  return <div className="landing-page">
    <BrandHeader />
    <main className="landing-hero">
      <section className="hero-copy">
        <p className="rfq-eyebrow">Government RFQ Alerts</p>
        <h1>Never Miss a <span>Relevant RFQ</span> Again.</h1>
        <div className="gold-rule" />
        <p>Add your CAGE code, choose who receives alerts, and get matching government RFQs delivered directly to your inbox.</p>
        <Link className="gold-button" to="/create-account">Create Your Account <ArrowRight size={18} /></Link>
        <small><CircleCheck size={15} /> Secure. Simple. Relevant.</small>
      </section>
      <section className="setup-card">
        <p className="rfq-eyebrow">Simple Setup</p><h2>Get RFQ Alerts in 3 Simple Steps</h2>
        <div className="gold-rule" />
        {[[BellRing,"Create Your Account","Enter your CAGE code and contact details."],[Mail,"Add Your Users","Choose who should receive RFQ alerts."],[CircleCheck,"Activate Alerts","Complete activation and start watching."]].map(([Icon,title,copy], i) => <div className="landing-step" key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}
        <Link className="navy-button" to="/create-account">Get Started <ArrowRight size={18} /></Link>
      </section>
    </main>
  </div>;
}