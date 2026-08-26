import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BrandHeader from "@/components/rfq/BrandHeader";

const proFeatures = [
["AI-Identified Win List", "Skip the noise. Our AI cross-references AMSC ratings, DLA shortage data, competition scores, and OEM lists to surface the RFQs you're actually positioned to win — not just everything that matches a keyword."],
["Competitor & NSN Intelligence", "See exactly what your competitors are winning, by NSN and by weapon system. Track shortage vs. surplus positions, net demand, and deficit forecasts before you commit to a bid."],
["Instant Price Justification", "Build pricing backup in seconds, not hours. Search historical NSN pricing with average unit cost, most recent award price, and a match-confidence score — so every quote is defensible."],
["Expanded Opportunity Discovery", "Go beyond RFQs with built-in SBIR/OTA search, Deep Research, and Pentagon ChatGPT — plus unlimited team recipients, so nothing falls through the cracks."]];


export default function OrderConfirmation() {
  const setup = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const userCount = Number(setup.amountUsers || 1);
  const total = 50;

  return (
    <div className="landing-page">
      <BrandHeader />
      <main className="px-5 py-12 lg:px-16 flex flex-col gap-10">
        <section className="info-shadow-box text-center w-full max-w-none rounded-none sm:rounded-[15px]">
          <p className="rfq-eyebrow mb-4">Order Confirmed</p>
          <h1 className="mx-auto text-5xl">Welcome to <span>RFQ Watch Lite</span></h1>
          <div className="gold-rule mx-auto" />
          <p className="max-w-lg mx-auto">Your subscription is active. We've sent your login credentials to {setup.email || "your email address"}.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <span className="font-semibold text-[#6fa8d6]">${total.toFixed(2)}/mo · {userCount} {userCount === 1 ? "recipient" : "recipients"}</span>
            <Link className="continue-button" to="/dashboard">Go to Dashboard</Link>
          </div>
        </section>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <section className="setup-card max-w-none w-full">
            <p className="rfq-eyebrow">Break out of your CAGE</p>
            <h2>Go Further with RFQ Watch Pro</h2>
            <div className="gold-rule" />
            <p className="text-slate-500 mb-2">RFQ Watch Lite keeps you in the loop. RFQ Watch Pro puts your whole team ahead of the curve. With a dynamic dashboard, detailed analytics on your competition, and advanced lookup functions, RFQ Watch Pro gives you everything you need to win more government contracts.</p>
            <a className="navy-button" href="https://www.logisticsinformation.com/LITWeb3/home" target="_blank" rel="noopener noreferrer">Explore RFQ Watch Pro <ArrowRight size={18} /></a>
          </section>
          <section className="setup-card max-w-none w-full">
            {proFeatures.map(([title, copy], i) =>
              <div className="landing-step" key={title}>
                <span>{i + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>);

}