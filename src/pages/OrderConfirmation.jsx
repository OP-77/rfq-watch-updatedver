import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, BellRing, ChartNoAxesCombined, Headset, Sparkles, Zap } from "lucide-react";
import BrandHeader from "@/components/rfq/BrandHeader";

const proFeatures = [
  [Zap, "Real-Time Alerts", "Get notified the instant a matching RFQ drops, so you never lose a beat."],
  [ChartNoAxesCombined, "Advanced Analytics", "Track win rates, response times, and opportunity trends at a glance."],
  [Headset, "Dedicated Support", "Priority access to our government contracting specialists whenever you need help."],
  [BellRing, "Unlimited Recipients", "Add as many team members as you need at no extra cost."]
];

export default function OrderConfirmation() {
  const setup = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const userCount = Number(setup.amountUsers || 1);
  const total = 50 + Math.max(0, userCount - 1) * 5;

  return <div className="landing-page">
    <BrandHeader />
    <main className="landing-hero">
      <section className="hero-copy">
        <div className="info-shadow-box">
          <p className="rfq-eyebrow">Order Confirmed</p>
          <h1>Welcome to <span>RFQ Watch Lite</span></h1>
          <div className="gold-rule" />
          <p>Your subscription is active. We've sent a confirmation to {setup.email || "your email address"} — daily RFQ alerts start tomorrow morning.</p>
          <div className="flex items-center gap-3 mt-6 text-[#6fa8d6]">
            <BadgeCheck size={22} /> <span className="font-semibold">${total.toFixed(2)}/mo · {userCount} {userCount === 1 ? "recipient" : "recipients"}</span>
          </div>
          <small className="mt-5"><Sparkles size={15} /> Ready to take your contracting pipeline further? See RFQ Watch Pro below.</small>
        </div>
      </section>
      <section className="setup-card">
        <p className="rfq-eyebrow">Upgrade Your Experience</p>
        <h2>Go Further with RFQ Watch Pro</h2>
        <div className="gold-rule" />
        <p className="text-slate-500 mb-2">RFQ Watch Lite keeps you in the loop. RFQ Watch Pro puts your whole team ahead of the curve with real-time alerts, deep analytics, and unlimited recipients — everything you need to win more government contracts.</p>
        <div>{proFeatures.map(([Icon, title, copy], i) => <div className="landing-step" key={title}><span>{i + 1}</span><div><h3 className="flex items-center gap-2"><Icon size={18} className="text-[#2c5a89]" /> {title}</h3><p>{copy}</p></div></div>)}</div>
        <a className="navy-button" href="https://www.logisticsinformation.com/LITWeb3/home" target="_blank" rel="noopener noreferrer">Explore RFQ Watch Pro <ArrowRight size={18} /></a>
        <Link className="back-button justify-center mt-4" to="/">Return Home</Link>
      </section>
    </main>
  </div>;
}