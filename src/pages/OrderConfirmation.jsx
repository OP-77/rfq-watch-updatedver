import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Crosshair, LineChart, Scale, Sparkles, Telescope } from "lucide-react";
import BrandHeader from "@/components/rfq/BrandHeader";

const proFeatures = [
[Crosshair, "AI-Identified Win List", "Skip the noise. Our AI cross-references AMSC ratings, DLA shortage data, competition scores, and OEM lists to surface the RFQs you're actually positioned to win — not just everything that matches a keyword."],
[Telescope, "Competitor & NSN Intelligence", "See exactly what your competitors are winning, by NSN and by weapon system. Track shortage vs. surplus positions, net demand, and deficit forecasts before you commit to a bid."],
[Scale, "Instant Price Justification", "Build pricing backup in seconds, not hours. Search historical NSN pricing with average unit cost, most recent award price, and a match-confidence score — so every quote is defensible."],
[LineChart, "Expanded Opportunity Discovery", "Go beyond RFQs with built-in SBIR/OTA search, Deep Research, and Pentagon ChatGPT — plus unlimited team recipients, so nothing falls through the cracks."]];


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
          <small className="mt-5"><Sparkles size={15} /> Ready to take your contracting pipeline further? Upgrade to RFQ Watch Pro.</small>
        </div>
      </section>
      <section className="setup-card">
        <p className="rfq-eyebrow">Break out of your CAGE</p>
        <h2>Go Further with RFQ Watch Pro</h2>
        <div className="gold-rule" />
        <p className="text-slate-500 mb-2">RFQ Watch Lite keeps you in the loop. 
RFQ Watch Pro puts your whole team ahead of the curve. 

With a dynamic dashboard, detailed analytics on your competition, and advanced look-up functions, RFQ Watch Pro gives you everything you need to win more government contracts.</p>
        <div>{proFeatures.map(([Icon, title, copy], i) => <div className="landing-step" key={title}><span>{i + 1}</span><div><h3 className="flex items-center gap-2"><Icon size={18} className="text-[#2c5a89]" /> {title}</h3><p>{copy}</p></div></div>)}</div>
        <a className="navy-button" href="https://www.logisticsinformation.com/LITWeb3/home" target="_blank" rel="noopener noreferrer">Explore RFQ Watch Pro <ArrowRight size={18} /></a>
        <Link className="back-button justify-center mt-4" to="/">Return Home</Link>
      </section>
    </main>
  </div>;}