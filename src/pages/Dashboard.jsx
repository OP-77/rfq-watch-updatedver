import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Loader2, LogOut, UserCircle, Users } from "lucide-react";
import { base44 } from "@/api/base44Client";
import BrandHeader from "@/components/rfq/BrandHeader";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [setup, setSetup] = useState({});
  const [portalLoading, setPortalLoading] = useState(false);
  const [unsubLoading, setUnsubLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    setSetup(JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}"));
  }, []);

  const userCount = Number(setup.amountUsers || 1);
  const monthlyTotal = 50 + Math.max(0, userCount - 1) * 5;
  const displayName = user?.full_name || setup.fullName || "Account Holder";
  const displayEmail = user?.email || setup.email || "";

  const handleManagePayment = () => {
    setPortalLoading(true);
    base44.functions.invoke("createStripePortalSession", { returnUrl: window.location.href, email: displayEmail })
      .then((res) => { if (res?.url) window.location.href = res.url; })
      .catch(() => {})
      .finally(() => setPortalLoading(false));
  };

  const handleUnsubscribe = () => {
    setUnsubLoading(true);
    base44.functions.invoke("cancelSubscription", { returnUrl: window.location.href, email: displayEmail })
      .then((res) => { if (res?.url) window.location.href = res.url; else setUnsubscribed(true); })
      .catch(() => setUnsubscribed(true))
      .finally(() => setUnsubLoading(false));
  };

  return (
    <div className="landing-page">
      <BrandHeader />
      <main className="px-5 py-12 lg:px-16 max-w-5xl mx-auto flex flex-col gap-8">
        <div>
          <p className="rfq-eyebrow">Account Dashboard</p>
          <h1 className="text-white text-4xl font-semibold mt-2">Welcome, {displayName.split(" ")[0]}</h1>
          <div className="gold-rule" />
        </div>

        {/* User Info */}
        <section className="info-shadow-box w-full max-w-none">
          <div className="flex items-center gap-3 mb-5">
            <UserCircle className="text-[#6fa8d6]" size={28} />
            <h2 className="text-white text-xl font-semibold">Account Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-slate-300">
            <div><span className="block text-xs uppercase tracking-widest text-[#6fa8d6] font-bold">Name</span><span className="text-white">{displayName}</span></div>
            <div><span className="block text-xs uppercase tracking-widest text-[#6fa8d6] font-bold">Email</span><span className="text-white">{displayEmail}</span></div>
            <div><span className="block text-xs uppercase tracking-widest text-[#6fa8d6] font-bold">CAGE Code</span><span className="text-white">{setup.cageCode || "—"}</span></div>
            <div><span className="block text-xs uppercase tracking-widest text-[#6fa8d6] font-bold">Plan</span><span className="text-white">RFQ Watch Lite — ${monthlyTotal.toFixed(2)}/mo ({userCount} {userCount === 1 ? "recipient" : "recipients"})</span></div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={handleUnsubscribe} disabled={unsubLoading || unsubscribed} className="inline-flex items-center justify-center gap-2 min-h-12 px-7 bg-red-600/80 text-white font-bold rounded-full transition hover:bg-red-600 disabled:opacity-50">
              {unsubLoading ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : <><LogOut size={18} /> {unsubscribed ? "Unsubscribed" : "Unsubscribe"}</>}
            </button>
          </div>
          {unsubscribed && <p className="text-slate-300 text-sm mt-3">Your subscription has been cancelled. You will stop receiving RFQ alerts at the end of your billing period.</p>}
        </section>

        {/* Recipient Management */}
        <section className="info-shadow-box w-full max-w-none">
          <div className="flex items-center gap-3 mb-5">
            <Users className="text-[#6fa8d6]" size={28} />
            <h2 className="text-white text-xl font-semibold">Recipient Management</h2>
          </div>
          <p className="text-slate-300 mb-4">Manage who receives RFQ alerts. Add or remove recipients — your monthly billing adjusts automatically.</p>
          <Link to="/manage-recipients" className="inline-flex items-center justify-center gap-2 min-h-12 px-7 bg-[#2c5a89] text-white font-bold rounded-full transition hover:bg-[#3a6ba0]">
            Manage Recipients <ArrowRight size={18} />
          </Link>
        </section>

        {/* Payment Management */}
        <section className="info-shadow-box w-full max-w-none">
          <div className="flex items-center gap-3 mb-5">
            <CreditCard className="text-[#6fa8d6]" size={28} />
            <h2 className="text-white text-xl font-semibold">Payment & Billing</h2>
          </div>
          <p className="text-slate-300 mb-4">Update your card on file, view invoices, or change your billing details through Stripe's secure portal.</p>
          <button onClick={handleManagePayment} disabled={portalLoading} className="inline-flex items-center justify-center gap-2 min-h-12 px-7 bg-[#2c5a89] text-white font-bold rounded-full transition hover:bg-[#3a6ba0] disabled:opacity-50">
            {portalLoading ? <><Loader2 className="animate-spin" size={18} /> Opening portal...</> : <>Manage Payment Method <ArrowRight size={18} /></>}
          </button>
        </section>
      </main>
    </div>
  );
}